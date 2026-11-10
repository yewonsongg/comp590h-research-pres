$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$archivePath = Join-Path $projectRoot 'agentic-reasoning-offline.zip'
$items = @('index.html', 'styles.css', 'slides.js', 'app.js', 'assets', 'presentation.pdf', 'speaker-notes.md', 'presentation-script.txt', 'summary.md', 'bibliography.md', 'README.md', 'package.json')
$paths = $items | ForEach-Object { Join-Path $projectRoot $_ }
foreach ($item in $paths) { if (-not (Test-Path -LiteralPath $item)) { throw "Missing package file: $item" } }
Compress-Archive -LiteralPath $paths -DestinationPath $archivePath -Force
Add-Type -AssemblyName System.IO.Compression.FileSystem
$archive = [System.IO.Compression.ZipFile]::Open($archivePath, [System.IO.Compression.ZipArchiveMode]::Update)
try {
  foreach ($name in @('report.json', 'verify.mjs', 'export-notes.mjs', 'package.ps1', 'package-check.mjs')) {
    $file = Join-Path $PSScriptRoot $name
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $file, "qa/$name", [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
  }
} finally { $archive.Dispose() }
Get-Item -LiteralPath $archivePath | Select-Object Name, Length
