namespace Sb {
    export class Circle extends Sb.Shape {
        private _radius: number = 0;
    
        constructor(style?: Object) {
            super(style);
            if (style) this.Style = style;
            
        }

        public get Radius(): number { return this._radius; }
        public set Radius(value: number) { this._radius = value; }

        protected set Style(style: Object) {
            super.Style = style;

            if (style["radius"]) this.Radius = style["radius"];
            if (style["fill"]) this.Fill = style["fill"];

        }

        public Render(ctx: any) : void {
            const pos = this.GetPosition();

            ctx.beginPath();
            ctx.fillStyle = this.Fill;

            ctx.roundRect(pos.left, pos.top, this.Radius, this.Radius, this.Radius);
            
            ctx.closePath();
            ctx.fill()

            super.Render(ctx);
        }
    }
}

    