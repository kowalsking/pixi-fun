const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const width = window.innerWidth
const height = window.innerHeight

canvas.width = width
canvas.height = height

class Player {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.vx = 0
    this.vy = 0
    this.maxSpeed = 2
    this.friction = 0.98
    this.width = width
    this.height = height

    this.draw()
  }

  draw() {
    c.beginPath()
    c.fillStyle = '#0ff'
    c.arc(this.x, this.y, this.width, 0, Math.PI * 2)
    c.fill()
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
    const p = this.player

    window.addEventListener('keydown', e => {
      switch (e.key) {
        case 'w': {
          if (p.vy > -p.maxSpeed) p.vy--

          // this.player.y -= 15
          break;
        }
        case 'a': {
          if (p.vx > -p.maxSpeed) p.vx--

          // this.player.x -= 15
          break;
        }
        case 'd': {
          if (p.vx > -p.maxSpeed) p.vx++

          // this.player.x += 15
          break;
        }
        case 's': {
          if (p.vy < p.maxSpeed) p.vy++
          

          // this.player.y += 15
          break;
        }
      }
    })
  }

  update(frame) {
    this.view.clearCanvas()
    this.player.draw()

    this.player.vy *= this.player.friction
    this.player.y += this.player.vy

    this.player.vx *= this.player.friction
    this.player.x += this.player.vx
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