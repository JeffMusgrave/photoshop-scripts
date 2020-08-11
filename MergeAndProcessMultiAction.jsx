//Photoshop CC currently only supports the ancient JS ES3 :-(

//Files and Folders to Run
var allItems = {
  "ML": [
    {
      "action": "LLAT",
      "outputName": "LieLikeATombstone_IrisBlur", 
      "outputParent": "G:/AMB/PS_Proc/Extra/", 
      "folders": [
          "G:/AMB/PremierePNG/LLAT_Extra/"
      ],
    },
  ] //end "AMB" 
}

// Object.keys doesn't exist in ES3. Polyfill below for compatibility.
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


//Store all top level Action Set keys in an array
var actionSets = Object.keys(allItems);

//ITERATION CODE STARTS HERE:
//  iterate through each Photoshop Action Set
(function(){
  for (n = 0; n < actionSets.length; n++) {
    
    var currentActionSet = actionSets[n]; 
    var currentScene = allItems[currentActionSet]
    
    //iterate through each set's list of actions to perform 
    for (k = 0; k < currentScene.length; k++) {
      
      var currentAction = currentScene[k];
    
      //Array of folders containing images to combine
      var folderArr = []
      
      for (m = 0; m < currentAction.folders.length; m++) {
          folderArr[m] = Folder(currentAction.folders[m]).getFiles(/\.(jpg|png)$/i)
      }   //end [m]
    
      //eg: open: folder 1 image 1, folder 2 image 1 --> then combine, move to next image and cycle through folders
      for (i = 0; i < folderArr[0].length; i++) {
          
        for (j = 0; j < folderArr.length; j++){
          open(folderArr[j][i]);
        }
        
        //RUN ACTION
        doAction(currentAction.action, currentActionSet);

        //Save and close image
        var outputFolder = Folder(currentAction.outputParent + currentAction.outputName + "/"); 
        if (!outputFolder.exists) {outputFolder.create();}
        
        var savePath = new File (decodeURI(outputFolder + "/" + currentAction.outputName + "_" + pad(i, 4)));
        
        SavePNG(savePath);
        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
      
      } //end [j][i]
    }   //end [k]
  }     //end [n]
})();
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

