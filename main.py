def LEFT():
    mecanumRobot.motor(LR.UPPER_LEFT, MD.BACK, 30)
    mecanumRobot.motor(LR.LOWER_LEFT, MD.BACK, 30)
    mecanumRobot.motor(LR.UPPER_RIGHT, MD.FORWARD, 30)
    mecanumRobot.motor(LR.LOWER_RIGHT, MD.FORWARD, 30)
def CAR_BACK():
    mecanumRobot.motor(LR.UPPER_LEFT, MD.BACK, 50)
    mecanumRobot.motor(LR.LOWER_LEFT, MD.BACK, 50)
    mecanumRobot.motor(LR.UPPER_RIGHT, MD.BACK, 50)
    mecanumRobot.motor(LR.LOWER_RIGHT, MD.BACK, 50)
def RIGHT():
    mecanumRobot.motor(LR.UPPER_LEFT, MD.FORWARD, 30)
    mecanumRobot.motor(LR.LOWER_LEFT, MD.FORWARD, 30)
    mecanumRobot.motor(LR.UPPER_RIGHT, MD.BACK, 30)
    mecanumRobot.motor(LR.LOWER_RIGHT, MD.BACK, 30)
def CAR_FORWARD():
    mecanumRobot.motor(LR.UPPER_LEFT, MD.FORWARD, 40)
    mecanumRobot.motor(LR.LOWER_LEFT, MD.FORWARD, 40)
    mecanumRobot.motor(LR.UPPER_RIGHT, MD.FORWARD, 40)
    mecanumRobot.motor(LR.LOWER_RIGHT, MD.FORWARD, 40)
distance_2 = 0
distance_1 = 0
distance = 0
Val2 = 0
VAL = 0
basic.show_icon(IconNames.HEART)
strip = neopixel.create(DigitalPin.P0, 4, NeoPixelMode.RGB)
strip.clear()
irRemote.connect_infrared(DigitalPin.P9)

def on_forever():
    global VAL, Val2
    VAL = irRemote.return_ir_button()
    if VAL != 0:
        Val2 = VAL
        if Val2 == irRemote.ir_button(IrButton.UP):
            CAR_FORWARD()
        elif Val2 == irRemote.ir_button(IrButton.RIGHT):
            LEFT()
        elif Val2 == irRemote.ir_button(IrButton.LEFT):
            RIGHT()
        elif Val2 == irRemote.ir_button(IrButton.DOWN):
            CAR_BACK()
    elif Val2 == irRemote.ir_button(IrButton.OK):
        mecanumRobot.state(MotorState.STOP)
basic.forever(on_forever)

def on_forever2():
    strip.show_color(neopixel.colors(NeoPixelColors.RED))
    basic.pause(100)
    strip.show_color(neopixel.colors(NeoPixelColors.RED))
    basic.pause(100)
    strip.show_color(neopixel.colors(NeoPixelColors.ORANGE))
    basic.pause(100)
    strip.show_color(neopixel.colors(NeoPixelColors.ORANGE))
    basic.pause(100)
    strip.show_color(neopixel.colors(NeoPixelColors.BLUE))
    basic.pause(100)
    strip.show_color(neopixel.colors(NeoPixelColors.BLUE))
basic.forever(on_forever2)

def on_forever3():
    global distance, distance_1, distance_2
    distance = mecanumRobot.ultra()
    if distance < 5:
        CAR_FORWARD()
        mecanumRobot.state(MotorState.STOP)
        basic.pause(500)
        mecanumRobot.set_servo(180)
        basic.pause(500)
        distance_1 = mecanumRobot.ultra()
        basic.pause(500)
        mecanumRobot.set_servo(0)
        basic.pause(500)
        distance_2 = mecanumRobot.ultra()
        basic.pause(500)
    elif distance_1 > distance_2:
        LEFT()
        mecanumRobot.set_servo(0)
        basic.pause(500)
    elif distance < 20:
        RIGHT()
        mecanumRobot.set_servo(180)
        basic.pause(500)
    else:
        CAR_FORWARD()
        mecanumRobot.set_servo(90)
basic.forever(on_forever3)
