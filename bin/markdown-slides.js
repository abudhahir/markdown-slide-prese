#!/usr/bin/env node

import { fileURLToPath } from 'url'
import { dirname, resolve, join } from 'path'
import { createServer } from 'http'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const DEFAULT_PORT = 3000
const DIST_DIR = resolve(__dirname, '../dist')

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
}

function getMimeType(filePath) {
  const ext = filePath.substring(filePath.lastIndexOf('.'))
  return MIME_TYPES[ext] || 'application/octet-stream'
}

async function serveFile(filePath, res) {
  try {
    const content = await readFile(filePath)
    const mimeType = getMimeType(filePath)
    res.writeHead(200, { 'Content-Type': mimeType })
    res.end(content)
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('404 Not Found')
  }
}

function parseArgs() {
  const args = process.argv.slice(2)
  const options = {
    port: DEFAULT_PORT,
    help: false,
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === '-h' || arg === '--help') {
      options.help = true
    } else if (arg === '-p' || arg === '--port') {
      const port = parseInt(args[++i], 10)
      if (!isNaN(port) && port > 0 && port < 65536) {
        options.port = port
      } else {
        console.error('Invalid port number')
        process.exit(1)
      }
    } else if (arg === '-v' || arg === '--version') {
      const packageJson = JSON.parse(
        await readFile(resolve(__dirname, '../package.json'), 'utf-8')
      )
      console.log(packageJson.version)
      process.exit(0)
    }
  }

  return options
}

function printHelp() {
  console.log(`
Markdown Slides - A powerful markdown-based presentation tool

Usage:
  markdown-slides [options]
  npx markdown-slides [options]

Options:
  -p, --port <port>    Port to run the server on (default: 3000)
  -h, --help           Display this help message
  -v, --version        Display version number

Examples:
  markdown-slides
  markdown-slides --port 8080
  npx markdown-slides -p 5000

Once started, open your browser to http://localhost:3000 (or your specified port)

Documentation: https://github.com/yourusername/markdown-slides
`)
}

async function startServer(port) {
  if (!existsSync(DIST_DIR)) {
    console.error('Error: dist folder not found. Please build the project first with "npm run build"')
    process.exit(1)
  }

  const server = createServer(async (req, res) => {
    let filePath = req.url === '/' ? '/index.html' : req.url
    
    filePath = filePath.split('?')[0]
    
    const fullPath = join(DIST_DIR, filePath)
    
    if (fullPath.startsWith(DIST_DIR) && existsSync(fullPath)) {
      await serveFile(fullPath, res)
    } else {
      await serveFile(join(DIST_DIR, 'index.html'), res)
    }
  })

  server.listen(port, () => {
    console.log(`
🎯 Markdown Slides is running!

   Local:   http://localhost:${port}

Press Ctrl+C to stop the server
`)
  })

  process.on('SIGINT', () => {
    console.log('\n\nShutting down server...')
    server.close(() => {
      console.log('Server stopped')
      process.exit(0)
    })
  })
}

async function main() {
  const options = await parseArgs()

  if (options.help) {
    printHelp()
    process.exit(0)
  }

  await startServer(options.port)
}

main().catch((error) => {
  console.error('Error starting server:', error)
  process.exit(1)
})
