document.addEventListener("DOMContentLoaded", function(event) {
    // var navLinks = document.querySelector("#navLinks");
    // var navToggle = document.querySelector("#navToggle");

    // navToggle.addEventListener("click", function() {
    //     navLinks.classList.toggle("visible");
    // });

    // Reverse order listing by default on gallery so new
    // photos are added to the top of the page.
    var pageGallery = document.querySelector("#pageGallery");
    if (pageGallery) {
        var catches = document.querySelector("#catchPhotos");
        var i = catches.childNodes.length;
        while (i--)
            catches.appendChild(catches.childNodes[i]);
    }

    //var pageBooking = document.querySelector("#pageBooking");
    //if (pageBooking) {
    //    var bookingSubmit = document.querySelector("#form_submit");
    //    bookingSubmit.addEventListener("click", function(e) {
    //        e.preventDefault();
    //
    //        var wantedYes = document.querySelector("#booking_boatyes").checked;
    //        var wantedNo = document.querySelector("#booking_boatno").checked;
    //        console.log(wantedYes);
    //        console.log(wantedNo);
    //    });
    //}

    //var pageContact = document.querySelector("#pageContact");
    //if (pageContact) {
    //    var contactName = document.querySelector("#form_name");
    //    var contactEmail = document.querySelector("#form_email");
    //    var contactMessage = document.querySelector("#form_message");
    //    var contactSubmit = document.querySelector("#form_submit");
    //
    //    contactSubmit.addEventListener("click", function(e) {
    //        e.preventDefault();
    //        contactName = contactName.value;
    //        contactEmail = contactEmail.value;
    //        contactMessage = contactMessage.value;
    //    });
    //}
});
