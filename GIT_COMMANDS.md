# Git Commands to Push Portfolio to GitHub

## Step 1: Navigate to your project directory
```bash
cd portfolio-main/portfolio-main
```

## Step 2: Add all files to staging
```bash
git add .
```

## Step 3: Commit your changes
```bash
git commit -m "Add AURA project and enhance portfolio"
```

## Step 4: Create a new repository on GitHub
1. Go to https://github.com/new
2. Create a new repository (e.g., "portfolio")
3. **DO NOT** initialize with README, .gitignore, or license (since you already have files)

## Step 5: Connect to GitHub remote (replace YOUR_USERNAME and REPO_NAME)
```bash
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

## Step 6: Push to GitHub
```bash
git branch -M main
git push -u origin main
```

## If you already have a GitHub repository:
If you already have a remote repository set up, you can skip Step 4-5 and just use:
```bash
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

## Alternative: If you prefer SSH
```bash
git remote add origin git@github.com:YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

## For future updates:
After making changes, use:
```bash
git add .
git commit -m "Your commit message"
git push
```

