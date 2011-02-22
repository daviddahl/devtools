---
title: DevTools Top-Level UI
layout: page
---

# Mozilla Developer Tools UI #

<table class="metadata">
    <tr><th>Revision</th><td>February 8, 2011</td></tr>
    <tr><th>Status</th><td>Design</td></tr>
    <tr><th>Feature Owner</th><td>Kevin Dangoor</td></tr>
</table>

Imagine a designer, we'll call him Leonardo. He's great at visual design
and has a moderate understanding of HTML and CSS. He doesn't know jQuery at
all, but has copied-and-pasted lines of jQuery code into his pages here
and there to get some animation. This is before he discovered CSS animation,
of course. Leonardo rarely uses his keyboard, preferring either a mouse
or stylus depending on what he's up to.

There's another Firefox user named Grace. Her web pages are wondrously
small (people looking at them wonder where all of the content is!). She
builds up elaborate UIs in JavaScript. She tried *all* of the JavaScript-based
toolkits and ended up writing her own. Twice. She uses JavaScript to generate
her CSS as well.

Leonardo and Grace don't have a lot in common.

We will be building a variety of developer tools that appeal to different 
audiences and provide a range of features. Some web developers will want
all of the tools. Others will only want some. We want to build the tools
so that:

* users who need few tools are able to use those tools with minimal fuss
* users who need many tools will find that they complement each other well
* no one feels like they're drowning in clutter

This document is intended to describe the concepts, features and interface
guidelines that will make the tools work together.

## Open Questions ##

1. Panels need to be floatable and dockable, ideally mobile between windows
2. what is the scope of panels and how does it change as you move between tabs?

# sharing panels with Firebug #
