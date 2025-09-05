// script.js
let menuToggle = document.getElementById("menuToggle");
let sideNav = document.getElementById("sideNav");
let videoCards = document.querySelectorAll(".video-card");
let ageGate = document.getElementById("ageGate");
let btnEnter = document.getElementById("btnEnter");
let btnExit = document.getElementById("btnExit");

menuToggle.onclick = function() {
  if (sideNav.style.left === "0px") {
    sideNav.style.left = "-250px";
  } else {
    sideNav.style.left = "0px";
  }
};

btnEnter.onclick = function() {
  ageGate.style.display = "none";
};

btnExit.onclick = function() {
  window.location.href = "https://google.com";
};

videoCards.forEach(card => {
  card.querySelector(".like").onclick = function() {
    if (!this.classList.contains("voted")) {
      this.classList.add("voted");
      alert("Merci pour votre like !");
    }
  };

  card.querySelector(".dislike").onclick = function() {
    if (!this.classList.contains("voted")) {
      this.classList.add("voted");
      alert("Merci pour votre dislike !");
    }
  };
});
