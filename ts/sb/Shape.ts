namespace Sb {
    export abstract class Shape {
        protected style: any;
    
        constructor(style: any) {
            this.InitializeStyle();
            this.Style = style;
    
        }
    
        get Style() { return this.style; }
        set Style(value: Object | undefined) { 
            if (!value) return;
    
            Object.keys(value).forEach(key => {
                // this._style[key] = value[key];
            });
        }
    
        protected InitializeStyle(): void {
            this.style = {
                left: 0,
                top: 0,
            }
            // this.Style = {
            //     left: 0,
            //     top: 0,
            // };
        }
        
        public abstract Render(ctx: any): void
    }
}


