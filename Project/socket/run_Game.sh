#!/bin/bash
npm i pm2 -g
pm2 start client.py --interpreter=python3
python3 game.py 
