document.addEventListener("DOMContentLoaded", function(event) {
    var navLinks = document.querySelector("#navLinks");
    var navToggle = document.querySelector("#navToggle");

    navToggle.addEventListener("click", function() {
        navLinks.classList.toggle("visible");
    });

    // Reverse order listing by default on gallery so new
    // photos are added to the top of the page.
    var pageGallery = document.querySelector("#pageGallery");
    if (pageGallery) {
        var catches = document.querySelector("#catchPhotos");
        var i = catches.childNodes.length;
        while (i--)
            catches.appendChild(catches.childNodes[i]);
    }
});
