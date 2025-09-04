// رابط الفيديو المباشر
const videoSrc = "https://drive.google.com/uc?export=download&id=1FAsokB11cSc4Fk6b4fVSSZOv2fbZxlkR";

// العنصر الذي سيحتوي الفيديوهات
const oldVideoContainer = document.getElementById("oldVideoPosts");

// إنشاء 3 فيديوهات مكررة
for (let i = 0; i < 3; i++) {
  const videoWrapper = document.createElement("div");
  videoWrapper.className = "videoWrapper";

  const videoElement = document.createElement("video");
  videoElement.width = 640;
  videoElement.height = 360;
  videoElement.controls = true;

  const source = document.createElement("source");
  source.src = videoSrc;
  source.type = "video/mp4";

  videoElement.appendChild(source);
  videoWrapper.appendChild(videoElement);
  oldVideoContainer.appendChild(videoWrapper);
}
