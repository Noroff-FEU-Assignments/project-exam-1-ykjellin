const hamburger = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".nav");

hamburger.addEventListener("click", () => {
  mobileNav.classList.toggle("nav--open");
  hamburger.classList.toggle("hamburger--open");
});

mobileNav.addEventListener("click", () => {
  mobileNav.classList.remove("nav--open");
  hamburger.classList.remove("hamburger--open");
});

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");

  if (window.scrollY > lastScrollY) {
    header.classList.add("header-hidden");
  } else {
    header.classList.remove("header-hidden");
  }

  lastScrollY = window.scrollY;
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  if (form) {
    initializeContactForm();
  }

  function initializeContactForm() {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let isValid = true;

      const name = document.getElementById("name");
      if (name.value.length <= 5) {
        document.getElementById("name-error").textContent =
          "Name should be more than 5 characters long.";
        isValid = false;
      } else {
        document.getElementById("name-error").textContent = "";
      }

      const email = document.getElementById("email");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value)) {
        document.getElementById("email-error").textContent =
          "Must be a valid email address.";
        isValid = false;
      } else {
        document.getElementById("email-error").textContent = "";
      }

      const subject = document.getElementById("subject");
      if (subject.value.length <= 15) {
        document.getElementById("subject-error").textContent =
          "Subject should be more than 15 characters long.";
        isValid = false;
      } else {
        document.getElementById("subject-error").textContent = "";
      }

      const message = document.getElementById("message");
      if (message.value.length <= 25) {
        document.getElementById("message-error").textContent =
          "Message content should be more than 25 characters long.";
        isValid = false;
      } else {
        document.getElementById("message-error").textContent = "";
      }

      if (isValid) {
        console.log("Form is valid. Implement submission here.");
      }
    });
  }
});
