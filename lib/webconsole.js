/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim:set ts=2 sw=2 sts=2 et: */
/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is DevTools SDK.
 *
 * The Initial Developer of the Original Code is
 * the Mozilla Foundation.
 * Portions created by the Initial Developer are Copyright (C) 2011
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   David Dahl <ddahl@mozilla.com> (Original Author)
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

const {Cc, Ci, Cu} = require("chrome");

Cu.import("resource://gre/modules/Services.jsm", this);
Cu.import("resource://gre/modules/XPCOMUtils.jsm", this);

let self = this;

XPCOMUtils.defineLazyGetter(this, "HUDService", function () {
  Cu.import("resource:///modules/HUDService.jsm", self);
  try {
    return HUDService;
  }
  catch (ex) {
    Cu.reportError(ex);
  }
});

const observers = require('observer-service');

const CONSOLE_CREATED = "web-console-created";
const CONSOLE_DESTROYED = "web-console-destroyed";
const CONSOLE_MESSAGE_CREATED = "web-console-message-created";

function getWebConsole(aID)
{
  // TODO: not using the addon-SDK window API here as it does not offer
  // access to the chrome document
  let windowEnum = Services.wm.getEnumerator("navigator:browser");
  while (windowEnum.hasMoreElements()) {
    let window = windowEnum.getNext();
    let gBrowser = window.gBrowser;
    let browsers = gBrowser.browsers;
    let len = browsers.length;

    for (let i = 0; i < len; i++) {
      let notificationBox = gBrowser.getNotificationBox(browsers[i]);
      for (let i = 0; i < notificationBox.childNodes.length; i++) {
        let nodeID = notificationBox.childNodes[i].getAttribute("id");
        if (nodeID == aID) {
          return { webConsoleNode: notificationBox.childNodes[i], notificationBox: notificationBox };
        }
      }
    }
  }
  throw new Error("Web Console with ID " + aID + " was not found");
}

function makeWrapper(aNodesObj, aID)
{
  let headsUpDisplay = HUDService.hudReferences[aID];
  let splitter = aNodesObj.notificationBox.querySelector("." + "hud-splitter");
  let filterBox = aNodesObj.webConsoleNode.querySelector(".hud-filter-box");
  let toolbar = aNodesObj.webConsoleNode.querySelector(".hud-console-filter-toolbar");

  let wrapper = {
    domNode: aNodesObj.webConsoleNode,

    inputNode: headsUpDisplay.jsterm.inputNode,

    outputNode: headsUpDisplay.outputNode,

    console: headsUpDisplay.console,

    addToolbarMenuButton: function wrapper_addToolbarMenuButton(aConfig)
    {
      if (!aConfig.label && !aConfig.callback) {
        throw new Error("Button configuration requires label and callback properties");
      }
      let button = headsUpDisplay.makeXULNode("toolbarbutton");
      button.setAttribute("type", "menu");
      button.setAttribute("label", aConfig.label);
      if (aConfig.tooltip) {
        button.setAttribute("tooltip", aConfig.tooltip);
      }

      let menuPopup = headsUpDisplay.makeXULNode("menupopup");
      button.appendChild(menuPopup);
      for (let i = 0; i < aConfig.menuItems.length; i++) {
        let menuItem = headsUpDisplay.makeXULNode("menuitem");
        menuItem.setAttribute("label", aConfig.menuItems[i].label);
        menuItem.setAttribute("type", "checkbox");
        menuItem.setAttribute("autocheck", "false");
        menuItem.addEventListener("command", aConfig.menuItems[i].callback, false);

        menuPopup.appendChild(menuItem);
      }
      toolbar.insertBefore(button, filterBox);

    },

    addToolbarButton: function wrapper_addToolbarButton(aConfig)
    {
      if (!aConfig.label && !aConfig.callback) {
        throw new Error("Button configuration requires label and callback properties");
      }
      let button = headsUpDisplay.makeXULNode("toolbarbutton");
      button.setAttribute("label", aConfig.label);
      button.classList.add("webconsole-clear-console-button");
      button.addEventListener("command", aConfig.callback, false);
      toolbar.insertBefore(button, filterBox);
    },

    get positionBelow() {
      // check to see if we are already positioned below
      if (this.domNode.parentNode.childNodes[3] == this.domNode) {
        return;
      }
      // remove the console and splitter and reposition below the browser content
      let consoleNode = this.domNode.parentNode.removeChild(this.domNode);
      let consoleSplitter = splitter.parentNode.removeChild(splitter);
      aNodesObj.notificationBox.appendChild(splitter);
      aNodesObj.notificationBox.appendChild(consoleNode);
      this.inputNode.focus();
    },

    get positionAbove() {
      // check to see if we are already positioned above
      if (this.domNode.parentNode.childNodes[0] == this.domNode) {
        return;
      }
      // remove the console and splitter and reposition below the browser content
      let consoleNode = this.domNode.parentNode.removeChild(this.domNode);
      let consoleSplitter = splitter.parentNode.removeChild(splitter);
      aNodesObj.notificationBox.
        insertBefore(splitter, aNodesObj.notificationBox.childNodes[0]);
      aNodesObj.notificationBox.
        insertBefore(consoleNode, aNodesObj.notificationBox.childNodes[0]);
    },

    get positionOwnWindow() {
      var ww = Cc["@mozilla.org/embedcomp/window-watcher;1"]
                 .getService(Ci.nsIWindowWatcher);

      var xml = "data:application/vnd.mozilla.xul+xml," +
                  require("self").data.load("webconsole.xul");

      var window = ww.openWindow(null,
                                 xml,
                                 "webconsole", "resizable=yes,scrollbars=yes,centerscreen,width=800,height=480",
                                 null);
      let self = this;

      window.addEventListener("DOMContentLoaded", function onLoad(event) {
        window.removeEventListener("DOMContentLoaded", onLoad, false);
        var document = event.target;
        if (document != window.document) {
          console.error("assertion failure, document != window.document");
        }

        window.document.querySelector("#web-console").setAttribute("style", "background-color: white;");
        window.document.title = window.document.title + ": " +
          headsUpDisplay.contentWindow.document.title;
        // TODO: need to addEventListener to update the title when the console's contentWindow changes location
        let consoleSplitter = splitter.parentNode.removeChild(splitter);
        consoleSplitter.setAttribute("style", "display: none;");
        let consoleNode =
          aNodesObj.webConsoleNode.parentNode.removeChild(aNodesObj.webConsoleNode);
        consoleNode.querySelector(".hud-console-filter-toolbar").setAttribute("style", "display: -moz-box;");
        window.document.getElementById("web-console").appendChild(consoleNode);
        window.document.getElementById("web-console").appendChild(consoleSplitter);
        // TODO: change the command for the close button to close the window and destory the console
        // hide the close button as we can close it via the window
        let toolbarCloseBtn = window.document.querySelector(".webconsole-close-button").setAttribute("style", "display:none");
        // TODO: onbeforeclose should clean up the console UI
        winResize();
      }, false);
    }
  };
  return wrapper;
}

// init should be passed a config Object like: {"create": function (WebConsole){}}

let ConsoleObserver = {

  config: {},

  init: function CO_init(aConfig)
  {
    this.config = aConfig;
    for (let index in this.config) {
      if (!(typeof this.config[index] == "function")) {
        throw new Error("ConsoleObserver configuration object property should be a function");
      }
      if (index == "created") {
        observers.add(CONSOLE_CREATED, this.handleCreate.bind(this));
      }
      else if (index == "destroyed") {
        observers.add(CONSOLE_DESTROYED, this.handleDestroy.bind(this));
      }
      else if (index == "message") {
        observers.add(CONSOLE_MESSAGE_CREATED, this.handleMessage.bind(this));
      }
    }
  },

  handleCreate: function CO_handleCreate(aSubject, aData)
  {
    let id = aSubject.QueryInterface(Ci.nsISupportsString);
    let webConsole = getWebConsole(id);
    let webConsoleAPI = makeWrapper(webConsole, id);
    this.config["created"](webConsoleAPI);
    return webConsoleAPI;
  },

  handleDestroy: function CO_handleDestroy(aSubject, aData)
  {
    // webConsole is completely gone by the time this event occurs
    // call the callback
    this.config["destroyed"](webConsoleAPI);
  },

  handleMessage: function CO_handleMessage(aSubject, aData)
  {
    console.log("aData: " + aData);
    let id = aSubject.QueryInterface(Ci.nsISupportsString);
    let webConsole = getWebConsole(aSubject).webConsoleNode;
    console.log("webConsole: " + webConsole);
    let message = webConsole.ownerDocument.getElementById(aData);
    console.log(message);
    if (!message) {
      return null;
    }
    let messageAPI = this.makeMessageWrapper(message);
    this.config["message"](messageAPI);
    return messageAPI;
  },

  makeMessageWrapper: function CO_makeMessageWrapper(aMessage)
  {
    console.log("aMessage: " + aMessage);

    let wrapper = {
      rawNode: aMessage,

      get rawText() {
        return aMessage.textContent;
      },
      get messageText() {
        try {
          return this.rawNode.textContent;
        }
        catch (ex) {
          return null;
        }
      },
      get timestamp() {
        return aMessage.childNodes[0].textContent;
      },
      get location() {
        return aMessage.childNodes[3].textContent;
      },
      nodes: {
        get timestamp() {
          return aMessage.childNodes[0];
        },
        get message() {
          return aMessage.childNodes[2];
        },
        get location() {
          return aMessage.childNodes[3];
        }
      }
    };
    return wrapper;
  }
};

exports.api = {
  registerCallbacks: function registerCallbacks(aConfig)
  {
    return ConsoleObserver.init(aConfig);
  }
};

