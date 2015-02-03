document.addEventListener('DOMContentLoaded', function() {
    /* Usage:
     * call the wingtip function after the DOM has loaded
     * options are optional, values are not validated, and incorrect types will break functionality
     */
    wingtip(options = {
        // defaults are listed but do not need to be explicitly set
        offset: 0, // the distance in pixels the tooltip is offset from the calling element
        title: 'title' // the attribute to retrieve the tooltip's content from e.g.: aria-label, title
    });
});
