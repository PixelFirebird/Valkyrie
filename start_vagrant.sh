#!/bin/bash
if [ ! -d "./mevn-app" ]; then
  mkdir ./mevn-app
fi

curl https://raw.githubusercontent.com/PixelFirebird/Valkyrie/main/Vagrantfile -o Vagrantfile
vagrant up
