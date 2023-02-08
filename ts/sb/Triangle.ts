namespace Sb {
    export class Triangle extends Shape {
        private _peak: string = "top";

        public constructor(style?: any) {
            super();
            if (style) this.Style = style;
        }

        public get Peak(): string { return this._peak; }
        public set Peak(value: string) { this._peak = value; }

        protected set Style(style: any) {
            super.Style = style;
            if (style["peak"]) this.Peak = style["peak"];
        }

        public Render(ctx: any) : void {

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
}