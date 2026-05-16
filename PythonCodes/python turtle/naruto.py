import turtle

# Setup
screen = turtle.Screen()
screen.bgcolor("#0a1f44")  # dark blue-ish background
screen.title("Naruto Uzumaki - Improved Turtle Drawing")
screen.setup(900, 900)

naruto = turtle.Turtle()
naruto.speed(0)
naruto.hideturtle()
naruto.pensize(3)

# ===================
#     HAIR (spiky & layered)
# ===================
naruto.penup()
naruto.goto(0, 180)
naruto.pendown()
naruto.color("#ffdd00")  # bright blonde
naruto.begin_fill()

# Top spikes
naruto.goto(-30, 220)
naruto.goto(-10, 180)
naruto.goto(-60, 210)
naruto.goto(-40, 160)
naruto.goto(-90, 190)
naruto.goto(-70, 140)
naruto.goto(-120, 170)
naruto.goto(-100, 120)
naruto.goto(-140, 150)
naruto.goto(-120, 100)

# Right side spikes
naruto.goto(0, 160)
naruto.goto(70, 140)
naruto.goto(90, 190)
naruto.goto(40, 160)
naruto.goto(60, 210)
naruto.goto(10, 180)
naruto.goto(30, 220)
naruto.goto(0, 180)

naruto.end_fill()

# ===================
#     HEAD
# ===================
naruto.penup()
naruto.goto(0, -50)
naruto.pendown()
naruto.color("#ffe0bd")  # skin tone
naruto.begin_fill()
naruto.circle(110)       # main head
naruto.end_fill()

# ===================
#     HEADBAND (Konoha protector)
# ===================
naruto.penup()
naruto.goto(-140, 60)
naruto.pendown()
naruto.color("silver")
naruto.pensize(6)
naruto.goto(140, 60)

# Leaf symbol
naruto.penup()
naruto.goto(-20, 130)
naruto.pendown()
naruto.color("#4CAF50")  # green leaf
naruto.begin_fill()
naruto.circle(30, 180)   # half circle base
naruto.goto(20, 130)
naruto.goto(0, 170)      # pointy top
naruto.goto(-20, 130)
naruto.end_fill()

# Metal plate outline
naruto.penup()
naruto.goto(-50, 60)
naruto.pendown()
naruto.color("gray")
naruto.pensize(4)
naruto.goto(50, 60)

# ===================
#     WHISKERS (3 lines each side)
# ===================
naruto.pensize(5)
naruto.color("#d32f2f")  # red whiskers

# Left side
naruto.penup()
naruto.goto(-80, 20)
naruto.pendown()
naruto.goto(-140, 40)

naruto.penup()
naruto.goto(-80, -10)
naruto.pendown()
naruto.goto(-150, -10)

naruto.penup()
naruto.goto(-80, -40)
naruto.pendown()
naruto.goto(-140, -60)

# Right side
naruto.penup()
naruto.goto(80, 20)
naruto.pendown()
naruto.goto(140, 40)

naruto.penup()
naruto.goto(80, -10)
naruto.pendown()
naruto.goto(150, -10)

naruto.penup()
naruto.goto(80, -40)
naruto.pendown()
naruto.goto(140, -60)

# ===================
#     EYES (more anime style)
# ===================
# Left eye
naruto.penup()
naruto.goto(-50, 40)
naruto.pendown()
naruto.color("white")
naruto.begin_fill()
naruto.setheading(0)
naruto.circle(28, 360)
naruto.end_fill()

naruto.penup()
naruto.goto(-45, 50)
naruto.pendown()
naruto.color("#0d47a1")  # blue iris
naruto.begin_fill()
naruto.circle(18, 360)
naruto.end_fill()

naruto.penup()
naruto.goto(-42, 55)
naruto.pendown()
naruto.color("black")
naruto.begin_fill()
naruto.circle(10, 360)
naruto.end_fill()

naruto.penup()
naruto.goto(-38, 58)
naruto.pendown()
naruto.color("white")
naruto.begin_fill()
naruto.circle(4, 360)
naruto.end_fill()

# Right eye (mirrored)
naruto.penup()
naruto.goto(50, 40)
naruto.pendown()
naruto.color("white")
naruto.begin_fill()
naruto.setheading(0)
naruto.circle(28, 360)
naruto.end_fill()

naruto.penup()
naruto.goto(45, 50)
naruto.pendown()
naruto.color("#0d47a1")
naruto.begin_fill()
naruto.circle(18, 360)
naruto.end_fill()

naruto.penup()
naruto.goto(42, 55)
naruto.pendown()
naruto.color("black")
naruto.begin_fill()
naruto.circle(10, 360)
naruto.end_fill()

naruto.penup()
naruto.goto(38, 58)
naruto.pendown()
naruto.color("white")
naruto.begin_fill()
naruto.circle(4, 360)
naruto.end_fill()

# ===================
#     NOSE & MOUTH
# ===================
naruto.penup()
naruto.goto(0, 10)
naruto.pendown()
naruto.color("black")
naruto.goto(0, -10)      # nose line

naruto.penup()
naruto.goto(-25, -25)
naruto.pendown()
naruto.goto(25, -25)     # simple mouth

# ===================
#     ORANGE JUMPSUIT (hint at collar)
# ===================
naruto.penup()
naruto.goto(-90, -90)
naruto.pendown()
naruto.color("#ff5722")  # orange
naruto.pensize(8)
naruto.goto(-120, -140)
naruto.goto(120, -140)
naruto.goto(90, -90)

# ===================
#     TEXT
# ===================
naruto.penup()
naruto.goto(0, -220)
naruto.color("white")
naruto.write("Naruto Uzumaki - Believe it!", align="center", font=("Arial", 24, "bold"))

naruto.hideturtle()
screen.mainloop()