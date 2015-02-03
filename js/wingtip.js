/* wingtip.js, simple javascript tooltips
 * version 0.0.1
 * Copyright (c) 2015 Brian Reilly {https://github.com/Briles}
 * released under the MIT license
 */
var wingtip = function(options) {
    /* set the default options
     * offset: the distance in pixels the tooltip is offset from the calling element
     * title: the attribute from which the tooltip's content is retrieved
     */
    var options = {
        offset: options.offset || 0,
        title: options.title || 'title'
    }

    // calculate the tooltip's position and show it
    show = function() {
        var direction = this.getAttribute('data-wingtip').toLowerCase() || 'n',
            titleAttr = options.title === 'title' ? 'data-original-title' : options.title,
            content = this.getAttribute(titleAttr),
            wrapper = document.createElement('div'); // create a wrapper so we can add some html to it and extract it
        wrapper.innerHTML = '<div class="js-wingtip-tooltip js-wingtip-' + direction + '">' + content + '<div class="js-wingtip-trail"></div></div>';
        var tooltip = wrapper.firstChild;
        document.body.insertBefore(tooltip, document.body.firstChild);
        // get the dimensions of the tooltip so we can accurately calculate its position relative to the calling element
        var tooltipHeight = tooltip.offsetHeight,
            tooltipWidth = tooltip.offsetWidth,
            pos = this.getBoundingClientRect(),
            pointSize = 5, // the height & width of the tooltip's point
            pointOffset = 9 + (pointSize / 2), // the distance from the tooltip's aligned edge and the center of the tooltip's point (1/2 the pointSize). Only applies to NW, NE, SW, SE directions
            // set the origin to 0,0 top left
            top = 0,
            left = 0;

        switch (direction.charAt(0)) {
            case 'n':
                top = pos.top - tooltipHeight - pointSize - options.offset;
                left = pos.left + pos.width / 2 - tooltipWidth / 2;
                break;
            case 's':
                top = pos.top + pos.height + pointSize + options.offset;
                left = pos.left + pos.width / 2 - tooltipWidth / 2;
                break;
            case 'e':
                top = pos.top + pos.height / 2 - tooltipHeight / 2;
                left = pos.left + pos.width + pointSize + options.offset;
                break;
            case 'w':
                top = pos.top + pos.height / 2 - tooltipHeight / 2;
                left = pos.left - tooltipWidth - pointSize - options.offset;
                break;
        }

        if (direction.length == 2) {
            if (direction.charAt(1) == 'e') {
                left = pos.left + pos.width / 2 - pointOffset;
            } else {
                left = pos.left + pos.width / 2 - tooltipWidth + pointOffset;
            }
        }
        tooltip.style.left = (left + 'px');
        tooltip.style.top = (top + 'px');
    };

    // kill all tooltips
    destroy = function() {
        var tooltipped = document.querySelectorAll('.js-wingtip-tooltip');
        for (i = 0; i < tooltipped.length; ++i) {
            var tooltip = tooltipped[i];
            tooltip.parentNode.removeChild(tooltip);
        }
    };

    // attach events to the tooltipped elements
    init = function() {
        var tooltipped = document.querySelectorAll('.js-wingtip');
        for (i = 0; i < tooltipped.length; ++i) {
            var e = tooltipped[i];
            if (e.addEventListener) {
                // IE 9+
                e.addEventListener("mouseenter", show, false);
                e.addEventListener("mouseleave", destroy, false);
            } else if (e.attachEvent) {
                // IE 8
                e.attachEvent("onmouseenter", show);
                e.attachEvent("onmouseleave", destroy);
            }
            if (options.title === 'title') {
                e.setAttribute('data-original-title', e.getAttribute('title')); // save the title so we can retrieve it later
                e.removeAttribute('title', ''); // remove the title so it won't show on hover
            }
        }
    };
    init(); // call init to start the magic
};
