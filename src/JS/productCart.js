// Selecciona todos los elementos con la clase "btn__buy" en el documento.
document.querySelectorAll(".btn__buy").forEach((button) => {
  button.addEventListener("click", (e) => {
    // Obtiene el valor del atributo "data-product-id" del botón que se hizo clic.
    const productId = button.getAttribute("data-product-id");
    // Redirige a la página "cart.html" pasando el ID del producto como un parámetro en la URL.
    window.location.href = `cart.html?productId=${productId}`;
  });
});

const product = document.getElementById("product");
let nameProductSelected = document.querySelector(".product__name");
let descriptionProductSelected = document.querySelector(".product__description");
let priceProductSelected = document.querySelector(".product__price");
let sectionProductSelected = document.querySelector(".breadcrumbs__section");
let breadcrumbNameProductSelected = document.querySelector(".breadcrumbs__name");
const productImage = document.querySelector(".product__image");
const thumbs = document.querySelector(".product__thumbs");
/*BOTONTES CANTIDAD*/
const btnPlus = document.querySelector("#increase-quantity");
const btnMinus = document.querySelector("#decrease-quantity");
let inputQuantity = document.querySelector("#quantity");
/*BOTONTES CANTIDAD*/
// Selecciona el color
const colorSelected = product.querySelector("#property-color");

const URL = "./src/JS/data/dataProducts.json";
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");

// Carga el archivo JSON
fetch(URL)
  .then((response) => response.json())
  .then((data) => {
    const productsArray = data.products;

    // Busca el producto por ID
    const selectedProduct = productsArray.find((product) => product.id === productId);

    if (selectedProduct) {
      // Actualiza la imagen principal
      const productImage = document.querySelector(".product__image");
      productImage.src = selectedProduct.img;
      nameProductSelected.textContent = selectedProduct.name;
      descriptionProductSelected.textContent = selectedProduct.description;
      priceProductSelected.textContent = "$" + selectedProduct.price;
      sectionProductSelected.textContent = selectedProduct.section;
      breadcrumbNameProductSelected.textContent = selectedProduct.name;
      const thumbnailsContainer = document.querySelector(".product__thumbs");
      // Elimina las miniaturas existentes
      while (thumbnailsContainer.firstChild) {
        thumbnailsContainer.removeChild(thumbnailsContainer.firstChild);
      }

      // Crea y agrega las miniaturas
      const thumbnails = document.querySelector(".product__thumbs");
      selectedProduct.thumbs.forEach((thumbnailSrc, index) => {
        const thumbnail = document.createElement("img");
        thumbnail.src = thumbnailSrc;
        thumbnail.alt = `Miniatura ${index + 1}`;
        thumbnails.appendChild(thumbnail);
      });

      // Agrega un evento de clic al elemento 'thumbs' (las miniaturas de imágenes del producto).
      thumbs.addEventListener("click", (e) => {
        // Verifica si el objetivo del evento de clic es una etiqueta 'IMG'.
        if (e.target.tagName === "IMG") {
          // Obtiene la fuente (src) de la imagen que se hizo clic.
          const imageSrc = e.target.src;

          // Encuentra la última barra diagonal en la ruta de la imagen.
          const lastIndex = imageSrc.lastIndexOf("/");

          // Extrae el nombre de la imagen a partir de la ruta completa.
          const nameImage = imageSrc.substring(lastIndex + 1);
          // Actualiza la fuente de la imagen principal del producto con la nueva imagen seleccionada.
          productImage.src = `./public/img/products/${nameImage}`;
        }
      });

      // Con esta función actualizo la miniatura del color que se haya seleccionado
      colorSelected.addEventListener("click", (e) => {
        if (e.target.tagName === "INPUT") {
          const color = e.target.value;
          console.log(color);
          productImage.src = `./public/img/products/${color}.jpg`;

          // Cambia las rutas de las miniaturas según el color seleccionado
          const thumbnails = document.querySelectorAll(".product__thumb-img");
          thumbnails.forEach((thumbnail, index) => {
            thumbnail.src = `./public/img/thumbs/${color}/${color}${index + 1}.jpg`;
          });
        }
      });
    }
  });

// Con esta función incremento en 1 el valor del input siempre que se haga click
btnPlus.addEventListener("click", (e) => {
  inputQuantity.value = parseInt(inputQuantity.value) + 1;
});

// Con esta función disminuyo en 1 el valor del input siempre que se haga click
btnMinus.addEventListener("click", (e) => {
  inputQuantity.value = parseInt(inputQuantity.value) - 1;
  if (parseInt(inputQuantity.value) <= 1) {
    inputQuantity.value = 1;
  }
});

/*






*/
