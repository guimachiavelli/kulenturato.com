(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./navigation":2,"./slideshow":3}],2:[function(require,module,exports){
'use strict';

function Navigation(navEls, pageEls) {
    this.navEls = navEls;
    this.pageEls = pageEls;
    this.bind();
    this.lastScroll = 0;
}

Navigation.prototype.bind = function() {
    document.addEventListener('scroll', this.onScroll.bind(this));
};

Navigation.prototype.onScroll = function() {
    var now, currentPage;

    now = new Date().getTime();

    if (now - this.lastScroll < 100) {
        return;
    }

    currentPage = this.pageOnScreen();

    this.selectNavItem(currentPage.id);

    this.lastScroll = now;
};

Navigation.prototype.pageOnScreen = function() {
    var i, len, el;

    for (i = 0, len = this.pageEls.length; i < len; i += 1) {
        el = this.pageEls[i];

        if (this.isElementOnScreen(el)) {
            return el;
        }
    }
};

Navigation.prototype.selectNavItem = function(pageId) {
    var el, i, len, selectedClass;

    selectedClass = ' nav-item__link--active';

    for (i = 0, len = this.navEls.length; i < len; i += 1) {
        el = this.navEls[i].querySelector('a');

        el.className = el.className.replace(selectedClass, '');

        if (this.linkHash(el.href) === pageId) {
            el.className += selectedClass;
        }
    }
};

Navigation.prototype.linkHash = function(linkHref) {
    var hashLocation;

    hashLocation = linkHref.indexOf('#');

    if (hashLocation < 0) {
        return;
    }

    return linkHref.substr(hashLocation + 1);
};

Navigation.prototype.isElementOnScreen = function(el) {
    var viewport = {}, bounds, winHeight, elHeight;

    winHeight = window.innerHeight;
    elHeight = el.clientHeight / 2;

    viewport.top = document.body.scrollTop;
    bounds = el.getBoundingClientRect();

    viewport.bottom = viewport.top + winHeight;

    return !(viewport.top < bounds.top + viewport.top - elHeight ||
             viewport.top > bounds.bottom + viewport.top - elHeight);
};

module.exports = Navigation;

},{}],3:[function(require,module,exports){
'use strict';

function Slideshow(el) {
    this.el = el;
    this.parentEl = this.ancestorNodeWithClassName(el, 'page');
    this.slideContainer = this.el.querySelector('.slider');
    this.slides = this.el.querySelectorAll('.tapestry-image');

    this.index = 0;
    this.interval = 5000;
    this.numberOfSlides = this.slides.length;
    this.originalNumberOfSlides = this.numberOfSlides;
    this.parentEl.className += ' page--active-slider';
}

Slideshow.prototype.setup = function() {
    var cachedLen, len, i;

    len = this.slides.length;
    cachedLen = len;
    i = 0;

    while (len < cachedLen * 3) {
        this.slideContainer.appendChild(this.slides[i].cloneNode(true));
        i += 1;
        if (i >= cachedLen) {
            i = 0;
        }
        len += 1;
    }

    this.slides = this.el.querySelectorAll('.tapestry-item');
    this.numberOfSlides = this.slides.length;
    this.el.appendChild(this.buttons());
};

Slideshow.prototype.buttons = function() {
    var buttonContainer, nextButton, previousButton;

    buttonContainer = document.createElement('div');
    buttonContainer.className = 'tapestry-nav';

    nextButton = document.createElement('button');
    nextButton.className = 'tapestry-nav__button tapestry-nav__button--next';
    nextButton.innerHTML = '>';
    nextButton.type = 'button';
    nextButton.addEventListener('click', this.slide.bind(this, 1));

    previousButton = document.createElement('button');
    previousButton.className = 'tapestry-nav__button tapestry-nav__button--previous';
    previousButton.innerHTML = '>';
    previousButton.type = 'button';
    previousButton.addEventListener('click', this.slide.bind(this, -1));

    buttonContainer.appendChild(nextButton);
    buttonContainer.appendChild(previousButton);

    this.nextButton = nextButton;
    this.previousButton = previousButton;

    return buttonContainer;
};

Slideshow.prototype.slide = function(direction) {
    direction = direction || 1;

    this.index += direction;

    if (this.index > this.originalNumberOfSlides * 2 || this.index < this.originalNumberOfSlides / 2) {
        this.resetSlide();
        setTimeout(this.slide.bind(this), 1);
        return;
    }

    this.go(this.index);

    //setTimeout(this.slide.bind(this), this.interval);
};

Slideshow.prototype.go = function(index) {
    var translate = (index * -100) + '%';
    this.slideContainer.style.transform = 'translateX(' + translate  + ')';
    this.slideContainer.style.transform = 'translateX(' + translate  + ')';
};

Slideshow.prototype.resetSlide = function() {
    var cachedClass, self;

    cachedClass = this.slideContainer.className;
    self = this;

    this.slideContainer.className += ' no-animation';
    this.index = this.originalNumberOfSlides;
    this.go(this.index);

    setTimeout(function(){
        self.slideContainer.className = cachedClass;
    }, 1);
};

Slideshow.prototype.ancestorNodeWithClassName = function(node, className) {
    if (node.classList.contains(className)) {
        return node;
    }

    if (node === null) {
        return null;
    }

    return this.ancestorNodeWithClassName(node.parentElement, className);
};

module.exports = Slideshow;

},{}]},{},[1]);