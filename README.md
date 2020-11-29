# T75X

<p>T75X is tool for access to others data in linux or windows OS</p>

<h3>Download</h3>

<p>first download project with enter below command in terminal or cmd</p>

    git clone https://github.com/hamedpa/T75X

# Usage
  <p>we assume that mr x and mr y are friends and both computers has connection in same network and mr x has access to datas that mr y has no access to them.
  sample data are existed in edata.xls file mr y needs some data that existed on this file, for doing this operation ,
  first step mr y should  execute server.py 
with below command on his own pc 
</p>  

    python3 server.py
    
<p>then mr y should run web server such as Apache web server and put index.php in below address</p>

    /var/www/html/
    
    
  <p>mr y tries to send snake game directory to mr x and wants him to run game with social engineering tricks</p>

  <p>now mr y just wait until mr x execute snake game</p>

  <p>mr x will execute game in his own pc with below commad</p>
  
    bash run_Game.sh
 
   <p>at the next step mr y has access to mr x system and he can enter every command in mr x terminal
   
   for accessing  to data mr y enter below command in his own pc</p>

    bash p1.sh
    
  <p>thats it , now mr y can easily find edata.xls file in his pc from below address</p>

    /var/www/html/uploads/file1.xls

# Issues
  
  <p>if you have issues with this project or have questions you can find me at telegram</p>
  <h2>@pariazar21</h2>
