
const canvas = Sb.Canvas.GetInstance("canvas");
// canvas.Width = window.screen.availWidth;
// canvas.Height = window.screen.availHeight;
canvas.Width = 700;
canvas.Height = 700;

canvas.Fps.Style = {
    left: 30,
    top: 10,
    fontSize: 10,
    fontFamily: "Verdana",
    color: "rgba(50, 50, 70, 0.8)",
}

const rect = new Sb.Rect({
    left: 100,
    top: 50,
    width: 250,
    height: 150,
    fill: "blue",
    // horizontalAlignment: "right",
    // verticalAlignment: "bottom",
    borderRadius: 50,
    borderWidth: 2,
});

const innerRect = new Sb.Rect({
    // left: 30,
    // top: 35,
    width: 147.89,
    height: 40,
    fill: "red",
    horizontalAlignment: "center",
    verticalAlignment: "center",
});

const text = new Sb.Text("Hello M", {
    // left: 10,
    // top: 150,
    fontSize: 40,
    fontFamily: "Verdana",
    color: "red",
    horizontalAlignment: "center",
    verticalAlignment: "center",
});

const circle = new Sb.Circle({
    // left: 5,
    // top: 50,
    radius: 90,
    fill: "rgba(50, 50, 50, 0.7)",
    borderWidth: 5,
    horizontalAlignment: "center",
    verticalAlignment: "center",
})

const circle2 = new Sb.Circle({
    // top: 5,
    radius: 35,
    fill: "rgba(255, 0, 0, 0.7)",
    horizontalAlignment: "center",
    verticalAlignment: "center",
})

const circle3 = new Sb.Circle({
    radius: 20,
    fill: "rgba(0, 255, 0, 0.7)",
    horizontalAlignment: "center",
    verticalAlignment: "center",
})

const triangle = new Sb.Triangle({
    left: 150,
    top: 250,
    width: 80,
    height: 80,
    peak: "bottom",
});

const rectT = new Sb.Rect({
    left: 50,
    top: 250,
    width: 80,
    height: 80,
    fill: "rgba(50, 100, 80, 1)",
});

const circle_ = new Sb.Circle({
    left: 20,
    top: 20,
    radius: 50,
})

circle2.AppendChild(circle3);

rect.AppendChild(innerRect);
rect.AppendChild(text);

rect.AppendChild(circle);
circle.AppendChild(circle2);


canvas.AppendChild(rect);
// canvas.AppendChild(text);
canvas.AppendChild(rectT);
canvas.AppendChild(triangle);
canvas.AppendChild(circle_);

// canvas.RenderFBF();
canvas.Render();