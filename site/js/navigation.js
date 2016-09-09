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
