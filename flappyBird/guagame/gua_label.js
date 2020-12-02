class GuaLabel {
    constructor(game, text, x, y) {
        this.game = game
        this.text = text
        this.x = x
        this.y = y
    }
    static new(game, text, x, y) {
        var i = new this(game, text, x, y)
        return i
    }
    draw() {
        this.game.context.fillText(this.text, this.x, this.y)
    }
    update() {

    }
}
