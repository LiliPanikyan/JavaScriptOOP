var Shapes = (function () {
    Object.prototype.extends = function (parent) {
        this.prototype = Object.create(parent.prototype);
        this.prototype.constructor = this;
    }
    var Shape = (function () {
        function Shape(x, y, color) {
            try {
                validatePointValue(x, y);
                this._x = x;
                this._y = y;
            } catch (e) {
                alert(e.name + ": " + e.message)
            }
           
            try{
                validateHexaColor(color);
                this._color = color;
            } catch (e) {
                alert(e.name + ": " + e.message)
            }
        }
        
        Shape.prototype.draw = function () {
                var target = document.getElementById("myCanvas");
                var figure = target.getContext("2d");
                figure.fillStyle = this._color;                               
                figure.stroke();

                return figure;
        };

        Shape.prototype.toString = function () {            
            return 'Shape ' + JSON.stringify(this);
        }

        return Shape;
    }());

    var Rect = (function () {
        function Rect(x, y, color, width, height) {
            Shape.call(this, x, y, color);
            this._width = width;
            this._height = height;

            //try {
            //    validateRectangle(width, height)
            //    this._width = width;
            //    this._height = height;
            //} catch (e) {
            //    alert(e.name + ": " + e.message)
            //}            
        }

        Rect.extends(Shape);

        Rect.prototype.draw = function () {
            var drawRect = Shape.prototype.draw.call(this);            
            drawRect.fillRect(this._x, this._y, this._width, this._height);
            drawRect.fill();
            return drawRect;
        }

        Rect.prototype.toString = function () {
            return 'Rectangle ' + JSON.stringify(this);
        }

        return Rect;
    }());

    var Circle = (function () {
        function Circle(x, y, color, radius) {
            Shape.call(this, x, y, color);
            try {
                validateCircleRadius(radius)
                this._radius = radius;
            } catch (e) {
                alert(e.name + ": " + e.message)
            }            
        }

        Circle.extends(Shape);

        Circle.prototype.draw = function () {
            var drawCircle = Shape.prototype.draw.call(this);
            drawCircle.beginPath();            
            drawCircle.arc(this._x, this._y, this._radius, 0, 2 * Math.PI);
            drawCircle.fill();
            drawCircle.closePath();

            return drawCircle;
        }

        Circle.prototype.toString = function () {
            return 'Circle ' + JSON.stringify(this);
        }

        return Circle;
    }());

    var Triangle = (function () {
        function Triangle(x, y, x2, y2, x3, y3, color) {
            Shape.call(this, x, y, color);

            try {
                validatePointValue(x2, y2);
                validatePointValue(x3, y3);
                validateTriangle(x, y, x2, y2, x3, y3);

                this._x2 = x2;
                this._y2 = y2;
                this._x3 = x3;
                this._y3 = y3;
            } catch (e) {
                alert(e.name + ": " + e.message)
            }
        }

        Triangle.extends(Shape);

        Triangle.prototype.draw = function () {
            var drawTriangle = Shape.prototype.draw.call(this);

            drawTriangle.moveTo(this._x, this._y);
            drawTriangle.lineTo(this._x2, this._y2);
            drawTriangle.lineTo(this._x3, this._y3);
            drawTriangle.fill();
            drawTriangle.closePath();
            
            return drawTriangle;
        }

        Triangle.prototype.toString = function () {
            return 'Triangle ' + JSON.stringify(this);
        }
       
        return Triangle;
    }());

    var Segment = (function () {
        function Segment(x, y, x2, y2, color) {
            Shape.call(this, x, y, color);

            try {
                validatePointValue(x2, y2);
                
                this._x2 = x2;
                this._y2 = y2;
            } catch (e) {
                alert(e.name + ": " + e.message)
            }
        }

        Segment.extends(Shape);

        Segment.prototype.draw = function () {
            var drawSegment = Shape.prototype.draw.call(this);
            drawSegment.moveTo(this._x, this._y);
            drawSegment.lineTo(this._x2, this._y2);
            
            return drawSegment;
        }

        Segment.prototype.toString = function () {
            return 'Segment ' + JSON.stringify(this);
        }

        return Segment;

    }());

    var Point = (function () {
        function Point(x, y, color) {
            Shape.call(this, x, y, color);
        }

        Point.extends(Shape);

        Point.prototype.draw = function () {
            var drawPoint = Shape.prototype.draw.call(this);
            drawPoint.fillRect(this._x, this._y, 3, 3);

            return drawPoint;
        }

        Point.prototype.toString = function () {
            return 'Point ' + JSON.stringify(this);
        }

        return Point;
    }());

    return {
        Shape: Shape,
        Rect: Rect,
        Circle: Circle,
        Segment: Segment,
        Triangle: Triangle,
        Point: Point
    };

    //Validation methods
    function validatePointValue(x, y) {
        if (((x < 0 || x > 400) && (y < 0 || y > 200))) {
            throw new RangeError(' X should be in range [0...400], Y should be in range [0...200]!');
        } else if ((isNaN(parseFloat(x))) || (isNaN(parseFloat(y)))) {
            throw new SyntaxError('Point X and Point Y should be numbers!');
        }
    }

    function validateHexaColor(input) {
        if (!(typeof input === "string") &&
            !(input.length === 6) &&
            isNaN(parseInt(input, 16))) {
            throw new SyntaxError("Color should be string in hexadecimal format!")
        }       
    }

    //function validateRectangle(widthInput, heightInput) {
    //    var widthValue = parseFloat(widthInput);
    //    var heightValue = parseFloat(heightInput);

    //    if ((isNaN(widthValue) || isNaN(widthValue)||
    //        (widthValue < 0 || heightValue < 0) ||
    //        (widthValue === heightValue))) {

    //        throw new RangeError(' Width and Height should be positive numbers and cannot be equals!');
    //    } else if ((isNaN(width)) || (isNaN(height))) {
    //        throw new SyntaxError('Width and Height should be numbers!');
    //    }
    //}

    function validateCircleRadius(value) {
        if (value < 0) {
            throw new RangeError('Radius should be positive number!');
        } else if (isNaN(value)) {
            throw new SyntaxError('Radius should be number!');
        }
    }
    function validateTriangle(pointX1, pointY1, pointX2, pointY2, pointX3, pointY3) {
        
        var ab = Math.Sqrt(Math.Pow(pointX2 - pointX1, 2) + Math.Pow(pointY2 - pointY1, 2));
        var bc = Math.Sqrt(Math.Pow(pointX2 - pointX3, 2) + Math.Pow(pointY2 - pointY3, 2));
        var ac = Math.Sqrt(Math.Pow(pointX3 - pointX1, 2) + Math.Pow(pointY3 - pointY1, 2));

            if (!(ab + bc > ac && ab + ac > bc && ac + bc > ab)) {
                throw new RangeError('Your input does not form a valid triangle!');
            }

        }
    

}());
//var shape = new Shapes.Shape(5, 10, "#EEEEEE");
//var rectangle = new Shapes.Rect(10, 20, "#FF0000", 100, 50);
//var circle = new Shapes.Circle(100, 120, "#4B27EA", 40);
//var triangle = new Shapes.Triangle(125, 125, 125, 45, 45, 125, "##FBFF44");
//var segment = new Shapes.Segment(0, 0, 50, 50, "#FF006E");
//var point = new Shapes.Point(10, 10, "#871EFF");

//console.log(shape.toString());
//console.log(rectangle.toString());
//console.log(circle.toString());
//console.log(triangle.toString());
//console.log(segment.toString());
//console.log(point.toString());