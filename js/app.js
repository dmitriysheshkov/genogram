const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let globalX = 0,
    globalY = 0,
    step = 10,
    scale = 1,
    maxX = window.innerWidth,
    maxY = window.innerHeight,
    isMouseDown = false,
    isMouseMove = false,
    isMouseUp = false,
    isMouseOut = false,
    mdX = 0,
    mdY = 0,
    mmX = 0,
    mmY = 0,
    shiftX = 0,
    shiftY = 0;

const zoomIntensity = 0.2;

const appData = {
    elements: [],
    isChanges: true
};

class Element {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    // draw() {}
}

const element1 = new Element(0, 0, 100, 100, 'tomato');
const element2 = new Element(220, 100, 100, 100, 'tomato');

appData.elements.push(element1); // , element2

canvas.classList.add('cursor--grab');

function animation(obj) {
    const { update, clear, render } = obj;

    requestAnimationFrame(tick);
    render();

    function tick() {

        if (appData.isMouseOut) {appData.isChanges = false;}

        if (appData.isChanges) {

            update();
            clear();
            render();

            appData.isChanges = false;
        }

        requestAnimationFrame(tick);
    } 
}

animation({
    
    update() {

        // проверим не ресайз окна
        if ( appData.isChanges || window.innerWidth != maxX || window.innerHeight != maxY) {
            maxX = window.innerWidth;
            maxY = window.innerHeight;

            canvas.width = maxX;
            canvas.height = maxY;
        }

        // перемещение
        if (isMouseDown && isMouseMove ) {
            globalX = (shiftX + mmX - mdX) / scale;
            globalY = (shiftY + mmY - mdY) / scale; 

        }
        
    },

    clear() {
        ctx.clearRect(0, 0, maxX / scale, maxY / scale);
    },

    render() {

        ctx.scale(scale, scale);

        for (let i = 0; i < appData.elements.length; i++) {
            ctx.fillStyle = appData.elements[i].color;
            ctx.beginPath();
            ctx.fillRect(
                globalX + appData.elements[i].x,
                globalY + appData.elements[i].y,
                appData.elements[i].width,
                appData.elements[i].height);
        }
    }

});

// listeners
window.addEventListener('resize', ()=> { appData.isChanges = true; });

window.addEventListener('keydown', (event)=> {

    if (event.code === 'ArrowRight') globalX += step;
    if (event.code === 'ArrowLeft') globalX -=step;
    if (event.code === 'ArrowUp') globalY -= step;
    if (event.code === 'ArrowDown') globalY +=step;

    shiftX = globalX;
    shiftY = globalY;

    appData.isChanges = true;
    
});

window.addEventListener('mousedown', (event)=> {

    canvas.classList.remove('cursor--grab');
    canvas.classList.add('cursor--grabbing');

    isMouseDown = true;

    mdX = event.clientX;
    mdY = event.clientY;

    appData.isChanges = true;
});

window.addEventListener('mousemove', (event)=> {
    isMouseMove = true;

    mmX = event.clientX;
    mmY = event.clientY;

    appData.isChanges = true;
});

window.addEventListener('mouseup', (event)=> {

    canvas.classList.remove('cursor--grabbing');
    canvas.classList.add('cursor--grab');

    isMouseUp = true;
    appData.isChanges = true;

    isMouseDown = false;
    isMouseMove = false;
    isMouseUp = false;

    shiftX = globalX * scale;
    shiftY = globalY * scale;
});

window.addEventListener('wheel', (event)=> {

    const wheel = event.deltaY < 0 ? -1 : 1;
    const zoom = Math.exp( wheel * zoomIntensity );

    scale *= zoom;

    // ?
    // if (scale < 0.1) scale = 0.1; 
    // if (scale > 5) scale = 5;

    globalX -= - (mmX / (scale * zoom) - mmX / scale);
    globalY -= - (mmY / (scale * zoom) - mmY / scale);

    shiftX = globalX * scale;
    shiftY = globalY * scale;

    console.log(scale)

    appData.isChanges = true;
    
});

canvas.addEventListener('mouseout', (event)=> { 
    appData.isMouseOut = true;
    appData.isChanges = false;
});

canvas.addEventListener('mouseover', (event)=> { 
    appData.isMouseOut = false;
    appData.isChanges = true;
});


