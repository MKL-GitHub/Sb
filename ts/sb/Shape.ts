
namespace Sb {
    export abstract class Shape extends GraficObject {
        private _controls: ShapeControls;
        private _isSelected: boolean = false;

        private _width: number = 0;
        private _height: number = 0;
        private _left: number = 0;
        private _top: number = 0;
        private _fill: string = "rgb(0, 0, 0)";
        private _horizontalAlignment: string = "left";
        private _verticalAlignment: string = "top";

        public get IsSelected(): boolean { return this._isSelected; }
        public set IsSelected(value: boolean) {
            if (this._isSelected == value) return;

            this._isSelected = value;

            if (value) {
                if (!this._controls) this._controls = new ShapeControls(this);
                this.AppendChild(this._controls);
            }
            else {
                if (this.Children[this.Children.length - 1] instanceof ShapeControls) {
                    this.Children.pop();
                }
                else {
                    console.log("Mistake");
                }
            }
        }

        public get Width(): number { return this._width; }
        public set Width(value: number) { this._width = value; }

        public get Height(): number { return this._height; }
        public set Height(value: number) { this._height = value; }

        public get Left(): number { return this._left; }
        public set Left(value: number) { this._left = value; }

        public get Top(): number { return this._top; }
        public set Top(value: number) { this._top = value; }

        public get Fill(): string { return this._fill; }
        public set Fill(value: string){ this._fill = value; }

        public get HorizontalAlignment(): string { return this._horizontalAlignment; }
        public set HorizontalAlignment(value: string) { this._horizontalAlignment = value; }

        public get VerticalAlignment(): string { return this._verticalAlignment; }
        public set VerticalAlignment(value: string) { this._verticalAlignment = value; }
    
        protected set Style(style: any) {
            super.Style = style;
            if (style["left"]) this.Left = style["left"];
            if (style["top"]) this.Top = style["top"];  
            if (style["fill"]) this.Fill = style["fill"];    
            if (style["horizontalAlignment"]) this.HorizontalAlignment = style["horizontalAlignment"];  
            if (style["verticalAlignment"]) this.VerticalAlignment = style["verticalAlignment"];
        }

        protected SetAbsPos(ctx: any): void {
            this.AbsLeft = this.Left + this.Parent.AbsLeft;
            this.AbsTop = this.Top + this.Parent.AbsTop;

            if (this.HorizontalAlignment == "center") this.AbsLeft += this.Parent.Width / 2 - this.Width / 2;
            else if (this.HorizontalAlignment == "right") this.AbsLeft += this.Parent.Width - this.Width;

            if (this.VerticalAlignment == "center") this.AbsTop += this.Parent.Height / 2 - this.Height / 2;
            else if (this.VerticalAlignment == "bottom") this.AbsTop += this.Parent.Height - this.Height;
        }

        protected RenderChildren(ctx: any, shape: Shape) {
            shape.Children.forEach(child => {
                child.Render(ctx);
                this.RenderChildren(ctx, child);
            })
        }
        
        public Render(ctx: any): void {
            this.RenderChildren(ctx, this);
        }
    }
}


