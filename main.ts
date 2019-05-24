import * as ex from 'excalibur'

const game = new ex.Engine({
  width: 400,
  height: 600
})

// Configuration
const bpm = 150
const lane = 4
const leftOffset = 20
const bottomOffset = 20
const cellWidth = 30
const cellHeight = 30
const cellHorizontalMargin = 10
const cellVerticalMargin = 10
const visibleCellDistance = 5

export class Cell extends ex.Actor {
  static readonly width = 50
  static readonly height = 50

  constructor(x, y, color) {
    super(x, y, Cell.width, Cell.height, color)
  }
}

export class TapCell extends Cell {
  static readonly color = ex.Color.Orange

  constructor(x, y) {
    super(x, y, TapCell.color)
  }
}

export class WaitCell extends Cell {
  static readonly color = ex.Color.White

  constructor(x, y) {
    super(x, y, WaitCell.color)
  }
}

// Initialization
let cells = []
for (let x = 0; x < lane; x++) {
  for (let y = 0; y < visibleCellDistance; y++) {
    let cell = new TapCell(
      Cell.width / 2 +
      leftOffset + x * (Cell.width + cellHorizontalMargin),
      - Cell.height / 2 + game.drawHeight - bottomOffset - y * (Cell.height + cellVerticalMargin),
    )
  
    cells.push(cell)
    game.add(cell)
  }
}



game.start()