namespace Sb {
    export abstract class Shape {
        private _children: Array<Shape> = [];
        private _parent: Shape;
        private _left: number = 0;
        private _top: number = 0;
        private _fill: string = "rgb(0, 0, 0)";
    
        public constructor(style?: Object) {
            // if (style) this.SetStyle(style);
        }

        public get Children(): Array<Shape> { return this._children; }
        public set Children(value: Array<Shape>) { this._children = value; }

        public get Parent(): Shape { return this._parent; }
        public set Parent(value: Shape) { this._parent = value; }

        public get Left(): number { return this._left; }
        public set Left(value: number) { this._left = value; }

        public get Top(): number { return this._top; }
        public set Top(value: number) { this._top = value; }

        public get Fill(): string { return this._fill; }
        public set Fill(value: string){ this._fill = value; }

        public AppendChild(child: Shape): void { 
            this._children.push(child);
            child._parent = this;
        }
    
        protected set Style(style: Object) {
            if (style["left"]) this.Left = style["left"];
            if (style["top"]) this.Top = style["top"];  
            if (style["fill"]) this.Fill = style["fill"];      
        }

        protected GetPosition(): { left: number, top: number } {
            const parentLeft = this.Parent ? this.Parent.Left : 0;
            const parentTop = this.Parent ? this.Parent.Top : 0;
            const left = this.Left + parentLeft;
            const top = this.Top + parentTop;

            return { left: left, top: top };
        }

        private RenderChildren(ctx: any, shape: Shape) {
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


