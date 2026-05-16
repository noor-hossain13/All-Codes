import turtle
import random

# Setup
screen = turtle.Screen()
screen.title("Cursor Following Snake / Dragon Tail")
screen.bgcolor("black")
screen.tracer(0)          # Turn off auto-update for smooth animation

# Hide default turtle cursor
turtle.hideturtle()

# Create head (the part that follows mouse)
head = turtle.Turtle()
head.shape("circle")
head.shapesize(1.2)
head.color("lime")
head.penup()
head.speed(0)

# Create body segments (the trail)
segments = []
colors = ["lime", "yellow", "orange", "red", "magenta", "cyan"]

for i in range(20):       # More = longer tail
    seg = turtle.Turtle()
    seg.shape("circle")
    seg.shapesize(0.8 - i*0.03)   # segments get smaller toward tail
    seg.color(colors[i % len(colors)])
    seg.penup()
    seg.speed(0)
    segments.append(seg)

# Function that runs every time mouse moves
def follow_mouse(x, y):
    # Move head toward mouse
    head.goto(x, y)
    
    # Make each segment follow the one in front
    for i in range(len(segments)-1, 0, -1):
        segments[i].goto(segments[i-1].xcor(), segments[i-1].ycor())
    
    # First segment follows head
    if segments:
        segments[0].goto(head.xcor(), head.ycor())
    
    screen.update()   # Refresh screen

# Bind mouse movement to the function
screen.onscreenclick(follow_mouse, btn=1)   # btn=1 means left click
head.ondrag(follow_mouse)            # This makes it follow without clicking!

# Keep window open
screen.listen()
screen.mainloop()