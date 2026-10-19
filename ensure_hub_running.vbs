Set WshShell = CreateObject("WScript.Shell")

Dim portResult
portResult = WshShell.Run("cmd.exe /c netstat -ano | findstr "":4000 "" | findstr ""LISTENING""", 0, True)

If portResult <> 0 Then
    WshShell.CurrentDirectory = "c:\Users\micha\OneDrive\Desktop\ANTIGRAVITY PROJECTS\Central Command Hub"
    WshShell.Run "cmd.exe /c node server.js >> hub_server.log 2>&1", 0, False
End If
