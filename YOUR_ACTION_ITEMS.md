# YOUR ACTION ITEMS - Run Locally & Deploy to npm

Hi! Here's your personalized guide to get this running locally and published to npm.

---

## ✅ RUN LOCALLY RIGHT NOW

Open your terminal in the project directory (`/workspaces/spark-template`) and run:

### Development Mode (Recommended for testing)
```bash
npm run dev
```
- Opens at: **http://localhost:5173**
- Hot reload: Changes reflect instantly
- Use this for making changes and testing

### Production Mode (Test final build)
```bash
npm run build
npm run start
```
- Opens at: **http://localhost:3000**
- This is how users will experience it
- Use this to test before publishing

**That's it! Your presentation tool is now running locally.** 🎉

---

## ✅ DEPLOY TO NPM (When Ready)

### Prerequisites

1. **Create npm account** (if you don't have one):
   - Go to https://www.npmjs.com/signup
   - Create account with username, email, password

2. **Check your package name**:
   - Your current package name: `markdown-slides-presenter`
   - Check if available: `npm view markdown-slides-presenter`
   - If it shows 404 error → Name is available ✅
   - If it shows package info → Name taken, choose different name ❌

### Step-by-Step Publishing

#### 1. Build and Test
```bash
# Build production version
npm run build

# Test it works
npm run start
# Open http://localhost:3000 and test all features

# Stop the server (Ctrl+C)
```

#### 2. Test the Package Locally
```bash
# Create a package file
npm pack

# This creates: markdown-slides-presenter-1.0.0.tgz

# Install it globally to test
npm install -g ./markdown-slides-presenter-1.0.0.tgz

# Test the command
markdown-slides --help
markdown-slides --version
markdown-slides

# If it works, you're ready to publish!

# Uninstall the test
npm uninstall -g markdown-slides-presenter
```

#### 3. Login to npm
```bash
npm login
```
Enter your credentials:
- Username
- Password  
- Email
- 2FA code (if you have 2FA enabled)

Verify you're logged in:
```bash
npm whoami
```

#### 4. Publish to npm
```bash
npm publish
```

**Expected output:**
```
npm notice 
npm notice 📦  markdown-slides-presenter@1.0.0
npm notice === Tarball Contents ===
...
npm notice 
+ markdown-slides-presenter@1.0.0
```

✅ **Published successfully!**

#### 5. Verify It Worked
```bash
# View your package on npm
npm view markdown-slides-presenter

# Visit the package page
# https://www.npmjs.com/package/markdown-slides-presenter

# Test with npx (no installation needed)
npx markdown-slides-presenter
```

---

## 🎯 HOW USERS WILL RUN YOUR PACKAGE

After publishing, anyone can run it:

### Option 1: Run with npx (no installation)
```bash
npx markdown-slides-presenter
```

### Option 2: Install globally
```bash
npm install -g markdown-slides-presenter
markdown-slides
```

### Option 3: Custom port
```bash
npx markdown-slides-presenter --port 8080
markdown-slides --port 8080
```

---

## 🔧 YOUR CURRENT PACKAGE INFO

From your `package.json`:
- **Name**: `markdown-slides-presenter`
- **Version**: `1.0.0`
- **Author**: `abudhahir <abudhahir@gmail.com>`
- **Repository**: `https://github.com/abudhahir/markdown-slides-presenter.git`

These look good! ✅

---

## 🚨 COMMON ISSUES & SOLUTIONS

### Issue: "Package name is taken"
**Solution**: Change the name in `package.json`:
```json
{
  "name": "md-slides-presenter"
}
```
Or use a scoped package:
```json
{
  "name": "@abudhahir/markdown-slides"
}
```
Then publish with: `npm publish --access public`

### Issue: "You do not have permission"
**Solution**:
```bash
# Make sure you're logged in
npm whoami

# Try logout and login again
npm logout
npm login
```

### Issue: "Version already published"
**Solution**: Bump the version:
```bash
npm version patch  # 1.0.0 -> 1.0.1
npm publish
```

### Issue: Port 3000 already in use
**Solution**:
```bash
# Kill the process
npm run kill

# Or use a different port
markdown-slides --port 8080
```

### Issue: "dist folder not found"
**Solution**:
```bash
# Make sure you built first
npm run build

# Then run
npm run start
```

---

## 📝 QUICK COMMAND REFERENCE

```bash
# Development
npm run dev              # Start dev server (5173)
npm run build           # Build for production
npm run start           # Run production build (3000)

# Testing
npm pack                # Create test package
npm install -g ./file.tgz    # Test install
markdown-slides --help  # Test CLI

# Publishing
npm login               # Login to npm
npm publish             # Publish to npm
npm version patch       # Bump version

# Using
npx markdown-slides-presenter         # Run without install
npm install -g markdown-slides-presenter  # Install globally
markdown-slides         # Run installed version
```

---

## 🎬 YOUR NEXT STEPS

1. **Test locally first**:
   ```bash
   npm run dev
   ```
   Open http://localhost:5173 and play with the app

2. **Test production build**:
   ```bash
   npm run build
   npm run start
   ```
   Open http://localhost:3000 and verify everything works

3. **When ready to publish**:
   ```bash
   npm login
   npm publish
   ```

4. **Test the published package**:
   ```bash
   npx markdown-slides-presenter
   ```

---

## 📚 MORE DOCUMENTATION

If you need more details:

- **[QUICKSTART_LOCAL_AND_NPM.md](./QUICKSTART_LOCAL_AND_NPM.md)** - Quick reference guide
- **[TESTING_AND_LOCAL_DEPLOYMENT.md](./TESTING_AND_LOCAL_DEPLOYMENT.md)** - Comprehensive testing guide
- **[NPM_PUBLISHING_GUIDE.md](./NPM_PUBLISHING_GUIDE.md)** - Detailed publishing guide
- **[README.md](./README.md)** - Full project documentation

---

## ❓ NEED HELP?

If you run into issues:

1. Check the troubleshooting section above
2. Read the detailed guides mentioned above
3. Check npm documentation: https://docs.npmjs.com/
4. Open an issue on GitHub

---

**You're all set! Start with `npm run dev` to see your app running locally.** 🚀

Good luck with your deployment!
