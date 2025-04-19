function createBoard(scene) {
  const board = [
    [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ],
    [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ],
    [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
  ];

  const width = scene.game.config.width;
  const height = scene.game.config.height;
  const cellSize = Math.min(width, height) / 9;

  scene.cells = []; // Store cell references for resetting
  const shiftLeft = 150;
  const layerOffsets = [
    { x: width / 4 - width / 2 - shiftLeft, y: height / 2 - (cellSize * 3) / 2 },
    { x: width / 2 - width / 2 - shiftLeft, y: height / 2 - (cellSize * 3) / 2 },
    { x: (width / 4) * 3 - width / 2 - shiftLeft, y: height / 2 - (cellSize * 3) / 2 }
  ];

  for (let layer = 0; layer < 3; layer++) {
    const offsetX = layerOffsets[layer].x;
    const offsetY = layerOffsets[layer].y;

    // Texto acima do layer, centralizado com o grid
    if (layer == 0) {
      scene.add.text(offsetX + width / 2 + (3 * cellSize) / 2, offsetY - cellSize * 0.6, `Parte de baixo`, {
        fontSize: `${cellSize / 2}px`,
        color: '#000',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      }).setOrigin(0.5).setDepth(1);
    }
    if (layer == 1) {
      scene.add.text(offsetX + width / 2 + (3 * cellSize) / 2, offsetY - cellSize * 0.6, `Parte do meio`, {
        fontSize: `${cellSize / 2}px`,
        color: '#000',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      }).setOrigin(0.5).setDepth(1);
    }
    if (layer == 2) {
      scene.add.text(offsetX + width / 2 + (3 * cellSize) / 2, offsetY - cellSize * 0.6, `Parte de cima`, {
        fontSize: `${cellSize / 2}px`,
        color: '#000',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      }).setOrigin(0.5).setDepth(1);
    }

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const x = col * cellSize + cellSize / 2 + offsetX + width / 2;
        const y = row * cellSize + cellSize / 2 + offsetY;
        const cell = scene.add.rectangle(x, y, cellSize, cellSize, 0xffffff).setInteractive();
        cell.on('pointerdown', () => scene.handleCellClick(layer, row, col, cell));
        scene.cells.push(cell);
      }
    }

    // Grid lines
    for (let i = 0; i <= 3; i++) {
      // Vertical lines
      scene.add.line(offsetX + width / 2, offsetY, i * cellSize, 0, i * cellSize, 3 * cellSize, 0x000000)
          .setOrigin(0)
          .setDepth(1);
      // Horizontal lines
      scene.add.line(offsetX + width / 2, offsetY, 0, i * cellSize, 3 * cellSize, i * cellSize, 0x000000)
          .setOrigin(0)
          .setDepth(1);
    }
  }

  return board;
}
