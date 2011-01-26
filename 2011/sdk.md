---
title: DevTools SDK
layout: page
---

# Mozilla DevTools SDK #

January 25, 2011

Status: design

The Developer Tools SDK (henceforth "DTSDK") builds on the 
[Add-on SDK](https://jetpack.mozillalabs.com/) to make it easy for web
developers to make their lives easier.

This document outlines how the Developer Tools SDK works and what it contains.
It also serves as a technical design document for the infrastructure used by
our tools.

## Project Goals ##

1. Enable the creation and sharing of infrastructure for Mozilla's developer 
tools projects
2. Provide documented, stable, understandable APIs for creating tools that
solve web development problems
3. Provide APIs and services that are easy to jump into for small tools but
can scale to the level of Firebug
4. Support the creation of independent tools that work well together
5. Add utility functionality that is not part of the Add-on SDK but is useful
for building developer tools.
6. Allow web developers to use their preexisting knowledge (HTML/CSS/JS) as
much as possible in building additional tools

Project non-goals:

* Creating APIs that are not useful for the construction of web applications 
(ie APIs that are only useful for working on Firefox itself)
* Cover more surface area than our planned tools
