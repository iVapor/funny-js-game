class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)

        game.registerAction('k', function(){
            let s = GameScene.new(game)
            game.replaceScene(s)
        })

        let bg = GuaImage.new(game, 'bg')
        this.addElement(bg)

        let label = GuaLabel.new(this.game, '按 k 开始游戏！', 80, 200)
        this.game.context.fillStyle  = '#0701af'
        this.game.context.font = `${20}px sans-serif`
        this.addElement(label)

        let howto = GuaLabel.new(this.game, '游戏过程中，按 j 跳跃！', 40, 240)
        // this.game.context.fillStyle  = 'white'
        this.game.context.font = `${20}px sans-serif`
        this.addElement(howto)

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
    }
}