var Sb;
(function (Sb) {
    class GraficObject {
        constructor() {
            this._absLeft = 0;
            this._absTop = 0;
            this._children = [];
        }
        // public constructor() {}
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
            this._width = 0;
            this._height = 0;
            this._left = 0;
            this._top = 0;
            this._fill = "rgb(0, 0, 0)";
            this._horizontalAlignment = "left";
            this._verticalAlignment = "top";
        }
        // public constructor(style?: Object) {}
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
    class Rect extends Sb.Shape {
        constructor(style) {
            super();
            this._borderRadius = 0;
            if (style)
                this.Style = style;
        }
        get BorderRadius() { return this._borderRadius; }
        set BorderRadius(value) { this._borderRadius = value; }
        set Style(style) {
            super.Style = style;
            if (style["borderRadius"])
                this.BorderRadius = style["borderRadius"];
        }
        Render(ctx) {
            ctx.beginPath();
            ctx.fillStyle = this.Fill;
            this.SetAbsPos(ctx);
            ctx.roundRect(this.AbsLeft, this.AbsTop, this.Width, this.Height, this.BorderRadius);
            ctx.closePath();
            ctx.fill();
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
            if (style)
                this.Style = style;
        }
        // private set Width(value: number) {}
        // private set Height(value: number) {}
        get Radius() { return this._radius; }
        set Radius(value) {
            this._radius = this.Width = this.Height = value;
        }
        set Style(style) {
            super.Style = style;
            if (style["radius"])
                this.Radius = style["radius"];
        }
        Render(ctx) {
            ctx.beginPath();
            ctx.fillStyle = this.Fill;
            this.SetAbsPos(ctx);
            ctx.roundRect(this.AbsLeft, this.AbsTop, this.Radius, this.Radius, this.Radius);
            ctx.closePath();
            ctx.fill();
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
    class Canvas extends Sb.GraficObject {
        constructor(id) {
            super();
            this.SCALE = 2;
            this._fps = new Sb.Fps();
            window.devicePixelRatio = this.SCALE;
            this._canvas = document.getElementById(id);
            this._ctx = this._canvas.getContext("2d");
            this.SetListeners();
        }
        get Width() { return this._canvas.width / this.SCALE; }
        set Width(value) {
            this._canvas.style.width = `${value}px`;
            this._canvas.width = value * this.SCALE;
        }
        get Height() { return this._canvas.height / this.SCALE; }
        set Height(value) {
            this._canvas.style.height = `${value}px`;
            this._canvas.height = value * this.SCALE;
        }
        get Fps() { return this._fps; }
        static GetInstance(id) { var _a; return (_a = Canvas._instance) !== null && _a !== void 0 ? _a : (Canvas._instance = new Canvas(id)); }
        Render() {
            Canvas._instance.Children.forEach(child => {
                child.Render(Canvas._instance._ctx);
            });
        }
        RenderFBF(maxFps = 1000) {
            this._ctx.scale(this.SCALE, this.SCALE);
            this.AppendChild(this.Fps);
            setInterval(() => {
                this._ctx.clearRect(0, 0, this.Width, this.Height);
                this.Render();
            }, 1000 / maxFps);
        }
        SetListeners() {
            this._canvas.addEventListener("mousedown", this.OnMouseDown);
            this._canvas.addEventListener("mousemove", this.OnMouseMove);
        }
        OnMouseDown(event) {
            // this.Children[0].Style.left = event.screenX;
            const firstChild = Canvas._instance.Children[0];
            // firstChild.Style.left = event.clientX;
            // firstChild.Style.top = event.clientY;
            // console.log(Canvas._instance.Children)
        }
        OnMouseMove(event) {
            // console.log(event);
        }
    }
    Sb.Canvas = Canvas;
})(Sb || (Sb = {}));
