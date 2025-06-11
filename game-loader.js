document.addEventListener("DOMContentLoaded", async () => {
  const mountPoint = document.getElementById("game-root") || document.body;

  // Завантажуємо HTML-гру
  const html = await fetch("https://ua-rik.github.io/bunker-express/game.html")
    .then(res => res.text())
    .catch(err => {
      console.error("❌ Не вдалося завантажити game.html", err);
      return "<p>Помилка завантаження гри</p>";
    });

  const container = document.createElement("div");
  container.innerHTML = html;
  mountPoint.appendChild(container);

  // Завантажуємо сцени
  const scenes = await fetch("https://ua-rik.github.io/bunker-express/scenes.json")
    .then(res => res.json())
    .catch(err => {
      console.error("❌ Не вдалося завантажити scenes.json", err);
      return [];
    });

  window.__SCENES__ = scenes;

  // Завантажуємо основну логіку гри
  const script = document.createElement("script");
  script.src = "https://ua-rik.github.io/bunker-express/game-logic.js";
  document.body.appendChild(script);
});
