var outputName = "Shadows_PSProc";
var outputFolder = Folder('M:/AMB/PS_Proc/Shadows_PSProc/'); 
if (!outputFolder.exists) {outputFolder.create();}

//Array of folders containing images to combine
var fld = [
    Folder('M:/SinglesVideos_WCT/Shadows/ShadowsOne/ShadowsOne/ShadowsOne_32-bizarre__').getFiles(/\.(jpg|png)$/i),
    Folder('M:/SinglesVideos_WCT/Shadows/ShadowsOne/ShadowsOne/ShadowsOne_29-psychedelic-mess-flouricide__').getFiles(/\.(jpg|png)$/i)
];

//Open Image[i] per Folder[j]
for (i = 0; i < fld[0].length; i++) {
    for (j = 0; j < fld.length; j++){
        open(fld[j][i]);
    }
    
    //RUN ACTION
    doAction("Shadows", "AMB");

    //Save image
    var saveImage = outputName + "_" + pad(i, 4);
    SavePNG(saveImage);
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}

//pad with leading zeroes from StackOverflow: https://stackoverflow.com/a/10073788
function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

//save file function
function SavePNG(saveFile) {
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
