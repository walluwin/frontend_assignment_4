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


/* Assignment 5: keyboard navigation for the main navigation menu */
var navigationLinks = document.querySelectorAll("#mainNav .nav-link");
navigationLinks.forEach(function (link, index) {
  link.addEventListener("keydown", function (event) {
    var nextIndex = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % navigationLinks.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + navigationLinks.length) % navigationLinks.length;
    } else {
      return;
    }
    event.preventDefault();
    navigationLinks[nextIndex].focus();
  });
});

/* Assignment 5: switch statement filters artwork by category */
var filterButtons = document.querySelectorAll("[data-filter]");
var artworkCards = document.querySelectorAll(".filter-artwork");
var galleryFeedback = document.getElementById("gallery-feedback");

function filterArtworks(category) {
  artworkCards.forEach(function (card) {
    var shouldShow;
    switch (category) {
      case "fantasy":
        shouldShow = card.dataset.category === "fantasy";
        break;
      case "character":
        shouldShow = card.dataset.category === "character";
        break;
      case "abstract":
        shouldShow = card.dataset.category === "abstract";
        break;
      default:
        shouldShow = true;
    }
    card.classList.toggle("is-hidden", !shouldShow);
  });
  if (galleryFeedback) {
    galleryFeedback.textContent = category === "all"
      ? "Showing all artworks."
      : "Showing " + category + " artwork.";
  }
}

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach(function (item) { item.classList.remove("active"); });
    button.classList.add("active");
    filterArtworks(button.dataset.filter);
    playUiSound();
  });
});

/* Assignment 5: save star ratings in localStorage */
document.querySelectorAll(".rating-stars").forEach(function (ratingGroup) {
  var artworkName = ratingGroup.dataset.artwork;
  var savedRating = Number(localStorage.getItem("rating-" + artworkName)) || 0;
  var stars = ratingGroup.querySelectorAll(".star");
  var message = ratingGroup.parentElement.querySelector(".rating-message");

  function paintStars(rating) {
    stars.forEach(function (star) {
      star.classList.toggle("selected", Number(star.dataset.rating) <= rating);
    });
  }
  paintStars(savedRating);
  if (savedRating && message) message.textContent = "Your rating: " + savedRating + "/5";

  stars.forEach(function (star) {
    star.addEventListener("click", function () {
      var rating = Number(star.dataset.rating);
      localStorage.setItem("rating-" + artworkName, rating);
      paintStars(rating);
      if (message) message.textContent = "Your rating: " + rating + "/5 — thank you!";
      playUiSound();
    });
  });
});

/* Assignment 5: artwork objects, array, loop, and map() higher-order function */
var extraArtworks = [
  { title: "City Facade", category: "architecture", image: "images/gallery4.jpg", description: "A modern city-inspired digital artwork." },
  { title: "Color Study", category: "abstract", image: "images/gallery5.jpg", description: "A colorful study of shape and texture." },
  { title: "Collage Wall", category: "abstract", image: "images/gallery6.jpeg", description: "A bright digital collage." }
];

var loadArtworkButton = document.getElementById("load-artwork-btn");
if (loadArtworkButton) {
  loadArtworkButton.addEventListener("click", function () {
    var container = document.getElementById("filterable-artworks");
    var newCards = extraArtworks.map(function (artwork) {
      var card = document.createElement("article");
      card.className = "card filter-artwork";
      card.dataset.category = artwork.category === "architecture" ? "fantasy" : artwork.category;
      var image = document.createElement("img");
      image.src = artwork.image;
      image.alt = artwork.title;
      var title = document.createElement("h3");
      title.textContent = artwork.title;
      var description = document.createElement("p");
      description.textContent = artwork.description;
      card.append(image, title, description);
      return card;
    });
    newCards.forEach(function (card) { container.appendChild(card); });
    artworkCards = document.querySelectorAll(".filter-artwork");
    loadArtworkButton.disabled = true;
    loadArtworkButton.textContent = "All Artworks Loaded";
    if (galleryFeedback) galleryFeedback.textContent = "Three more artworks have been added to the gallery.";
    playUiSound();
  });
}

/* Assignment 5: short sound effect using the browser's Web Audio API */
function playUiSound() {
  try {
    var AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    var audioContext = new AudioContextClass();
    var oscillator = audioContext.createOscillator();
    var gain = audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = 660;
    gain.gain.setValueAtTime(0.08, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.12);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.12);
    oscillator.onended = function () { audioContext.close(); };
  } catch (error) {
    // The gallery remains usable if sound is not supported by the browser.
  }
}

var soundButton = document.getElementById("sound-btn");
if (soundButton) {
  soundButton.addEventListener("click", function () {
    playUiSound();
    soundButton.textContent = "Sound played ✓";
  });
}

/* Assignment 5: event-triggered animation for gallery cards */
document.querySelectorAll(".filter-artwork").forEach(function (card) {
  card.addEventListener("click", function (event) {
    if (event.target.closest(".rating-stars")) return;
    card.classList.remove("keyboard-focus");
    card.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.025)" }, { transform: "scale(1)" }],
      { duration: 300, easing: "ease-out" }
    );
  });
});
