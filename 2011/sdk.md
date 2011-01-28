---
title: DevTools SDK
layout: page
---

# Mozilla DevTools SDK #

<table class="metadata">
    <tr><th>Revision</th><td>January 26, 2011</td></tr>
    <tr><th>Status</th><td>Design</td></tr>
    <tr><th>Feature Owner</th><td>Kevin Dangoor</td></tr>
    <tr><th>Technical Owner</th><td>Rob Campbell</td></tr>
</table>

The Developer Tools SDK (henceforth "DTSDK") allows web developers
to [practice their love](http://www.time.com/time/specials/packages/article/0,28804,1870938_1870943_1870953,00.html)
with their very own developer tools. No rebuilding the browser, no digging
into arcane, undocumented APIs. The DTSDK digs into the arcane, undocumented
APIs so that tools developers don't have to.

The DTSDK builds on the [Add-on SDK](https://jetpack.mozillalabs.com/), and
the tools created are installed like any other Jetpacks.

Read on to find out more about the parts of the DTSDK, including the heretofore
private parts.

## Project Goals ##

1. Give us shared infrastructure for Mozilla's developer tools
2. Provide documented, stable, understandable APIs for creating tools that
solve web development problems
3. Provide APIs and services that are easy to jump into for small tools (eg the
"sandwich logging panel" that only displays log output involving sandwiches
and possibly other food items) but can scale to the level of Firebug
4. Support the creation of independent tools that work well together
5. Add utility functionality that is not part of the Add-on SDK but is useful
for building developer tools.
6. Allow web developers to use their preexisting knowledge (HTML/CSS/JS) as
much as possible in building additional tools

Project non-goals:

* Creating APIs that are not useful for the construction of web applications 
(ie APIs that are only useful for working on Firefox itself)
* Cover more surface area than our planned tools

# Open Questions #

1. How do we structure things so that the process boundaries don't slow the tools
down too much?
2. Can all tools be restartless?

# SDK Details #

This section details the public parts of the DTSDK (the naughty bits are down 
below). The "user interface" of the DTSDK is the set of programming interfaces
(APIs) that it exports. Rather than helpfully arranging the API sections
alphabetically, I've chosen to put them in chronological order, based on
when we expect to implement them. Those subsections near the bottom? We haven't
thought a lot about those yet so they may be wildly inaccurate or mildly
impossible.


## Logging ##

Provides access to Firefox's logging capabilities for both the current
window context and the global context. If you want to create your own
custom log output view (the "sandwich logging panel") or if you just
need to log messages (say, "sandwich created"), you will use these
APIs.

## Content ##

Dig into the details about the page the user is looking at.

## Commands ##

All of the actions the user can take with the developer tools, all in
one handy registry. You'll have to look in another file to see how the
user actually runs these commands.

## Workspaces ##

See that little bit of code over there? Yeah, you can run that.

# Technical Details #

Proxies, restart behavior, packaging tooling?