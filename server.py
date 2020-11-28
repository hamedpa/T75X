import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
ip = '192.168.235.134'
s.bind((ip, 1234))
s.listen(5)


clientsocket, address = s.accept()
print(f"Connection from {address} has been established.")
while True:
    # now our endpoint knows about the OTHER endpoint.
    try:
        data = input('>>>')
        clientsocket.send(data.encode('utf-8'))

        msg = clientsocket.recv(1024)
        print(msg.decode('utf-8'))
    except ConnectionResetError:
        clientsocket, address = s.accept()






