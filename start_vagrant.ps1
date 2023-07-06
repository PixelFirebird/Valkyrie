# Download Vagrant file
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/PixelFirebird/Valkyrie/main/Vagrantfile" -OutFile ".\Vagrantfile"

# Create synced folder
if (!(Test-Path -Path .\mevn-app)) {
    New-Item -ItemType Directory -Path .\mevn-app
}

# Start Vagrant
vagrant up
