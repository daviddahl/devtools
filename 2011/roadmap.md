---
title: Developer Tools 2011
layout: page
---

# Developer Tools 2011 #

Kevin Dangoor <kdangoor@mozilla.com>
January 19, 2011

This document is a high-level plan for Mozilla developer tools releases after Firefox 4 and through the rest of 2011. We'll drill into the details of each part of this plan early in 2011.

## Vision ##

The ultimate goal is to **make Firefox the best dynamic environment for building modern web applications**. In 2011, we'll take the first steps along that path.

This year, we want to:

1. **Include tools with Firefox that will help with the most common web development tasks**
2. **Prepare to allow a variety of tools to easily be built on multi-process Firefox**

To accomplish our goals for this year and set the stage for the challenging work that follows, we will take an approach that:

* **Enables web developers to easily help with making the tools they use better**
* **Gathers feedback via frequent releases**. Many developers are "early adopters" and would be willing to install Firefox add-ons to get new tools to make their lives better, as seen by the millions of users that have the Web Developer Toolbar and Firebug installed. We can take advantage of this to gather feedback and further encourage participation in the development of the tools.

## Our Priorities ##

1. Help web developers on electrolysis-based (see "Multi-Process Firefox" below) desktop Firefox
2. Help Jetpack developers debug their add-ons
3. Help web developers create their mobile apps on with Firefox for mobile (with remote debugging interfaces)
4. Help Firefox developers debug the browser
5. Help developers of other Mozilla platform projects

Jetpacks and Firefox itself are built on many of the same technologies as the web. The same SpiderMonkey JavaScript engine that runs JS code on web pages is also responsible for a great deal of the Firefox user interface and for running Jetpacks. Where possible, we will engineer our work to support anyone who is building on the Mozilla platform, but our top priority for 2011 is to delight people building web applications.

## Empowering Web Developers ##

Web developers work with HTML, CSS and JavaScript every day. Jetpack provides programming interfaces (APIs) that are easy for web developers to work with and a "restartless" model that makes developing a Jetpack feel like the same kind of lightweight process as building a web application. Jetpack's APIs also make it easy for developers to dive in without having to learn much about how Firefox itself is put together.

By creating a "developer tools software development kit (SDK)" that provides APIs designed to assist in building web applications, we make it easy for people with knowledge of JavaScript to dive in and build new tools. Developers will be able to use these APIs to provide new ways to visualize what's happening inside of the browser, or to help diagnose application problem areas.

The APIs will allow developers to:

* Control the flow of execution of JavaScript on the web page and query for the execution state (the stack, variables in scope, etc.) in order to build debuggers
* Analyze and query the stylesheets in use on the page
* Work with the HTML DOM
* Retrieve events logged in the browser (JavaScript and CSS errors, network requests, content JavaScript-logged messages, other messages logged by browser internal systems)
* Measure web application performance (JavaScript profiling, animation framerates, layout/styling performance)
* Measure web application resource usage
* Inspect modern application state (IndexedDB, localStorage, Web Workers, Web Sockets)
* Provide informative displays that do not interfere with the operation of the page

A comprehensive, documented set of APIs (along with introductory tutorials and screencasts) will help developers get going building their own tools.

Further, these APIs will also help projects like Firebug by providing a straightforward and consistent interface to this kind of browser data. This work also ties in well with the "browser tools interface" work that the Firebug project is starting to undertake.

## Bundled Tools for the Most Common Tasks ##

Firefox has a great add-on ecosystem, and the Developer Tools SDK will encourage the creation of even more add-ons for web developers. The needs of modern web sites and applications are far more significant than they used to be, and we'll rely on add-ons for handling many of the less common cases.

With that in mind, we do want Firefox to be a developer-friendly browser out-of-the-box. In Firefox 4, we are shipping the "web console" feature which provides users with insights into what their sites are doing and adds the de facto standard "console" object to the page. We also developed much of an "inspector" tool which provides a user interface for browsing the structure of the page, editing the CSS and HTML of the page and resolving styling issues.

We will restructure these tools to work with the SDK, allowing them to serve as examples for other developers and to provide initial real-world tests for the SDK.

The full suite of tools we will provide will touch upon all of the areas covered by the SDK. However, the approach that we will take in designing these tools is "task-oriented". Rather than developing a UI with the primary goal of exposing all of the available information, we will develop a UI that is expressly designed to cover many common needs of web developers.

More specifically,

* Easy-to-use tools for diagnosing and correcting problems with page layout
* A debugger for analyzing and correcting problems in JavaScript code
* Views into the performance characteristics of an application

While we want to provide tools that touch upon all areas of the SDK, the tools we ship with Firefox will be the ones that are:

1. the most broadly useful
2. the most polished

Releasing tools initially as separate Jetpacks will allow us to iterate quickly and gather feedback while the tool is polished. That period may also help us determine if a tool is broadly useful enough to incorporate into the product.

## Supporting Open Web Standards via Tools ##

Ideally, every person using web sites and applications is using a modern browser with support for the latest standards. Of course, even this ideal scenario falls short of the ideal: what are the "latest standards"? The "HTML5" standard is still evolving and there has been considerable churn in areas like Web Sockets and IndexedDB vs. Web SQL Database.

Among the many user interface challenges that we face, we want our tools to:

1. provide support for and encourage users to develop for the latest standards supported by modern browsers
2. assist users in making good tradeoffs when they need to support older browsers

Most web developers are given constraints concerning which browsers they must support, with some developers saddled with a requirement to support a nearly decade old browser. If we can help developers both provide support for the browsers they are required to support *and* take advantage of newer browser features, we will be making the web a better place.

This won't be easy, and I won't even dive into specifics on how to do this here. I'm writing this as a guideline that we can apply and one more thing to think about as we design new tools.

## Multi-Process Firefox ##

Our "electrolysis" (e10s) project, which aims to change Firefox to a multi-process model in 2011, will have a significant impact on developer tools. We need to ensure that there is a solid collection of developer tools when the multi-process Firefox ships.

The SDK is part of our strategy to get there. By designing the SDK with a multi-process architecture in mind, we can start working on tools *now*, well before e10s is complete. The implementation of the APIs will need to change to support e10s, but the tools themselves will be ready.

Existing tools, including Firebug and the Web Developer Toolbar, will need to be updated for e10s. By encouraging developers to start adopting the SDK as soon as possible, we can have a smoother transition to the e10s Firefox for these and other popular add-ons.

## Frequent Releases ##

Web developers need a stable, reliable browser for their day-to-day work but would likely be willing to try out new tools that will help them without impacting the normal operation of their browser.

We want to be able to start a feedback loop with developers early, so that we can know that our tools are solving the right problems in the right ways. To do this, our thinking is that we can release developer tools with a cycle like this:

1. initially released as an add-on
2. when we've reached a stable release point for common-use tools, we bake the add-on into Firefox
3. updates to the code are then released as updated add-ons that override the built-in feature
4. repeat from step 2

This cycle will allow web developers to have greater input into the tools without running Minefield. And, since these users are developers themselves, more of that input can be in the form of code changes.

# Process #

Our work has the potential to touch a number of groups working on Mozilla projects and also has the potential for interest from a broad community of Mozilla contributors. To help make things more predictable and more easily collaborative, we're going to approach these new tools and the SDK with a bit more process than has traditionally been used. Specifically, for a given release we will create:

* "light" functional specs – plain English descriptions of the main points of what the release will do
* tech specs for more complex parts – if we need to gather input on *how* something will work, we will write that up in English with diagrams where appropriate, etc.
* work breakdowns with estimates – it's difficult to have a predictable schedule without going through this step, and the schedule is important because we want to be sure that we have the tools we need when e10s ships

The intention is to add just enough additional process to:

1. communicate to other interested people what we're up to and how they could jump in or provide feedback
2. maintain a reasonable schedule for the most important features

Tying these documents to our frequent releases means that no single document should get large, boring and unwieldy.

# Roadmap #

This is a high-level view of how we see 2011 going:

## Q1 (March 31) ##

* Ship Firefox 4 with the Web Console
* Ship Firebug 1.7 which is compatible with Firefox 4
* Release initial devtools SDK with a small scope
* Release an initial tool as a Jetpack

## Q2 (June 30) ##

* Expand the devtools SDK
* Release Web Console and Inspector updates on the expanded SDK
* Initial prototype debugger
* Portions of Firebug run as a Jetpack on top of the devtools SDK

## Q3 (September 30) ##

* devtools SDK-based tools should run atop the e10s Firefox beta
* Firefox beta with SDK-based tools integrated
* Improve the integration of the tools and add features based on feedback
* Another new tool (something like performance or memory profiling)
* Flesh out the debugger
* Get the remainder of Firebug standing on the devtools SDK

## Q4 (December 31) ##

* Firefox e10s ships with integrated tools
* Companion Firebug release ships