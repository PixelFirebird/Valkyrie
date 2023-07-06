# Download Vagrant file
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/PixelFirebird/Valkyrie/main/Vagrantfile" -OutFile ".\Vagrantfile"

# Start Vagrant
vagrant up
