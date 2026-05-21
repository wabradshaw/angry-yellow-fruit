# Build the app and zip app + server for upload to EC2.
# Run from repo root:  .\scripts\package-deploy.ps1
#
# If npm fails with EPERM on esbuild.exe, stop the Vite dev server (npm start)
# and close anything using app/node_modules, then run again.
# Use -FreshInstall only when you need to reinstall app dependencies.

param(
    [switch]$FreshInstall
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path $PSScriptRoot -Parent
Set-Location $repoRoot

$appDir = Join-Path $repoRoot "app"
$serverDir = Join-Path $repoRoot "server"
$stagingDir = Join-Path $repoRoot "deploy-staging"
$zipPath = Join-Path $repoRoot "ayf.zip"

if (-not (Test-Path $appDir) -or -not (Test-Path $serverDir)) {
    throw "Run this script from the angry-yellow-fruit repo (app/ and server/ must exist)."
}

Write-Host "==> Preparing production env for app build..."
$envExample = Join-Path $appDir ".env.production.example"
$envProd = Join-Path $appDir ".env.production"
if (-not (Test-Path $envProd)) {
    if (-not (Test-Path $envExample)) {
        throw "Missing app/.env.production.example"
    }
    Copy-Item $envExample $envProd
    Write-Host "    Created app/.env.production from example."
}

$nodeModules = Join-Path $appDir "node_modules"
$viteCmd = Join-Path $appDir "node_modules\vite\bin\vite.js"
$viteRunning = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue |
    Where-Object { $_.State -eq "Listen" }
if ($viteRunning) {
    Write-Host "WARNING: Something is listening on port 3000 (likely npm start / Vite)."
    Write-Host "         Stop it before packaging or npm may fail with EPERM on esbuild.exe."
}

function Install-AppDependencies {
    param([string]$Mode)
    Write-Host "    Installing dependencies ($Mode)..."
    Push-Location $appDir
    try {
        if ($Mode -eq "ci") {
            npm ci
        } else {
            npm install
        }
        if ($LASTEXITCODE -ne 0) {
            throw @"
npm $Mode failed in app/. Stop 'npm start', close editors using node_modules, then retry.
"@
        }
    } finally {
        Pop-Location
    }
}

Write-Host "==> Building app..."
Push-Location $appDir
try {
    if ($FreshInstall) {
        Install-AppDependencies -Mode "ci"
    } elseif (-not (Test-Path $nodeModules) -or -not (Test-Path $viteCmd)) {
        Write-Host "    node_modules missing or incomplete; running npm install..."
        Install-AppDependencies -Mode "install"
    } else {
        Write-Host "    Using existing node_modules. Pass -FreshInstall for npm ci."
    }

    if (-not (Test-Path $viteCmd)) {
        throw "vite still missing after install. Check app/package.json and npm output."
    }

    Write-Host "    Running production build..."
    node $viteCmd build
    if ($LASTEXITCODE -ne 0) { throw "vite build failed in app/" }
} finally {
    Pop-Location
}

if (-not (Test-Path (Join-Path $appDir "dist\index.html"))) {
    throw "Build did not produce app/dist/index.html"
}

Write-Host "==> Staging deploy bundle..."
if (Test-Path $stagingDir) {
    Remove-Item $stagingDir -Recurse -Force
}
New-Item -ItemType Directory -Path $stagingDir | Out-Null

function Copy-TreeExcluded {
    param(
        [string]$Source,
        [string]$Dest,
        [string[]]$ExcludeDirNames = @("node_modules", ".git")
    )
    $excludePattern = ($ExcludeDirNames | ForEach-Object { 
        [System.IO.Path]::Combine($Source, $_) 
    })
    Get-ChildItem -Path $Source -Recurse -Force | ForEach-Object {
        $relative = $_.FullName.Substring($Source.Length).TrimStart("\", "/")
        $skip = $false
        foreach ($name in $ExcludeDirNames) {
            if ($relative -eq $name -or $relative.StartsWith("$name\") -or $relative.StartsWith("$name/")) {
                $skip = $true
                break
            }
        }
        if ($skip) { return }

        $target = Join-Path $Dest $relative
        if ($_.PSIsContainer) {
            New-Item -ItemType Directory -Path $target -Force | Out-Null
        } else {
            $parent = Split-Path $target -Parent
            if (-not (Test-Path $parent)) {
                New-Item -ItemType Directory -Path $parent -Force | Out-Null
            }
            Copy-Item $_.FullName $target -Force
        }
    }
}

New-Item -ItemType Directory -Path (Join-Path $stagingDir "app") -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $stagingDir "server") -Force | Out-Null
Copy-TreeExcluded -Source $appDir -Dest (Join-Path $stagingDir "app")
Copy-TreeExcluded -Source $serverDir -Dest (Join-Path $stagingDir "server")

@(
    (Join-Path $stagingDir "server\.env"),
    (Join-Path $stagingDir "app\.env"),
    (Join-Path $stagingDir "app\.env.local"),
    (Join-Path $stagingDir "app\.env.production")
) | ForEach-Object {
    if (Test-Path $_) { Remove-Item $_ -Force }
}

Write-Host "==> Creating ayf.zip (Unix paths via tar)..."
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}
Push-Location $stagingDir
try {
    tar.exe -acf $zipPath *
    if ($LASTEXITCODE -ne 0) {
        throw "tar failed to create ayf.zip (is tar available? Windows 10+ includes it.)"
    }
} finally {
    Pop-Location
}

Remove-Item $stagingDir -Recurse -Force

Write-Host ""
Write-Host "Done: $zipPath"
Write-Host "Upload ayf.zip to EC2 staging, then from ~/web run:"
Write-Host "  bash ../angry-yellow-fruit/scripts/install.sh"
