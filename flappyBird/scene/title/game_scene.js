class GameScene extends GuaScene {
    constructor(game) {
        super(game)
        let bg = GuaImage.new(game, 'bg')
        this.addElement(bg)
        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)

        // 循环移动地面
        this.grounds = []
        for (let i = 0; i < 30; i++) {
            let g = GuaImage.new(game, 'ground')
            g.x = i * 36
            g.y = 512
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 4

        let b = GuaAnimation.new(game)
        this.w = b
        b.x = 160
        b.y = 300
        this.bird = b
        this.birdSpeed = 2
        this.addElement(b)

        this.setupInputs()
        this.gameOver = false
    }
    showEndScene() {
        let label = GuaLabel.new(this.game, '到此为止了！', 100, 240)
        let newText = GuaLabel.new(this.game, '按 k 重新开始游戏！', 80, 280)
        this.game.context.font = `${20}px sans-serif`
        this.game.context.fillStyle  = 'white'

        let endImg = GuaImage.new(this.game, 'gameOver')
        endImg.x = 48
        endImg.y = 150
        this.addElement(label)
        this.addElement(newText)
        this.addElement(endImg)
    }
    update() {
        super.update()

        if (this.gameOver) {
            this.showEndScene()
            return
        }
        // 地面移动
        this.skipCount--
        this.offset = -5
        if (this.skipCount === 0) {
            this.skipCount = 4
            this.offset = 15
        }

        for (let i = 0; i < 30; i++) {
            let g = this.grounds[i]
            g.x += this.offset
        }

        this.collidePipe()
        this.touchGround()
    }
    // 小鸟撞到管子
    collidePipe() {
        let allPipe = this.pipe.pipes
        for (let i = 0; i < allPipe.length; i++) {
            let p = allPipe[i]

            if (this.bird.collide(p)) {
                log('this.bird', this.bird)
                log('p', p)
                this.gameOver = true
                this.pipe.gameOver = true
            }
        }
    }
    // 小鸟碰到地面
    touchGround() {
        // 地面 y 轴数值 490
        let die = this.bird.y === 490
        if (die) {
            this.gameOver = true
            this.pipe.gameOver = true
        }
    }

    setupInputs() {
        let self = this
        let b = this.bird
        self.game.registerAction('a', function(keyStatus){
            b.move(-self.birdSpeed, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus){
            b.move(self.birdSpeed, keyStatus)
        })
        self.game.registerAction('j', function(keyStatus){
            b.jump()
        })
    }
}
