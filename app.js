var express = require('express');
var app = express();
var util = require('util')
var path = require('path');
var routes = require('./routes');
var dotenv = require('dotenv');
dotenv.load();

var CronJob = require('cron').CronJob;
var job = new CronJob('* */1 * * *', function() {
    var request = require('request');
    var graph = require('fbgraph');
    graph.setAccessToken(process.env.APP_TOKEN);
    graph.get("/352596331515937/photos?limit=80", {fields: 'images, name'}, function(err, res) {
        if (res) {
            gallerypics = res.data;
        } else {
            console.log("Error: " + err);
        }
    });
    }, function () {
        console.log("Cron ran!");
    },
    true
);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Routes imported from ./routes
app.get('/', routes.index);
app.get('/lakes', routes.lakes);
app.get('/facilities', routes.facilities);
app.get('/package', routes.package);
app.get('/rules', routes.rules);
app.get('/contact', routes.contact);
app.get('/booking', routes.booking);
app.get('/bookingformthanks', routes.bookingformthanks);
app.get('/contactpagethanks', routes.contactpagethanks);

app.get('/gallery', function(req, res) {
    res.render('gallery', {title: 'Gallery', pagename: 'pageGallery', gallerypics});
});

// 404 Response
app.get('*', function(req, res) {
    res.send('404 Cannot Find That Content.');
});

var server = app.listen(80, process.env.DROPLET_IP, function() {
    console.log('Listening on: ' + process.env.DROPLET_IP);
});
