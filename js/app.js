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
        visible: true,
        surname: 'Сарухутдинова',
        name: 'Вениаммин',
        patronymic: 'Венниаминович',
        dataOfBirth: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00,
        dataOfDeath: '',
        imageURL: 'img/test-person.png',
        pageURL: '',
        gridPositionX: 0,
        gridPositionY: 0,
        connectionLeft: {
            isConnection: false,
            dateStart: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            dateEnd: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            casual: false,
            married: false,
            divorce: false,
            children: false,
            childrenLeftLineLength: 1,
            childrenRightLineLength: 0
        },
        connectionRight: {
            isConnection: true,
            dateStart: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            dateEnd: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            casual: false,
            married: true,
            divorce: false,
            children: true,
            childrenLeftLineLength: 0,
            childrenRightLineLength: 0
        }
    },
    {   
        visible: true,
        surname: 'Сарухутдинова',
        name: 'Вениаммин',
        patronymic: 'Венниаминович',
        dataOfBirth: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00,
        dataOfDeath: '',
        imageURL: 'img/test-person.png',
        pageURL: '',
        gridPositionX: 1,
        gridPositionY: 0,
        connectionLeft: {
            isConnection: true,
            dateStart: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            dateEnd: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            casual: false,
            married: true,
            divorce: false,
            children: false,
            childrenLeftLineLength: 0,
            childrenRightLineLength: 0
        },
        connectionRight: {
            isConnection: true,
            dateStart: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            dateEnd: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            casual: true,
            married: false,
            divorce: false,
            children: true,
            childrenLeftLineLength: 0,
            childrenRightLineLength: 0
        }
    },
    {   
        visible: true,
        surname: 'Сарухутдинова',
        name: 'Вениаммин',
        patronymic: 'Венниаминович',
        dataOfBirth: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00,
        dataOfDeath: '',
        imageURL: 'img/test-person.png',
        pageURL: '',
        gridPositionX: -0.5,
        gridPositionY: 1,
        connectionLeft: {
            isConnection: false,
            dateStart: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            dateEnd: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            casual: false,
            married: false,
            divorce: false,
            children: false,
            childrenLeftLineLength: 0,
            childrenRightLineLength: 0
        },
        connectionRight: {
            isConnection: false,
            dateStart: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            dateEnd: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            casual: false,
            married: false,
            divorce: false,
            children: false,
            childrenLeftLineLength: 0,
            childrenRightLineLength: 0
        }
    },
    {   
        visible: true,
        surname: 'Сарухутдинова',
        name: 'Вениаммин',
        patronymic: 'Венниаминович',
        dataOfBirth: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00,
        dataOfDeath: '',
        imageURL: 'img/test-person.png',
        pageURL: '',
        gridPositionX: 0.5,
        gridPositionY: 1,
        connectionLeft: {
            isConnection: false,
            dateStart: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            dateEnd: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            casual: false,
            married: false,
            divorce: false,
            children: false,
            childrenLeftLineLength: 0,
            childrenRightLineLength: 0
        },
        connectionRight: {
            isConnection: true,
            dateStart: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            dateEnd: new Date(2011, 0, 1, 0, 0, 0, 0), // 1 января 2011, 00:00:00
            casual: false,
            married: true,
            divorce: false,
            children: true,
            childrenLeftLineLength: 0,
            childrenRightLineLength: 0
        }
    }
];
class Person {

    constructor(obj) {
        this.surname = obj.surname;
        this.name = obj.name;
        this.patronymic = obj.patronymic;
        this.dataOfBirth = obj.dataOfBirth;
        this.dataOfDeath = obj.dataOfDeath;
        this.imageURL = obj.imageURL;
        this.pageURL = obj.pageURL;
        this.gridPositionX = obj.gridPositionX;
        this.gridPositionY = obj.gridPositionY;
        this.connectionLeft = obj.connectionLeft;
        this.connectionRight = obj.connectionRight;
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

        let cardCenterX = cardX + cardMargin + cardSize / 2,
            cardCenterY = cardY + cardMargin + cardSize / 2;

        ctx.fillStyle = cardColor;
        ctx.beginPath();
        ctx.arc(cardCenterX, cardCenterY, cardSize / 2, 0, 2 * Math.PI);
        ctx.fill();

        let personImage = new Image();
        personImage.src = this.imageURL;
        ctx.drawImage(personImage, cardCenterX - cardImageSizeX / 2, cardY + cardMargin + cardImageOffsetY, cardImageSizeX, cardImageSizeY);

        // adds icons
        ctx.globalAlpha = 0.1;

        let personInfoIcon = new Image();
        personInfoIcon.src = 'img/icon-info.svg';
        ctx.drawImage(personInfoIcon, cardX + cardMargin + (cardSize / 100 * 8), cardCenterY - cardIconSizeY / 2, cardIconSizeX, cardIconSizeY);

        let personMediaIcon = new Image();
        personMediaIcon.src = 'img/icon-media.svg';
        ctx.drawImage(personMediaIcon,  cardX + cardMargin + cardSize - ((cardSize / 100 * 11) * 2), cardCenterY - cardIconSizeY / 2, cardIconSizeX, cardIconSizeY);
        
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
        ctx.fillText( this.surname.toUpperCase(), cardCenterX, cardCenterY + cardSize / 100 * 25 );
        ctx.fillText( this.name + ' ' + this.patronymic, cardCenterX, cardCenterY + cardSize / 100 * 31 );
        ctx.fillText( makeCardYears(this.dataOfBirth, this.dataOfDeath), cardCenterX, cardCenterY + cardSize / 100 * 38 );

        // adds connections
        function drawConnectionLine(startX, startY, endX, endY, dashed) {
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 1;
            ctx.beginPath();

            if (dashed) {
                ctx.setLineDash([5, 5]);
            }

            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();

            ctx.setLineDash([0, 0]); // отменяем dashed для последующих линий
        }

        function drawConnectionPoint(x, y) {
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        }

        const leftConections = this.connectionLeft;
        const rightConections = this.connectionRight;

        function drawAsideConnectionLines() {

            // up connection
            drawConnectionLine(cardCenterX, cardY, cardCenterX, cardY + cardMargin, false);
            drawConnectionPoint(cardCenterX, cardY);

            // left connection
            if (leftConections.isConnection) {
                drawConnectionLine(cardX, cardCenterY, cardX + cardMargin, cardCenterY, leftConections.casual);

                if (leftConections.married) {
                    drawConnectionLine(cardX, cardCenterY - 10, cardX + cardMargin, cardCenterY - 10, false);
                }

                if (leftConections.children) {
                    drawConnectionPoint(cardX, cardCenterY);
                    drawConnectionLine(cardX, cardCenterY, cardX, cardY + cardSize + cardMargin * 2, false);
                    drawConnectionPoint(cardX, cardY + cardSize + cardMargin * 2);
                }
            }

            // right connection
            if (rightConections.isConnection) {
                // drawConnectionPoint(cardX, cardCenterY);
                drawConnectionLine(cardX + cardSize + cardMargin, cardCenterY, cardX + cardSize + cardMargin * 2, cardCenterY, rightConections.casual);

                if (rightConections.married) {
                    drawConnectionLine(cardX + cardSize + cardMargin, cardCenterY - 10, cardX + cardSize + cardMargin * 2, cardCenterY - 10, false);
                }

                if (rightConections.children) {
                    drawConnectionPoint(cardX + cardSize + cardMargin * 2, cardCenterY);
                    drawConnectionLine(
                        cardX + cardSize + cardMargin * 2,
                        cardCenterY,
                        cardX + cardSize + cardMargin * 2,
                        cardY + cardSize + cardMargin * 2, false
                    );
                    drawConnectionPoint(cardX + cardSize + cardMargin * 2, cardY + cardSize + cardMargin * 2);

                    drawConnectionLine(
                        cardX + cardSize + cardMargin * 2,
                        cardY + cardSize + cardMargin * 2,
                        cardX + cardSize + cardMargin * 2 + (leftConections.childrenRightLineLength * (cardSize + cardMargin * 2)),
                        cardY + cardSize + cardMargin * 2,
                        false
                    );
                    drawConnectionLine(
                        cardX + cardSize + cardMargin * 2,
                        cardY + cardSize + cardMargin * 2,
                        cardX + cardSize + cardMargin * 2 - (leftConections.childrenLeftLineLength * (cardSize + cardMargin * 2)),
                        cardY + cardSize + cardMargin * 2,
                        false
                    );
                }
            }
        }

        
            
        drawAsideConnectionLines();
    }
}

const pageElements = [];

for (let i = 0; i < persons.length; i++) {
    if (persons[i].visible) {
        const newClass = new Person(persons[i]);
        pageElements.push(newClass);
    } 
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
