import turtle
import math

# ---------------- SETUP ----------------
screen = turtle.Screen()
screen.bgcolor("#0b0b0b")

t = turtle.Turtle()
t.speed(0)
t.width(2)
t.hideturtle()

# ---------------- HELPERS ----------------
def move(x, y):
    t.penup()
    t.goto(x, y)
    t.pendown()

def fill(color):
    t.fillcolor(color)
    t.begin_fill()

def end():
    t.end_fill()

# ---------------- MASK SHAPE ----------------
t.color("black", "#c40000")
move(0, -260)
fill("#c40000")
t.setheading(90)
t.circle(260)
end()

# ---------------- EYES ----------------
def eye(x, y, direction):
    move(x, y)
    t.setheading(direction)
    fill("white")
    for _ in range(2):
        t.circle(70, 60)
        t.circle(25, 120)
    end()

    t.color("black")
    for _ in range(2):
        t.circle(70, 60)
        t.circle(25, 120)
    t.color("black", "#c40000")

eye(-85, 40, 20)   # Left eye
eye(85, 40, 160)   # Right eye

# ---------------- CENTER WEB LINE ----------------
t.color("black")
t.width(3)
move(0, 250)
t.setheading(-90)
t.forward(500)

# ---------------- WEB CURVES ----------------
def web_arc(radius, y):
    move(-radius, y)
    t.setheading(0)
    t.circle(radius, 60)

t.width(2)
for y in [180, 130, 80, 30, -20, -70, -120]:
    web_arc(220, y)

# ---------------- SIDE WEB LINES ----------------
def web_side(angle):
    move(0, 250)
    t.setheading(angle)
    t.forward(280)

for a in [30, 60, 120, 150, -30, -60, -120, -150]:
    web_side(a)

# ---------------- FINISH ----------------
turtle.done()
