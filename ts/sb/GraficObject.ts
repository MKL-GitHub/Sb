namespace Sb {
    export abstract class GraficObject {
        private _absLeft: number = 0;
        private _absTop: number = 0;
        private _children: Array<Shape> = [];
        private _parent: GraficObject;

        // public constructor() {}

        public get AbsLeft(): number { return this._absLeft; }
        protected set AbsLeft(value: number) { this._absLeft = value; }

        public get AbsTop(): number { return this._absTop; }
        protected set AbsTop(value: number) {this._absTop = value; }

        public abstract get Width(): number
        public abstract set Width(value: number)

        public abstract get Height(): number
        public abstract set Height(value: number)

        public get Children(): Array<Shape> { return this._children; }
        protected set Children(value: Array<Shape>) { this._children = value; }

        public get Parent(): GraficObject { return this._parent; }
        protected set Parent(value: GraficObject) { this._parent = value; }

        public AppendChild(child: Shape): void { 
            this._children.push(child);
            child.Parent = this;
        }

        protected set Style(style: GraficObject) {
            if (style["width"]) this.Width = style["width"];
            if (style["height"]) this.Height = style["height"];
        }
    }
}
