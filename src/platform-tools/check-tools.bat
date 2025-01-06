@echo off
REM Check for clip (Windows)
where clip >nul 2>&1
if %errorlevel% neq 0 (
    echo Clip tool is already available on Windows.
)