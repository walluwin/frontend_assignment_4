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
      contactForm.dispatchEvent(new Event("valid-submit"));
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


/* Assignment 6: jQuery */
$(document).ready(function () {
  console.log("jQuery is ready!");

  /* Task 7: toast notifications */
  $("body").append('<div id="toast-container"></div>');

  function showToast(message) {
    var $toast = $('<div class="site-toast"></div>').text(message);
    $("#toast-container").append($toast);
    $toast.hide().fadeIn(300).delay(2500).fadeOut(500, function () {
      $(this).remove();
    });
  }

  $("#subscribe-form").on("submit", function () {
    showToast("Subscribed successfully!");
  });

  $(document).on("click", ".star", function () {
    var name = $(this).closest(".rating-stars").data("artwork");
    showToast("You rated " + name + " " + $(this).data("rating") + "/5");
  });

  $("#load-artwork-btn").on("click", function () {
    showToast("3 more artworks added");
  });

  /* Task 1: live search filter */
  function applySearch() {
    var query = $("#artwork-search").val().toLowerCase().trim();
    var $cards = $(".filter-artwork");
    var $matches = $cards.filter(function () {
      var text = $(this).find("h3").text() + " " + $(this).children("p").text();
      return text.toLowerCase().indexOf(query) > -1;
    });
    $cards.addClass("search-hidden");
    $matches.removeClass("search-hidden");
    $("#search-empty").toggle($matches.length === 0);
  }

  $("#artwork-search").on("input", applySearch);
  $("#load-artwork-btn").on("click", applySearch);

  /* Task 2: autocomplete suggestions */
  var artworkNames = [
    "Sunset Ridge", "Neon Drifter", "Fragments",
    "City Facade", "Color Study", "Collage Wall",
    "Luna Ray", "Kenji Voss", "Mira Solis"
  ];

  $("#artwork-search").on("input", function () {
    var query = $(this).val().toLowerCase().trim();
    var $list = $("#suggestions").empty();
    if (query === "") {
      $list.hide();
      return;
    }
    var found = $.grep(artworkNames, function (name) {
      return name.toLowerCase().indexOf(query) > -1;
    });
    $.each(found, function (index, name) {
      $list.append($("<li></li>").text(name));
    });
    $list.toggle(found.length > 0);
  });

  $("#suggestions").on("click", "li", function () {
    $("#artwork-search").val($(this).text());
    $("#suggestions").hide();
    applySearch();
  });

  $(document).on("click", function (event) {
    if (!$(event.target).closest(".search-wrap").length) {
      $("#suggestions").hide();
    }
  });

  /* Task 3: search highlighting */
  var $searchTexts = $(".faq-question, .faq-answer p, .included-list li");

  $searchTexts.each(function () {
    $(this).data("original", $(this).html());
  });

  $("#page-search").on("input", function () {
    var query = $(this).val().trim();
    var total = 0;

    $searchTexts.each(function () {
      $(this).html($(this).data("original"));
    });
    $(".faq-question").removeClass("active");
    $(".faq-answer").css("max-height", "");

    if (query === "") {
      $("#search-count").text("");
      return;
    }

    var safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    var regex = new RegExp("(" + safeQuery + ")", "gi");

    $searchTexts.each(function () {
      var text = $(this).text();
      var matches = text.match(regex);
      if (matches) {
        total += matches.length;
        $(this).html(text.replace(regex, '<mark class="search-mark">$1</mark>'));
      }
    });

    $(".faq-item").has("mark").each(function () {
      var $answer = $(this).find(".faq-answer");
      $(this).find(".faq-question").addClass("active");
      $answer.css("max-height", $answer.prop("scrollHeight") + "px");
    });

    $("#search-count").text(total + " match(es) found");
  });

  /* Task 4: scroll progress bar */
  $("body").prepend(
    '<div id="scroll-progress"><div id="scroll-progress-bar"></div></div>' +
    '<span id="scroll-progress-label">0%</span>'
  );

  function updateProgress() {
    var maxScroll = $(document).height() - $(window).height();
    var percent = maxScroll > 0 ? Math.round($(window).scrollTop() / maxScroll * 100) : 0;
    $("#scroll-progress-bar").css("width", percent + "%");
    $("#scroll-progress-label").text(percent + "%");
  }

  $(window).on("scroll resize", updateProgress);
  updateProgress();

  /* Task 5: animated number counter */
  var countersStarted = false;

  function startCounters() {
    var $stats = $("#stats");
    if (countersStarted || !$stats.length) return;
    if ($(window).scrollTop() + $(window).height() < $stats.offset().top + 50) return;
    countersStarted = true;

    $(".stat-number").each(function () {
      var $number = $(this);
      var target = $number.data("target");
      var suffix = $number.data("suffix") || "";
      $({ value: 0 }).animate({ value: target }, {
        duration: 2000,
        step: function (now) {
          $number.text(Math.floor(now) + suffix);
        },
        complete: function () {
          $number.text(target + suffix);
        }
      });
    });
  }

  $(window).on("scroll resize", startCounters);
  startCounters();

  /* Task 6: loading spinner on submit */
  $("#contact-form").on("valid-submit", function () {
    var form = this;
    var $button = $(form).find("button[type='submit']");
    var originalText = $button.text();

    $button.prop("disabled", true).html(
      '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Please wait…'
    );

    setTimeout(function () {
      $button.prop("disabled", false).text(originalText);
      $("#form-success").text("Your message has been sent successfully!");
      form.reset();
      showToast("Form submitted successfully!");
    }, 2000);
  });

  /* Task 8: copy to clipboard */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    var $temp = $("<textarea></textarea>").val(text).appendTo("body");
    $temp[0].select();
    document.execCommand("copy");
    $temp.remove();
    return Promise.resolve();
  }

  $(".copy-btn").on("click", function () {
    var $button = $(this);
    copyText($button.data("copy")).then(function () {
      $button.find(".copy-icon").text("✔");
      $button.siblings(".copy-tooltip").stop(true, true).fadeIn(150).delay(1500).fadeOut(300);
      showToast("Copied to clipboard!");
      setTimeout(function () {
        $button.find(".copy-icon").text("📋");
      }, 2000);
    });
  });

  $(".copy-text").on("copy", function () {
    showToast("Copied to clipboard!");
  });

  /* Task 9: image lazy loading */
  function loadVisibleImages() {
    var viewBottom = $(window).scrollTop() + $(window).height();
    $("img.lazy").each(function () {
      var $image = $(this);
      if ($image.offset().top < viewBottom + 100) {
        $image.attr("src", $image.data("src")).removeClass("lazy").addClass("lazy-loaded");
        console.log("Lazy loaded: " + $image.data("src"));
      }
    });
  }

  $(window).on("scroll resize load", loadVisibleImages);
  loadVisibleImages();
});
