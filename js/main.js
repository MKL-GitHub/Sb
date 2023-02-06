
const canvas = Sb.Canvas.GetInstance("canvas");
canvas.Width = 700;
canvas.Height = 400;
canvas.Fps.Style = {
    left: 10,
    top: 10,
    fontSize: 12,
    fontFamily: "Verdana",
    color: "rgba(50, 50, 70, 0.8)",
}

const rect = new Sb.Rect({
    left: 100,
    top: 50,
    width: 50,
    height: 30,
    fill: "blue",
    // borderRadius: 5,
});

const text = new Sb.Text("Hello", {
    left: 100,
    top: 150,
    fontSize: 30,
    fontFamily: "Verdana",
    color: "red",
});

const circle = new Sb.Circle({
    // left: 100,
    // top: 50,
    radius: 30,
})

rect.AppendChild(circle);


canvas.AppendChild(rect);
canvas.AppendChild(text);
// canvas.AppendChild(circle);


// const sss = new SbCircle();


// canvas.Render();
canvas.RenderFBF();