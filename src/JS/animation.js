import gsap from "gsap";
//Almacena en variables los elementos del DOM que tendrán animaciones
const logo = document.querySelector(".header__logo");
const nav = document.querySelector(".header__nav");
const login = document.querySelector(".header__login");
const sonyText = document.querySelector(".sony");
const wireless = document.querySelector(".wireless");
const headphone = document.querySelector(".headphone");
const heroButton = document.querySelector(".hero__shop");

// Define la animación de entrada
const entryLogo = () => {
  gsap.from(logo, 1, {
    opacity: 0,
    x: -20,
    ease: "Expo.easeInOut",
  });

  gsap.from(
    nav,
    1,
    {
      opacity: 0,
      delay: 0.2,
      x: -20,
      ease: "Power3.easeInOut",
    },
    0.08
  );

  gsap.from(login, 1, {
    opacity: 0,
    delay: 0.5,
    x: -20,
    ease: "Expo.easeInOut",
  });

  gsap.from(sonyText, 1, {
    opacity: 0,
    delay: 1,
    y: 20,
    ease: "Expo.easeInOut",
  });

  gsap.from(wireless, 1, {
    opacity: 0,
    delay: 1.2,
    y: 20,
    ease: "Expo.easeInOut",
  });

  gsap.from(headphone, 2, {
    opacity: 0,
    delay: 1.5,
    y: -200,
    ease: "Expo.easeInOut",
  });

  gsap.from(heroButton, 3, {
    opacity: 0,
    delay: 1.5,
    y: 200,
    ease: "Expo.easeInOut",
  });
};

// Llama a la función de entradaLogo cuando la página se cargue
window.addEventListener("load", entryLogo);
