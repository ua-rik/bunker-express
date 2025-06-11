document.addEventListener("DOMContentLoaded", async () => {
  const html = await fetch("https://ua-rik.github.io/bunker-express/game.html")
    .then(res => res.text());
  const container = document.createElement("div");
  container.innerHTML = html;
  document.body.appendChild(container);

  const scenes = await fetch("https://ua-rik.github.io/bunker-express/scenes.json")
    .then(res => res.json());
  window.__SCENES__ = scenes;

  const script = document.createElement("script");
  script.src = "https://ua-rik.github.io/bunker-express/game-logic.js";
  document.body.appendChild(script);
});

