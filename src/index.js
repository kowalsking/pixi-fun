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
    this.acceleration = 1
    this.bullets = []

    this.draw()
  }

  draw() {
    c.beginPath()
    c.fillStyle = '#0a0'
    c.arc(this.x, this.y, 5, 0, Math.PI * 2)
    c.fill()
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

    canvas.addEventListener('click', (e) => {
      const { x, y } = e
      this.shoot({x, y})
    })
  }

  shoot({x, y}) {
    const angle = -Math.atan2(y - this.y, x - this.x);

    const bullet = {
      x: this.x + 5 * Math.cos(angle),
      y: this.y - 5 * Math.sin(angle),
      size: 2,
      xv: 5 * Math.cos(angle),
      yv: -5 * Math.sin(angle)
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
}

class Controller {
  constructor(player, view) {
    this.player = player
    this.view = view

    this.player.handleEvents()
    window.requestAnimationFrame(() => this.update())
  }

  update(frame) {
    this.view.clearCanvas()
    
    this.player.vy *= this.player.friction
    this.player.y += this.player.vy

    this.player.vx *= this.player.friction
    this.player.x += this.player.vx
    this.player.draw()
    this.player.drawBullets()
    this.player.moveBullet()

    window.requestAnimationFrame(this.update.bind(this))
  }

  checkCollision(one, two) {

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

const player = new Player(100, 200, 50, 50)
const view = new View()
const controller = new Controller(player, view)