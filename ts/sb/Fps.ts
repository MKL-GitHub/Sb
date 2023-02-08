namespace Sb {
    export class Fps extends Text {
        private _fps: number = 0;
        private _lastTime: number = performance.now() + 1000;
        private _fpsToShow: number = 0;
    
        public constructor(style?: any) {
            super("", style);
        }
    
        private SetFPS(){
            const currentTime = performance.now();
    
            this._fps++;
    
            if (this._lastTime < currentTime) {
                this._fpsToShow = this._fps;
                this._fps = 0;
                this._lastTime = currentTime + 1000;
            }
            
            this.Value = `${Math.round(this._fpsToShow)} fps`;
        }

        public Render(ctx: any): void {
            this.SetFPS();
            super.Render(ctx);
        }
    }
}