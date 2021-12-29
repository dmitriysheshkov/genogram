let maxX = window.innerWidth,
    maxY = window.innerHeight,
    scale = 1,
    globalX = maxX * (1 / scale) / 2,
    globalY = maxY  * (1 / scale) / 2,
    shiftX = globalX,
    shiftY = globalY,
    mdX = 0,
    mdY = 0,
    mmX = 0,
    mmY = 0,
    keyStep = 10,
    isMouseDown = false,
    isMouseMove = false,
    isMouseUp = false,
    isMouseOut = false;

const appData = {
    isChanges: true,
    zoomIntensity: 0.2,
    cardSize: 300
};

const gridData = {
    gridSectorsX: 30,
    gridSectorsY: 20
};