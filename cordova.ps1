# Set Java to 1.8
Set-Variable -Name JAVA_HOME -Value "C:\Javatools\java\jdk1.8.0_11\bin;"
Set-Item -path env:path -force -value ($JAVA_HOME + $env:path) 
java -version

# Variables
$dir = Get-Location
Set-Variable -Name "workspace" -Value "C:\workspace\NgMusic"
$apkDir = $workspace + "\cordova\NgMusic\platforms\android\app\build\outputs\apk\debug"
Set-Variable -Name "outputDir" -Value "C:\Utilisateurs\a756122\Downloads"

cd $workspace

# build app, move it in /cordova and build apk
yarn cordova
rm -r -fo cordova\NgMusic\www
mkdir cordova\NgMusic\www
xcopy /s dist cordova\NgMusic\www
cd cordova\NgMusic
cordova build android

# Rename and move apk
$newName = "NgMusic_" + (Get-Date -UFormat '%Y.%m.%dT%H.%M.%S') + ".apk"
Rename-Item -Path ($apkDir + "\app-debug.apk") -NewName $newName
Move-Item ($apkDir + "\" + $newName) -Destination $outputDir -force

# Test result
if((Get-Item ($outputDir + "\" + $newName)).length -lt 300KB) {
	Write-Host "AN ERROR OCCURRED" -ForegroundColor Red
} else {
	Write-Host "APK SUCCESSFULLY GENERATED" -ForegroundColor Green
}
cd $dir
pause
