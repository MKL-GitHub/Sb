namespace Sb {
    class SbRect extends Sb.Shape {

        constructor(style: any) {
            super(style);
            
        }
    
        public Render(ctx: any) : void {
            ctx.beginPath();
            ctx.fillStyle = "rgb(0,0,0)";
            // ctx.roundRect(this.Style["left"], this.Style["top"], this.Style["width"], this.Style["height"], this.Style["radius"]);
            ctx.closePath();
            ctx.fill()
        }
    }
}


