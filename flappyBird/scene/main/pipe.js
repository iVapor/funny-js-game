class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 150
        this.管子横向间距 = 100
        this.columsOfPipe = 10

        this.pipeSpeed = 5

        for (let i = 0; i < this.columsOfPipe; i++) {
            let p1 = GuaImage.new(game, 'pipe')
            p1.flipY = true
            p1.x = 500 + i * this.管子横向间距

            let p2 = GuaImage.new(game, 'pipe')
            p2.x = p1.x
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }

        this.gameOver = false
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-200, 0)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    debug() {
        this.管子横向间距 = config.管子横向间距.value
        this.pipeSpace = config.pipe_space.value
    }
    update(u) {
        log('update' ,u)
        if (this.gameOver) {
            return
        }
        for (let i = 0; i < this.pipes.length / 2; i += 2) {
            let p1 = this.pipes[i]
            let p2 = this.pipes[i+1]
            p1.x -= this.pipeSpeed
            p2.x -= this.pipeSpeed
            if (p1.x < -100) {
                p1.x += this.管子横向间距 * this.columsOfPipe

            }
            if (p2.x < -100) {
                p2.x += this.管子横向间距 * this.columsOfPipe
                this.resetPipesPosition(p1, p2)
            }
        }
    }
    draw() {
        let context = this.game.context
        for (let p of this.pipes) {
            context.save()

            let w2 = p.w / 2
            let h2 = p.h / 2
            let x = p.x + p.w / 2
            context.translate(p.x + w2, p.y + h2)
            let scaleX = p.flipX ? -1 : 1
            let scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)

            context.rotate(p.rotation * Math.PI / 180)

            context.translate(-w2, -h2)
            context.drawImage(p.texture.image, 0, 0);

            context.restore()
        }
    }
}