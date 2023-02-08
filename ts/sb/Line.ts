namespace Sb {
    export class Line extends Shape {
        private _absLeftEnd: number;
        private _absTopEnd: number;
        private _leftEnd: number = this.Left;
        private _topEnd: number = this.Top;
        private _lineWidth: number = 1;

        public constructor(style?: any) {
            super();
            if (style) this.Style = style;
        }

        public get AbsLeftEnd(): number { return this._absLeftEnd; }
        public set AbsLeftEnd(value: number) { this._absLeftEnd = value; }

        public get AbsTopEnd(): number { return this._absTopEnd; }
        public set AbsTopEnd(value: number) { this._absTopEnd = value; }
        
        public get LeftEnd(): number { return this._leftEnd; }
        public set LeftEnd(value: number) { this._leftEnd = value; }

        public get TopEnd(): number { return this._topEnd; }
        public set TopEnd(value: number) { this._topEnd = value; }

        public get LineWidth(): number { return this._lineWidth; }
        public set LineWidth(value: number) { this._lineWidth = value; }
        
        protected set Style(style: any) {
            super.Style = style;
            if (style["leftEnd"]) this.LeftEnd = style["leftEnd"];
            if (style["topEnd"]) this.TopEnd = style["topEnd"];
            if (style["lineWidth"]) this.LineWidth = style["lineWidth"];
        }

        protected SetAbsPos(ctx: any): void {
            super.SetAbsPos(ctx);
            this.AbsLeftEnd = this.LeftEnd + this.Parent.AbsLeft;
            this.AbsTopEnd = this.TopEnd + this.Parent.AbsTop;

            // if (this.HorizontalAlignment == "center") this.AbsLeft += this.Parent.Width / 2 - this.Width / 2;
            // else if (this.HorizontalAlignment == "right") this.AbsLeft += this.Parent.Width - this.Width;

            // if (this.VerticalAlignment == "center") this.AbsTop += this.Parent.Height / 2 - this.Height / 2;
            // else if (this.VerticalAlignment == "bottom") this.AbsTop += this.Parent.Height - this.Height;
        }

        public Render(ctx: any) : void {
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
}


