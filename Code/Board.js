function createBoard(scene) {
  const g = scene.add.graphics();
  g.depth = 2;
  g.lineStyle(2, 0x000000, 1);

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

  // Store cell data for hit detection
  const cellData = [];

  function drawOne(layerIndex, cx, cy, topW, bottomW, height, cols, rows) {
    // corner points
    const halfTop = topW / 2;
    const halfBot = bottomW / 2;
    const tl = new Phaser.Math.Vector2(cx - halfTop, cy);
    const tr = new Phaser.Math.Vector2(cx + halfTop, cy);
    const bl = new Phaser.Math.Vector2(cx - halfBot, cy + height);
    const br = new Phaser.Math.Vector2(cx + halfBot, cy + height);

    // outline
    g.strokePoints([tl, tr, br, bl], true);

    // Create cells
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Calculate the four corners of this cell
        const topRowLeft = tl.clone().lerp(tr, col / cols);
        const topRowRight = tl.clone().lerp(tr, (col + 1) / cols);
        const bottomRowLeft = bl.clone().lerp(br, col / cols);
        const bottomRowRight = bl.clone().lerp(br, (col + 1) / cols);

        // Calculate cell corners
        const cellTopLeft = topRowLeft.clone().lerp(bottomRowLeft, row / rows);
        const cellTopRight = topRowRight.clone().lerp(bottomRowRight, row / rows);
        const cellBottomLeft = topRowLeft.clone().lerp(bottomRowLeft, (row + 1) / rows);
        const cellBottomRight = topRowRight.clone().lerp(bottomRowRight, (row + 1) / rows);

        // Create polygon for this cell
        const cellPolygon = new Phaser.Geom.Polygon([
          cellTopLeft,
          cellTopRight,
          cellBottomRight,
          cellBottomLeft
        ]);

        // Calculate center point for text
        const cellCenterX = (cellTopLeft.x + cellTopRight.x + cellBottomLeft.x + cellBottomRight.x) / 4;
        const cellCenterY = (cellTopLeft.y + cellTopRight.y + cellBottomLeft.y + cellBottomRight.y) / 4;

        // Get approximate cell width for text scaling
        const cellWidth = Math.min(
          Phaser.Math.Distance.Between(cellTopLeft.x, cellTopLeft.y, cellTopRight.x, cellTopRight.y),
          Phaser.Math.Distance.Between(cellBottomLeft.x, cellBottomLeft.y, cellBottomRight.x, cellBottomRight.y)
        );

        cellData.push({
          layer: layerIndex,
          row: row,
          col: col,
          polygon: cellPolygon,
          x: cellCenterX,
          y: cellCenterY,
          width: cellWidth
        });
      }
    }

    // vertical grid lines
    for (let i = 1; i < cols; i++) {
      const t = i / cols;
      const topPt = tl.clone().lerp(tr, t);
      const botPt = bl.clone().lerp(br, t);
      g.strokeLineShape(new Phaser.Geom.Line(topPt.x, topPt.y, botPt.x, botPt.y));
    }

    // horizontal grid lines
    for (let j = 1; j < rows; j++) {
      const s = j / rows;
      const leftPt = tl.clone().lerp(bl, s);
      const rightPt = tr.clone().lerp(br, s);
      g.strokeLineShape(new Phaser.Geom.Line(leftPt.x, leftPt.y, rightPt.x, rightPt.y));
    }
  }

  // draw three boards with the same grid but stepped down the screen
  const centerX = scene.scale.width / 2;
  drawOne(0, centerX, 250, 500, 600, 150, 3, 3);
  drawOne(1, centerX, 450, 500, 600, 150, 3, 3);
  drawOne(2, centerX, 650, 500, 600, 150, 3, 3);

  // Add global click handler
  scene.input.on('pointerdown', function(pointer) {
    for (let i = 0; i < cellData.length; i++) {
      const cell = cellData[i];
      if (Phaser.Geom.Polygon.Contains(cell.polygon, pointer.x, pointer.y)) {
        scene.handleCellClick(cell.layer, cell.row, cell.col, cell);
        break;
      }
    }
  });

  board.cellData = cellData;

  return board;
}
