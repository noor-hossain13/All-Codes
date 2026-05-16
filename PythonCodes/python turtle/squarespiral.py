import turtle

t = turtle.Turtle()
t.speed(0)        # fastest speed
turtle.bgcolor("black")

colors = ["red", "orange", "yellow", "lime", "cyan", "blue", "violet", "magenta"]

for i in range(120):
    t.pencolor(colors[i % 8])
    t.pensize(i // 20 + 1)
    t.forward(i * 2)
    t.left(89)       # change 89→91, 92, 72 etc for different feel

turtle.done()