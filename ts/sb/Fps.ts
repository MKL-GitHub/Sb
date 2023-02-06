class Fps {
    private _fps: number = 0;
    private _lastTime: number = performance.now();
    private _lastTime2: number = performance.now() + 1000;
    private _fpsToShow: number = 0;

    constructor(private _canvas: any, private _ctx: any, private _maxFps: number = 1000) {
        
    }

    private Render(fps: number): void {
        this._ctx.fillStyle = "rgba(0,0,0,0.7)";
        this._ctx.font = "11px Verdana";
        this._ctx.textBaseline = "top";
        this._ctx.textAlign = "left";
        this._ctx.fillText(Math.round(fps) + " fps", 5, 5);
    }

    public ShowFPS(): void {
       
        // const currentTime = Date.now();
        const currentTime = performance.now();
        // console.log(currentTime)

        this._fps++;

        if (this._lastTime2 < currentTime) {
            // console.log(this._fps);
            this._fpsToShow = this._fps;
            this._fps = 0;
            this._lastTime2 = currentTime + 1000;
            
        }
        // const thisFrame = 1000 / (currentTime - this._lastTime);

        // console.log(currentTime - this._lastTime)

        // this._fps += thisFrame;
        // this._lastTime = currentTime;
        
        
        

        // if (this._lastTime2 <= currentTime) {
        //     this._fpsToShow = this._fps;
        //     this._lastTime2 += 1000;
        //     this._fps = 0;
        // }
        
        this.Render(this._fpsToShow);
    }

    // public Loop(func: any): void {
    //     setInterval(() => {
    //         this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    //         this.ShowFPS();
    //         func();
    //     }, 1000/this._maxFps);
    // }
}