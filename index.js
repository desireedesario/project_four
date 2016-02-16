var express         = require('express'),
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
    cors            = require('cors')

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

