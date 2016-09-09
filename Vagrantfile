# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.box = "ubuntu/trusty64"
    config.vm.network :forwarded_port, guest: 80, host: 4000
    config.vm.provision :shell, :path => "install.sh"
    config.vm.synced_folder ".", "/var/www"
    config.vm.synced_folder ".",
                            "/site",
                            { :mount_options => [ "dmode=777", "fmode=777" ],
                              :owner => "vagrant",
                              :group => "www-data" }

    config.vm.provider :virtualbox do |v|
        v.customize ["modifyvm", :id, "--memory", 1024]
        v.customize ['modifyvm', :id, '--natdnshostresolver1', 'on']
        v.customize ['modifyvm', :id, '--natdnsproxy1', 'on']
    end

end


