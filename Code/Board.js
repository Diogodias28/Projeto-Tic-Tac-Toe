function createBoard(scene) {
  // a single Graphics instance for all boards
  const g = scene.add.graphics();
  g.depth = 2;
  g.lineStyle(2, 0x000000, 1);

  function drawOne(cx, cy, topW, bottomW, height, cols, rows) {
    // corner points
    const halfTop = topW / 2;
    const halfBot = bottomW / 2;
    const tl = new Phaser.Math.Vector2(cx - halfTop, cy);
    const tr = new Phaser.Math.Vector2(cx + halfTop, cy);
    const bl = new Phaser.Math.Vector2(cx - halfBot, cy + height);
    const br = new Phaser.Math.Vector2(cx + halfBot, cy + height);

    // outline
    g.strokePoints([ tl, tr, br, bl ], true);

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
      const leftPt  = tl.clone().lerp(bl, s);
      const rightPt = tr.clone().lerp(br, s);
      g.strokeLineShape(new Phaser.Geom.Line(leftPt.x, leftPt.y, rightPt.x, rightPt.y));
    }
  }

  // draw four boards with the same grid but stepped down the screen:
  // you can tweak these parameters or add more calls as you like!
  const centerX = scene.scale.width / 2;
  drawOne(centerX,  250, 500, 600,  150,  3, 3);
  drawOne(centerX, 450, 500, 600,  150,  3, 3);
  drawOne(centerX, 650, 500, 600,  150,  3, 3);

  return [
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
}
