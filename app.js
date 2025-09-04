// --- Age Gate ---
const ageGate = document.getElementById("ageGate");
const mainContent = document.getElementById("mainContent");

window.onload = function() {
  ageGate.style.display = "block";
};

function enterSite() {
  ageGate.style.display = "none";
  mainContent.style.display = "block";
}

// --- Old Video Posts ---

<div class="videoWrapper">
  <iframe width="640" height="360"
    src="https://youtu.be/ahbECMmEleQ?si=EJ_kqL6o_UvWSgsv"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>





const videoSrc = "https://drive.google.com/file/d/1FAsokB11cSc4Fk6b4fVSSZOv2fbZxlkR/view?usp=sharing"; // ضع رابط Dropbox مباشر هنا
const oldVideoContainer = document.getElementById("oldVideoPosts");
const oldVideoLinks = document.getElementById("oldVideoLinks");

for (let i = 0; i < 3; i++) {
  // إضافة الفيديو داخل content
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

  // إضافة الرابط في sidebar تحت Old Video Posts
  const link = document.createElement("a");
  link.href = "#";
  link.textContent = "Old Video " + (i + 1);
  oldVideoLinks.appendChild(link);
}
