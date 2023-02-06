namespace Sb {
    export class Fps extends Text {
        private _fps: number = 0;
        private _lastTime: number = performance.now() + 1000;
        private _lastTime2: number = performance.now() + 500;
        private _fpsToShow: number = 0;
    
        public constructor(style?: Object) {
            super("", style);
        }
    
        private GetFPS(): string {
            const currentTime = performance.now();
    
            this._fps++;
    
            if (this._lastTime < currentTime) {
                this._fpsToShow = this._fps;
                this._fps = 0;
                this._lastTime = currentTime + 1000;
            }
            // this.Render(this._fpsToShow);
            return `${Math.round(this._fpsToShow)} fps`;
        }

        public Render(ctx: any): void {
            this.Value = this.GetFPS();
            super.Render(ctx);
        }
    }
}