
namespace Sb {
    class Text extends Sb.Shape {
        // protected style: Style.Text;
    
        constructor(private _value: string, style: any) {
            super(style);
            
    
            
        }
    
        public get Value() { return this._value; }
        public set Value(value: string) { this._value = value; }
    
        protected InitializeStyle(): void {
            super.InitializeStyle();
    
            // this.style.s = 0;
            // this.Style["fontSize"] = 10;
            // this.Style["fontFamily "]= "Arial";
            // this.Style["textBaseline"] = "top";
            // this.Style["textAlign"] = "left";
        }
    
        public Render(ctx: any) : void {
    
            // console.log(this.Style);
    
            // ctx.fillStyle = "rgba(0,0,0,0.7)";
            // ctx.font = "" + this.Style["fontSize"] + "px " + this.Style["fontFamily"];
            // ctx.textBaseline = this.Style["textBaseline"];
            // ctx.textAlign = this.Style["textAlign"];
    
            // ctx.fillText(this._value, this.Style.left, this.Style.top);
    
    
        }
    }
}


