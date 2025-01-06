# Check for clip (Windows)
if (-not (Get-Command clip -ErrorAction SilentlyContinue)) {
    Write-Host "Clip tool is already available on Windows."
}