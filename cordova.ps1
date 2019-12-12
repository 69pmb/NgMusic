$dir = Get-Location
Set-Variable -Name "workspace" -Value "C:\DEV\workspace\NgMusic"
$apkDir = $workspace + "\cordova\NgMusic\platforms\android\app\build\outputs\apk\debug"
Set-Variable -Name "outputDir" -Value "C:\Users\PBR\Dropbox\Documents\Dev Perso"

cd $workspace

yarn cordova
rm -r -fo cordova\NgMusic\www
mkdir cordova\NgMusic\www
xcopy /s dist cordova\NgMusic\www
cd cordova\NgMusic
cordova build android

$newName = "NgMusic_" + (Get-Date -UFormat '%Y.%m.%dT%H.%M.%S') + ".apk"
Rename-Item -Path ($apkDir + "\app-debug.apk") -NewName $newName
Move-Item ($apkDir + "\" + $newName) -Destination $outputDir -force

if((Get-Item ($outputDir + "\" + $newName)).length -lt 300KB) {
	Write-Host "AN ERROR OCCURRED" -ForegroundColor Red
} else {
	Write-Host "APK SUCCESSFULLY GENERATED" -ForegroundColor Green
}
cd $dir
pause
