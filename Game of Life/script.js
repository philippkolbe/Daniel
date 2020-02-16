var grid = [];
const RECT_SIZE = 10;
const WIDTH = 1500;
const HEIGHT = 720;

var rCount = 0;

var svg;

class Square {
    constructor (x, y, color) {
        this.x = x;
        this.y = y;

        this.size = {a: RECT_SIZE, b: RECT_SIZE};
        this.position = {x: x*this.size.a, y: y*this.size.b};
        this.color = color;
        this.lastColor = undefined;

        this.sameColorCount = 0;

        this.svgRect = this.createRectangle();
    }

    createRectangle() {
        var that = this;
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

        rect.setAttribute("x", this.position.x);
        rect.setAttribute("y", this.position.y);
        rect.setAttribute("height", this.size.a);
        rect.setAttribute("width", this.size.b);
        rect.setAttribute("fill", this.color);
        rect.setAttribute("stroke", "grey");

        svg.appendChild(rect);

        return rect;
    }

    draw() {
        this.svgRect.setAttribute("fill", this.color);
    }

    getNrOfAliveNeighbours() {
        var count = 0;
        
        for (var ix = -1; ix <= 1; ix++) {
            for (var iy = -1; iy <= 1; iy++) {
                if (ix != 0 || iy != 0) {
                    if (this.x + ix >= 0 && this.y + iy >= 0) {
                        if (this.x + ix < WIDTH/this.size.a && this.y + iy < HEIGHT/this.size.b) {
                            var rect = grid[this.x + ix][this.y + iy];
                            
                            if (!rect) {
                                console.log(this.x + ix, this.y + iy);
                            }
                            if (rect.color == "black") {
                                count++;
                            }
                        }
                    }
                } 
            }   
        } 

        return count;
    }

    updateColor(nrOfNeighbours) {
        this.lastColor = this.color;

        var directDeathRdm = Math.random();

        if (directDeathRdm > f(rCount)) {
            var rdm = Math.random();

            if (this.sameColorCount > 3) {
                if (rdm > 0.1) {
                    this.color = "white";
                    this.sameColorCount = 0;
                }
            } else {
                if (nrOfNeighbours == 3) {
                    if (rdm > 0.1) {
                        this.color = "black";
                    }
                } else if (nrOfNeighbours < 2) {
                    if (rdm > 0.5) {
                        this.color = "white";
                    }
                } else if (nrOfNeighbours > 3) {
                    if (rdm > 0.5) {
                        this.color = "white";
                    }
                }
            }        
        } else {
            this.color = "white";
        }

        
        if (this.color == this.lastColor) {
            this.sameColorCount++;
        } else {
            this.sameColorCount = 0;
        }
    }
}

function f(x) {
    var peakTroughRatio = 2;
    var maxProbability = 0.07;
    var constantProbability = 0.01;
    var horizontalExtension = 0.1;

    return -maxProbability*Math.exp(-Math.pow(Math.cos(horizontalExtension*x), peakTroughRatio)) + maxProbability + constantProbability;
}

function onload() {
    svg = document.getElementById("svg");

    for (var ix = 0; ix < WIDTH/RECT_SIZE; ix++) {
        let column = [];
        for (var iy = 0; iy < HEIGHT/RECT_SIZE; iy++) {
            let rdm = Math.random();
            let color;
            if (rdm > 0.5) {
                color = "white";
            } else {
                color = "black";
            }

            column.push(new Square(ix, iy, color));
        }

        grid.push(column);
    }

    setInterval(run, 10);
}

function run() {
    console.log(f(rCount));

    for (var column of grid) {
        for (var rect of column) {
            // Anzahl lebender Nachbarn berechnen
            var nrOfNeighbours = rect.getNrOfAliveNeighbours();

            // Farbe mit Anzahl lebender Nachbarn updaten
            rect.updateColor(nrOfNeighbours);

            // Rechteck malen
            rect.draw();
        }
    }

    rCount++;
}