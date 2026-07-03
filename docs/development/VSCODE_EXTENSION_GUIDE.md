# Converting Markdown Slides to VS Code Extension

## Overview

This guide explains how to convert your React-based Markdown Slides presentation app into a VS Code extension with an "Open as Presentation" command that displays slides in an editor pane.

## Architecture Differences

### Current Application (Spark)
- **Frontend**: React + TypeScript
- **Bundler**: Vite
- **Runtime**: Browser-based web app
- **Storage**: Browser localStorage via `spark.kv`

### VS Code Extension
- **Frontend**: Webview with React (embedded browser)
- **Backend**: Node.js Extension Host
- **Bundler**: Webpack or ESBuild
- **Storage**: VS Code Extension Context (globalState/workspaceState)

## Project Structure

```
markdown-slides-vscode/
├── src/
│   ├── extension.ts              # Extension entry point (Node.js)
│   ├── webview/                  # Your React app
│   │   ├── App.tsx              # Main component
│   │   ├── components/          # All your slide components
│   │   ├── index.tsx            # Webview entry
│   │   └── styles/
│   └── slideProvider.ts         # Manages webview lifecycle
├── media/                        # Icons and assets
├── package.json                  # Extension manifest
├── tsconfig.json
├── webpack.config.js
└── README.md
```

## Step-by-Step Implementation

### 1. Initialize VS Code Extension

```bash
# Install Yeoman and VS Code Extension generator
npm install -g yo generator-code

# Generate extension scaffold
yo code

# Choose:
# - New Extension (TypeScript)
# - Name: markdown-slides
# - Identifier: markdown-slides
# - Description: Present markdown files as slides
# - Initialize git: Yes
# - Bundler: webpack
```

### 2. Update package.json

```json
{
  "name": "markdown-slides",
  "displayName": "Markdown Slides",
  "description": "Present markdown files as beautiful slide presentations",
  "version": "1.0.0",
  "engines": {
    "vscode": "^1.85.0"
  },
  "categories": ["Other"],
  "activationEvents": [
    "onCommand:markdown-slides.openAsPresentation"
  ],
  "main": "./dist/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "markdown-slides.openAsPresentation",
        "title": "Open as Presentation",
        "category": "Markdown Slides",
        "icon": "$(preview)"
      }
    ],
    "menus": {
      "editor/title": [
        {
          "command": "markdown-slides.openAsPresentation",
          "when": "resourceLangId == markdown",
          "group": "navigation"
        }
      ],
      "editor/context": [
        {
          "command": "markdown-slides.openAsPresentation",
          "when": "resourceLangId == markdown",
          "group": "navigation"
        }
      ],
      "explorer/context": [
        {
          "command": "markdown-slides.openAsPresentation",
          "when": "resourceExtname == .md",
          "group": "navigation"
        }
      ]
    },
    "keybindings": [
      {
        "command": "markdown-slides.openAsPresentation",
        "key": "ctrl+shift+p",
        "mac": "cmd+shift+p",
        "when": "resourceLangId == markdown"
      }
    ]
  },
  "scripts": {
    "vscode:prepublish": "npm run package",
    "compile": "webpack",
    "watch": "webpack --watch",
    "package": "webpack --mode production --devtool hidden-source-map"
  },
  "devDependencies": {
    "@types/node": "^20.x",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/vscode": "^1.85.0",
    "@typescript-eslint/eslint-plugin": "^6.15.0",
    "@typescript-eslint/parser": "^6.15.0",
    "css-loader": "^6.8.1",
    "eslint": "^8.56.0",
    "style-loader": "^3.3.3",
    "ts-loader": "^9.5.1",
    "typescript": "^5.3.3",
    "webpack": "^5.89.0",
    "webpack-cli": "^5.1.4"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "marked": "^11.0.0",
    "framer-motion": "^10.16.0"
  }
}
```

### 3. Extension Entry Point (src/extension.ts)

```typescript
import * as vscode from 'vscode';
import { SlidePresentationProvider } from './slideProvider';

export function activate(context: vscode.ExtensionContext) {
  const provider = new SlidePresentationProvider(context.extensionUri);

  const disposable = vscode.commands.registerCommand(
    'markdown-slides.openAsPresentation',
    async () => {
      const editor = vscode.window.activeTextEditor;
      
      if (!editor) {
        vscode.window.showErrorMessage('No active editor found');
        return;
      }

      const document = editor.document;
      
      if (document.languageId !== 'markdown') {
        vscode.window.showErrorMessage('Current file is not a markdown file');
        return;
      }

      const markdown = document.getText();
      const fileName = document.fileName;

      provider.show(markdown, fileName);
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(provider);
}

export function deactivate() {}
```

### 4. Slide Provider (src/slideProvider.ts)

```typescript
import * as vscode from 'vscode';

export class SlidePresentationProvider implements vscode.Disposable {
  private _panel: vscode.WebviewPanel | undefined;
  private readonly _extensionUri: vscode.Uri;

  constructor(extensionUri: vscode.Uri) {
    this._extensionUri = extensionUri;
  }

  public show(markdown: string, fileName: string) {
    if (this._panel) {
      this._panel.reveal(vscode.ViewColumn.One);
      this._sendMarkdown(markdown, fileName);
    } else {
      this._panel = vscode.window.createWebviewPanel(
        'markdownSlides',
        'Presentation',
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
          localResourceRoots: [
            vscode.Uri.joinPath(this._extensionUri, 'dist'),
            vscode.Uri.joinPath(this._extensionUri, 'media')
          ]
        }
      );

      this._panel.webview.html = this._getWebviewContent(this._panel.webview);
      
      this._panel.onDidDispose(() => {
        this._panel = undefined;
      });

      // Wait for webview to load, then send markdown
      this._panel.webview.onDidReceiveMessage(
        message => {
          switch (message.type) {
            case 'webviewReady':
              this._sendMarkdown(markdown, fileName);
              break;
            case 'stateUpdate':
              // Save state to extension storage
              this._saveState(message.state);
              break;
          }
        }
      );
    }
  }

  private _sendMarkdown(markdown: string, fileName: string) {
    this._panel?.webview.postMessage({
      type: 'loadMarkdown',
      markdown,
      fileName
    });
  }

  private _saveState(state: any) {
    // Persist state using VS Code's storage API
    // context.globalState.update('slidesState', state);
  }

  private _getWebviewContent(webview: vscode.Webview): string {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview.js')
    );
    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview.css')
    );

    const nonce = getNonce();

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}'; font-src ${webview.cspSource};">
  <link href="${styleUri}" rel="stylesheet">
  <title>Markdown Slides</title>
</head>
<body>
  <div id="root"></div>
  <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
  }

  public dispose() {
    this._panel?.dispose();
  }
}

function getNonce() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
```

### 5. Webview Entry Point (src/webview/index.tsx)

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

// VS Code API
declare global {
  interface Window {
    acquireVsCodeApi: () => any;
  }
}

const vscode = window.acquireVsCodeApi();

// Listen for messages from extension
window.addEventListener('message', event => {
  const message = event.data;
  switch (message.type) {
    case 'loadMarkdown':
      // Dispatch to your React app
      window.dispatchEvent(new CustomEvent('loadMarkdown', {
        detail: {
          markdown: message.markdown,
          fileName: message.fileName
        }
      }));
      break;
  }
});

// Notify extension that webview is ready
vscode.postMessage({ type: 'webviewReady' });

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App vscode={vscode} />
  </React.StrictMode>
);
```

### 6. Adapt Your React App (src/webview/App.tsx)

```typescript
import { useState, useEffect } from 'react';
import { SlidePresentation } from './components/slides/SlidePresentation';

interface AppProps {
  vscode: any;
}

function App({ vscode }: AppProps) {
  const [markdown, setMarkdown] = useState('# Loading...');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    // Listen for markdown load events
    const handleLoadMarkdown = (event: any) => {
      setMarkdown(event.detail.markdown);
      setFileName(event.detail.fileName);
    };

    window.addEventListener('loadMarkdown', handleLoadMarkdown as EventListener);

    return () => {
      window.removeEventListener('loadMarkdown', handleLoadMarkdown as EventListener);
    };
  }, []);

  // Replace spark.kv with VS Code state API
  const saveState = (key: string, value: any) => {
    vscode.postMessage({
      type: 'stateUpdate',
      state: { [key]: value }
    });
  };

  return (
    <SlidePresentation 
      markdown={markdown} 
      fileName={fileName}
      onStateChange={saveState}
    />
  );
}

export default App;
```

### 7. Webpack Configuration (webpack.config.js)

```javascript
const path = require('path');

const extensionConfig = {
  target: 'node',
  mode: 'none',
  entry: './src/extension.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    vscode: 'commonjs vscode'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      }
    ]
  }
};

const webviewConfig = {
  target: 'web',
  mode: 'none',
  entry: './src/webview/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webview.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src/webview')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};

module.exports = [extensionConfig, webviewConfig];
```

## Key Adaptations Required

### 1. Replace Spark APIs

**Storage (spark.kv) → VS Code State**

```typescript
// Before (Spark)
import { useKV } from '@github/spark/hooks';
const [theme, setTheme] = useKV('theme', 'midnight');

// After (VS Code)
const [theme, setTheme] = useState(() => {
  const saved = vscode.getState()?.theme;
  return saved || 'midnight';
});

useEffect(() => {
  vscode.setState({ ...vscode.getState(), theme });
}, [theme]);
```

**File Loading → VS Code Commands**

Remove the file browser component - VS Code handles file selection natively. Users right-click markdown files and select "Open as Presentation".

### 2. Remove Features Not Needed

- **Git URL Loading**: Not needed - users open local files
- **File Browser**: VS Code provides file explorer
- **Some Keyboard Shortcuts**: May conflict with VS Code shortcuts

### 3. Adjust Styling

VS Code webviews respect user's theme. Consider using VS Code theme colors:

```typescript
// Access VS Code theme colors
const styles = {
  background: 'var(--vscode-editor-background)',
  foreground: 'var(--vscode-editor-foreground)',
  primary: 'var(--vscode-button-background)',
};
```

### 4. Handle PDF Export

PDF export needs special handling in VS Code:

```typescript
// In extension.ts
vscode.commands.registerCommand('markdown-slides.exportPDF', async () => {
  const html = await panel.webview.postMessage({ type: 'getHTML' });
  
  // Use puppeteer or similar in Node.js context
  const pdf = await generatePDF(html);
  
  const uri = await vscode.window.showSaveDialog({
    filters: { 'PDF': ['pdf'] }
  });
  
  if (uri) {
    fs.writeFileSync(uri.fsPath, pdf);
  }
});
```

## Migration Checklist

- [ ] Initialize extension with `yo code`
- [ ] Copy React components from `src/components/slides/`
- [ ] Adapt App.tsx to receive markdown via postMessage
- [ ] Replace `useKV` with VS Code state management
- [ ] Remove file loading UI (use VS Code commands instead)
- [ ] Update styling to work in webview
- [ ] Configure webpack for dual builds (extension + webview)
- [ ] Test with sample markdown files
- [ ] Add PDF export command
- [ ] Create extension icon and README
- [ ] Package extension: `vsce package`
- [ ] Publish to marketplace: `vsce publish`

## Testing the Extension

```bash
# Build
npm run compile

# Debug
# Press F5 in VS Code to open Extension Development Host

# Test
# 1. Open a .md file
# 2. Right-click → "Open as Presentation"
# 3. Or use command palette: Ctrl+Shift+P → "Open as Presentation"
```

## Publishing

```bash
# Install vsce
npm install -g @vscode/vsce

# Package
vsce package

# Publish
vsce publish
```

## Additional Features to Consider

### 1. Live Preview Mode
Watch the source markdown file and auto-update presentation when file changes:

```typescript
const watcher = vscode.workspace.createFileSystemWatcher(document.uri.fsPath);
watcher.onDidChange(() => {
  const updatedContent = fs.readFileSync(document.uri.fsPath, 'utf8');
  panel.webview.postMessage({ type: 'loadMarkdown', markdown: updatedContent });
});
```

### 2. Presenter Notes
Add support for presenter notes using HTML comments:

```markdown
# Slide Title

Visible content

<!-- 
Presenter notes here
Only visible in notes view
-->
```

### 3. Export Options
- Export to PDF
- Export to PowerPoint (using PptxGenJS)
- Export individual slides as images

### 4. Configuration Settings
Add VS Code settings for default theme, font size, etc:

```json
"contributes": {
  "configuration": {
    "title": "Markdown Slides",
    "properties": {
      "markdownSlides.defaultTheme": {
        "type": "string",
        "default": "midnight",
        "description": "Default theme for presentations"
      },
      "markdownSlides.fontSize": {
        "type": "number",
        "default": 16,
        "description": "Base font size in pixels"
      }
    }
  }
}
```

## Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [Webview API Guide](https://code.visualstudio.com/api/extension-guides/webview)
- [Extension Examples](https://github.com/microsoft/vscode-extension-samples)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

## Estimated Timeline

- **Setup & Configuration**: 2-4 hours
- **Component Migration**: 4-6 hours
- **State Management Adaptation**: 2-3 hours
- **Testing & Debugging**: 3-5 hours
- **Polish & Documentation**: 2-3 hours

**Total**: 13-21 hours for a functional MVP

## Notes

- VS Code webviews are isolated - they can't directly access Node.js APIs
- Communication between extension and webview is message-based only
- Consider security - sanitize any user input
- Test on Windows, Mac, and Linux
- Follow VS Code extension guidelines for marketplace approval
