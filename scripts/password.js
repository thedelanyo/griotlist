var password = document.querySelector(".password");
var reveal = document.querySelector(".show-password");

reveal.addEventListener("click", function () {
  if (password.type === "password") {
    password.type = "text";
    reveal.innerHTML = '<i class="far fa-eye"></i>';
  } else {
    password.type = "password";
    reveal.innerHTML = '<i class="far fa-eye-slash"></i>';
  }
});

var email = document.querySelector(".email-check");
var phone = document.querySelector(".phone-check");
var emailBuz = document.querySelector(".email-buz");
var phoneBuz = document.querySelector(".phone-buz");
var phoneCheck = document.querySelector(".phoneCheck");
var emailCheck = document.querySelector(".emailCheck");

email.addEventListener("click", function () {
  if (emailCheck.checked) {
    emailBuz.style.display = "block";
  } else {
    emailBuz.style.display = "none";
  }
});

phone.addEventListener("click", function () {
  if (phoneCheck.checked) {
    phoneBuz.style.display = "block";
  } else {
    phoneBuz.style.display = "none";
  }
});
