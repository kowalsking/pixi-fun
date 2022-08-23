const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const width = window.innerWidth
const height = window.innerHeight

canvas.width = width
canvas.height = height

c.fillStyle = '#ccc'
c.fillRect(0, 0, window.innerWidth, window.innerHeight)


class Player {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height

    this.draw()
  }

  draw() {
    c.fillStyle = '#0ff'
    c.fillRect(this.x, this.y, this.width, this.height)
  }
}

class Controller {
  constructor(player, view) {
    this.player = player
    this.view = view

    this.handleEvents()
    window.requestAnimationFrame(this.update.bind(this))
  }

  handleEvents() {
    window.addEventListener('keydown', e => {
      switch (e.key) {
        case 'w': {
          this.player.y -= 15
          break;
        }
        case 'a': {
          this.player.x -= 15
          break;
        }
        case 'd': {
          this.player.x += 15
          break;
        }
        case 's': {
          this.player.y += 15
          break;
        }
      }
    })
  }

  update(frame) {
    this.view.clearCanvas()
    this.player.draw()
    window.requestAnimationFrame(this.update.bind(this))
  }
}

class View {
  constructor() {

  }

  clearCanvas() {
    c.fillStyle = '#ccc'
    c.fillRect(0, 0, width, height)
  }
}

const player = new Player(100, 200, 50, 50)
const view = new View()
const controller = new Controller(player, view)