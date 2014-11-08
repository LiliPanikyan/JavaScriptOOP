var Shapes = (function () {
    Object.prototype.extends = function (parent) {
        this.prototype = Object.create(parent.prototype);
        this.prototype.constructor = this;
    }

    var Shape = (function () {
        function Shape(x, y, color) {           
                this._x = x;
                this._y = y;           
                this._color = color;          
        }

        Shape.prototype.draw = function () {
            var target = document.getElementById("canvasBox");
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
            this._radius = radius;            
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
            this._x2 = x2;
            this._y2 = y2;
            this._x3 = x3;
            this._y3 = y3;          
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
            this._x2 = x2;
            this._y2 = y2;
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
}());
