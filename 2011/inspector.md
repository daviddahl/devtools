---
title: Firefox Inspector
layout: page
---

# Firefox Inspector #

<table class="metadata">
    <tr><th>Revision</th><td>January 26, 2011</td></tr>
    <tr><th>Status</th><td>Design</td></tr>
    <tr><th>Owner</th><td>TBD</td></tr>
</table>

The Inspector is a web designer-oriented feature that was initially planned
for Firefox 4 but was not ready in time to ship. The code was written before
the DevTools SDK and was left in an inactive state in the Firefox tree.

We are going to rebuild the Inspector on top of the DevTools SDK and plan
to take the UI in different directions than the original planned Inspector.

As originally conceived, the Inspector was a tool that allowed the visual
selection of an element and a set of panels that work with that element.
The "new Inspector" is just the visual selector of elements with the ability
to overlay additional information directly over the page being inspected.
Separate tools (Style Doctor, etc.) will work with the selected elements.
