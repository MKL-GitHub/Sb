namespace Sb {
    export class Circle extends Shape {
        private _radius: number = 0;
    
        constructor(style?: GraficObject) {
            super();
            if (style) this.Style = style;
        }

        // private set Width(value: number) {}
        // private set Height(value: number) {}

        public get Radius(): number { return this._radius; }
        public set Radius(value: number) { 
            this._radius = this.Width = this.Height = value;
        }

        protected set Style(style: GraficObject) {
            super.Style = style;
            if (style["radius"]) this.Radius = style["radius"];
        }

        public Render(ctx: any) : void {
            ctx.beginPath();
            ctx.fillStyle = this.Fill;
            this.SetAbsPos(ctx);

            ctx.roundRect(this.AbsLeft, this.AbsTop, this.Radius, this.Radius, this.Radius);
            
            ctx.closePath();
            ctx.fill()

            super.Render(ctx);
        }
    }
}

    