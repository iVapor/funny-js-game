class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup() {
        this.speed = config.bullet_speed
    }
    update() {

        this.y -= this.speed
    }
}

class Player extends GuaImage {
    constructor(game) {
        super(game, 'player')
        this.setup()
        this.moveDown()
    }
    setup() {
        this.speed = 10
        this.cooldown = 0
    }
    update() {
        this.speed = config.player_speed
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }
    fire() {
        if (this.cooldown === 0) {
            this.cooldown = config.fire_cooldown
            let x = this.x + this.w / 2
            let y = this.y - 70
            let b = Bullet.new(this.game)
            let halfBullet = b.w / 2

            b.x = x - halfBullet
            b.y = y
            this.scene.addElement(b)
        }

    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
}


class Enemy extends GuaImage {
    constructor(game) {
        let type = randomBetween(0, 4)
        let name = `enemy${type}`
        super(game, name)

        this.setup()
    }
    setup() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 160)
        this.y = -randomBetween(0, 200)
    }
    update() {
        this.y += this.speed
        if (this.y > 500) {
            this.setup()
        }
    }
}

class Cloud extends GuaImage {
    constructor(game) {
        let type = randomBetween(0, 1)
        let name = `cloud${type}`
        log('name', name)
        super(game, name)

        // this.type = type
        this.setup()
    }
    setup() {
        this.speed = 1
        this.x = 0
        this.y = -randomBetween(0, 200)
    }
    update() {

        this.y += this.speed
        if (this.y > 500) {
            this.setup()
        }
    }
    debug() {
        this.speed = config.cloud_speed
    }
}

class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }
    setupInputs() {
        let g = this.game
        let s = this
        g.registerAction('a', function () {
            s.player.moveLeft()
        })
        g.registerAction('d', function () {
            s.player.moveRight()
        })
        g.registerAction('w', function () {
            s.player.moveUp()
        })
        g.registerAction('s', function () {
            s.player.moveDown()
        })
        g.registerAction('j', function () {
            s.player.fire()
        })
    }
    setup() {
        this.numberOfEnemies = 10
        this.bg = GuaImage.new(this.game, 'sky')

        this.player = Player.new(this.game)
        this.player.x = 160
        this.player.y = 300

        this.addElement(this.bg)
        this.numberOfCloud = 2
        this.addCloud()
        this.addElement(this.player)

        this.addEnemies()
        // add particles
        let ps = GuaParticleSystem.new(this.game)
        let psIndex = this.addElement(ps)
    }
    addCloud() {
        let es = []
        for (let i = 0; i < this.numberOfCloud; i++) {
            let e = Cloud.new(this.game)
            es.push(e)
            this.addElement(e)
        }

        // this.enemies = es
    }
    addEnemies() {
        let es = []
        for (let i = 0; i < this.numberOfEnemies; i++) {
            let e = Enemy.new(this.game)
            es.push(e)
            this.addElement(e)
        }

        this.enemies = es
    }
    update() {
        super.update()

    }
}
