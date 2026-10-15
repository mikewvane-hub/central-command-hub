@echo off
title Antigravity Central Command Hub (Port 4000)
cd /d "c:\Users\micha\OneDrive\Desktop\ANTIGRAVITY PROJECTS\Central Command Hub"

:loop
netstat -ano | findstr ":4000 " | findstr "LISTENING" >nul 2>&1
if %errorlevel% equ 0 (
    timeout /t 10 /nobreak >nul
    goto loop
)

echo [%date% %time%] Starting Antigravity Central Command Hub on port 4000... >> "hub_watchdog.log"
"C:\Program Files\nodejs\node.exe" server.js >> "hub_watchdog.log" 2>&1

timeout /t 3 /nobreak >nul
goto loop
