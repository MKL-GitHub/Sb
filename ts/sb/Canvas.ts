// class Canvas {
//     private static _instance: Canvas;

//     private _canvas: any;
//     private _ctx: any;
//     private _children : Array<Shape> = [];

//     private constructor(id: string) {
//         this._canvas = document.getElementById(id);
//         this._ctx = this._canvas.getContext("2d");

//         this.SetListeners();
//     }

//     public get Width() { return this._canvas.width; }
//     public set Width(value: number) { this._canvas.width = value; }

//     public get Height() { return this._canvas.height; }
//     public set Height(value: number) { this._canvas.height = value; }

//     public get Children() { return this._children; }
//     // set Children(value) { this._children = value; }  

//     public static GetInstance(id: string) {
//         return Canvas._instance ??= new Canvas(id);
//     }

//     public AppendChild(value: Shape): void { this._children.push(value); }

//     public Render(): void {
//         Canvas._instance.Children.forEach(child => {
//             child.Render(Canvas._instance._ctx);
//             // console.log(this._temp);
//         });

        
//     }

//     public RenderFBF(maxFps: number = 1000): void {
//         const fps: Fps = new Fps(Canvas._instance._canvas, Canvas._instance._ctx);

        
//         setInterval(() => {
//             this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
            
//             this.Render();
//             fps.ShowFPS();
//         }, 1000/maxFps);
//     }

//     private SetListeners() {
//         this._canvas.addEventListener("mousedown", this.OnMouseDown);
//         this._canvas.addEventListener("mousemove", this.OnMouseMove);
//     }

//     private OnMouseDown(event: any) {
//         // this.Children[0].Style.left = event.screenX;

    
//         const firstChild = Canvas._instance.Children[0];
//         // firstChild.Style.left = event.clientX;
//         // firstChild.Style.top = event.clientY;

//         // console.log(Canvas._instance.Children)
//     }

//     private OnMouseMove(event) {
//         // console.log(event);
//     }
// }