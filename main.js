document.addEventListener("DOMContentLoaded", async () => {
  // Завантажуємо HTML
  const html = await fetch("https://ua-rik.github.io/bunker-express/game.html")
    .then(res => res.text());

  const container = document.createElement("div");
  container.innerHTML = html;
  document.body.appendChild(container);

  // Завантажуємо JSON зі сценами
  const scenes = await fetch("https://ua-rik.github.io/bunker-express/scenes.json")
    .then(res => res.json());

  // Передаємо сцени в гру (якщо твоя логіка очікує scenes глобально)
  window.__SCENES__ = scenes;

  // Завантажуємо саму гру
  const script = document.createElement("script");
  script.src = "https://ua-rik.github.io/bunker-express/game-logic.js";
  document.body.appendChild(script);
});
