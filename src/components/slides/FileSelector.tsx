import { useState, useCallback } from 'react'
import { File, Folder, FolderOpen, CaretRight } from '@phosphor-icons/react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

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

        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          {files.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 py-8">
              <Folder className="text-muted-foreground" size={64} />
              <p className="text-center text-muted-foreground">
                Select a folder containing markdown files
              </p>
              <input
                id="file-directory-input"
                type="file"
                accept=".md,.markdown"
                multiple
                className="hidden"
                onChange={handleFileInput}
              />
              <Button
                onClick={() => {
                  const input = document.getElementById('file-directory-input') as HTMLInputElement
                  input?.click()
                }}
                className="mt-2"
              >
                Browse Folder
              </Button>
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
        </div>
      </DialogContent>
    </Dialog>
  )
}
