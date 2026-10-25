"use strict";

const form = document.getElementById("contact-form");
const fields = ["customer-name", "customer-email", "request-type", "item-details"];

function showError(id, message) {
  const field = document.getElementById(id);
  document.getElementById(`${id}-error`).textContent = message;
  field.setAttribute("aria-invalid", String(Boolean(message)));
  field.setAttribute("aria-describedby", `${id}-error`);
}

function validateField(id) {
  const value = document.getElementById(id).value.trim();
  let message = "";
  if (id === "customer-name" && value.length < 2) {
    message = "Please enter your name (at least 2 characters).";
  } else if (id === "customer-email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    message = "Please enter a valid email address (example: name@example.com).";
  } else if (id === "request-type" && !value) {
    message = "Please select a request type.";
  } else if (id === "item-details" && value.length < 5) {
    message = "Please describe your request (at least 5 characters).";
  }
  showError(id, message);
  return !message;
}

fields.forEach(id => {
  const field = document.getElementById(id);
  field.addEventListener(id === "request-type" ? "change" : "input", () => {
    validateField(id);
    document.getElementById("form-status").textContent = "";
  });
});

form.addEventListener("submit", event => {
  event.preventDefault(); // This demonstration website does not transmit real orders.
  const results = fields.map(validateField);
  if (results.every(Boolean)) {
    document.getElementById("form-status").textContent = "Your request looks good! This is a demonstration form, so no message was sent.";
  } else {
    document.getElementById("form-status").textContent = "Please correct the highlighted fields before continuing.";
    document.getElementById(fields[results.indexOf(false)]).focus();
  }
});
