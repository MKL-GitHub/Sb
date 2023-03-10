var Sb;
(function (Sb) {
    class GraficObject {
        constructor() {
            this._absLeft = 0;
            this._absTop = 0;
            this._children = [];
        }
        get AbsLeft() { return this._absLeft; }
        set AbsLeft(value) { this._absLeft = value; }
        get AbsTop() { return this._absTop; }
        set AbsTop(value) { this._absTop = value; }
        get Children() { return this._children; }
        set Children(value) { this._children = value; }
        get Parent() { return this._parent; }
        set Parent(value) { this._parent = value; }
        AppendChild(child) {
            this._children.push(child);
            child.Parent = this;
        }
        set Style(style) {
            if (style["width"])
                this.Width = style["width"];
            if (style["height"])
                this.Height = style["height"];
        }
    }
    Sb.GraficObject = GraficObject;
})(Sb || (Sb = {}));
var Sb;
(function (Sb) {
    class Shape extends Sb.GraficObject {
        constructor() {
            super(...arguments);
            this._isSelected = false;
            this._width = 0;
            this._height = 0;
            this._left = 0;
            this._top = 0;
            this._fill = "rgb(0, 0, 0)";
            this._horizontalAlignment = "left";
            this._verticalAlignment = "top";
        }
        get IsSelected() { return this._isSelected; }
        set IsSelected(value) {
            if (this._isSelected == value)
                return;
            this._isSelected = value;
            if (value) {
                if (!this._controls)
                    this._controls = new Sb.ShapeControls(this);
                this.AppendChild(this._controls);
            }
            else {
                if (this.Children[this.Children.length - 1] instanceof Sb.ShapeControls) {
                    this.Children.pop();
                }
                else {
                    console.log("Mistake");
                }
            }
        }
        get Width() { return this._width; }
        set Width(value) { this._width = value; }
        get Height() { return this._height; }
        set Height(value) { this._height = value; }
        get Left() { return this._left; }
        set Left(value) { this._left = value; }
        get Top() { return this._top; }
        set Top(value) { this._top = value; }
        get Fill() { return this._fill; }
        set Fill(value) { this._fill = value; }
        get HorizontalAlignment() { return this._horizontalAlignment; }
        set HorizontalAlignment(value) { this._horizontalAlignment = value; }
        get VerticalAlignment() { return this._verticalAlignment; }
        set VerticalAlignment(value) { this._verticalAlignment = value; }
        set Style(style) {
            super.Style = style;
            if (style["left"])
                this.Left = style["left"];
            if (style["top"])
                this.Top = style["top"];
            if (style["fill"])
                this.Fill = style["fill"];
            if (style["horizontalAlignment"])
                this.HorizontalAlignment = style["horizontalAlignment"];
            if (style["verticalAlignment"])
                this.VerticalAlignment = style["verticalAlignment"];
        }
        SetAbsPos(ctx) {
            this.AbsLeft = this.Left + this.Parent.AbsLeft;
            this.AbsTop = this.Top + this.Parent.AbsTop;
            if (this.HorizontalAlignment == "center")
                this.AbsLeft += this.Parent.Width / 2 - this.Width / 2;
            else if (this.HorizontalAlignment == "right")
                this.AbsLeft += this.Parent.Width - this.Width;
            if (this.VerticalAlignment == "center")
                this.AbsTop += this.Parent.Height / 2 - this.Height / 2;
            else if (this.VerticalAlignment == "bottom")
                this.AbsTop += this.Parent.Height - this.Height;
        }
        RenderChildren(ctx, shape) {
            shape.Children.forEach(child => {
                child.Render(ctx);
                this.RenderChildren(ctx, child);
            });
        }
        Render(ctx) {
            this.RenderChildren(ctx, this);
        }
    }
    Sb.Shape = Shape;
})(Sb || (Sb = {}));
var Sb;
(function (Sb) {
    class Line extends Sb.Shape {
        constructor(style) {
            super();
            this._leftEnd = this.Left;
            this._topEnd = this.Top;
            this._lineWidth = 1;
            if (style)
                this.Style = style;
        }
        get AbsLeftEnd() { return this._absLeftEnd; }
        set AbsLeftEnd(value) { this._absLeftEnd = value; }
        get AbsTopEnd() { return this._absTopEnd; }
        set AbsTopEnd(value) { this._absTopEnd = value; }
        get LeftEnd() { return this._leftEnd; }
        set LeftEnd(value) { this._leftEnd = value; }
        get TopEnd() { return this._topEnd; }
        set TopEnd(value) { this._topEnd = value; }
        get LineWidth() { return this._lineWidth; }
        set LineWidth(value) { this._lineWidth = value; }
        set Style(style) {
            super.Style = style;
            if (style["leftEnd"])
                this.LeftEnd = style["leftEnd"];
            if (style["topEnd"])
                this.TopEnd = style["topEnd"];
            if (style["lineWidth"])
                this.LineWidth = style["lineWidth"];
        }
        SetAbsPos(ctx) {
            super.SetAbsPos(ctx);
            this.AbsLeftEnd = this.LeftEnd + this.Parent.AbsLeft;
            this.AbsTopEnd = this.TopEnd + this.Parent.AbsTop;
            // if (this.HorizontalAlignment == "center") this.AbsLeft += this.Parent.Width / 2 - this.Width / 2;
            // else if (this.HorizontalAlignment == "right") this.AbsLeft += this.Parent.Width - this.Width;
            // if (this.VerticalAlignment == "center") this.AbsTop += this.Parent.Height / 2 - this.Height / 2;
            // else if (this.VerticalAlignment == "bottom") this.AbsTop += this.Parent.Height - this.Height;
        }
        Render(ctx) {
            ctx.beginPath();
            ctx.strokeStyle = this.Fill;
            ctx.lineWidth = this.LineWidth;
            this.Width = Math.abs(this.Left - this.LeftEnd);
            this.Height = Math.abs(this.Top - this.TopEnd);
            this.SetAbsPos(ctx);
            ctx.moveTo(this.AbsLeft, this.AbsTop);
            ctx.lineTo(this.AbsLeftEnd, this.AbsTopEnd);
            ctx.closePath();
            ctx.stroke();
            super.Render(ctx);
        }
    }
    Sb.Line = Line;
})(Sb || (Sb = {}));
var Sb;
(function (Sb) {
    class Rect extends Sb.Shape {
        constructor(style) {
            super();
            this._borderRadius = 0;
            this._borderWidth = 0;
            this._borderColor = "rgb(0, 0, 0)";
            if (style)
                this.Style = style;
        }
        get BorderRadius() { return this._borderRadius; }
        set BorderRadius(value) { this._borderRadius = value; }
        get BorderWidth() { return this._borderWidth; }
        set BorderWidth(value) { this._borderWidth = value; }
        get BorderColor() { return this._borderColor; }
        set BorderColor(value) { this._borderColor = value; }
        set Style(style) {
            super.Style = style;
            if (style["borderRadius"])
                this.BorderRadius = style["borderRadius"];
            if (style["borderWidth"])
                this.BorderWidth = style["borderWidth"];
            if (style["borderColor"])
                this.BorderColor = style["borderColor"];
        }
        Render(ctx) {
            ctx.beginPath();
            ctx.fillStyle = this.Fill;
            ctx.strokeStyle = this.BorderColor;
            ctx.lineWidth = this.BorderWidth;
            this.SetAbsPos(ctx);
            ctx.roundRect(this.AbsLeft, this.AbsTop, this.Width, this.Height, this.BorderRadius);
            ctx.closePath();
            if (this.Fill != "transparent")
                ctx.fill();
            if (this.BorderWidth)
                ctx.stroke();
            super.Render(ctx);
        }
    }
    Sb.Rect = Rect;
})(Sb || (Sb = {}));
var Sb;
(function (Sb) {
    class Circle extends Sb.Shape {
        constructor(style) {
            super();
            this._radius = 0;
            this._borderWidth = 0;
            if (style)
                this.Style = style;
        }
        // private set Width(value: number) {}
        // private set Height(value: number) {}
        get Radius() { return this._radius; }
        set Radius(value) { this._radius = this.Width = this.Height = value; }
        get BorderWidth() { return this._borderWidth; }
        set BorderWidth(value) { this._borderWidth = value; }
        set Style(style) {
            super.Style = style;
            if (style["radius"])
                this.Radius = style["radius"];
            if (style["borderWidth"])
                this.BorderWidth = style["borderWidth"];
        }
        Render(ctx) {
            ctx.beginPath();
            ctx.fillStyle = this.Fill;
            ctx.lineWidth = this.BorderWidth;
            this.SetAbsPos(ctx);
            ctx.roundRect(this.AbsLeft, this.AbsTop, this.Radius, this.Radius, this.Radius);
            ctx.closePath();
            ctx.fill();
            if (this.BorderWidth)
                ctx.stroke();
            super.Render(ctx);
        }
    }
    Sb.Circle = Circle;
})(Sb || (Sb = {}));
var Sb;
(function (Sb) {
    class Text extends Sb.Shape {
        constructor(_value, style) {
            super();
            this._value = _value;
            this._fontSize = 10;
            this._fontFamily = "Arial";
            this._textBaseline = "top";
            this._textAlign = "left";
            if (style)
                this.Style = style;
        }
        get Value() { return this._value; }
        set Value(value) { this._value = value; }
        get FontSize() { return this._fontSize; }
        set FontSize(value) { this._fontSize = this.Height = value; }
        get FontFamily() { return this._fontFamily; }
        set FontFamily(value) { this._fontFamily = value; }
        get TextBaseline() { return this._textBaseline; }
        set TextBaseline(value) { this._textBaseline = value; }
        get TextAlign() { return this._textAlign; }
        set TextAlign(value) { this._textAlign = value; }
        set Style(style) {
            super.Style = style;
            if (style["fontSize"])
                this.FontSize = style["fontSize"];
            if (style["fontFamily"])
                this.FontFamily = style["fontFamily"];
            if (style["textBaseline"])
                this.TextBaseline = style["textBaseline"];
            if (style["textAlign"])
                this.TextAlign = style["textAlign"];
        }
        Render(ctx) {
            ctx.font = "" + this.FontSize + "px " + this.FontFamily;
            ctx.fillStyle = this.Fill;
            ctx.textBaseline = this.TextBaseline;
            ctx.textAlign = this.TextAlign;
            this.Width = ctx.measureText(this.Value).width;
            this.SetAbsPos(ctx);
            ctx.fillText(this._value, this.AbsLeft, this.AbsTop);
            super.Render(ctx);
        }
    }
    Sb.Text = Text;
})(Sb || (Sb = {}));
var Sb;
(function (Sb) {
    class Fps extends Sb.Text {
        constructor(style) {
            super("", style);
            this._fps = 0;
            this._lastTime = performance.now() + 1000;
            this._fpsToShow = 0;
        }
        SetFPS() {
            const currentTime = performance.now();
            this._fps++;
            if (this._lastTime < currentTime) {
                this._fpsToShow = this._fps;
                this._fps = 0;
                this._lastTime = currentTime + 1000;
            }
            this.Value = `${Math.round(this._fpsToShow)} fps`;
        }
        Render(ctx) {
            this.SetFPS();
            super.Render(ctx);
        }
    }
    Sb.Fps = Fps;
})(Sb || (Sb = {}));
var Sb;
(function (Sb) {
    class Triangle extends Sb.Shape {
        constructor(style) {
            super();
            this._peak = "top";
            if (style)
                this.Style = style;
        }
        get Peak() { return this._peak; }
        set Peak(value) { this._peak = value; }
        set Style(style) {
            super.Style = style;
            if (style["peak"])
                this.Peak = style["peak"];
        }
        Render(ctx) {
            ctx.beginPath();
            ctx.fillStyle = this.Fill;
            this.SetAbsPos(ctx);
            if (this.Peak == "bottom") {
                ctx.moveTo(this.AbsLeft, this.AbsTop);
                ctx.lineTo(this.AbsLeft + this.Width, this.AbsTop);
                ctx.lineTo(this.AbsLeft + this.Width / 2, this.AbsTop + this.Height);
            }
            else if (this.Peak == "right") {
                ctx.moveTo(this.AbsLeft, this.AbsTop);
                ctx.lineTo(this.AbsLeft + this.Width, this.AbsTop + this.Height / 2);
                ctx.lineTo(this.AbsLeft, this.AbsTop + this.Height);
            }
            else if (this.Peak == "left") {
                ctx.moveTo(this.AbsLeft, this.AbsTop + this.Height / 2);
                ctx.lineTo(this.AbsLeft + this.Width, this.AbsTop);
                ctx.lineTo(this.AbsLeft + this.Width, this.AbsTop + this.Height);
            }
            else {
                ctx.moveTo(this.AbsLeft, this.AbsTop + this.Height);
                ctx.lineTo(this.AbsLeft + this.Width / 2, this.AbsTop);
                ctx.lineTo(this.AbsLeft + this.Width, this.AbsTop + this.Height);
            }
            ctx.closePath();
            ctx.fill();
            super.Render(ctx);
        }
    }
    Sb.Triangle = Triangle;
})(Sb || (Sb = {}));
var Sb;
(function (Sb) {
    class ShapeControls extends Sb.Rect {
        constructor(shape) {
            super();
            this.SIZE = 10;
            this.HALF_SIZE = this.SIZE / 2;
            this._controlsStyle = {
                width: this.SIZE,
                height: this.SIZE,
                fill: "rgb(120, 130, 120)",
                borderWidth: 1,
            };
            const doubleSize = this.SIZE * 2;
            this.Left = -this.SIZE;
            this.Top = -this.SIZE;
            this.Width = shape.Width + doubleSize;
            this.Height = shape.Height + doubleSize;
            this.Fill = "transparent";
            this.BorderWidth = 1;
            this.BorderColor = "rgba(0, 0, 0, 0.7)";
            this.CreateTopLeft();
            this.CreateTopRight();
            this.CreateBottomLeft();
            this.CreateBottomRight();
            this.CreateRotation();
        }
        CreateTopLeft() {
            const control = new Sb.Rect(Object.assign(Object.assign({}, this._controlsStyle), { left: -this.HALF_SIZE, top: -this.HALF_SIZE }));
            this.AppendChild(control);
        }
        CreateTopRight() {
            const control = new Sb.Rect(Object.assign(Object.assign({}, this._controlsStyle), { left: this.Width - this.HALF_SIZE, top: -this.HALF_SIZE }));
            this.AppendChild(control);
        }
        CreateBottomLeft() {
            const control = new Sb.Rect(Object.assign(Object.assign({}, this._controlsStyle), { left: -this.HALF_SIZE, top: this.Height - this.HALF_SIZE }));
            this.AppendChild(control);
        }
        CreateBottomRight() {
            const control = new Sb.Rect(Object.assign(Object.assign({}, this._controlsStyle), { left: this.Width - this.HALF_SIZE, top: this.Height - this.HALF_SIZE }));
            this.AppendChild(control);
        }
        CreateRotation() {
            const size = this.SIZE * 4 / 3;
            const halfSize = size / 2;
            const control = new Sb.Circle({
                radius: size,
                left: this.Width / 2 - halfSize,
                top: -this.SIZE * 2.5,
                fill: "rgb(120, 130, 120)",
                borderWidth: 1,
            });
            const line = new Sb.Line({
                left: halfSize,
                top: size,
                leftEnd: halfSize,
                topEnd: this.SIZE * 2.5,
            });
            control.AppendChild(line);
            this.AppendChild(control);
        }
    }
    Sb.ShapeControls = ShapeControls;
})(Sb || (Sb = {}));
var Sb;
(function (Sb) {
    class Canvas extends Sb.GraficObject {
        constructor(id) {
            super();
            this.SCALE = 2;
            this._fps = new Sb.Fps();
            this._isScaled = false;
            window.devicePixelRatio = this.SCALE;
            this._canvas = document.getElementById(id);
            this._ctx = this._canvas.getContext("2d");
            this.SetListeners();
        }
        get Width() { return this._canvas.width / this.SCALE; }
        set Width(value) {
            this._canvas.style.width = `${value}px`;
            this._canvas.width = Math.floor(value * this.SCALE);
        }
        get Height() { return this._canvas.height / this.SCALE; }
        set Height(value) {
            this._canvas.style.height = `${value}px`;
            this._canvas.height = Math.floor(value * this.SCALE);
        }
        get Fps() { return this._fps; }
        static GetInstance(id) { var _a; return (_a = Canvas._instance) !== null && _a !== void 0 ? _a : (Canvas._instance = new Canvas(id)); }
        Render() {
            this._ctx.clearRect(0, 0, this.Width, this.Height);
            if (!this._isScaled) {
                this._ctx.scale(this.SCALE, this.SCALE);
                this._isScaled = true;
            }
            Canvas._instance.Children.forEach(child => {
                child.Render(Canvas._instance._ctx);
            });
        }
        RenderFBF(maxFps = 1000) {
            this.AppendChild(this.Fps);
            setInterval(() => { this.Render(); }, 1000 / maxFps);
        }
        SetListeners() {
            this._canvas.addEventListener("mousedown", this.OnMouseDown);
            this._canvas.addEventListener("mousemove", this.OnMouseMove);
            this._canvas.addEventListener("mouseup", this.OnMouseUp);
        }
        static IsInsideShape(event, shape) {
            let result = false;
            if (shape instanceof Sb.Rect ||
                shape instanceof Sb.Circle) {
                let radius = shape instanceof Sb.Rect ? shape.BorderRadius : shape.Radius;
                const halfWidth = shape.Width / 2;
                const halfHeight = shape.Height / 2;
                const minHalfSide = Math.min(halfWidth, halfHeight);
                radius = minHalfSide <= radius
                    ? minHalfSide
                    : radius;
                const x = event.clientX - shape.Left - halfWidth;
                const y = event.clientY - shape.Top - halfHeight;
                const x_ = Math.abs(x) - halfWidth + radius;
                const y_ = Math.abs(y) - halfHeight + radius;
                result = Math.pow(x_ + Math.abs(x_), 2) + Math.pow(y_ + Math.abs(y_), 2) <= Math.pow(2 * radius, 2);
            }
            // if (event.clientX >= shape.AbsLeft &&
            //     event.clientX <= shape.AbsLeft + shape.Width &&
            //     event.clientY >= shape.AbsTop &&
            //     event.clientY <= shape.AbsTop + shape.Height) {
            //        result = true;
            //        end = performance.now();
            //        console.log(shape);
            // }
            return result;
        }
        OnMouseDown(event) {
            const children = Canvas._instance.Children;
            const start = Date.now();
            let end;
            for (let i = children.length - 1; i >= 0; i--) {
                if (Canvas.IsInsideShape(event, children[i])) {
                    const selectedShape = children.splice(i, 1)[0];
                    if (Canvas._selectedShape && Canvas._selectedShape != selectedShape) {
                        Canvas._selectedShape.IsSelected = false;
                    }
                    Canvas._selectedShape = selectedShape;
                    Canvas._selectedShape.IsSelected = true;
                    Canvas._instance.AppendChild(Canvas._selectedShape);
                    Canvas._mouseDown = {
                        shape: Canvas._selectedShape,
                        shapeLeft: Canvas._selectedShape.Left,
                        shapeTop: Canvas._selectedShape.Top,
                        mouseLeft: event.clientX,
                        mouseTop: event.clientY,
                    };
                    break;
                }
            }
            end = Date.now();
            console.log("Time: ", end - start);
            // console.log(Canvas._mouseDown);
            Canvas._instance.Render();
        }
        OnMouseUp(event) {
            Canvas._mouseDown = undefined;
        }
        OnMouseMove(event) {
            if (!Canvas._mouseDown)
                return;
            const shiftLeft = event.clientX - Canvas._mouseDown.mouseLeft;
            const shiftTop = event.clientY - Canvas._mouseDown.mouseTop;
            // console.log(shiftLeft);
            Canvas._mouseDown.shape.Left = Canvas._mouseDown.shapeLeft + shiftLeft;
            Canvas._mouseDown.shape.Top = Canvas._mouseDown.shapeTop + shiftTop;
            Canvas._instance.Render();
        }
    }
    Sb.Canvas = Canvas;
})(Sb || (Sb = {}));
