# PowerShell script to commit, push, and verify deployment for the Financial Assistant app
# Usage: Run from the project root in PowerShell

param(
    [string]$CommitMessage = "chore: complete phase 1 and trigger deployment"
)

Write-Host "\n--- Financial Assistant: Push & Deploy Script ---\n" -ForegroundColor Cyan

# Ensure git is available
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error "Git is not installed or not in PATH. Please install Git first."
    exit 1
}

# Ensure working directory is clean
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "Staging all changes..." -ForegroundColor Yellow
    git add .
    Write-Host "Committing changes..." -ForegroundColor Yellow
    git commit -m $CommitMessage
} else {
    Write-Host "No changes to commit." -ForegroundColor Green
}

Write-Host "Pushing to origin/main..." -ForegroundColor Yellow
git push origin main

Write-Host "\nWaiting for GitHub Actions and Vercel deployment..." -ForegroundColor Cyan
Write-Host "Check your repository's Actions tab and Vercel dashboard for deployment status." -ForegroundColor Cyan
Write-Host "\n--- Script complete ---\n" -ForegroundColor Green
