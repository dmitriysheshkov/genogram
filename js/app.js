const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.classList.add('cursor--grab');

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

const persons = [
    {   
        surname: 'Сарухутдинова',
        name: 'Вениаммин',
        patronymic: 'Венниаминович',
        dataOfBirth: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00,
        dataOfDeath: '',
        gridPositionX: 0,
        gridPositionY: 0,
        width: 100,
        height: 100
        // testProp: {
        //     a: 1,
        //     b: 2
        // }
    }
];
class Person {
    constructor(obj) {
        this.gridPositionX = obj.gridPositionX;
        this.gridPositionY = obj.gridPositionY;
        this.width = obj.width;
        this.height = obj.height;
        this.color = obj.color;
        this.surname = obj.surname;
        this.name = obj.name;
        this.patronymic = obj.patronymic;
        this.dataOfBirth = obj.dataOfBirth;
        this.dataOfDeath = obj.dataOfDeath;


        // this.testProp = obj.testProp;
    }

    draw() {
        let cardSize = 300,
            cardMargin = cardSize / 6,
            cardColor = 'rgba(255, 255, 255, 0.01)',
            cardImageSizeX = cardSize /100 * 43.34,
            cardImageSizeY = cardSize /100 * 60,
            cardImageOffsetY = cardSize / 13,
            cardIconSizeX = cardSize /100 * 13.5,
            cardIconSizeY = cardSize /100 * 13.5;


        let cardX = globalX + ( this.gridPositionX * (cardSize + cardMargin * 2 )),
            cardY = globalY + ( this.gridPositionY * (cardSize + cardMargin * 2 ));

        let cardCtnterX = cardX + cardMargin + cardSize / 2,
            cardCtnterY = cardY + cardMargin + cardSize / 2;

        ctx.fillStyle = cardColor;
        ctx.beginPath();
        ctx.arc(cardCtnterX, cardCtnterY, cardSize / 2, 0, 2 * Math.PI);
        ctx.fill();

        let personImage = new Image();
        personImage.src = 'img/test-person.png';
        ctx.drawImage(personImage, cardCtnterX - cardImageSizeX / 2, cardY + cardMargin + cardImageOffsetY, cardImageSizeX, cardImageSizeY);

        // adds icons
        ctx.globalAlpha = 0.1;

        let personInfoIcon = new Image();
        personInfoIcon.src = 'img/icon-info.svg';
        ctx.drawImage(personInfoIcon, cardX + cardMargin + (cardSize / 100 * 8), cardCtnterY - cardIconSizeY / 2, cardIconSizeX, cardIconSizeY);

        let personMediaIcon = new Image();
        personMediaIcon.src = 'img/icon-media.svg';
        ctx.drawImage(personMediaIcon,  cardX + cardMargin + cardSize - ((cardSize / 100 * 11) * 2), cardCtnterY - cardIconSizeY / 2, cardIconSizeX, cardIconSizeY);
        
        ctx.globalAlpha = 1;

        // adds text
        function makeCardYears(y1, y2) {
            let dates;

            if (y2) {
                dates = `${ y1.getFullYear() }-${ y1.getFullYear() }`;
            } else {
                dates = y1.getFullYear();
            }

            return dates;
        }

        ctx.font = '14px Roboto';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText( this.surname.toUpperCase(), cardCtnterX, cardCtnterY + cardSize / 100 * 25 );
        ctx.fillText( this.name + ' ' + this.patronymic, cardCtnterX, cardCtnterY + cardSize / 100 * 31 );
        ctx.fillText( makeCardYears(this.dataOfBirth, this.dataOfDeath), cardCtnterX, cardCtnterY + cardSize / 100 * 38 );

        // adds connections

    }
}

const pageElements = [];

for (let i = 0; i <  persons.length; i++) {
    const newClass = new Person(persons[i]);
    pageElements.push(newClass);
}


// --------------------------------------------------------------------------------------------------------------------------------
function init(obj) {
    const { update, clear, render } = obj;

    requestAnimationFrame(loop);
    render();

    function loop() {

        if (appData.isMouseOut) { appData.isChanges = false; }

        if (appData.isChanges) {

            update();
            clear();
            render();

            appData.isChanges = false;
        }

        requestAnimationFrame(loop);
    } 
}

init({
    
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

        for (let i = 0; i < pageElements.length; i++) {
            pageElements[i].draw();
        }
    }

});

// listeners
window.addEventListener('resize', ()=> { appData.isChanges = true; });

window.addEventListener('keydown', (event)=> {

    if (event.code === 'ArrowRight') globalX += keyStep;
    if (event.code === 'ArrowLeft') globalX -=keyStep;
    if (event.code === 'ArrowUp') globalY -= keyStep;
    if (event.code === 'ArrowDown') globalY +=keyStep;

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
    const zoom = Math.exp( wheel * appData.zoomIntensity );

    scale *= zoom;

    globalX -= - (mmX / (scale * zoom) - mmX / scale);
    globalY -= - (mmY / (scale * zoom) - mmY / scale);

    shiftX = globalX * scale;
    shiftY = globalY * scale;

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
