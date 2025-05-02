let capture;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕畫布
  background('#9E2A2B'); // 設定背景顏色
  capture = createCapture(VIDEO); // 擷取攝影機影像
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始影像，僅顯示在畫布上
}

function draw() {
  background('#9E2A2B'); // 確保背景顏色持續更新
  push(); // 儲存當前繪圖設定
  translate(width, 0); // 將原點移動到畫布右上角
  scale(-1, 1); // 水平翻轉畫布
  image(capture, (width - capture.width) / 2, (height - capture.height) / 2); // 繪製翻轉後的影像
  pop(); // 恢復繪圖設定
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時，調整畫布大小
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 重新調整影像大小
}

