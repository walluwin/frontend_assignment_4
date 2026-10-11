var contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;
    var message = document.getElementById("message").value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var isValid = true;

    document.getElementById("name-error").textContent = "";
    document.getElementById("email-error").textContent = "";
    document.getElementById("password-error").textContent = "";
    document.getElementById("confirm-error").textContent = "";
    document.getElementById("message-error").textContent = "";
    document.getElementById("form-success").textContent = "";

    if (name === "") {
      document.getElementById("name-error").textContent = "Please enter your full name.";
      isValid = false;
    }

    if (email === "") {
      document.getElementById("email-error").textContent = "Please enter your email address.";
      isValid = false;
    } else if (!emailPattern.test(email)) {
      document.getElementById("email-error").textContent = "Please enter a valid email address.";
      isValid = false;
    }

    if (password === "") {
      document.getElementById("password-error").textContent = "Please enter a password.";
      isValid = false;
    } else if (password.length < 8) {
      document.getElementById("password-error").textContent = "Password must be at least 8 characters long.";
      isValid = false;
    }

    if (confirmPassword === "") {
      document.getElementById("confirm-error").textContent = "Please confirm your password.";
      isValid = false;
    } else if (confirmPassword !== password) {
      document.getElementById("confirm-error").textContent = "Passwords do not match.";
      isValid = false;
    }

    if (message === "") {
      document.getElementById("message-error").textContent = "Please write a message.";
      isValid = false;
    }

    if (isValid) {
      document.getElementById("form-success").textContent = "Your message has been sent successfully!";
      contactForm.reset();
    }
  });
}

var faqQuestions = document.querySelectorAll(".faq-question");

for (var i = 0; i < faqQuestions.length; i++) {
  faqQuestions[i].addEventListener("click", function () {
    var answer = this.nextElementSibling;

    if (answer.style.maxHeight) {
      answer.style.maxHeight = null;
      this.classList.remove("active");
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
      this.classList.add("active");
    }
  });
}

var popup = document.getElementById("popup");
var subscribeBtn = document.getElementById("subscribe-btn");
var popupClose = document.getElementById("popup-close");
var subscribeForm = document.getElementById("subscribe-form");

if (popup) {
  subscribeBtn.addEventListener("click", function () {
    popup.classList.add("show");
  });

  popupClose.addEventListener("click", function () {
    popup.classList.remove("show");
  });

  popup.addEventListener("click", function (event) {
    if (event.target === popup) {
      popup.classList.remove("show");
    }
  });

  subscribeForm.addEventListener("submit", function (event) {
    event.preventDefault();
    subscribeForm.reset();
    popup.classList.remove("show");
  });
}

var colorBtn = document.getElementById("color-btn");

function updateButtonText() {
  if (document.body.classList.contains("dark-mode")) {
    colorBtn.textContent = "Light Mode";
  } else {
    colorBtn.textContent = "Dark Mode";
  }
}

if (colorBtn) {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
  updateButtonText();

  colorBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
    updateButtonText();
  });
}

var datetime = document.getElementById("datetime");

function showDateTime() {
  var now = new Date();
  var date = now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  var time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  datetime.textContent = date + ", " + time;
}

if (datetime) {
  showDateTime();
  setInterval(showDateTime, 1000);
}
