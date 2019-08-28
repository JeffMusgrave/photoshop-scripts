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













// M:/SinglesVideos_WCT/Tunnel/TunnelOne/TunnelOne/TunnelOne_57-bek5__
// M:/SinglesVideos_WCT/Tunnel/TunnelOne/TunnelOne/TunnelOne_33-aboriginal-dots__

//flow2
// M:/SinglesVideos_WCT/WaterFlow/WaterFlowCement/WaterFlowCement/WaterFlowCement_53-bek1__
// M:/SinglesVideos_WCT/WaterFlow/WaterFlowCement/WaterFlowCement/WaterFlowCement_57-bek5__

// M:/SinglesVideos_WCT/WaterFlow/WaterFlowRed/WaterFlowRed/WaterFlowRed_53-bek1__
// M:/SinglesVideos_WCT/WaterFlow/WaterFlowRed/WaterFlowRed/WaterFlowRed_57-bek5__

// M:/SinglesVideos_WCT/WaterFlow/WaterFlowRock/WaterFlowRock/WaterFlowRock_53-bek1__
// M:/SinglesVideos_WCT/WaterFlow/WaterFlowRock/WaterFlowRock/WaterFlowRock_57-bek5__


// M:/SinglesVideos_WCT/WaterFountain/WaterFountainOne/WaterFountainOne/WaterFountainOne_46-abstract-red-green-sharp__
// M:/SinglesVideos_WCT/WaterFountain/WaterFountainOne/WaterFountainOne/WaterFountainOne_62-preyinglion__

// M:/SinglesVideos_WCT/WaterMicroFall/WaterMicroFallOne/WaterMicroFallOne/WaterMicroFallOne_1-colorful-psychedelic__
// M:/SinglesVideos_WCT/WaterMicroFall/WaterMicroFallOne/WaterMicroFallOne/WaterMicroFallOne_17-textured-bright-red-cake-cyclone__

// M:/SinglesVideos_WCT/WaterShallow/WaterShallowOne/WaterShallowOne/WaterShallowOne_8-htt-colors-swirl__
// M:/SinglesVideos_WCT/WaterShallow/WaterShallowOne/WaterShallowOne/WaterShallowOne_32-bizarre__

// M:/SinglesVideos_WCT/WaterShallow/WaterShallowTwo/WaterShallowTwo/WaterShallowTwo_8-htt-colors-swirl__
// M:/SinglesVideos_WCT/WaterShallow/WaterShallowTwo/WaterShallowTwo/WaterShallowTwo_32-bizarre__

// M:/SinglesVideos_WCT/WaterWall/WaterWallOne/WaterWallOne/WaterWallOne_47-strands-psychedelic__
// M:/SinglesVideos_WCT/WaterWall/WaterWallOne/WaterWallOne/WaterWallOne_62-preyinglion__



    // M:\SinglesVideos_WCT\CarWall\CarWallOne\CarWallOne\CarWallOne_18-dark-subway-tile-pyramid__
    // M:\SinglesVideos_WCT\CarWall\CarWallOne\CarWallOne\CarWallOne_62-preyinglion__

    // M:/SinglesVideos_WCT/DriveBy/DriveByOne/DriveByOne/DriveByOne_32-bizarre__
    // M:/SinglesVideos_WCT/DriveBy/DriveByOne/DriveByOne/DriveByOne_18-dark-subway-tile-pyramid__

    // M:/SinglesVideos_WCT/DriveByTrees/DriveByTreesOne/DriveByTreesOne/DriveByTreesOne_62-preyinglion__
    // M:/SinglesVideos_WCT/DriveByTrees/DriveByTreesOne/DriveByTreesOne/DriveByTreesOne_63-sleepwalker__

    // M:/SinglesVideos_WCT/DriveSideMirror/DriveSideMirrorOne/DriveSideMirrorOne/DriveSideMirrorOne_63-sleepwalker__
    // M:/SinglesVideos_WCT/DriveSideMirror/DriveSideMirrorOne/DriveSideMirrorOne/DriveSideMirrorOne_32-bizarre__

    // M:/SinglesVideos_WCT/DriveBySky/DriveBySkyOne/DriveBySkyOne/DriveBySkyOne_63-sleepwalker__
    // M:/SinglesVideos_WCT/DriveBySky/DriveBySkyOne/DriveBySkyOne/DriveBySkyOne_32-bizarre__

    // M:/SinglesVideos_WCT/Ripples/RipplesOne/RipplesOne/RipplesOne_53-bek1__

    // M:/SinglesVideos_WCT/Shadows/ShadowsOne/ShadowsOne/ShadowsOne_32-bizarre__
    // M:/SinglesVideos_WCT/Shadows/ShadowsOne/ShadowsOne/ShadowsOne_29-psychedelic-mess-flouricide__

