let globalX = 0,
    globalY = 0,
    shiftX = 0,
    shiftY = 0,
    mdX = 0,
    mdY = 0,
    mmX = 0,
    mmY = 0,
    maxX = window.innerWidth,
    maxY = window.innerHeight,
    keyStep = 10,
    scale = 1,
    isMouseDown = false,
    isMouseMove = false,
    isMouseUp = false,
    isMouseOut = false;

const appData = {
    isChanges: true,
    zoomIntensity: 0.2
};

const gridData = {
    gridSectorsX: 30,
    gridSectorsY: 20
};