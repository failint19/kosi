// Добавляем случайные звезды на фон
document.addEventListener("DOMContentLoaded", () => {
  const starsContainer = document.querySelector(".stars");
  const starCount = 20; // Меньше звезд

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 3 + 2}s`; // Разная скорость
    starsContainer.appendChild(star);
  }
});

// Интро
const intro = document.querySelector(".intro");
const container = document.querySelector(".container");

// Показываем интро на 3 секунды
setTimeout(() => {
  intro.style.display = "none"; // Скрываем интро
  container.style.display = "block"; // Показываем игру
  startGame(); // Запускаем основную логику игры
}, 3000);

// Логика пришельцев-котов
const counterElement = document.getElementById("count");
let count = 10;

function spawnAlienCat() {
  if (count <= 0) return;

  const cat = document.createElement("div");
  cat.classList.add("alien-cat");

  // Случайное положение
  const randomX = Math.random() * 90; // 0–90%
  const randomY = Math.random() * 90; // 0–90%
  cat.style.top = `${randomY}%`;
  cat.style.left = `${randomX}%`;

  container.appendChild(cat);

  // Удаление через 2 секунды
  setTimeout(() => {
    cat.remove();
  }, 2000);

  // Обработка клика
  cat.addEventListener("click", () => {
    count--;
    counterElement.textContent = count;
    cat.remove();

    // Если счетчик достиг 0
    if (count === 0) {
      explodePlanets();
    }
  });
}

// Взрыв планет
function explodePlanets() {
  const planets = document.querySelectorAll(".planet");
  planets.forEach((planet) => {
    planet.classList.add("exploded"); // Добавляем класс для анимации взрыва
  });

  // Скрываем счетчик
  counterElement.style.display = "none";

  // Через 1 секунду удаляем все элементы, кроме звезд
  setTimeout(() => {
    document.querySelector(".planets").style.display = "none"; // Убираем планеты
    document.querySelector(".counter").style.display = "none"; // Убираем счетчик

    // Показываем поздравление через 1 секунду
    setTimeout(() => {
      document.querySelector(".card").style.display = "block";
    }, 1000);
  }, 1000);
}

// Функция для запуска игры
function startGame() {
  // Появление котов каждые 2 секунды
  setInterval(spawnAlienCat, 2000);
}