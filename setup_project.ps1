# PowerShell Script to setup project structure and virtual environment based on PROJECT_CONTEXT.md

Write-Host "Starting Project Setup..." -ForegroundColor Cyan

# 1. Create Directory Structure
$directories = @(
    "backend\app\core",
    "backend\app\api",
    "backend\app\schemas",
    "backend\app\services",
    "backend\app\db",
    "frontend\src\components",
    "frontend\src\pages",
    "frontend\src\hooks",
    "frontend\src\api",
    "docs\prompts",
    "docs\reports",
    "docs\guides"
)

foreach ($dir in $directories) {
    if (-not (Test-Path -Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "Created directory: $dir" -ForegroundColor Green
    }
}

# 2. Create Files (Empty __init__.py and placeholders)
$files = @(
    "backend\app\__init__.py",
    "backend\app\main.py",
    "backend\app\core\__init__.py",
    "backend\app\api\__init__.py",
    "backend\app\schemas\__init__.py",
    "backend\app\services\__init__.py",
    "backend\app\db\__init__.py",
    "frontend\src\App.tsx",
    "frontend\vite.config.ts",
    ".env",
    "backend\.env"
)

foreach ($file in $files) {
    if (-not (Test-Path -Path $file)) {
        New-Item -ItemType File -Path $file -Force | Out-Null
        Write-Host "Created file: $file" -ForegroundColor Green
    }
}

# 3. Create Backend requirements.txt
$requirementsContent = @"
fastapi
uvicorn
pydantic
pydantic-settings
ssqlalchemy
httpx
python-dotenv
openai
"@
Set-Content -Path "backend\requirements.txt" -Value $requirementsContent
Write-Host "Created backend\requirements.txt" -ForegroundColor Green

# 4. Create .env Template content
$envContent = @"
# Backend
OPENAI_API_KEY="sk-..."
NEWS_API_KEY="..."
DATABASE_URL="sqlite:///./news_insight.db"

# Frontend
VITE_API_BASE_URL="http://localhost:8000/api/v1"
"@
Set-Content -Path "backend\.env" -Value $envContent
Set-Content -Path ".env" -Value $envContent # Copy to root as well for reference
Write-Host "Created .env templates" -ForegroundColor Green

# 5. Setup Python Virtual Environment
Write-Host "Setting up Python virtual environment in backend/venv..." -ForegroundColor Cyan

Push-Location backend
try {
    # Check if python is available
    $pythonCmd = Get-Command python -ErrorAction SilentlyContinue
    if ($null -eq $pythonCmd) {
        Write-Host "Error: 'python' command not found. Please ensure Python is installed and added to PATH." -ForegroundColor Red
    } else {
        python -m venv venv
        if (Test-Path "venv") {
            Write-Host "Virtual environment created successfully." -ForegroundColor Green
            Write-Host "To activate: .\backend\venv\Scripts\Activate.ps1" -ForegroundColor Yellow
            
            # Optional: Install requirements
            # .\venv\Scripts\python.exe -m pip install -r requirements.txt
            # Write-Host "Dependencies installed." -ForegroundColor Green
        } else {
            Write-Host "Failed to create virtual environment." -ForegroundColor Red
        }
    }
} finally {
    Pop-Location
}

Write-Host "Project setup complete!" -ForegroundColor Cyan
