$action = New-ScheduledTaskAction -Execute "C:\Program Files\nodejs\node.exe" -Argument "server.js" -WorkingDirectory "c:\Users\micha\OneDrive\Desktop\ANTIGRAVITY PROJECTS\Central Command Hub"
$trigger = New-ScheduledTaskTrigger -AtLogOn
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -RestartCount 5 -RestartInterval (New-TimeSpan -Minutes 1)
Register-ScheduledTask -TaskName "CentralCommandHubServer" -Action $action -Trigger $trigger -Settings $settings -Force
Write-Host "CentralCommandHubServer registered successfully in Windows Task Scheduler."
