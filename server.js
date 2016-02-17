var 
  express         = require('express'),
  app             = express(),
  mongoose        = require('mongoose'),
  logger          = require('morgan'),
  bodyParser      = require('body-parser'),
  cookieParser    = require('cookie-parser'),
  path            = require('path'),
  aws             = require('aws-sdk'),
  methodOverride  = require('method-override'),
  port            = process.env.PORT || 3000,
  mongoUri        = process.env.MONGOLAB_URI || ('mongodb://localhost/project_four'),
  cors            = require('cors'),
  apiRouter       = require('./routes/api.js'),
  AWS_ACCESS_KEY  = process.env.AWS_ACCESS_KEY,
  AWS_SECRET_KEY  = process.env.AWS_SECRET_KEY,
  S3_BUCKET       = process.env.S3_BUCKET

//set mongo database
mongoose.connect(mongoUri, function(err){
  if(err) throw err
  console.log('Connected to MongoDB')
});

//enable cors
app.use(cors());

app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({extended: true}))
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req,res){
  console.log('getting index?')
  res.render('index')
})

app.get('/sign_s3', function(req, res){
    aws.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY });
    aws.config.update({region: '' , signatureVersion: '' });
    var s3 = new aws.S3(); 
    console.log(S3_BUCKET)
    var s3_params = { 
        Bucket: S3_BUCKET, 
        Key: req.query.file_name, 
        Expires: 60, 
        ContentType: req.query.file_type, 
        ACL: 'public-read'
    }; 
    s3.getSignedUrl('putObject', s3_params, function(err, data){ 
        if(err){ 
            console.log(err); 
        }
        else{ 
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name 
            };
            res.write(JSON.stringify(return_data));
            res.end();
        } 
    });
});

app.use('/api', apiRouter)

app.listen(port, function(){
  console.log('Server Listening on port...' + port)
})