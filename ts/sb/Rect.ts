namespace Sb {
    export class Rect extends Shape {
        private _borderRadius: number = 0;

        constructor(style?: GraficObject) {
            super();
            if (style) this.Style = style;
        }

        public get BorderRadius(): number { return this._borderRadius; }
        public set BorderRadius(value: number) { this._borderRadius = value; }

        protected set Style(style: GraficObject) {
            super.Style = style;
            if (style["borderRadius"]) this.BorderRadius = style["borderRadius"];
        }

        public Render(ctx: any) : void {
            ctx.beginPath();
            ctx.fillStyle = this.Fill;
            this.SetAbsPos(ctx);

            ctx.roundRect(this.AbsLeft, this.AbsTop, this.Width, this.Height, this.BorderRadius);
            
            ctx.closePath();
            ctx.fill()

            super.Render(ctx);
        }
    }
}


