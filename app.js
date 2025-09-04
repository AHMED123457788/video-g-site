// Age Gate
const ageGate = document.getElementById("ageGate");
const mainContent = document.getElementById("mainContent");

window.onload = () => {
  ageGate.style.display = "flex";
};

function enterSite() {
  ageGate.style.display = "none";
  mainContent.style.display = "block";
}

// Old Video Posts (Vimeo embed)
const vimeoEmbedUrl = "https://drive.google.com/uc?export=download&id=1FAsokB11cSc4Fk6b4fVSSZOv2fbZxlkR";
const oldVideoContainer = document.getElementById("oldVideoPosts");
const oldVideoLinks = document.getElementById("oldVideoLinks");

for (let i = 0; i < 3; i++) {
  // Embed video
  const wrapper = document.createElement("div");
  wrapper.className = "videoWrapper";

  const iframe = document.createElement("iframe");
  iframe.src = vimeoEmbedUrl;
  iframe.width = 640;
  iframe.height = 360;
  iframe.frameBorder = "0";
  iframe.allow = "autoplay; fullscreen; picture-in-picture";
  iframe.allowFullscreen = true;

  wrapper.appendChild(iframe);
  oldVideoContainer.appendChild(wrapper);

  // Add link to sidebar
  const link = document.createElement("a");
  link.href = "#";
  link.textContent = `Old Video ${i + 1}`;
  oldVideoLinks.appendChild(link);
}
