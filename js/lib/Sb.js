var Sb;
(function (Sb) {
    class Canvas {
        constructor(id) {
            this._children = [];
            this._fps = new Sb.Fps();
            this._canvas = document.getElementById(id);
            this._ctx = this._canvas.getContext("2d");
            this.SetListeners();
        }
        get Width() { return this._canvas.width; }
        set Width(value) { this._canvas.width = value; }
        get Height() { return this._canvas.height; }
        set Height(value) { this._canvas.height = value; }
        get Children() { return this._children; }
        // set Children(value) { this._children = value; } 
        get Fps() { return this._fps; }
        static GetInstance(id) {
            var _a;
            return (_a = Canvas._instance) !== null && _a !== void 0 ? _a : (Canvas._instance = new Canvas(id));
        }
        AppendChild(value) { this._children.push(value); }
        Render() {
            Canvas._instance.Children.forEach(child => {
                child.Render(Canvas._instance._ctx);
                // console.log(this._temp);
            });
        }
        RenderFBF(maxFps = 1000) {
            setInterval(() => {
                this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
                this.Render();
                this._fps.Render(this._ctx);
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
var Sb;
(function (Sb) {
    class Shape {
        constructor(style) {
            this._children = [];
            this._left = 0;
            this._top = 0;
            this._fill = "rgb(0, 0, 0)";
            // if (style) this.SetStyle(style);
        }
        get Children() { return this._children; }
        set Children(value) { this._children = value; }
        get Parent() { return this._parent; }
        set Parent(value) { this._parent = value; }
        get Left() { return this._left; }
        set Left(value) { this._left = value; }
        get Top() { return this._top; }
        set Top(value) { this._top = value; }
        get Fill() { return this._fill; }
        set Fill(value) { this._fill = value; }
        AppendChild(child) {
            this._children.push(child);
            child._parent = this;
        }
        set Style(style) {
            if (style["left"])
                this.Left = style["left"];
            if (style["top"])
                this.Top = style["top"];
            if (style["fill"])
                this.Fill = style["fill"];
        }
        GetPosition() {
            const parentLeft = this.Parent ? this.Parent.Left : 0;
            const parentTop = this.Parent ? this.Parent.Top : 0;
            const left = this.Left + parentLeft;
            const top = this.Top + parentTop;
            return { left: left, top: top };
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
            super(style);
            this._width = 0;
            this._height = 0;
            this._borderRadius = 0;
            if (style)
                this.Style = style;
        }
        get Width() { return this._width; }
        set Width(value) { this._width = value; }
        get Height() { return this._height; }
        set Height(value) { this._height = value; }
        get BorderRadius() { return this._borderRadius; }
        set BorderRadius(value) { this._borderRadius = value; }
        set Style(style) {
            super.Style = style;
            if (style["width"])
                this.Width = style["width"];
            if (style["height"])
                this.Height = style["height"];
            if (style["borderRadius"])
                this.BorderRadius = style["borderRadius"];
        }
        Render(ctx) {
            const pos = this.GetPosition();
            // const parentLeft = this.Parent ? this.Parent.Left : 0;
            // const parentTop = this.Parent ? this.Parent.Top : 0;
            // const left = this.Left + parentLeft;
            // const top = this.Top + parentTop;
            // console.log(left);
            ctx.beginPath();
            ctx.fillStyle = this.Fill;
            ctx.roundRect(pos.left, pos.top, this.Width, this.Height, this.BorderRadius);
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
            super(style);
            this._radius = 0;
            if (style)
                this.Style = style;
        }
        get Radius() { return this._radius; }
        set Radius(value) { this._radius = value; }
        set Style(style) {
            super.Style = style;
            if (style["radius"])
                this.Radius = style["radius"];
            if (style["fill"])
                this.Fill = style["fill"];
        }
        Render(ctx) {
            const pos = this.GetPosition();
            ctx.beginPath();
            ctx.fillStyle = this.Fill;
            ctx.roundRect(pos.left, pos.top, this.Radius, this.Radius, this.Radius);
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
            super(style);
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
        set FontSize(value) { this._fontSize = value; }
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
            const pos = this.GetPosition();
            ctx.font = "" + this.FontSize + "px " + this.FontFamily;
            ctx.fillStyle = this.Fill;
            ctx.textBaseline = this.TextBaseline;
            ctx.textAlign = this.TextAlign;
            ctx.fillText(this._value, pos.left, pos.top);
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
            this._lastTime2 = performance.now() + 500;
            this._fpsToShow = 0;
        }
        GetFPS() {
            const currentTime = performance.now();
            this._fps++;
            if (this._lastTime < currentTime) {
                this._fpsToShow = this._fps;
                this._fps = 0;
                this._lastTime = currentTime + 1000;
            }
            // this.Render(this._fpsToShow);
            return `${Math.round(this._fpsToShow)} fps`;
        }
        Render(ctx) {
            this.Value = this.GetFPS();
            super.Render(ctx);
        }
    }
    Sb.Fps = Fps;
})(Sb || (Sb = {}));
