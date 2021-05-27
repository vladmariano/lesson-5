controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 7 7 . . . . . . . . 
        . . . . . . 5 7 7 . . . . . . . 
        . . . . . . 5 5 7 7 . . . . . . 
        . . . . . . 5 7 7 . . . . . . . 
        . . . . . . 7 7 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, spaceship, 50, 0)
    music.pewPew.play()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    music.bigCrash.play()
    info.changeScoreBy(1)
    if (info.score() == 20) {
        game.over(true)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    music.zapped.play()
    info.changeLifeBy(-1)
    scene.cameraShake(8, 500)
})
let enemyship: Sprite = null
let projectile: Sprite = null
let spaceship: Sprite = null
effects.starField.startScreenEffect()
spaceship = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . 7 7 7 7 7 7 . . . . . . . 
    . . . 5 5 5 7 . . . . . . . . . 
    . . . 5 4 4 4 . . . . . . . . . 
    . . . 5 4 . . . . . . . . . . . 
    . . . 5 7 7 7 7 4 4 . . . . . . 
    . . . 5 7 7 7 7 4 4 . . . . . . 
    . . . 5 4 . . . . . . . . . . . 
    . . . 5 4 4 4 . . . . . . . . . 
    . . . 5 5 5 7 . . . . . . . . . 
    . . . 7 7 7 7 7 7 . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(spaceship)
spaceship.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    enemyship = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . 2 2 2 . . 
        . . . . . . . . . . . 2 2 2 . . 
        . . . . . . . . 7 7 7 7 7 2 . . 
        . . . . . . . . . . . 2 2 2 . . 
        . . . . . . . . . 2 2 2 1 2 . . 
        . . . . . . . . . 2 2 1 1 2 . . 
        . . . . . . . . . 2 2 2 1 2 . . 
        . . . . . . . . . . . 2 2 2 . . 
        . . . . . . . . 7 7 7 7 7 2 . . 
        . . . . . . . . . . . 2 2 2 . . 
        . . . . . . . . . . . 2 2 2 . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    enemyship.setPosition(scene.screenWidth(), randint(0, scene.screenHeight()))
    enemyship.setVelocity(-50, 0)
})
