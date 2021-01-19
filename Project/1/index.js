const express = require('express')
const multer = require("multer") 
const path = require("path") 

const {spawn} = require('child_process');
const app = express()
const port = 3000
var imagesPath;
var RateLimit = require('express-rate-limit');


//Setting of Upload Frontend
// View Engine Setup 
app.set("views",path.join(__dirname,"views")) 
app.use(express.static(__dirname + '/public'));
var limiter = new RateLimit({
    windowMs: 15*60*1000, // 15 minutes
    max: 50, // limit each IP to 100 requests per windowMs
    delayMs: 0 // disable delaying - full speed until the max limit is reached
  });
   
  //  apply to all requests
app.use(limiter);
app.set("view engine","ejs") 
    
// var upload = multer({ dest: "Upload_folder_name" }) 
// If you do not want to use diskStorage then uncomment it 
    
var storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
  
        // Uploads is the Upload_folder_name 
        cb(null, "iscovid") 
    }, 
    filename: function (req, file, cb) { 
		imagesPath = file.fieldname + "-" + Date.now()+".jpg"
      cb(null, imagesPath) 
    } 
  }) 
       
// Define the maximum size for uploading 
// picture i.e. 1 MB. it is optional 
const maxSize = 1 * 1000 * 1000; 


var upload = multer({  
    storage: storage, 
    limits: { fileSize: maxSize }, 
    fileFilter: function (req, file, cb){ 
    
        // Set the filetypes, it is optional 
        var filetypes = /jpeg|jpg|png/; 
        var mimetype = filetypes.test(file.mimetype); 
  
        var extname = filetypes.test(path.extname( 
                    file.originalname).toLowerCase()); 
        
        if (mimetype && extname) { 
            return cb(null, true); 
        } 
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes); 
      }  
  
// mypic is the name of file attribute 
}).single("mypic");  

app.get("/",function(req,res){ 
    res.render("index"); 
}) 
app.get('/test', (req, res) => {
	res.render("test"); 

	
})



app.post("/uploadImage",function (req, res, next) { 
        
    // Error MiddleWare for multer file upload, so if any 
    // error occurs, the image would not be uploaded! 
    upload(req,res,function(err) { 
  
        if(err) { 
  
            // ERROR occured (here it can be occured due 
            // to uploading image of size greater than 
            // 1MB or uploading different file type) 
            res.send(err) 
        } 
        else { 
  
            // SUCCESS, image successfully uploaded 
			
			var dataToSend ;
			var largeDataSet = [];
			// spawn new child process to call the python script
			const python = spawn('python3', ['script10.py',imagesPath]);
			// collect data from script
			python.stdout.on('data', function (data) {
				console.log('Pipe data from python script ...');
				//dataToSend =  data;
				largeDataSet.push(data);
			});
		
			// in close event we are sure that stream is from child process is closed
			python.on('close', (code) => {
			console.log(`child process close all stdio with code ${code}`);
			// send data to browser
			res.render('result', { result: largeDataSet.join("") })
			});


        } 
    }) 
}) 



app.post("/upload",function (req, res, next) { 
        
    // Error MiddleWare for multer file upload, so if any 
    // error occurs, the image would not be uploaded! 
    upload(req,res,function(err) { 
  
        if(err) { 
  
            // ERROR occured (here it can be occured due 
            // to uploading image of size greater than 
            // 1MB or uploading different file type) 
            res.send(err) 
        } 
        else { 
  
            // SUCCESS, image successfully uploaded 
			
			var dataToSend ;
			var largeDataSet = [];
			// spawn new child process to call the python script
			const python = spawn('python3', ['script10.py',imagesPath]);
			// collect data from script
			python.stdout.on('data', function (data) {
				console.log('Pipe data from python script ...');
				//dataToSend =  data;
				largeDataSet.push(data);
			});
		
			// in close event we are sure that stream is from child process is closed
			python.on('close', (code) => {
			console.log(`child process close all stdio with code ${code}`);
			// send data to browser
            res.json({ ip: req.connection.remoteAddress.substring(7, req.connection.remoteAddress.length),
                date: new Date().toISOString().
                replace(/T/, ' ').      
                replace(/\..+/, ''),
                result: largeDataSet.join("") })

			});


        } 
    }) 
}) 
app.listen(port, () => console.log(`Example app listening on port 
${port}!`))
