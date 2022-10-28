function right_stop () {
    mecanumRobot.Motor(LR.Lower_left, MD.Forward, 0)
    mecanumRobot.Motor(LR.Upper_left, MD.Forward, 0)
    mecanumRobot.Motor(LR.Upper_right, MD.Forward, 0)
    mecanumRobot.Motor(LR.Lower_right, MD.Forward, 0)
}
function stop_ultrs_sonic () {
    distance = mecanumRobot.ultra()
    if (distance < 10) {
        back_stop()
        distance_1 = mecanumRobot.ultra()
        mecanumRobot.setServo(90)
        distance_2 = mecanumRobot.ultra()
        basic.pause(500)
        if (distance_1 > distance_2) {
            left_stop()
            mecanumRobot.setServo(90)
            basic.pause(500)
        } else {
            right_stop()
            mecanumRobot.setServo(90)
            basic.pause(500)
        }
    } else {
        forward_stop()
    }
}
function left_stop () {
    mecanumRobot.Motor(LR.Lower_left, MD.Forward, 0)
    mecanumRobot.Motor(LR.Upper_left, MD.Forward, 0)
    mecanumRobot.Motor(LR.Upper_right, MD.Forward, 0)
    mecanumRobot.Motor(LR.Lower_right, MD.Forward, 0)
}
function LEFT () {
    mecanumRobot.Motor(LR.Upper_left, MD.Back, 40)
    mecanumRobot.Motor(LR.Lower_left, MD.Back, 40)
    mecanumRobot.Motor(LR.Upper_right, MD.Forward, 60)
    mecanumRobot.Motor(LR.Lower_right, MD.Forward, 60)
}
function ultra_sonic_mode () {
    distance = mecanumRobot.ultra()
    if (distance < 10) {
        CAR_BACK()
        mecanumRobot.state(MotorState.stop)
        basic.pause(500)
        mecanumRobot.setServo(180)
        basic.pause(500)
        distance_1 = mecanumRobot.ultra()
        basic.pause(500)
        mecanumRobot.setServo(0)
        basic.pause(500)
        distance_2 = mecanumRobot.ultra()
        basic.pause(500)
        if (distance_1 > distance_2) {
            LEFT()
            mecanumRobot.setServo(90)
            basic.pause(500)
        } else {
            RIGHT()
            mecanumRobot.setServo(90)
            basic.pause(500)
        }
    } else {
        CAR_FORWARD()
    }
}
function back_stop () {
    mecanumRobot.Motor(LR.Lower_left, MD.Forward, 0)
    mecanumRobot.Motor(LR.Upper_left, MD.Forward, 0)
    mecanumRobot.Motor(LR.Upper_right, MD.Forward, 0)
    mecanumRobot.Motor(LR.Lower_right, MD.Forward, 0)
}
function CAR_BACK () {
    mecanumRobot.Motor(LR.Upper_left, MD.Back, 40)
    mecanumRobot.Motor(LR.Lower_left, MD.Back, 40)
    mecanumRobot.Motor(LR.Upper_right, MD.Back, 40)
    mecanumRobot.Motor(LR.Lower_right, MD.Back, 40)
}
function RIGHT () {
    mecanumRobot.Motor(LR.Upper_left, MD.Forward, 60)
    mecanumRobot.Motor(LR.Lower_left, MD.Forward, 60)
    mecanumRobot.Motor(LR.Upper_right, MD.Back, 40)
    mecanumRobot.Motor(LR.Lower_right, MD.Back, 40)
}
function forward_stop () {
    mecanumRobot.Motor(LR.Lower_left, MD.Forward, 0)
    mecanumRobot.Motor(LR.Upper_left, MD.Forward, 0)
    mecanumRobot.Motor(LR.Upper_right, MD.Forward, 0)
    mecanumRobot.Motor(LR.Lower_right, MD.Forward, 0)
}
function CAR_FORWARD () {
    mecanumRobot.Motor(LR.Upper_left, MD.Forward, 50)
    mecanumRobot.Motor(LR.Lower_left, MD.Forward, 50)
    mecanumRobot.Motor(LR.Upper_right, MD.Forward, 50)
    mecanumRobot.Motor(LR.Lower_right, MD.Forward, 50)
}
let Val2 = 0
let VAL = 0
let distance_2 = 0
let distance_1 = 0
let distance = 0
irRemote.connectInfrared(DigitalPin.P9)
basic.showString("go team!!")
basic.showLeds(`
    . # # . .
    . . . # .
    . . # # .
    . . . # .
    . # # . .
    `)
basic.forever(function () {
    VAL = irRemote.returnIrButton()
    if (VAL != 0) {
        Val2 = VAL
        if (Val2 == irRemote.irButton(IrButton.Up)) {
            CAR_FORWARD()
        } else if (Val2 == irRemote.irButton(IrButton.Left)) {
            LEFT()
        } else if (Val2 == irRemote.irButton(IrButton.Right)) {
            RIGHT()
        } else if (Val2 == irRemote.irButton(IrButton.Down)) {
            CAR_BACK()
        }
    } else if (Val2 == irRemote.irButton(IrButton.Ok)) {
        mecanumRobot.state(MotorState.stop)
    } else if (Val2 == irRemote.irButton(IrButton.Hash)) {
        ultra_sonic_mode()
    } else if (Val2 == irRemote.irButton(IrButton.Star)) {
        stop_ultrs_sonic()
    }
})
