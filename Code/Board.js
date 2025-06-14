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
  drawOne(0, centerX, 380, 500, 600, 150, 3, 3);
  drawOne(1, centerX, 580, 500, 600, 150, 3, 3);
  drawOne(2, centerX, 780, 500, 600, 150, 3, 3);

  g.lineStyle(1, 0x555555, 1); // Cinza mais escuro para bordas
  for (let layer = 0; layer < 2; layer++) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        // Só desenha para células de borda
        const isEdgeCell = (row === 0 || row === 2) || (col === 0 || col === 2);
        if (!isEdgeCell) continue;

        // Encontra células correspondentes
        const topCell = cellData.find(c =>
          c.layer === layer && c.row === row && c.col === col
        );

        const bottomCell = cellData.find(c =>
          c.layer === layer + 1 && c.row === row && c.col === col
        );

        if (topCell && bottomCell) {
          const topPoly = topCell.polygon.points;
          const bottomPoly = bottomCell.polygon.points;

          // Determina quais cantos conectar baseado na posição
          if (col === 0) { // Borda esquerda
            g.strokeLineShape(new Phaser.Geom.Line(
              topPoly[0].x, topPoly[0].y,
              bottomPoly[0].x, bottomPoly[0].y
            ));
            g.strokeLineShape(new Phaser.Geom.Line(
              topPoly[3].x, topPoly[3].y,
              bottomPoly[3].x, bottomPoly[3].y
            ));
          }

          if (col === 2) { // Borda direita
            g.strokeLineShape(new Phaser.Geom.Line(
              topPoly[1].x, topPoly[1].y,
              bottomPoly[1].x, bottomPoly[1].y
            ));
            g.strokeLineShape(new Phaser.Geom.Line(
              topPoly[2].x, topPoly[2].y,
              bottomPoly[2].x, bottomPoly[2].y
            ));
          }

          if (row === 0) { // Borda superior
            g.strokeLineShape(new Phaser.Geom.Line(
              topPoly[0].x, topPoly[0].y,
              bottomPoly[0].x, bottomPoly[0].y
            ));
            g.strokeLineShape(new Phaser.Geom.Line(
              topPoly[1].x, topPoly[1].y,
              bottomPoly[1].x, bottomPoly[1].y
            ));
          }

          if (row === 2) { // Borda inferior
            g.strokeLineShape(new Phaser.Geom.Line(
              topPoly[3].x, topPoly[3].y,
              bottomPoly[3].x, bottomPoly[3].y
            ));
            g.strokeLineShape(new Phaser.Geom.Line(
              topPoly[2].x, topPoly[2].y,
              bottomPoly[2].x, bottomPoly[2].y
            ));
          }
        }
      }
    }
  }

  // Add global click handler
  scene.input.on('pointerdown', function (pointer) {
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
