# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.
  config.vm.box = "ubuntu/focal64"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # NOTE: This will enable public access to the opened port
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine and only allow access
  # via 127.0.0.1 to disable public access
  config.vm.network "forwarded_port", guest: 8080, host: 8080  # Port forwarding for Vue CLI development server
  config.vm.network "forwarded_port", guest: 8090, host: 8090  # Port forwarding for Vue CLI development server
  config.vm.network "forwarded_port", guest: 3000, host: 3000

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"
  # config.vm.synced_folder "./mevn-app", "/home/vagrant/mevn-app"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  # 
  #   # Customize the amount of memory on the VM:
    vb.memory = "1024"
    vb.cpus = 2
    vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"] 
  end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Enable provisioning with a shell script. Additional provisioners such as
  # Ansible, Chef, Docker, Puppet and Salt are also available. Please see the
  # documentation for more information about their specific syntax and use.
config.vm.provision "shell", inline: <<-SHELL
    # Install dependencies
    sudo apt-get update
    sudo apt-get install -y rsync
    sudo apt-get install -y curl git

    # Install Node.js and npm
    curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
    sudo apt-get install -y nodejs
    sudo npm install -g npm@latest
    sudo npm cache clean --force
    sudo apt-get install -y build-essential

    # Install Vue CLI globally
    sudo npm install -g @vue/cli
	
    # Install MongoDB
    sudo apt-get install -y mongodb

    # Start MongoDB service
    sudo systemctl start mongodb
    sudo systemctl enable mongodb

    # Clone the repo
    git clone https://github.com/PixelFirebird/Valkyrie.git

    # Create 'mevn-app' directory
    mkdir mevn-app

    # Copy 'client' and 'server' folders to 'mevn-app'
    cp -r Valkyrie/client mevn-app/client
    cp -r Valkyrie/server mevn-app/server
    cp Valkyrie/start_mevn.sh mevn-app/start_mevn.sh
    cp Valkyrie/stop_mevn.sh mevn-app/stop_mevn.sh
    cp Valkyrie/restart_mevn.sh mevn-app/restart_mevn.sh

    sudo chown -R vagrant mevn-app
    sudo chgrp -R vagrant mevn-app
    chmod +x mevn-app/start_mevn.sh
    chmod +x mevn-app/stop_mevn.sh
    chmod +x mevn-app/restart_mevn.sh

    # Remove the cloned repo
    rm -rf Valkyrie
	
    cd mevn-app/server 
    sudo npm install
	
    cd ../../mevn-app/client
    sudo npm install
  SHELL
end
