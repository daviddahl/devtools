require.ready(function() {
    var element = $('<div id="foo" style="position:absolute; left:-1000px">You will only see this in Firefox 4 or a DOM inspector. I wonder what that job object on window is all about?</div>');
    $('body').append(element);
    require(['jquery32'], function(jq32) {
        for (var k in jq32) {
            window["old" + k] = window[k];
            window[k] = jq32[k];
        }
    });
});
