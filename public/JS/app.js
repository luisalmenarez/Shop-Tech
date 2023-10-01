// Obtén el botón de abrir/cerrar el menú
const nav = document.querySelector(".header__nav");
const open = document.querySelector(".open__menu");
const main = document.querySelector(".main");

// Agrega un controlador de eventos al botón
open.addEventListener("click", () => {
  // Verifica si el menú está abierto o cerrado
  if (nav.classList.contains("visible")) {
    // Cierra el menú
    nav.classList.toggle("visible");
    nav.style.transform = "translateX(100%)"; // Mueve el menú fuera de la pantalla
  } else {
    // Abre el menú
    nav.classList.add("visible");
    nav.style.transform = "translateX(0)"; // Muestra el menú deslizándolo desde la izquierda
  }
});

document.addEventListener("click", (e) => {
  if (main.contains(e.target) && e.target !== open) {
    nav.classList.remove("visible");
    nav.style.transform = "translateX(100%)";
  }
});
