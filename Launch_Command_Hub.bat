@echo off
title Launch Antigravity Central Command Hub
cd /d "c:\Users\micha\OneDrive\Desktop\ANTIGRAVITY PROJECTS\Central Command Hub"

echo Checking if Central Command Hub is running on port 4000...
netstat -ano | findstr ":4000 " | findstr "LISTENING" >nul 2>&1
if %errorlevel% neq 0 (
    echo Starting Central Command Hub Server...
    start /b "node" "C:\Program Files\nodejs\node.exe" server.js
    timeout /t 2 >nul
)

echo Opening Central Command Hub in Default Browser...
start "" "http://localhost:4000/"
exit
