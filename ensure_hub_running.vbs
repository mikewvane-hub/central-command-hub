Set WshShell = CreateObject("WScript.Shell")
Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")

' 1. Check if port 4000 is already listening
Dim portResult
portResult = WshShell.Run("cmd.exe /c netstat -ano | findstr "":4000 "" | findstr ""LISTENING""", 0, True)

If portResult <> 0 Then
    WshShell.CurrentDirectory = "c:\Users\micha\OneDrive\Desktop\ANTIGRAVITY PROJECTS\Central Command Hub"
    WshShell.Run "cmd.exe /c start /b node server.js >> hub_watchdog.log 2>&1", 0, False
End If
