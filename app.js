var express = require('express');
var app = express();
var util = require('util')
var path = require('path');
var routes = require('./routes');
var dotenv = require('dotenv');
dotenv.load();
var bodyParser = require('body-parser')

// Node Mailer
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes imported from ./routes
app.get('/', routes.index);
app.get('/lakes', routes.lakes);
app.get('/facilities', routes.facilities);
app.get('/package', routes.package);
app.get('/rules', routes.rules);
app.get('/booking', routes.booking);
app.get('/bookingformthanks', routes.bookingformthanks);
app.get('/contactpagethanks', routes.contactpagethanks);

// Gallery route directly embedded for FB API use.
app.get('/gallery', function(req, res) {
    res.render('gallery', {title: 'Gallery', pagename: 'pageGallery', gallerypics});
});

// Contact route directly embedded for mailer use.
app.get('/contact', function(req, res) {
    res.render('contact', {title: 'Contact', pagename: 'pageContact'});
});

// Process Contact Form Submissions
app.post('/contact', function(req, res) {
    var options = {
        auth: {
            api_key: process.env.ANGEL_SENDGRID
        }
    }
    var mailer = nodemailer.createTransport(sgTransport(options));
    mailOpts = {
        from: {
            name: req.body.form_name,
            address: req.body.form_email
        },
        to: process.env.ANGEL_EMAIL,
        subject: 'Angel Lakes Contact Form',
        html: '<p><b>Name: </b> ' + req.body.form_name + '</p>' +
            '<p><b>Email: </b> ' + req.body.form_email + '</p>' +
            '<p><b>Message: </b> ' + req.body.form_message + '</p>'
    };
    mailer.sendMail(mailOpts, function (error, response) {
        if (error) {
            res.render('contact', {title: 'Contact', pagename: 'pageContact'});
            console.log("Error: " + error);
        }
        else {
            res.render('contactpagethanks', {title: 'Contact', pagename: 'pageHome'});
        }
    });
});

// Process Booking Form Submissions
app.post('/booking', function(req, res) {
    var options = {
        auth: {
            api_key: process.env.ANGEL_SENDGRID
        }
    }
    var mailer = nodemailer.createTransport(sgTransport(options));

    var boatYes = req.body.booking_boatyes;
    var boatNo = req.body.booking_boatno;
    if ( boatYes === "Yes" && boatNo === undefined ) {
        var boatOrder = "Yes, bait boat required.";
    } else {
        var boatOrder = "No, bait boat not needed.";
    }

    bookingOpts = {
        from: {
            name: req.body.booking_name,
            address: req.body.booking_email
        },
        to: process.env.ANGEL_EMAIL,
        subject: 'Angel Lakes Booking Form',
        html: '<h3>Contact Information</h3>' +
            '<p><b>Name: </b> ' + req.body.booking_name + '</p>' +
            '<p><b>Email: </b> ' + req.body.booking_email + '</p>' +
            '<p><b>Address: </b> ' + req.body.booking_address + '</p>' +
            '<p><b>Daytime Number: </b> ' + req.body.booking_daytime + '</p>' +
            '<p><b>Evening Number: </b> ' + req.body.booking_evening + '</p>' +
            '<br /><hr><br />' +
            '<h3>Payment Information</h3>' +
            '<p><b>Bait Boat: </b> ' + boatOrder + '</p>' +
            '<p><b>Total Cost: </b> ' + req.body.booking_total + '</p>' +
            '<p><b>Deposit Amount: </b> ' + req.body.booking_deposit + '</p>' +
            '<p><b>Balance: </b> ' + req.body.booking_balance + '</p>' +
            '<br /><hr><br />' +
            '<h3>Booking Details</h3>' +
            '<p><b>Arrival Date: </b> ' + req.body.booking_details_arrival + '</p>' +
            '<p><b>Flying From: </b> ' + req.body.booking_details_flyfrom + '</p>' +
            '<p><b>Flight Number: </b> ' + req.body.booking_details_flightnum + '</p>' +
            '<p><b>Departure Gate: </b> ' + req.body.booking_details_depdate + '</p>' +
            '<p><b>Number Of Fishing Guests: </b> ' + req.body.booking_details_fishnum + '</p>' +
            '<p><b>Non Fishing Guests: </b> ' + req.body.booking_details_nonfishnum + '</p>' +
            '<p><b>Names Of Guests: </b> ' + req.body.booking_guestnames + '</p>' +
            '<br /><hr><br />' +
            '<h3>Acceptance Information</h3>' +
            '<p><b>Your Name: </b> ' + req.body.booking_signame + '</p>' +
            '<p><b>Date Of Declaration: </b> ' + req.body.booking_sigdate + '</p>'
    };
    mailer.sendMail(bookingOpts, function (error, response) {
        if (error) {
            res.render('booking', {title: 'Booking', pagename: 'pageBooking'});
            console.log("Error: " + error);
        }
        else {
            res.render('bookingformthanks', {title: 'Booking', pagename: 'pageHome'});
        }
    });
});

// 404 Response
app.get('*', function(req, res) {
    res.send('404 Cannot Find That Content.');
});

// app.listen(80, process.env.DROPLET_IP, function()
// app.listen(3000, function()
var server = app.listen(80, process.env.DROPLET_IP, function() {
    console.log('Listening on: ' + process.env.DROPLET_IP);
});
