let game = new ex.Engine({
  width: 800,
  height: 600
})

let paddle = new ex.Actor(150, game.drawHeight - 400, 200, 20)
paddle.color = ex.Color.Chartreuse
paddle.collisionType = ex.CollisionType.Fixed

game.input.pointers.primary.on('move', evt => {
  paddle.pos.x = evt.worldPos.x
})

let ball = new ex.Actor(100, 100, 20, 20)
ball.color = ex.Color.Red
ball.vel.setTo(-100, 100)
ball.collisionType = ex.CollisionType.Passive

ball.on('precollision', evt => {
  if (bricks.indexOf(evt.other) != -1) {
    evt.other.kill()
  }

  let intersection = evt.intersection.normalize()

  if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
    ball.vel.x *= -1
  } else {
    ball.vel.y *= -1
  }
})

ball.on('postupdate', () => {
  if (ball.pos.x - ball.getWidth() / 2 < 0) {
    ball.vel.x *= -1
  }

  if (ball.pos.x + ball.getWidth() / 2 > game.drawWidth) {
    ball.vel.x *= -1
  }

  if (ball.pos.y - ball.getHeight() / 2 < 0) {
    ball.vel.y *= -1
  }
})

ball.draw = (ctx, delta) => {
  ctx.fillStyle = ball.color.toString()
  ctx.beginPath()
  ctx.arc(ball.pos.x, ball.pos.y, 10, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fill()
}

// bricks
const padding = 20
const xoffset = 65
const yoffset = 20
const cols = 5
const rows = 3

let brickColor = [ex.Color.Violet, ex.Color.Orange, ex.Color.Yellow]
let brickWidth = game.drawWidth / cols - padding - padding / cols
let brickHeight = 30
let bricks = []
for (let y = 0; y < rows; ++y) {
  for (let x = 0; x < cols; ++x) {
    bricks.push(
      new ex.Actor(
        xoffset + x * (brickWidth + padding) + padding,
        yoffset + y * (brickHeight + padding) + padding,
        brickWidth,
        brickHeight,
        brickColor[y % brickColor.length]
      )
    )
  }
}

for (let brick of bricks) {
  brick.collisionType = ex.CollisionType.Active
  game.add(brick)
}

game.add(paddle)
game.add(ball)
game.start()