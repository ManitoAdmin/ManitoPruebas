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

// ================== CURSOR ==================

// Ocultar el cursor original de toda la página, incluso en botones, links, inputs, etc.
const style = document.createElement('style');
style.innerHTML = `
  * {
    cursor: none !important;
  }
`;
document.head.appendChild(style);

// Crear el cursor personalizado
const cursor = document.createElement('div');
cursor.style.position = 'fixed';
cursor.style.width = '32px';
cursor.style.height = '32px';
cursor.style.backgroundImage = 'url("img/puntero.png")';
cursor.style.backgroundSize = 'cover';
cursor.style.pointerEvents = 'none';
cursor.style.transform = 'translate(-50%, -50%)';
cursor.style.zIndex = '100000';
document.body.appendChild(cursor);

// Seguir el movimiento del cursor
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';

  // Crear estrellas al mover
  const star = document.createElement('div');
  star.style.position = 'fixed';
  star.style.left = e.pageX + 'px';
  star.style.top = e.pageY + 'px';
  star.style.width = '6px';
  star.style.height = '6px';
  star.style.borderRadius = '50%';
  star.style.pointerEvents = 'none';
  star.style.zIndex = '9998';

  const colors = ['#ffffff', '#ffeb3b', '#ff4081', '#00e5ff', '#76ff03'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  star.style.background = color;
  star.style.boxShadow = `0 0 8px 2px ${color}`;

  document.body.appendChild(star);

  // Animación de caída suave
  star.animate([
    { transform: 'translateY(0px)', opacity: 1 },
    { transform: 'translateY(40px)', opacity: 0 }
  ], { duration: 700, easing: 'ease-out', fill: 'forwards' });

  setTimeout(() => star.remove(), 700);
});

// Explosión de estrellas al hacer clic
document.addEventListener('click', (e) => {
  const numStars = 12;
  const colors = ['#ffffff', '#ffeb3b', '#ff4081', '#00e5ff', '#76ff03'];

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.style.position = 'fixed';
    star.style.left = e.pageX + 'px';
    star.style.top = e.pageY + 'px';
    star.style.width = '6px';
    star.style.height = '6px';
    star.style.borderRadius = '50%';
    star.style.pointerEvents = 'none';
    star.style.zIndex = '9998';

    const color = colors[Math.floor(Math.random() * colors.length)];
    star.style.background = color;
    star.style.boxShadow = `0 0 8px 2px ${color}`;

    document.body.appendChild(star);

    // Dirección aleatoria
    const angle = Math.random() * 2 * Math.PI;
    const distance = 50 + Math.random() * 50;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    // Animación de explosión
    star.animate([
      { transform: `translate(0px, 0px) scale(1)`, opacity: 1 },
      { transform: `translate(${x}px, ${y}px) scale(0)`, opacity: 0 }
    ], {
      duration: 800 + Math.random() * 400,
      easing: 'ease-out',
      fill: 'forwards'
    });

    setTimeout(() => star.remove(), 1200);
  }
});


// ================== PANTALLA DE INICIO ==================
const pantallaInicio = document.getElementById('pantalla-inicio');
const btnComenzar = document.getElementById('btn-comenzar');

btnComenzar.addEventListener('click', () => {
  pantallaInicio.style.transition = 'opacity 1s ease';
  pantallaInicio.style.opacity = '0';

  setTimeout(() => {
    pantallaInicio.style.display = 'none';
  }, 1000);
});
