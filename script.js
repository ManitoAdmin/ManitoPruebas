const textElement = document.getElementById("text");
const nextButton = document.getElementById("next");
const choicesBox = document.getElementById("choices");
const background = document.getElementById("background");
const character = document.getElementById("character");

// Historia dividida por escenas
const story = [
  {
    text: "Despiertas en un bosque tranquilo. No recuerdas cómo llegaste aquí.",
    bg: "img/fondo1.jpg",
    char: "",
  },
  {
    text: "Una voz te llama entre los árboles...",
    bg: "img/fondo2.jpg",
    char: "",
  },
  {
    text: "Chica misteriosa: Hola, viajero. Pareces perdido.",
    bg: "img/fondo2.jpg",
    char: "img/personaje1.png",
  },
  {
    text: "¿Qué responderás?",
    choices: [
      { text: "¿Quién eres tú?", next: 4 },
      { text: "No te acerques.", next: 5 }
    ]
  },
  {
    text: "Chica misteriosa: Solo soy una guía... alguien que ayuda a los que no recuerdan.",
    bg: "img/fondo3.jpg",
    char: "img/personaje1.png",
  },
  {
    text: "Chica misteriosa: Entiendo... no confías en nadie. Lo respeto.",
    bg: "img/fondo4.jpg",
    char: "img/personaje1.png",
  },
  {
    text: "De pronto, una luz intensa lo cubre todo.",
    bg: "img/fondo5.jpg",
    char: "",
  },
  {
    text: "Fin de la historia — pero este es solo el comienzo.",
    bg: "img/fondo1.jpg",
    char: "",
  }
];

let index = 0;

// Mostrar texto y elementos de escena
function showScene() {
  const scene = story[index];

  // Actualiza fondo
  if (scene.bg) {
    background.style.opacity = 0;
    setTimeout(() => {
      background.src = scene.bg;
      background.style.opacity = 1;
    }, 400);
  }

  // Actualiza personaje
  if (scene.char) {
    character.src = scene.char;
    character.style.opacity = 1;
  } else {
    character.style.opacity = 0;
  }

  // Mostrar texto
  textElement.textContent = scene.text;

  // Si hay decisiones
  if (scene.choices) {
    nextButton.style.display = "none";
    choicesBox.innerHTML = "";
    scene.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.textContent = choice.text;
      btn.addEventListener("click", () => {
        index = choice.next;
        choicesBox.innerHTML = "";
        nextButton.style.display = "block";
        showScene();
      });
      choicesBox.appendChild(btn);
    });
  } else {
    choicesBox.innerHTML = "";
    nextButton.style.display = "block";
  }
}

// Botón siguiente
nextButton.addEventListener("click", () => {
  index++;
  if (index < story.length) {
    showScene();
  } else {
    textElement.textContent = "Gracias por jugar ❤️";
    nextButton.style.display = "none";
  }
});

// Iniciar historia
showScene();
