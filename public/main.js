(function(){
    'use strict';

    function Slideshow(el) {
        this.el = el;
        this.slides = this.el.querySelectorAll('.tapestry-item');
        this.slideContainer = this.el.querySelector('.tapestry');

        this.index = 0;
        this.interval = 5000;
        this.numberOfSlides = this.slides.length;
        this.originalNumberOfSlides = this.numberOfSlides;
        this.el.className += ' slider';
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
    };

    Slideshow.prototype.slide = function() {
        this.index += 1;

        if (this.index > this.originalNumberOfSlides * 2) {
            this.resetSlide();
            setTimeout(this.slide.bind(this), 20);
            return;
        }

        this.go(this.index);

        setTimeout(this.slide.bind(this), this.interval);
    };

    Slideshow.prototype.go = function(index) {
        var translate = (index * -100) + '%';
        this.slideContainer.style.transform = 'translateX(' + translate  + ')';
    };

    Slideshow.prototype.resetSlide = function() {
        var cachedClass = this.slideContainer.className;

        this.slideContainer.className += ' no-animation';
        this.index = this.originalNumberOfSlides;
        this.go(this.index);

        var self = this;
        setTimeout(function(){
            self.slideContainer.className = cachedClass;
        }, 20);
    };

    function isElementOnScreen(el) {
        var viewport = {}, bounds, winHeight, elHeight;

        winHeight = window.innerHeight;
        elHeight = el.clientHeight / 2;

        viewport.top = document.body.scrollTop;
        bounds = el.getBoundingClientRect();

        viewport.bottom = viewport.top + winHeight;

        return !(viewport.top < bounds.top + viewport.top - elHeight ||
                 viewport.top > bounds.bottom + viewport.top - elHeight);
    }

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
        var now = new Date().getTime();

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

            if (isElementOnScreen(el)) {
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




    function main() {
        var slideEl, slideshow, navigation;

        slideEl = document.querySelector('.page--tapestry');
        slideshow = new Slideshow(slideEl);
        slideshow.setup();
        slideshow.slide();

        navigation = new Navigation(document.querySelectorAll('.nav-item'),
                                    document.querySelectorAll('.page'));

    }


    main();

}());
