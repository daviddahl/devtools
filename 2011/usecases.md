## Tools ##

### Panels ###

Panels can have icons with labels (as in Web Inspector).

## Search ##

### Global find of resources, scripts, elements, css rules ###

Be able to quickly jump to tools that can handle certain kinds of rules. Tools need to be able to contribute to searches and specify the kinds of things they can open.

## JavaScript ##

### Know the proper file and line for errors ###

Message from John Barton on the firebug list:

On Feb 17, 5:27 pm, nsharrok <noel.sharr...@gmail.com> wrote:
> I've pruned the example code further to show the fault.
>
> <div dojoType="dijit.layout.ContentPane"
> href="fireBugTab.html">Loading...</div>
> <script src="http://ajax.googleapis.com/ajax/libs/dojo/1.5/dojo/
> dojo.xd.js" djConfig="parseOnLoad: true"></script>
> <script> //line 3. wrong file
>         dojo.require("dijit.layout.ContentPane");
>         dojo.require("dijit.layout.TabContainer");
> </script>
>
> ////////////// fireBugTab.html///////////////
> <script>
>         alert("The page should say 'Loaded OK' now.");
>         console.log("Log Entry from evaled script");

But the code is not evaled. It is compiled by injecting the script tag
without a filename. For whatever reason, Firefox behaves different in
this case and it does not signal the start of the compile. I don' t
know how to solve these cases in general.



## Cookies ##

Cookie support like Firecookie http://www.softwareishard.com/blog/firecookie/

### Be able to troubleshoot minified code ###


### Better view of DOM structure ###

From Kumar McMillan:

    Firebug starts to get cumbersome when you want to visualize JS generated HTML on a page.  Most JS heavy apps do a lot of DOM manipulation so it would be great to have a robust "view source" mode.  That is, something better than how Firebug gives you a small window into the HTML.  I'm not sure how best to present it, maybe something that opened in a new tab?  Something collapsible and perhaps with a search box where you could type in a css selector to focus a specific part of the html.

### Better view of event handlers associated with a node ###

From Kumar McMillan:

    It would also be great if there was better visualization of events that are attached to each DOM node.  You can sort of do this in Firebug but it takes a lot of clicks and there's no way to see a complete overview of all the custom event handlers on the page.  Again, some separate view into event handlers where you could type css selectors or something to narrow the view to specific parts of the DOM would be helpful.

### Inspect JSON objects returned from Ajax Requests ###



### Get site improvements from knowledgeable visitors ###

Ryan Snyder had heard this idea in Thailand. The basic idea is:

     Essentially, any browser user could use Firebug to fix HTML / CSS / JS problems on a site.  Then, from within Firebug, that user could auto-generate a patch consisting of the changes they made, and Firebug would send that patch (via email or a Google Webmaster-like interface) to the site owner for review and inclusion on the site.

### Log errors that occur out in the field in my web app ###

Kind of like our crash reporting stuff.

## View Source ##

View source is still used by a lot of people. We should make it better.