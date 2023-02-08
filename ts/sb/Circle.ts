namespace Sb {
    export class Circle extends Shape {
        private _radius: number = 0;
        private _borderWidth: number = 0;
    
        constructor(style?: any) {
            super();
            if (style) this.Style = style;
        }

        // private set Width(value: number) {}
        // private set Height(value: number) {}

        public get Radius(): number { return this._radius; }
        public set Radius(value: number) { this._radius = this.Width = this.Height = value; }
        
        public get BorderWidth(): number { return this._borderWidth; }
        public set BorderWidth(value: number) { this._borderWidth = value; }



        protected set Style(style: any) {
            super.Style = style;
            if (style["radius"]) this.Radius = style["radius"];
            if (style["borderWidth"]) this.BorderWidth = style["borderWidth"];
        }

        public Render(ctx: any) : void {
            ctx.beginPath();
            ctx.fillStyle = this.Fill;
            ctx.lineWidth = this.BorderWidth;
            this.SetAbsPos(ctx);

            ctx.roundRect(this.AbsLeft, this.AbsTop, this.Radius, this.Radius, this.Radius);
            
            ctx.closePath();
            ctx.fill()
            if (this.BorderWidth) ctx.stroke();

            super.Render(ctx);
        }
    }
}

    