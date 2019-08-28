//Photoshop CC currently only supports the ancient JS ES4 :-(
//This version isn't as clear... IMO

//Files and Folders to Run
var allItems = {
    "AMB": [
        {
            "action": "Tunnel",
            "outputName": "TunnelOne_PSProcTEST", 
            "folders": [
                "M:/SinglesVideos_WCT/Tunnel/TunnelOne/TunnelOne/TunnelOne_57-bek5__",
                "M:/SinglesVideos_WCT/Tunnel/TunnelOne/TunnelOne/TunnelOne_33-aboriginal-dots__"
            ],
        },
        {
            "action": "WaterFlow",
            "outputName": "WaterFlowCement_PSProc", 
            "folders": [
                "M:/SinglesVideos_WCT/WaterFlow/WaterFlowCement/WaterFlowCement/WaterFlowCement_53-bek1__",
                "M:/SinglesVideos_WCT/WaterFlow/WaterFlowCement/WaterFlowCement/WaterFlowCement_57-bek5__"
            ],
        },
    ], 
}


// Object.keys doesn't exist in ES4. Polyfill below for compatibility.
// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
    Object.keys = (function() {
      'use strict';
      var hasOwnProperty = Object.prototype.hasOwnProperty,
          hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
          dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
          ],
          dontEnumsLength = dontEnums.length;
  
      return function(obj) {
        if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
          throw new TypeError('Object.keys called on non-object');
        }
  
        var result = [], prop, i;
  
        for (prop in obj) {
          if (hasOwnProperty.call(obj, prop)) {
            result.push(prop);
          }
        }
  
        if (hasDontEnumBug) {
          for (i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) {
              result.push(dontEnums[i]);
            }
          }
        }
        return result;
      };
    }());
  }
// End Object.keys polyfill

var actionSets = Object.keys(allItems);

//ITERATION CODE STARTS HERE:

(function () {
  for (n = 0; n < actionSets.length; n++) {
    var currentActionSet = actionSets[n]; 
    var currentScene = allItems[currentActionSet]
      for (k = 0; k < currentScene.length; k++) {
          var currentAction = currentScene[k];
          var folder = populateArray(currentAction);
          imageFolderIterator(folder, currentAction, currentActionSet);
      }   //end [k]
  }   //end[n]
})();

function populateArray(currentAction) {
    var folder = []
    for (m = 0; m < currentAction.folders.length; m++) {
        folder[m] = Folder(currentAction.folders[m]).getFiles(/\.(jpg|png)$/i)
    }   //end [m]
    return folder;
}

function imageFolderIterator(folder, currentAction, currentActionSet){
  	for (i = 0; i < folder[0].length; i++) {
        for (j = 0; j < folder.length; j++){
            open(folder[j][i]);
        }
        runAction(currentAction, currentActionSet);
        saveAndClose(currentAction);
    }   //end [j][i]
}

function runAction(currentAction, currentActionSet) {
    //RUN ACTION
    doAction(currentAction.action, currentActionSet);
}

function saveAndClose(currentAction) {
  	var outputFolder = Folder('M:/AMB/PS_Proc/' + currentAction.outputName + "/"); 
    if (!outputFolder.exists) {outputFolder.create();}
  	var savePath = new File (decodeURI(outputFolder + "/" + currentAction.outputName + "_" + pad(i, 4)));
    SavePNG(savePath);
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}
//ITERATION CODE ENDS HERE.


//pad with leading zeroes from StackOverflow: https://stackoverflow.com/a/10073788
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

//save file function
function SavePNG(savePath){
    pngSaveOptions = new PNGSaveOptions(); 
    pngSaveOptions.embedColorProfile = true; 
    pngSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE; 
    pngSaveOptions.matte = MatteType.NONE; 
    pngSaveOptions.quality = 9; 
    pngSaveOptions.PNG8 = false; //24 bit PNG
    pngSaveOptions.transparency = false; 
    activeDocument.saveAs(savePath, pngSaveOptions, true, Extension.LOWERCASE); 
}

