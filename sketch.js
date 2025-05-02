let capture;
let overlayGraphics;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布
  background('#9E2A2B'); // 設定背景顏色

  // 嘗試擷取攝影機影像
  try {
    capture = createCapture({
      video: true,
      audio: false // 僅啟用視訊
    }, (stream) => {
      console.log('Camera started successfully');
    });

    capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
    capture.hide(); // 隱藏原始影像，僅顯示在畫布上
  } catch (error) {
    console.error('Camera not found:', error);
    alert('無法找到攝影機，請檢查以下事項：\n1. 攝影機是否已啟用。\n2. 是否允許瀏覽器存取攝影機。\n3. 攝影機是否已正確連接。\n4. 如果使用的是筆記型電腦，請確認內建攝影機是否可用。');
  }

  // 如果攝影機初始化失敗，顯示替代訊息
  if (!capture) {
    alert('無法啟動攝影機，請檢查裝置設定。');
  }

  // 建立與視訊畫面相同大小的 overlayGraphics
  overlayGraphics = createGraphics(windowWidth * 0.8, windowHeight * 0.8);
  drawOverlayGraphics(); // 初始化 overlayGraphics
}

function draw() {
  background('#9E2A2B'); // 確保背景顏色持續更新

  // 繪製攝影機影像
  if (capture && capture.loadedmetadata) {
    push();
    translate(width, 0); // 將原點移動到畫布右上角
    scale(-1, 1); // 水平翻轉畫布
    image(capture, (width - capture.width) / 2, (height - capture.height) / 2); // 繪製翻轉後的影像
    pop();
  } else {
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text('無法顯示攝影機影像，請檢查裝置。', width / 2, height / 2);
  }

  // 繪製 overlayGraphics 在視訊畫面上方
  image(
    overlayGraphics,
    (width - overlayGraphics.width) / 2,
    (height - overlayGraphics.height) / 2
  );
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時，調整畫布大小
  if (capture) {
    capture.size(windowWidth * 0.8, windowHeight * 0.8); // 重新調整影像大小
  }

  // 重新調整 overlayGraphics 的大小
  overlayGraphics = createGraphics(windowWidth * 0.8, windowHeight * 0.8);
  drawOverlayGraphics(); // 重新繪製 overlayGraphics
} // 修正：補上缺少的括號

function drawOverlayGraphics() {
  overlayGraphics.background(245, 245, 220); // 設定背景為米白色 (RGB: 245, 245, 220)
  overlayGraphics.noStroke();

  for (let y = 0; y < overlayGraphics.height; y += 30) {
    for (let x = 0; x < overlayGraphics.width; x += 30) {
      // 從 capture 中取得相對應位置的顏色
      let col = capture && capture.loadedmetadata ? capture.get(x, y) : [0, 0, 0];
      overlayGraphics.fill(col); // 設定方框的顏色
      overlayGraphics.rect(x, y, 18, 30); // 繪製方框，寬 18，高 30

      // 在方框中間繪製五個黑色的圓
      overlayGraphics.fill(0); // 設定圓的顏色為黑色
      for (let i = 0; i < 5; i++) {
        let cx = x + 9; // 圓的 x 座標為方框的中心
        let cy = y + 6 + i * 6; // 圓的 y 座標分佈在方框內
        overlayGraphics.ellipse(cx, cy, 4, 4); // 繪製圓，直徑為 4
      }
    }
  }
}
