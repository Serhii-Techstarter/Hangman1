const alphabet = "abcdefghijklmnopqrstuvwxyzäöüß".split("");
const words = ["schokolade", "programmieren", "freundschaft", "wunderbar", "käsebrötchen", "überraschung", "mäßig", "außergewöhnlich"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let displayedWord = Array(selectedWord.length).fill("_");
let lives = 6;
const wordElement = document.getElementById("word");
const livesElement = document.getElementById("lives");
const lettersContainer = document.getElementById("letters");
const messageElement = document.getElementById("message");
const restartButton = document.getElementById("restart");

// Создание клавиатуры
alphabet.forEach(letter => {
    const button = document.createElement("div");
    button.textContent = letter;
    button.classList.add("letter");
    button.addEventListener("click", () => handleGuess(letter, button));
    lettersContainer.appendChild(button);
});

// Обновление слова на экране
const updateDisplayedWord = () => {
    wordElement.textContent = displayedWord.join(" ");
};

// Проверка буквы
const handleGuess = (letter, button) => {
    if (selectedWord.includes(letter)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                displayedWord[i] = letter;
            }
        }
        updateDisplayedWord();
        if (!displayedWord.includes("_")) {
            messageElement.textContent = "🎉 Glückwunsch! Du hast das Wort erraten!";
            endGame();
        }
    } else {
        lives--;
        livesElement.textContent = `Leben: ${lives}`;
        if (lives === 0) {
            messageElement.textContent = `💀 Game Over! Das Wort war "${selectedWord}".`;
            endGame();
        }
    }
    button.classList.add("disabled");
    button.removeEventListener("click", handleGuess);
};

// Завершение игры
const endGame = () => {
    document.querySelectorAll(".letter").forEach(button => button.classList.add("disabled"));
    restartButton.style.display = "block";
};

// Перезапуск игры
restartButton.addEventListener("click", () => {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayedWord = Array(selectedWord.length).fill("_");
    lives = 6;
    updateDisplayedWord();
    livesElement.textContent = `Leben: ${lives}`;
    messageElement.textContent = "";
    restartButton.style.display = "none";
    lettersContainer.innerHTML = "";
    alphabet.forEach(letter => {
        const button = document.createElement("div");
        button.textContent = letter;
        button.classList.add("letter");
        button.addEventListener("click", () => handleGuess(letter, button));
        lettersContainer.appendChild(button);
    });
});

// Инициализация игры
updateDisplayedWord();
