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
