//  Creamos una clase Tabs para gestionar pestañas de contenido.
export default class Tabs {
  constructor(idElement) {
    //Creamos una variable donde capturamos el componente principal
    this.Tabs = document.getElementById(idElement);
    //Creamos una variable donde capturamos la tab o pestaña del componente principal
    this.nav = this.Tabs.querySelector(".tabs");

    // Agrega un evento de escucha al elemento de navegación para gestionar el cambio de pestañas.
    this.nav.addEventListener("click", (event) => {
      // Obtenemos  el valor del atributo "data-tab" del botón clicado.
      if ([...event.target.classList].includes("tabs__button")) {
        const tab = event.target.dataset.tab;

        //Verificamos si el componente tiene la clase tab--active, en caso de que lo tenga la retiramos.
        if (this.Tabs.querySelector(".tab--active")) {
          this.Tabs.querySelector(".tab--active").classList.remove("tab--active");
        }

        // Activa la pestaña clickeada ocultando otras.
        this.Tabs.querySelector(`#${tab}`).classList.add("tab--active");
        if (this.Tabs.querySelector(".tabs__button--active")) {
          this.Tabs.querySelector(".tabs__button--active").classList.remove("tabs__button--active");
        }

        //Agregamos la clase --active al botón clickeado
        event.target.classList.add("tabs__button--active");
      }
    });
  }
}
