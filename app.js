
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'TumblrThis'
  });
});

app.get('/walkthrough', function(req, res){
  res.render('walkthrough', {
    title: 'Custom Template Walk Through',
    layout: 'walkthrough_layout.jade'
  });
});

var port = process.env.PORT || 4000;
app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
