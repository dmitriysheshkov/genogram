const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const appData = {
    elements: [],
    isChanges: true
};

let maxX = window.innerWidth,
    maxY = window.innerHeight;

class Element {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

const element1 = new Element(maxX / 2 - 100, maxY / 2 - 100, 200, 200, 'tomato');

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

        // element1
        element1.x = maxX / 2 - 100;
        element1.y = maxY / 2 - 100;
    },

    clear() {
        ctx.clearRect(0, 0, maxX, maxY);
    },

    render() {
        // ctx.fillStyle = 'tomato';
        // ctx.beginPath();
        // ctx.fillRect(maxX / 2 - 100, maxY / 2 - 100, 200, 200);

        element1.draw();
    }

});

// listeners
window.addEventListener('resize', ()=> { appData.isChanges = true; });
