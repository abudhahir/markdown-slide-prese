import { useState, useCallback } from 'react'
import { File, Folder, FolderOpen, CaretRight, Link } from '@phosphor-icons/react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface FileNode {
  name: string
  path: string
  type: 'file' | 'directory'
  children?: FileNode[]
}

interface FileSelectorProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onFileSelect: (content: string, fileName: string) => void
}

export function FileSelector({ isOpen, onOpenChange, onFileSelect }: FileSelectorProps) {
  const [files, setFiles] = useState<FileNode[]>([])
  const [expandedDirs, setExpandedDirs] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(false)
  const [gitUrl, setGitUrl] = useState('')

  const parseGitUrl = (url: string): { platform: 'github' | 'gitlab', owner: string, repo: string, branch: string, path: string } | null => {
    try {
      const githubMatch = url.match(/github\.com\/([^\/]+)\/([^\/]+)(?:\/blob\/([^\/]+)\/(.+))?/)
      if (githubMatch) {
        return {
          platform: 'github',
          owner: githubMatch[1],
          repo: githubMatch[2].replace(/\.git$/, ''),
          branch: githubMatch[3] || 'main',
          path: githubMatch[4] || ''
        }
      }

      const gitlabMatch = url.match(/gitlab\.com\/([^\/]+)\/([^\/]+)(?:\/-\/blob\/([^\/]+)\/(.+))?/)
      if (gitlabMatch) {
        return {
          platform: 'gitlab',
          owner: gitlabMatch[1],
          repo: gitlabMatch[2].replace(/\.git$/, ''),
          branch: gitlabMatch[3] || 'main',
          path: gitlabMatch[4] || ''
        }
      }

      return null
    } catch (error) {
      return null
    }
  }

  const fetchFromGitUrl = async () => {
    if (!gitUrl.trim()) {
      toast.error('Please enter a Git URL')
      return
    }

    const parsed = parseGitUrl(gitUrl)
    if (!parsed) {
      toast.error('Invalid Git URL. Supported: GitHub and GitLab URLs')
      return
    }

    setIsLoading(true)
    try {
      let rawUrl = ''
      
      if (parsed.platform === 'github') {
        rawUrl = `https://raw.githubusercontent.com/${parsed.owner}/${parsed.repo}/${parsed.branch}/${parsed.path}`
      } else if (parsed.platform === 'gitlab') {
        rawUrl = `https://gitlab.com/${parsed.owner}/${parsed.repo}/-/raw/${parsed.branch}/${parsed.path}`
      }

      const response = await fetch(rawUrl)
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`)
      }

      const content = await response.text()
      const fileName = parsed.path.split('/').pop() || 'presentation.md'
      
      onFileSelect(content, fileName)
      onOpenChange(false)
      toast.success(`Loaded ${fileName} from ${parsed.platform}`)
    } catch (error) {
      toast.error(`Failed to load file: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileInput = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files
    if (!fileList || fileList.length === 0) return

    setIsLoading(true)
    const fileTree: FileNode[] = []
    const fileMap = new Map<string, FileNode>()

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]
      if (!file.name.endsWith('.md') && !file.name.endsWith('.markdown')) continue

      const pathParts = file.webkitRelativePath.split('/')
      const fileName = pathParts[pathParts.length - 1]
      const dirParts = pathParts.slice(1, -1)

      let currentPath = ''
      let currentLevel = fileTree

      dirParts.forEach((dir, index) => {
        currentPath = currentPath ? `${currentPath}/${dir}` : dir
        
        if (!fileMap.has(currentPath)) {
          const dirNode: FileNode = {
            name: dir,
            path: currentPath,
            type: 'directory',
            children: []
          }
          fileMap.set(currentPath, dirNode)
          currentLevel.push(dirNode)
          currentLevel = dirNode.children!
        } else {
          currentLevel = fileMap.get(currentPath)!.children!
        }
      })

      const fileNode: FileNode = {
        name: fileName,
        path: file.webkitRelativePath,
        type: 'file'
      }
      currentLevel.push(fileNode)
      fileMap.set(file.webkitRelativePath, fileNode)
    }

    const sortNodes = (nodes: FileNode[]) => {
      nodes.sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === 'directory' ? -1 : 1
        }
        return a.name.localeCompare(b.name)
      })
      nodes.forEach(node => {
        if (node.children) {
          sortNodes(node.children)
        }
      })
    }

    sortNodes(fileTree)
    setFiles(fileTree)
    setIsLoading(false)
  }, [])

  const toggleDirectory = (path: string) => {
    setExpandedDirs(prev => {
      const next = new Set(prev)
      if (next.has(path)) {
        next.delete(path)
      } else {
        next.add(path)
      }
      return next
    })
  }

  const handleFileClick = async (node: FileNode) => {
    if (node.type === 'directory') {
      toggleDirectory(node.path)
      return
    }

    const input = document.getElementById('file-directory-input') as HTMLInputElement
    if (!input?.files) return

    for (let i = 0; i < input.files.length; i++) {
      const file = input.files[i]
      if (file.webkitRelativePath === node.path) {
        const content = await file.text()
        onFileSelect(content, node.name)
        onOpenChange(false)
        break
      }
    }
  }

  const renderFileTree = (nodes: FileNode[], depth = 0) => {
    return nodes.map(node => {
      const isExpanded = expandedDirs.has(node.path)
      const isDirectory = node.type === 'directory'

      return (
        <div key={node.path}>
          <button
            onClick={() => handleFileClick(node)}
            className={cn(
              'w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-accent/10 transition-colors rounded-md group',
              'text-foreground'
            )}
            style={{ paddingLeft: `${depth * 1.5 + 0.75}rem` }}
          >
            {isDirectory ? (
              <>
                <CaretRight
                  className={cn(
                    'flex-shrink-0 transition-transform text-muted-foreground',
                    isExpanded && 'rotate-90'
                  )}
                  size={16}
                />
                {isExpanded ? (
                  <FolderOpen className="flex-shrink-0 text-accent" size={20} />
                ) : (
                  <Folder className="flex-shrink-0 text-accent/70" size={20} />
                )}
              </>
            ) : (
              <File className="flex-shrink-0 text-muted-foreground ml-5" size={20} />
            )}
            <span className="flex-1 truncate group-hover:text-accent transition-colors">
              {node.name}
            </span>
          </button>
          {isDirectory && isExpanded && node.children && (
            <div className="ml-2">
              {renderFileTree(node.children, depth + 1)}
            </div>
          )}
        </div>
      )
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col bg-card/95 backdrop-blur-md border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Open Markdown File</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="local" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="local">
              <Folder className="mr-2" size={16} />
              Local Files
            </TabsTrigger>
            <TabsTrigger value="git">
              <Link className="mr-2" size={16} />
              Git URL
            </TabsTrigger>
          </TabsList>

          <TabsContent value="local" className="flex-1 flex flex-col gap-4 overflow-hidden mt-4">
            {files.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 py-8">
                <Folder className="text-muted-foreground" size={64} />
                <p className="text-center text-muted-foreground">
                  Select a markdown file or folder
                </p>
                <input
                  id="file-single-input"
                  type="file"
                  accept=".md,.markdown"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const content = await file.text()
                      onFileSelect(content, file.name)
                      onOpenChange(false)
                    }
                  }}
                />
                <input
                  id="file-directory-input"
                  type="file"
                  accept=".md,.markdown"
                  multiple
                  {...({ webkitdirectory: '' } as any)}
                  className="hidden"
                  onChange={handleFileInput}
                />
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      const input = document.getElementById('file-single-input') as HTMLInputElement
                      input?.click()
                    }}
                    variant="default"
                  >
                    <File className="mr-2" size={16} />
                    Select File
                  </Button>
                  <Button
                    onClick={() => {
                      const input = document.getElementById('file-directory-input') as HTMLInputElement
                      input?.click()
                    }}
                    variant="secondary"
                  >
                    <Folder className="mr-2" size={16} />
                    Browse Folder
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <p className="text-sm text-muted-foreground">
                    Select a markdown file to open
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setFiles([])
                      setExpandedDirs(new Set())
                      const input = document.getElementById('file-directory-input') as HTMLInputElement
                      if (input) input.value = ''
                    }}
                  >
                    Change Folder
                  </Button>
                </div>

                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-1">
                    {isLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="text-muted-foreground">Loading files...</div>
                      </div>
                    ) : (
                      renderFileTree(files)
                    )}
                  </div>
                </ScrollArea>
              </>
            )}
          </TabsContent>

          <TabsContent value="git" className="flex-1 flex flex-col gap-4 overflow-hidden mt-4">
            <div className="flex-1 flex flex-col gap-6 py-4">
              <div className="space-y-4">
                <div className="flex items-start gap-2 p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <Link className="text-accent flex-shrink-0 mt-0.5" size={20} />
                  <div className="space-y-2 text-sm">
                    <p className="font-medium text-foreground">Supported Git URLs:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• GitHub: <code className="text-xs bg-primary/20 px-1.5 py-0.5 rounded">https://github.com/owner/repo/blob/main/file.md</code></li>
                      <li>• GitLab: <code className="text-xs bg-primary/20 px-1.5 py-0.5 rounded">https://gitlab.com/owner/repo/-/blob/main/file.md</code></li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="git-url" className="text-base">Git URL</Label>
                  <Input
                    id="git-url"
                    placeholder="https://github.com/owner/repo/blob/main/slides.md"
                    value={gitUrl}
                    onChange={(e) => setGitUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        fetchFromGitUrl()
                      }
                    }}
                    className="font-mono text-sm"
                  />
                </div>

                <Button
                  onClick={fetchFromGitUrl}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? 'Loading...' : 'Load from Git'}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
