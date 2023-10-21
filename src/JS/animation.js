import { gsap } from "gsap";
//Almacena en variables los elementos del DOM que tendrán animaciones
const logo = document.querySelector(".header__logo");
const nav = document.querySelector(".nav__ul");
const sonyText = document.querySelector(".sony");
const wireless = document.querySelector(".wireless");
const headphone = document.querySelector(".headphone");
const heroButton = document.querySelector(".hero__shop");
const breadcrumbs = document.querySelector(".breadcrumbs");
const thumbs = document.querySelector(".product__thumbs");
const containerImage = document.querySelector(".product__container-image");
const containerInfo = document.querySelector(".product__container-info");

//Animaciones página principal
const animationHome = () => {
  gsap.from(logo, 1, {
    opacity: 0,
    x: -20,
    ease: "Expo.easeInOut",
  });
  gsap.from(nav, 2, {
    opacity: 0,
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

//Animaciones página carrito
const animationCart = () => {
  gsap.from(logo, 1, {
    opacity: 0,
    x: -20,
    ease: "Expo.easeInOut",
  });
  gsap.from(nav, 2, {
    opacity: 0,
    x: -20,
    ease: "Expo.easeInOut",
  });
  gsap.from(breadcrumbs, 3, {
    opacity: 0,
    x: -100,
    ease: "Expo.easeInOut",
  });
  gsap.from(thumbs, 1, {
    opacity: 0,
    x: -20,
    ease: "Expo.easeInOut",
  });
  gsap.from(containerImage, 2, {
    opacity: 0,
    y: 100,
    ease: "Expo.easeInOut",
  });
  gsap.from(containerInfo, 2, {
    opacity: 0,
    x: 200,
    ease: "Expo.easeInOut",
  });
};

// Llama a la función de entradaLogo cuando la página se cargue
window.addEventListener("load", () => {
  if (document.body.classList.contains("home-page")) {
    animationHome();
  } else if (document.body.classList.contains("cart-page")) {
    animationCart();
  }
});
