// رابط الفيديو المباشر من Google Drive (بعد التحويل)
const videoUrl = "";

// تحديد الحاوية الخاصة بالفيديوهات القديمة
const oldVideoContainer = document.getElementById("oldVideoPosts");

// إنشاء عنصر فيديو وإضافته للحاوية
function addOldVideo(title, url) {
  const wrapper = document.createElement("div");
  wrapper.className = "videoWrapper";

  const video = document.createElement("video");
  video.width = 640;
  video.height = 360;
  video.controls = true;

  const source = document.createElement("source");
  source.src = url;
  source.type = "video/mp4";

  video.appendChild(source);
  wrapper.appendChild(video);

  const caption = document.createElement("p");
  caption.textContent = title;
  wrapper.appendChild(caption);

  oldVideoContainer.appendChild(wrapper);
}

// إضافة الفيديو (مكرر 3 مرات للتجربة مثلاً)
addOldVideo("Old Video 1", videoUrl);
addOldVideo("Old Video 2", videoUrl);
addOldVideo("Old Video 3", videoUrl);
