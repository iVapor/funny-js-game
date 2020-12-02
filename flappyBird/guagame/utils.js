var e = sel => document.querySelector(sel)

var log = console.log.bind(console)

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

const rectIntersects = function(a, b) {
    if (b.y > a.y && b.y < a.y + a.h) {
        if (b.x > a.x && b.x < a.x + a.w) {
            return true
        }
    }
    return false
}

const randomBetween = (start, end) => {
    let n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}
