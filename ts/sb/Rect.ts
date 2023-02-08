namespace Sb {
    export class Rect extends Shape {
        private _borderRadius: number = 0;
        private _borderWidth: number = 0;
        private _borderColor: string = "rgb(0, 0, 0)";

        constructor(style?: any) {
            super();
            if (style) this.Style = style;
        }

        public get BorderRadius(): number { return this._borderRadius; }
        public set BorderRadius(value: number) { this._borderRadius = value; }

        public get BorderWidth(): number { return this._borderWidth; }
        public set BorderWidth(value: number) { this._borderWidth = value; }
        
        public get BorderColor(): string { return this._borderColor; }
        public set BorderColor(value: string) { this._borderColor = value; }
        
        protected set Style(style: any) {
            super.Style = style;
            if (style["borderRadius"]) this.BorderRadius = style["borderRadius"];
            if (style["borderWidth"]) this.BorderWidth = style["borderWidth"];
            if (style["borderColor"]) this.BorderColor = style["borderColor"];
        }

        public Render(ctx: any) : void {
            ctx.beginPath();
            ctx.fillStyle = this.Fill;
            ctx.strokeStyle = this.BorderColor;
            ctx.lineWidth = this.BorderWidth;
            this.SetAbsPos(ctx);

            ctx.roundRect(this.AbsLeft, this.AbsTop, this.Width, this.Height, this.BorderRadius);
            
            ctx.closePath();
            if (this.Fill != "transparent") ctx.fill()
            if (this.BorderWidth) ctx.stroke();

            super.Render(ctx);
        }
    }
}


