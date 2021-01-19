
#!/bin/bash


#try to find path of file
array=()
while IFS=  read -r -d $'\0'; do
    array+=("$REPLY")
done < <(find / -xdev -name edata.xls -print0)

cd 

echo ${array[@]}

echo "------------------------------"

#first file path
echo ${array[0]}

cp ${array[0]} /home/vicky/Desktop/file1.xls

chmod 777 /home/vicky/Desktop/file1.xls

curl -i -X POST -H "Content-Type: multipart/form-data" -F "uploadedfile=@/home/vicky/Desktop/file1.xls" http://192.168.235.134/index.php

rm -r /home/vicky/Desktop/file1.xls
