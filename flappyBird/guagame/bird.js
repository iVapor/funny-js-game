class GuaAnimation {
    constructor(game) {
        this.game = game
        // 为了省事，在这里 hard code 一套动画
        this.animations = {
            b: [],
        }
        // for (let i = 1; i < 7; i++) {
        //     let name = `run${i}`
        //     let t = game.textureByName(name)
        //     this.animations['run'].push(t)
        // }

        for (let i = 0; i < 3; i++) {
            let name = `b${i}`
            let t = game.textureByName(name)
            this.animations['b'].push(t)
        }

        this.animationName = 'b'
        this.texture = this.frames()[0]
        this.w = this.texture.w
        this.h = this.texture.h

        this.frameIndex = 0
        this.frameCount = 3

        this.flipX = false
        this.rotation = 0
        this.alpha = 1
        // 重力和加速度
        this.gy = 10
        this.vy = 0
    }
    static new(game) {
        return new this(game)
    }
    frames() {
        return this.animations[this.animationName]
    }
    jump() {
        this.vy = -10
        this.rotation = -45
    }
    update() {
        // 更新 alpha
        // if (this.alpha > 0) {
        //     this.alpha -= 0.05
        // } else {
        //     this.alpha = 1
        // }
        // 更新受力
        this.y += this.vy
        this.vy += this.gy * 0.2
        if (this.y > 490) {
            this.y = 490
        }
        // 更新角度
        if (this.rotation < 45) {
            this.rotation += 5
        }

        this.frameCount--
        if (this.frameCount === 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames().length
            this.texture = this.frames()[this.frameIndex]
        }
    }
    draw() {
        let context = this.game.context
        context.save()

        let w2 = this.w / 2
        let h2 = this.h / 2
        let x = this.x + this.w / 2
        context.translate(this.x + w2, this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }

        context.globalAlpha = this.alpha
        context.rotate(this.rotation * Math.PI / 180)

        context.translate(-w2, -h2)
        context.drawImage(this.texture.image, 0, 0);

        context.restore()

    }
    move(x, keyStatus) {
        this.flipX = x < 0
        this.x += x
        // let animationNames = {
        //     down: 'run',
        //     up: 'fall',
        // }
        //
        // let name = animationNames[keyStatus]
        // this.changeAnimation(name)
    }
    changeAnimation(name) {
        this.animationName = name
    }
    collide(b) {
        return rectIntersects(this, b) || rectIntersects(b, this)
        // return rectIntersects(this, b)
    }
}
