import turtle

def draw_batman_logo():
    screen = turtle.Screen()
    screen.bgcolor("black")
    screen.title("Batman Logo")

    batman = turtle.Turtle()
    batman.speed(3)
    batman.color("yellow")

    # Move to starting position
    
    batman.penup()
    batman.goto(-100, 0)
    batman.pendown()

    # Start drawing the Batman logo
    batman.begin_fill()

    batman.left(90)
    batman.circle(50, 85)
    batman.circle(15, 110)
    batman.right(180)
    batman.circle(30, 150)
    batman.right(5)
    batman.forward(10)
    batman.right(90)
    batman.circle(-70, 140)
    batman.right(90)
    batman.forward(10)
    batman.right(5)
    batman.circle(30, 150)
    batman.left(180)
    batman.circle(15, 110)
    batman.circle(50, 85)
    batman.end_fill()

    # Complete the other half of the Batman logo
    batman.penup()
    batman.goto(-100, 0)
    batman.pendown()

    batman.begin_fill()

    batman.setheading(90)
    batman.circle(-50, 85)
    batman.circle(-15, 110)
    batman.left(180)
    batman.circle(-30, 150)
    batman.left(5)
    batman.forward(10)
    batman.left(90)
    batman.circle(70, 140)
    batman.left(90)
    batman.forward(10)
    batman.left(5)
    batman.circle(-30, 150)
    batman.right(180)
    batman.circle(-15, 110)
    batman.circle(-50, 85)

    batman.end_fill()

    # Hide the turtle
    batman.hideturtle()

    # Keep the window open
    screen.mainloop()

draw_batman_logo()
