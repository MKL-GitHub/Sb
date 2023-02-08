namespace Sb {
    export class ShapeControls extends Rect {
        private SIZE = 10;
        private HALF_SIZE = this.SIZE/2;

        private _controlsStyle = {
            width: this.SIZE,
            height: this.SIZE,
            fill: "rgb(120, 130, 120)",
            borderWidth: 1,
        }

        constructor(shape: Shape) {
            super();
            const doubleSize = this.SIZE * 2;

            this.Left = -this.SIZE;
            this.Top = -this.SIZE;
            this.Width = shape.Width + doubleSize;
            this.Height = shape.Height + doubleSize;
            this.Fill = "transparent";
            this.BorderWidth = 1;
            this.BorderColor = "rgba(0, 0, 0, 0.7)";

            this.CreateTopLeft();
            this.CreateTopRight();
            this.CreateBottomLeft();
            this.CreateBottomRight();
            this.CreateRotation();
        }

        private CreateTopLeft(): void {
            const control = new Rect({
                ...this._controlsStyle,
                left: -this.HALF_SIZE,
                top: -this.HALF_SIZE,
            });

            this.AppendChild(control);
        }

        private CreateTopRight(): void {
            const control = new Rect({
                ...this._controlsStyle,
                left: this.Width - this.HALF_SIZE,
                top: -this.HALF_SIZE,
            });

            this.AppendChild(control);
        }

        private CreateBottomLeft(): void {
            const control = new Rect({
                ...this._controlsStyle,
                left: -this.HALF_SIZE,
                top: this.Height - this.HALF_SIZE,
            });

            this.AppendChild(control);
        }

        private CreateBottomRight(): void {
            const control = new Rect({
                ...this._controlsStyle,
                left: this.Width - this.HALF_SIZE,
                top: this.Height - this.HALF_SIZE,
            });

            this.AppendChild(control);
        }

        private CreateRotation(): void {
            const size = this.SIZE * 4/3;
            const halfSize = size / 2;

            const control = new Circle({
                radius: size,
                left: this.Width / 2 - halfSize,
                top: - this.SIZE * 2.5,
                fill: "rgb(120, 130, 120)",
                borderWidth: 1,
            })

            const line = new Line({
                left: halfSize,
                top: size,
                leftEnd: halfSize,
                topEnd: this.SIZE * 2.5,
            })

            control.AppendChild(line);
            this.AppendChild(control);
        }
    }
}


