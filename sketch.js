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
  image(capture, (width - capture.width) / 2, (height - capture.height) / 2); // 將影像顯示在視窗中間
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時，調整畫布大小
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 重新調整影像大小
}
