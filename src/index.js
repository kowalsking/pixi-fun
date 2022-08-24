const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const width = window.innerWidth
const height = window.innerHeight

canvas.width = width
canvas.height = height

class Player {
  constructor(x, y, size) {
    this.x = x
    this.y = y
    this.vx = 0
    this.vy = 0
    this.maxSpeed = 2
    this.friction = 0.98
    this.size = size
    this.acceleration = 1
    this.bullets = []
    this.blocks = []
  }

  draw() {
    c.beginPath()
    c.fillStyle = '#0a0'
    c.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    c.fill()
  }

  update() {
    this.updatePosition()
    this.draw()
    this.drawBullets()
    this.moveBullet()
    this.drawBlocks()
  }

  updatePosition() {
    this.vy *= this.friction
    this.y += this.vy

    this.vx *= this.friction
    this.x += this.vx
  }

  handleEvents() {
    window.addEventListener('keydown', e => {
      switch (e.key) {
        case 'w': {
          if (this.vy > -this.maxSpeed) this.vy -= this.acceleration
          else this.vy = -this.maxSpeed
          break;
        }
        case 'a': {
          if (this.vx > -this.maxSpeed) this.vx -= this.acceleration
          else this.vx = -this.maxSpeed
          break;
        }
        case 'd': {
          if (this.vx < this.maxSpeed) this.vx += this.acceleration
          else this.vx = this.maxSpeed
          break;
        }
        case 's': {
          if (this.vy < this.maxSpeed) this.vy += this.acceleration
          else this.vy = this.maxSpeed
          break;
        }
      }
    })

    canvas.addEventListener('click', this.shoot.bind(this))
    canvas.addEventListener('contextmenu', this.block.bind(this))
  }

  block(e) {
    e.preventDefault()
    const { x, y } = e
    const angle = -Math.atan2(y - this.y, x - this.x);

    const block = {
      x: this.x + 20 * Math.cos(angle),
      y: this.y - 20 * Math.sin(angle),
      size: 10
    }

    this.blocks.push(block)
  }

  shoot({x, y}) {
    const angle = -Math.atan2(y - this.y, x - this.x);
    const speed = 5

    const bullet = {
      x: this.x + this.size * Math.cos(angle),
      y: this.y - this.size * Math.sin(angle),
      size: 2,
      xv: speed * Math.cos(angle),
      yv: -speed * Math.sin(angle)
    }

    this.bullets.push(bullet)
  }

  moveBullet () {
    this.bullets.forEach((bullet) => {
      bullet.x += bullet.xv 
      bullet.y += bullet.yv 
    }) 
  }

  drawBullets() {
    this.bullets.forEach((bullet) => {
      c.fillStyle = "red" 
      c.beginPath() 
      c.arc(bullet.x, bullet.y, bullet.size, 0, Math.PI * 2, false) 
      c.fill() 
    }) 
  }

  drawBlocks() {
    this.blocks.forEach((block) => {
      c.fillStyle = "blue" 
      c.fillRect(block.x, block.y, block.size, block.size)
    }) 
  }
}

class Controller {
  constructor() {
    this.player = new Player(100, 200, 5)
    this.view = new View()

    this.player.handleEvents()
    window.requestAnimationFrame(() => this.update())
  }

  update() {
    this.view.clearCanvas()
    this.player.update()

    window.requestAnimationFrame(this.update.bind(this))
  }

  distBetweenPoints (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
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

const controller = new Controller()