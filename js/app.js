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
    mdX = 0,
    mdY = 0,
    mmX = 0,
    mmY = 0,
    shiftX = 0,
    shiftY = 0;

const appData = {
    elements: {
        elements1: {
            offsetX: 100,
            offsetY: 100
        },
        elements2: {
            offsetX: 220,
            offsetY: 100
        }
    },
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

    draw() {
        // ctx.scale(scale, scale);
        console.log(scale);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.fillRect(globalX + this.x, globalY + this.y, this.width, this.height);
    }
}

const element1 = new Element(
    appData.elements.elements1.offsetX,
    appData.elements.elements1.offsetY,
    100,
    100,
    'tomato'
);

const element2 = new Element(
    appData.elements.elements2.offsetX,
    appData.elements.elements2.offsetY,
    100,
    100,
    'tomato'
);

function animation(obj) {
    const { update, clear, render } = obj;

    requestAnimationFrame(tick);
    render();

    function tick() {

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

        if (isMouseDown && isMouseMove ) {

            globalX = shiftX + mmX - mdX;
            globalY = shiftY + mmY - mdY; 

            // console.log(`MD: ${ mdX }, ${ mdY } | MM: ${ mmX }, ${ mmY } | Смещение: `, mmX - mdX, mmY - mdY, `Глобал / шифт: ${ globalX }/${ shiftX }, ${ globalY }/${ shiftY }  `);
            
            // console.log(isMouseDown, isMouseMove);
        }
        
    },

    clear() {
        ctx.clearRect(0, 0, maxX, maxY);
    },

    render() {
        element1.draw();
        element2.draw();
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

    isMouseUp = true;
    appData.isChanges = true;

    isMouseDown = false;
    isMouseMove = false;
    isMouseUp = false;

    shiftX = globalX;
    shiftY = globalY;

    // console.log(`Глобал / шифт: ${ globalX }/${ shiftX }, ${ globalY }/${ shiftY } `);
});

window.addEventListener('wheel', (event)=> {

    let delta = event.deltaY || event.detail || event.wheelDelta;
    // console.log(delta);

    if (delta > 0) {
        scale += 0.05;
    } else {
        scale -= 0.05;
    }

    appData.isChanges = true;
    
});


