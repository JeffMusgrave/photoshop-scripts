//Files and Folders to Run
var allItems = {
    "AMB": [
        {
            "action": "Tunnel",
            "outputName": "TunnelOne_PSProc", 
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
        {
            "action": "WaterFlow",
            "outputName": "WaterFlowRed_PSProc", 
            "folders": [
                "M:/SinglesVideos_WCT/WaterFlow/WaterFlowRed/WaterFlowRed/WaterFlowRed_53-bek1__",
                "M:/SinglesVideos_WCT/WaterFlow/WaterFlowRed/WaterFlowRed/WaterFlowRed_57-bek5__"
            ],
        },
        {
            "action": "WaterFlow",
            "outputName": "WaterFlowRock_PSProc", 
            "folders": [
                "M:/SinglesVideos_WCT/WaterFlow/WaterFlowRock/WaterFlowRock/WaterFlowRock_53-bek1__",
                "M:/SinglesVideos_WCT/WaterFlow/WaterFlowRock/WaterFlowRock/WaterFlowRock_57-bek5__"
            ],
        },
        {
            "action": "Fountain",
            "outputName": "WaterFountain_PSProc", 
            "folders": [
                "M:/SinglesVideos_WCT/WaterFountain/WaterFountainOne/WaterFountainOne/WaterFountainOne_46-abstract-red-green-sharp__",
                "M:/SinglesVideos_WCT/WaterFountain/WaterFountainOne/WaterFountainOne/WaterFountainOne_62-preyinglion__"
            ],
        },
        {
            "action": "Micro",
            "outputName": "WaterMicroFall_PSProc", 
            "folders": [
                "M:/SinglesVideos_WCT/WaterShallow/WaterShallowOne/WaterShallowOne/WaterShallowOne_8-htt-colors-swirl__",
                "M:/SinglesVideos_WCT/WaterShallow/WaterShallowOne/WaterShallowOne/WaterShallowOne_32-bizarre__"
                
            ],
        },
        {
            "action": "Shallow",
            "outputName": "WaterShallowOne_PSProc", 
            "folders": [
                "M:/SinglesVideos_WCT/WaterShallow/WaterShallowOne/WaterShallowOne/WaterShallowOne_8-htt-colors-swirl__",
                "M:/SinglesVideos_WCT/WaterShallow/WaterShallowOne/WaterShallowOne/WaterShallowOne_32-bizarre__"
            ],
        },
        {
            "action": "Shallow",
            "outputName": "WaterShallowTwo_PSProc", 
            "folders": [
                "M:/SinglesVideos_WCT/WaterShallow/WaterShallowTwo/WaterShallowTwo/WaterShallowTwo_8-htt-colors-swirl__",
                "M:/SinglesVideos_WCT/WaterShallow/WaterShallowTwo/WaterShallowTwo/WaterShallowTwo_32-bizarre__"
            ],
        },
        {
            "action": "WaterWall",
            "outputName": "WaterWall_PSProc", 
            "folders": [
                "M:/SinglesVideos_WCT/WaterWall/WaterWallOne/WaterWallOne/WaterWallOne_47-strands-psychedelic__",
                "M:/SinglesVideos_WCT/WaterWall/WaterWallOne/WaterWallOne/WaterWallOne_62-preyinglion__"
            ],
        },
    ]    
}

//
//
//
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
//
//
//


//CODE STARTS HERE:
//iterate through each action set
for (n = 0; n < Object.keys(allItems).length; n++) {
    for (k = 0; k < allItems.AMB.length; k++) {

        // var outputName = "CarWall_PS_Proc";
        var outputFolder = Folder('M:/AMB/PS_Proc/' + allItems.AMB[k].outputName + "/"); 
        if (!outputFolder.exists) {outputFolder.create();}
    
        //Array of folders containing images to combine
        var fld = []
        for (m = 0; m < allItems.AMB[k].folders.length; m++) {
            fld[m] = Folder(allItems.AMB[k].folders[m]).getFiles(/\.(jpg|png)$/i)
        }
    
        //Open Image[i] per Folder[j]
        for (i = 0; i < fld[0].length; i++) {
            for (j = 0; j < fld.length; j++){
                open(fld[j][i]);
            }
            
            //RUN ACTION
            doAction(allItems.AMB[k].action, Object.keys(allItems)[n]);
    
            //Save image
            var saveImage = allItems.AMB[k].outputName + "_" + pad(i, 4);
            SavePNG(saveImage);
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        }
    }
}

//pad with leading zeroes from StackOverflow: https://stackoverflow.com/a/10073788
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

//save file function
function SavePNG(saveFile){
    savePath = new File (decodeURI(outputFolder + "/" + saveFile));
    pngSaveOptions = new PNGSaveOptions(); 
    pngSaveOptions.embedColorProfile = true; 
    pngSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE; 
    pngSaveOptions.matte = MatteType.NONE; 
    pngSaveOptions.quality = 9; 
    pngSaveOptions.PNG8 = false; //24 bit PNG
    pngSaveOptions.transparency = false; 
    activeDocument.saveAs(savePath, pngSaveOptions, true, Extension.LOWERCASE); 
}

