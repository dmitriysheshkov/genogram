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