class GuaScene {
    constructor(game) {
        this.game = game
        this.debugModeEnabled = true
        this.elements = []
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    addElement(image) {
        image.scene = this
        this.elements.push(image)
        let eleIndex = this.elements.length - 1
        return eleIndex
    }
    removeElement(index) {
        this.elements.splice(index, 1)
        log('this.elements', this.elements)
    }
    draw() {
        for (let e of this.elements) {
            e.draw()
        }
    }
    debug() {
        this.birdSpeed = config.bird_speed.value
    }
    update() {
        this.debug && this.debug()
        if (this.debugModeEnabled) {
            for (let i = 0; i < this.elements.length; i++) {
                let e = this.elements[i]
                e.debug && e.debug()
            }
        }
        for (let i = 0; i < this.elements.length; i++) {
            let e = this.elements[i]
            e.update()
        }

        for (let i = 0; i < this.elements.length; i++) {
            let e = this.elements[i]
            let hasDuration = e.duration !== undefined && e.duration === 0
            if (hasDuration) {
                this.removeElement(i)
            }
        }
    }
}
