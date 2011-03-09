let webConsole = require("webconsole");

exports.webconsole = webConsole;


// EXAMPLE WEB CONSOLE ADDON CODE:
// 
// let consoleCallbacks = {
//   created: function wcCreate(aWebConsole)
//   {
//     aWebConsole.positionBelow;

//     let menuButton = {
//       label: "Position",
//       tooltip: "Position the Web Console above, below or in a window",
//       menuItems: [
//         { label: "Above",
//           callback: function (){ aWebConsole.positionAbove; }
//         },
//         { label: "Below",
//           callback: function (){ aWebConsole.positionBelow; }
//         },
//         { label: "Window",
//           callback: function (){ aWebConsole.positionOwnWindow; }
//         }
//       ]
//     };

//     aWebConsole.addToolbarMenuButton(menuButton);

//     let buttonCfg = {
//       label: "Push Me",
//       callback: function _callback()
//       {
//         aWebConsole.console.log("You pushed a toolbar button");
//       }
//     };
//     aWebConsole.addToolbarButton(buttonCfg);
//   }
// };

// webConsole.api.registerCallbacks(consoleCallbacks);

