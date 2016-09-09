sudo apt-get update -y
sudo apt-get install -y python-software-properties
sudo add-apt-repository -y ppa:ondrej/php

sudo apt-get update -y
sudo apt-get upgrade -y

sudo apt-get install -y apache2 curl

sudo apt-get install -y php5.6 libapache2-mod-php5.6 php5-common php5.6-curl php5.6-gd php5.6-xdebug php5.6-mbstring


cat > /etc/apache2/sites-available/site.conf <<VHOST
<VirtualHost *:80>
    DocumentRoot /site
    ServerName 127.0.0.1
    ServerAlias localhost
    ServerAlias gui.local
    <Directory /site>
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
VHOST

sudo a2enmod rewrite
sudo a2ensite site.conf
sudo rm -rf /site/html

sed -i "s/error_reporting = .*/error_reporting = E_ALL/" /etc/php5/apache2/php.ini
sed -i "s/display_errors = .*/display_errors = On/" /etc/php5/apache2/php.ini

sudo service apache2 restart
