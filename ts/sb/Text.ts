
namespace Sb {
    export class Text extends Sb.Shape {
        private _fontSize: number = 10;
        private _fontFamily: string = "Arial";
        private _textBaseline: string = "top";
        private _textAlign: string = "left";
    
        public constructor(private _value: string, style?: Object) {
            super(style);
            if (style) this.Style = style;
        }
    
        public get Value(): string { return this._value; }
        public set Value(value: string) { this._value = value; }

        public get FontSize(): number { return this._fontSize; }
        public set FontSize(value: number) { this._fontSize = value; }
    
        public get FontFamily(): string { return this._fontFamily; }
        public set FontFamily(value: string) { this._fontFamily = value; }

        public get TextBaseline(): string { return this._textBaseline; }
        public set TextBaseline(value: string) { this._textBaseline = value; }

        public get TextAlign(): string { return this._textAlign; }
        public set TextAlign(value: string) { this._textAlign = value; }
        
        protected set Style(style: Object) {
            super.Style = style;

            if (style["fontSize"]) this.FontSize = style["fontSize"];
            if (style["fontFamily"]) this.FontFamily = style["fontFamily"];
            if (style["textBaseline"]) this.TextBaseline = style["textBaseline"];
            if (style["textAlign"]) this.TextAlign = style["textAlign"];

        }
    
        public Render(ctx: any): void {
            const pos = this.GetPosition();

            ctx.font = "" + this.FontSize + "px " + this.FontFamily;
            ctx.fillStyle = this.Fill;
            ctx.textBaseline = this.TextBaseline;
            ctx.textAlign = this.TextAlign;
    
            ctx.fillText(this._value, pos.left, pos.top);

            super.Render(ctx);
        }
    }
}


