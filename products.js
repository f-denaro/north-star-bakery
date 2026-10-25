"use strict";

// The products array holds the bakery options; favorites holds saved choices.
const products = [
  { id: "breads", name: "Fresh Breads" },
  { id: "signature", name: "Signature Loaf" },
  { id: "pastries", name: "Pastries" },
  { id: "cakes", name: "Cakes and Special Orders" }
];
const storageKey = "northStarBakeryFavorites";

function loadFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    return Array.isArray(saved) ? saved.filter(id => products.some(product => product.id === id)) : [];
  } catch (error) {
    return [];
  }
}

let favorites = loadFavorites();

function saveFavorites() {
  try { localStorage.setItem(storageKey, JSON.stringify(favorites)); }
  catch (error) { /* The buttons still work if browser storage is unavailable. */ }
}

function toggleFavorite(productId) {
  if (favorites.includes(productId)) {
    favorites = favorites.filter(id => id !== productId);
  } else {
    favorites.push(productId);
  }
  saveFavorites();
  renderFavorites();
}

function renderFavorites() {
  const container = document.getElementById("favorite-buttons");
  container.replaceChildren();
  products.forEach(product => {
    const selected = favorites.includes(product.id);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "favorite-button";
    button.setAttribute("aria-pressed", String(selected));
    button.textContent = `${selected ? "★ Saved" : "☆ Save"}: ${product.name}`;
    button.addEventListener("click", () => toggleFavorite(product.id));
    container.appendChild(button);
  });
  const names = products.filter(product => favorites.includes(product.id)).map(product => product.name);
  document.getElementById("favorites-summary").textContent = names.length
    ? `Your saved favorites (${names.length}): ${names.join(", ")}.`
    : "You have no saved favorites yet. Choose a product above!";
}

document.getElementById("clear-favorites").addEventListener("click", () => {
  favorites = [];
  saveFavorites();
  renderFavorites();
});
renderFavorites();
