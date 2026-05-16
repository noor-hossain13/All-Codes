from turtle import *

# Note: Do not close the turtle graphics window manually while the program is running.
# Closing it prematurely will cause a turtle.Terminator error.

speed(0)
bgcolor("black")
pensize(3)

for i in range(18):
    for colors in ["red", "orange", "yellow", "green", "blue", "purple"]:
        color(colors)
        left(10)
        for _ in range(5):
            forward(150)
            right(144)     # 144° = classic star

hideturtle()
done()