// when applications gets request that points to homepage
exports.index = function(req, res) {
    // Render contents of views/default.ejs
    res.render('default', {title: 'Home', pagename: 'pageHome'});
}

exports.lakes = function(req, res) {
    res.render('lakes', {title: 'Lakes', pagename: 'pageLakes'});
}

exports.facilities = function(req, res) {
    res.render('facilities', {title: 'Facilities', pagename: 'pageFacilities'});
}

exports.package = function(req, res) {
    res.render('package', {title: 'Package', pagename: 'pagePackage'});
}

exports.rules = function(req, res) {
    res.render('rules', {title: 'Rules', pagename: 'pageRules'});
}

exports.booking = function(req, res) {
    res.render('booking', {title: 'Booking', pagename: 'pageBooking'});
}
exports.bookingformthanks = function(req, res) {
    res.render('bookingformthanks', {title: 'Booking', pagename: 'pageHome'});
}

exports.contactpagethanks = function(req, res) {
    res.render('contactpagethanks', {title: 'Contact', pagename: 'pageHome'});
}
