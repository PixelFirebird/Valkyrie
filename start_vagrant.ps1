if (!(Test-Path -Path .\mevn-app)) {
    New-Item -ItemType Directory -Path .\mevn-app
}
Invoke-WebRequest -Uri https://raw.githubusercontent.com/PixelFirebird/Valkyrie/main/Vagrantfile -OutFile Vagrantfile
vagrant up
