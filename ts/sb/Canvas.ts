namespace Sb {
    export class Canvas extends GraficObject {
        private static _instance: Canvas;
        private static _selectedShape: Shape;
        private static _mouseDown: {
            shape: Shape,
            shapeLeft: number,
            shapeTop: number,
            mouseLeft: number,
            mouseTop: number,
        }

        private SCALE: number = 2;
    
        private _canvas: any;
        private _ctx: any;
        private _fps: Fps = new Fps();
        private _isScaled = false;
    
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
            this._canvas.width = Math.floor(value * this.SCALE);
        }

        public get Height(): number { return this._canvas.height / this.SCALE; }
        public set Height(value: number) {
            this._canvas.style.height = `${value}px`;
            this._canvas.height = Math.floor(value * this.SCALE);
        }

        public get Fps(): Fps { return this._fps; }
    
        public static GetInstance(id: string) { return Canvas._instance ??= new Canvas(id); }

        public Render(): void {
            this._ctx.clearRect(0, 0, this.Width, this.Height);

            if (!this._isScaled) {
                this._ctx.scale(this.SCALE, this.SCALE);
                this._isScaled = true;
            }
            
            Canvas._instance.Children.forEach(child => {
                child.Render(Canvas._instance._ctx);
            });  
        }
    
        public RenderFBF(maxFps: number = 1000): void {
            this.AppendChild(this.Fps);
            setInterval(() => { this.Render(); }, 1000/maxFps);
        }
    
        private SetListeners() {
            this._canvas.addEventListener("mousedown", this.OnMouseDown);
            this._canvas.addEventListener("mousemove", this.OnMouseMove);
            this._canvas.addEventListener("mouseup", this.OnMouseUp);
        }

        private static IsInsideShape(event: any, shape: Shape): boolean {
            let result: boolean = false;
            
            if (shape instanceof Rect || 
                shape instanceof Circle) {
                let radius: number = shape instanceof Rect ? shape.BorderRadius : shape.Radius;
                const halfWidth = shape.Width / 2;
                const halfHeight = shape.Height / 2;
                const minHalfSide = Math.min(halfWidth, halfHeight);
                
                radius = minHalfSide <= radius
                    ? minHalfSide
                    : radius;
    
                const x = event.clientX - shape.Left - halfWidth;
                const y = event.clientY - shape.Top - halfHeight;
    
                const x_ = Math.abs(x)-halfWidth + radius;
                const y_ = Math.abs(y)-halfHeight + radius;
    
                result = Math.pow(x_ + Math.abs(x_), 2) + Math.pow(y_ + Math.abs(y_), 2) <= Math.pow(2 * radius, 2);
            }
            
            // if (event.clientX >= shape.AbsLeft &&
            //     event.clientX <= shape.AbsLeft + shape.Width &&
            //     event.clientY >= shape.AbsTop &&
            //     event.clientY <= shape.AbsTop + shape.Height) {
            //        result = true;
            //        end = performance.now();
            //        console.log(shape);
            // }

            
            
            return result;
        }
    
        private OnMouseDown(event: any) {
            
            const children = Canvas._instance.Children;
            const start: number = Date.now();
            let end: number;

            for (let i = children.length - 1; i >= 0; i--) {
                if (Canvas.IsInsideShape(event, children[i])) {
                    const selectedShape = children.splice(i, 1)[0];

                    if (Canvas._selectedShape && Canvas._selectedShape != selectedShape) {
                        Canvas._selectedShape.IsSelected = false;
                    }

                    Canvas._selectedShape = selectedShape;
                    Canvas._selectedShape.IsSelected = true;
                    Canvas._instance.AppendChild(Canvas._selectedShape);
                    Canvas._mouseDown = {
                        shape: Canvas._selectedShape,
                        shapeLeft: Canvas._selectedShape.Left,
                        shapeTop: Canvas._selectedShape.Top,
                        mouseLeft: event.clientX,
                        mouseTop: event.clientY,
                    };
                    break;
                }
            }

            end = Date.now()
            console.log("Time: ", end - start);
            // console.log(Canvas._mouseDown);
            Canvas._instance.Render();
        }

        private OnMouseUp(event: any) {
            Canvas._mouseDown = undefined;
        }
    
        private OnMouseMove(event: any) {
            if (!Canvas._mouseDown) return;
            const shiftLeft = event.clientX - Canvas._mouseDown.mouseLeft;
            const shiftTop = event.clientY - Canvas._mouseDown.mouseTop;

            // console.log(shiftLeft);
            
            Canvas._mouseDown.shape.Left = Canvas._mouseDown.shapeLeft + shiftLeft;
            Canvas._mouseDown.shape.Top = Canvas._mouseDown.shapeTop + shiftTop;
            Canvas._instance.Render();
        }
    }
}