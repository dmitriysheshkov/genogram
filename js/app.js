const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// максимальное значение координат по X и Y
let maxX, maxY;

// координаты мыши на канвасе
const data = {
    mxClick: undefined,
    myClick: undefined,
    mxMove: undefined,
    myMove: undefined,
    changes: false
};

// задаём размеры канваса вначале и в результате любого изменения окна браузера
// эту же функцию можно вызывать для очистки canvas, т.к. при любых изменениях ширины или высоты
// (даже на те же самые) происходит очистка canvas
function resize() {
    // определяем или переопределяем (при изменении окна браузера) максимальные значения координат X и Y 
    maxX = window.innerWidth;
    maxY = window.innerHeight;

    this.canvas.width = maxX;
    this.canvas.height = maxY;

    render();
}

resize();

// служебные функции
// рандомное целое число в диапазоне от до включительно
function getRandomIntRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// получить текущий канвас
function getCanvas () {

    const arrayX = [],
          arrayY = [];

    for(let i = 0; i < 20; i++) {
        let x = getRandomIntRange(0, maxX);
        let y = getRandomIntRange(0, maxY);

        arrayX.push(x);
        arrayY.push(y);
    }

    arrayX.forEach((item, i, arrayX) => {
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(item, arrayY[i], 20, 0, Math.PI * 2);
        ctx.fill();
    });

    console.log(arrayX);
    console.log(arrayY);

    data.changes = false;
}

// отрисовать текущий канвас
function render() {

    if (data.changes) {
        ctx.clearRect(0, 0, maxX, maxY);
        getCanvas (); 
    }

    requestAnimationFrame(render);
}

// слушатели
// отслеживаем изменение размера окна браузера
window.addEventListener('resize', ()=> this.resize());

// mouse parameters
canvas.addEventListener('click', (event)=> {
    data.mxClick = event.x;
    data.myClick = event.y;

    data.changes = true;
});

canvas.addEventListener('mousemove', (event)=> {
    data.mxMove = event.x;
    data.myMove = event.y;
});
