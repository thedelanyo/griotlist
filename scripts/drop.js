var icon = document.querySelector(".icon");
var nav = document.querySelector("#nav");

// dropdown
icon.addEventListener("click", function (e) {
  nav.classList.toggle("show");
});
