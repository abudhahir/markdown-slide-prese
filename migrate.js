const fs = require('fs');
const path = require('path');

console.log('=========================================');
console.log('Documentation Migration Script');
console.log('=========================================\n');

// Files to move
const migrations = {
  'getting-started': [
    'CLI_USAGE_GUIDE.md',
    'USER_GUIDE.md',
    'QUICKSTART_LOCAL_AND_NPM.md'
  ],
  'deployment': [
    'GITHUB_PAGES_DEPLOYMENT.md',
    'GITHUB_PAGES_QUICKSTART.md',
    'GITLAB_PAGES_DEPLOYMENT.md',
    'DEPLOYMENT_CHECKLIST.md',
    'DEPLOYMENT_COMPARISON.md'
  ],
  'development': [
    'ARCHITECTURE.md',
    'PRD.md',
    'VSCODE_EXTENSION_GUIDE.md'
  ],
  'release': [
    'RELEASE_WORKFLOW.md',
    'RELEASE_IMPLEMENTATION.md',
    'WORKFLOW_ARCHITECTURE.md',
    'QUICKSTART_RELEASE.md',
    'QUICKSTART_AUTOMATED_RELEASE.md',
    'VERSION_BUMP_QUICKREF.md',
    'PRERELEASE_GUIDE.md',
    'PRERELEASE_QUICKREF.md',
    'PRERELEASE_SUMMARY.md',
    'AUTOMATED_NPM_PUBLISHING.md',
    'NPM_PUBLISHING_GUIDE.md',
    'NPM_PUBLISHING_FLOW.md'
  ],
  'reference': [
    'POST_SETUP.md',
    'DOCUMENTATION_INDEX.md',
    'IMPLEMENTATION_COMPLETE.md',
    'YOUR_ACTION_ITEMS.md'
  ]
};

let movedCount = 0;

// Create directories
Object.keys(migrations).forEach(dir => {
  const dirPath = path.join('docs', dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✓ Created directory: ${dirPath}`);
  }
});

console.log('');

// Move files
Object.entries(migrations).forEach(([category, files]) => {
  console.log(`Moving ${category} documentation...`);
  files.forEach(file => {
    const source = path.join('.', file);
    const dest = path.join('docs', category, file);
    
    if (fs.existsSync(source)) {
      try {
        fs.renameSync(source, dest);
        console.log(`✓ Moved: ${file} → docs/${category}/`);
        movedCount++;
      } catch (error) {
        console.log(`✗ Failed to move ${file}: ${error.message}`);
      }
    } else {
      console.log(`⚠ Skipped (not found): ${file}`);
    }
  });
  console.log('');
});

// Copy scripts README
console.log('Copying scripts/README.md...');
const scriptsReadme = path.join('scripts', 'README.md');
if (fs.existsSync(scriptsReadme)) {
  const destPath = path.join('docs', 'reference', 'SCRIPTS_README.md');
  fs.copyFileSync(scriptsReadme, destPath);
  console.log('✓ Copied: scripts/README.md → docs/reference/SCRIPTS_README.md');
  movedCount++;
}
console.log('');

// Clean up migration files
console.log('Cleaning up migration instruction files...');
const filesToRemove = [
  'MIGRATE_DOCS.md',
  'RUN_MIGRATION.md',
  'MIGRATION_SUMMARY.md',
  'DOCUMENTATION_MIGRATION.md',
  'DOCS_QUICK_REFERENCE.md',
  'COMPLETED_MIGRATION_SETUP.md',
  'move-docs.sh',
  'migrate-docs.sh',
  'run-migration.sh'
];

filesToRemove.forEach(file => {
  if (fs.existsSync(file)) {
    try {
      fs.unlinkSync(file);
      console.log(`✓ Removed: ${file}`);
    } catch (error) {
      console.log(`✗ Failed to remove ${file}: ${error.message}`);
    }
  }
});

console.log('');
console.log('=========================================');
console.log('Migration Complete! ✅');
console.log('=========================================');
console.log('');
console.log(`Moved ${movedCount} files to docs/ directory`);
console.log('');
console.log('Documentation structure:');
console.log('  docs/');
console.log('  ├── README.md (index)');
console.log('  ├── getting-started/');
console.log('  ├── deployment/');
console.log('  ├── development/');
console.log('  ├── release/');
console.log('  └── reference/');
console.log('');
console.log('Next steps:');
console.log('  1. Review the docs/ directory');
console.log('  2. Check that all links in README.md work');
console.log('  3. Commit the changes:');
console.log('     git add docs/ README.md');
console.log('     git commit -m "docs: organize documentation into docs/ subdirectory"');
console.log('');
