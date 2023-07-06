# Download Vagrant file
Invoke-WebRequest -Uri "https://my-website.com/vagrantfile" -OutFile ".\Vagrantfile"

# Create necessary directories if they don't exist
if (!(Test-Path -Path ".\mevn-app\client")) {
    New-Item -ItemType Directory -Path ".\mevn-app\client"
}
if (!(Test-Path -Path ".\mevn-app\server")) {
    New-Item -ItemType Directory -Path ".\mevn-app\server"
}

# Start Vagrant
vagrant up
