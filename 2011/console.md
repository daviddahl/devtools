---
title: Console.next
layout: page
---

# Firefox Web Console #

<table class="metadata">
    <tr><th>Revision</th><td>January 26, 2011</td></tr>
    <tr><th>Status</th><td>Design</td></tr>
    <tr><th>Owner</th><td>TBD</td></tr>
</table>

The Web Console feature first appeared in Firefox 4. It was built prior to
the creation of the DevTools SDK and was therefore created as a traditional
Firefox feature. This document describes our plan to transition the Web
Console to the DevTools SDK and add new features.

# open questions #

1. Firebug needs to be able to use the same console object on the page and extend it, but be an output sink.