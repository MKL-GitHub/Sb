namespace Sb {
    export class Rect extends Sb.Shape {
        private _width: number = 0;
        private _height: number = 0;
        private _borderRadius: number = 0;

        constructor(style?: Object) {
            super(style);
            if (style) this.Style = style;
            
        }

        public get Width(): number { return this._width; }
        public set Width(value: number) { this._width = value; }

        public get Height(): number { return this._height; }
        public set Height(value: number) { this._height = value; }

        public get BorderRadius(): number { return this._borderRadius; }
        public set BorderRadius(value: number) { this._borderRadius = value; }

        protected set Style(style: Object) {
            super.Style = style;

            if (style["width"]) this.Width = style["width"];
            if (style["height"]) this.Height = style["height"];
            if (style["borderRadius"]) this.BorderRadius = style["borderRadius"];

        }

        public Render(ctx: any) : void {
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
            ctx.fill()

            super.Render(ctx);
        }
    }
}


