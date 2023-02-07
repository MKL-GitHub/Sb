namespace Sb {
    export class Canvas extends GraficObject {
        private static _instance: Canvas;

        private SCALE: number = 2;
    
        private _canvas: any;
        private _ctx: any;
        private _fps: Fps = new Fps();
    
        private constructor(id: string) {
            super();
            window.devicePixelRatio = this.SCALE;
            this._canvas = document.getElementById(id);
            this._ctx = this._canvas.getContext("2d");
            
            this.SetListeners();
        }

        public get Width(): number { return this._canvas.width / this.SCALE; }
        public set Width(value: number) {
            this._canvas.style.width = `${value}px`;
            this._canvas.width = value * this.SCALE;
        }

        public get Height(): number { return this._canvas.height / this.SCALE; }
        public set Height(value: number) {
            this._canvas.style.height = `${value}px`;
            this._canvas.height = value * this.SCALE;
        }

        public get Fps(): Fps { return this._fps; }
    
        public static GetInstance(id: string) { return Canvas._instance ??= new Canvas(id); }

        public Render(): void {
            Canvas._instance.Children.forEach(child => {
                child.Render(Canvas._instance._ctx);
            });  
        }
    
        public RenderFBF(maxFps: number = 1000): void {
            this._ctx.scale(this.SCALE, this.SCALE);

            this.AppendChild(this.Fps);

            setInterval(() => {
                this._ctx.clearRect(0, 0, this.Width, this.Height);
                
                this.Render();
            }, 1000/maxFps);
        }
    
        private SetListeners() {
            this._canvas.addEventListener("mousedown", this.OnMouseDown);
            this._canvas.addEventListener("mousemove", this.OnMouseMove);
        }
    
        private OnMouseDown(event: any) {
            // this.Children[0].Style.left = event.screenX;
    
        
            const firstChild = Canvas._instance.Children[0];
            // firstChild.Style.left = event.clientX;
            // firstChild.Style.top = event.clientY;
    
            // console.log(Canvas._instance.Children)
        }
    
        private OnMouseMove(event) {
            // console.log(event);
        }
    }
}