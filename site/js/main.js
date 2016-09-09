'use strict';

var Slideshow = require('./slideshow'),
    Navigation = require('./navigation');

function main() {
    var tapestries, slideshow, navigation;

    tapestries = document.querySelectorAll('.tapestry');
    tapestries = Array.prototype.slice.call(tapestries);

    tapestries.forEach(function(tapestry) {
        slideshow = new Slideshow(tapestry);
        slideshow.setup();
        slideshow.slide();
    });

    navigation = new Navigation(document.querySelectorAll('.nav-item'),
                                document.querySelectorAll('.page'));

}

main();
