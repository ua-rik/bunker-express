
    // Початковий стан персонажа
    const stats = {
        health: 100,   // ❤️ Здоров'я від 0 до 100
        hunger: 0,     // 🍗 Голод: чим більше — тим гірше
        thirst: 0      // 💧 Спрага: аналогічно
    };
    let appearance = [];
    // Массив доступних сцен. Кожна сцена — це об'єкт з текстом і варіантами дій
    let scenes = window.__SCENES__;

    // Оновлює візуальні стати (ширину смужок)
    function updateBars() {
        // Оновлення зображення персонажа за рівнем здоров'я
        const img = document.querySelector(".character-image");
        if (stats.health >= 100) {
            img.src = "https://thinkyd.com/my-custom-files/i1.png";
        } else if (stats.health >= 80) {
            img.src = "https://thinkyd.com/my-custom-files/i3.png";
        } else if (stats.health >= 60) {
            img.src = "https://thinkyd.com/my-custom-files/i4.png";
        } else if (stats.health >= 40) {
            img.src = "https://thinkyd.com/my-custom-files/i5.png";
        } else if (stats.health >= 20) {
            img.src = "https://thinkyd.com/my-custom-files/i5.png";
        } else {
            img.src = "https://thinkyd.com/my-custom-files/i6.png";
        }
        document.getElementById("health-bar").style.width = `${stats.health}%`;
        document.getElementById("hunger-bar").style.width = `${stats.hunger}%`;
        document.getElementById("thirst-bar").style.width = `${stats.thirst}%`;
    }

    // Випадково обирає одну сцену і видаляє її з масиву scenes
    function getRandomScene() {
        const index = Math.floor(Math.random() * scenes.length);
        return scenes.splice(index, 1)[0];
    }

    // Перша сцена при старті гри
    let currentScene = getRandomScene();
    let moveCounter = 0; // Лічильник пройдених кроків (умовно — кілометрів)

    // Показує текст сцени та генерує кнопки варіантів дій
    function renderScene(scene) {
        const gameText = document.getElementById("game-text");
        gameText.textContent = scene.text;

        const choicesContainer = document.querySelector(".choices");
        choicesContainer.innerHTML = "";

        scene.options.forEach((option) => {
            const btn = document.createElement("button");
            btn.textContent = option.label;
            btn.onclick = () => choose(option);
            choicesContainer.appendChild(btn);
        });
    }

    // Обробка вибору гравця
    function choose(option) {
        // застосовуємо ефекти
        stats.health = Math.max(0, Math.min(100, stats.health + option.effects.health));
        stats.hunger = Math.max(0, Math.min(100, stats.hunger + option.effects.hunger));
        stats.thirst = Math.max(0, Math.min(100, stats.thirst + option.effects.thirst));

        // якщо ефект не змінює голод або спрагу — збільшуємо їх на 2
        if (option.effects.hunger === 0) {
            stats.hunger = Math.min(100, stats.hunger + 2);
        }
        if (option.effects.thirst === 0) {
            stats.thirst = Math.min(100, stats.thirst + 2);
        }

        // Якщо голод або спрага на максимумі — додатково зменшуємо здоров’я
        if (stats.hunger >= 100) {
            stats.health = Math.max(0, stats.health - 10);
        }
        if (stats.thirst >= 100) {
            stats.health = Math.max(0, stats.health - 10);
        }

        updateBars();

        // Якщо є ефект appearance — додаємо його до опису
        if (option.effects.visual) {
            appearance.push(option.effects.visual);
            const desc = document.querySelector(".description");
            desc.textContent = `Дєд чомусь з сумним фейсом ${appearance.join(", ")}`;
        }

        const gameText = document.getElementById("game-text");
        const choicesContainer = document.querySelector(".choices");

        // Нова перевірка: якщо здоров'я опустилось до 0 — кінець гри
        if (stats.health <= 0) {
            gameText.innerHTML = `${option.result}<br><br>💀 Ти загинув. Гру завершено.`;
            choicesContainer.innerHTML = "";
            return;
        }

        // Якщо більше немає сцен — кінець гри
        if (scenes.length === 0) {
            gameText.innerHTML = `${option.result}<br><br>🎉 Кінець демо! Дякую за гру!`;
            choicesContainer.innerHTML = "";
            return;
        }

        // Вибираємо наступну сцену і відображаємо її разом із результатом вибору
        currentScene = getRandomScene();

        moveCounter++;
        gameText.innerHTML = `<p>${option.result}</p><p>Ти проїхав вже ${moveCounter} км.</p><hr><p><strong>${currentScene.text}</strong></p>`;

        choicesContainer.innerHTML = "";
        currentScene.options.forEach((opt) => {
            const btn = document.createElement("button");
            btn.textContent = opt.label;
            btn.onclick = () => choose(opt);
            choicesContainer.appendChild(btn);
        });
    }

    // Запуск першої сцени та ініціалізація графіки статів
    updateBars();
    renderScene(currentScene);
