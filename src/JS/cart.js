import productsData from "./Data/dataProducts.json";

// Selecciona todos los elementos con la clase "btn__buy" en el documento.
document.querySelectorAll(".btn__buy").forEach((button) => {
  button.addEventListener("click", (e) => {
    // Obtiene el valor del atributo "data-product-id" del botón que se hizo clic.
    const productId = button.getAttribute("data-product-id");
    // Redirige a la página "cart.html" pasando el ID del producto como un parámetro en la URL.
    window.location.href = `cart.html?productId=${productId}`;
  });
});

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");

window.addEventListener("load", () => {
  if (document.body.classList.contains("cart-page")) {
    // Selecciona los botones de abrir el carrito por su atributo 'data-accion'.
    const btnOpenCart = document.querySelectorAll('[data-accion="open-cart"]');
    // Selecciona los botones de cerrar el carrito por su atributo 'data-accion'.
    const btnCloseCart = document.querySelectorAll('[data-accion="close-cart"]');
    // Obtiene el elemento del carrito por su ID.
    const windowCart = document.getElementById("cart");
    // Obtiene el botón 'Add to Cart' del HTML
    const addCart = document.getElementById("add-cart");
    // Obtiene el contenedor de todo el producto
    const product = document.getElementById("product");
    const cartNotification = document.getElementById("notification");

    // Se crea una instancia de Intl.NumberFormat para formatear valores como moneda en inglés estadounidense
    const formatMoney = new Intl.NumberFormat("EN-EEUU", { style: "currency", currency: "USD" });

    // Generamos una variable la cual tendrá la cantidad de productos que el usuario agregue
    let cartProduct = [];

    // Función para renderizar el contenido del carrito y mostrarlo al usuario.
    const renderCart = () => {
      // Agrega la clase "cart--active" para mostrar la ventana del carrito.
      windowCart.classList.add("cart--active");

      // Eliminamos los productos que hay contenidos en el carrito para que no los duplique si se vuelve a abrir
      const productsInCart = windowCart.querySelectorAll(".cart__product");
      productsInCart.forEach((product) => product.remove());

      let total = 0;

      //Si no existen productos en el carrito agregamos la clase 'cart--empty' de lo contrario mostramos los productos que en él hay.
      if (cartProduct.length < 1) {
        windowCart.classList.add("cart--empty");
      } else {
        //En caso de que haya un producto eliminamos la clase 'cart--empty' y mostramos lo que haya dentro
        windowCart.classList.remove("cart--empty");
        // Itera a través de cada producto en el array "cartProduct".
        cartProduct.forEach((cartProduct) => {
          /* Se obtiene el precio del archivo dataProducts.json
       siempre y cuando el id del item coincide con el que está en dataProducts.json */
          productsData.products.forEach((productDataBase) => {
            if (productDataBase.id === productId) {
              cartProduct.price = productDataBase.price;

              total += productDataBase.price * cartProduct.quantity;
            }
          });

          // Establece la ruta de la imagen que se quiere mostrar dependiendo de la decisión del usuario
          let thumbSrc = product.querySelectorAll(".product__thumb-img")[0].src;

          if (cartProduct.color === 1) {
            thumbSrc = `./public/img/thumbs/${productId}/1.jpg`;
          } else if (cartProduct.color === 2) {
            thumbSrc = `./public/img/thumbs/${productId}/2.jpg`;
          } else if (cartProduct.color === 3) {
            thumbSrc = `./public/img/thumbs/${productId}/3.jpg`;
          }
          // Genera una plantilla HTML para representar el producto en el carrito.
          let templateProduct = `
        <div class="cart__product-info">
          <img src="${thumbSrc}" alt="" class="cart__thumb" />
          <div>
            <p class="cart__product-name">
              <span class="cart__product-quantity">${cartProduct.quantity} x </span>${cartProduct.name}
            </p>
            <p class="cart__product-properties">
              Shipping Type:<span>${cartProduct.ShippingType}</span> Color:<span>${cartProduct.color}</span>
            </p>
          </div>
        </div>
        <div class="cart__product-container-price">
          <button class="cart__btn-remove-item" data-accion="remove-item-cart">
            <i class="bi bi-x"></i>
          </button>
          <p class="cart__product-price">$${cartProduct.price * cartProduct.quantity}</p>
        </div>
      `;

          // Crea un nuevo elemento div para el producto en el carrito.
          let itemCart = document.createElement("div");

          // Agrega la clase "cart__product" al elemento div creado.
          itemCart.classList.add("cart__product");

          // Asigna la plantilla HTML como contenido del elemento div.
          itemCart.innerHTML = templateProduct;

          // Agrega el elemento del producto al cuerpo del carrito.
          windowCart.querySelector(".cart__body").appendChild(itemCart);
        });
      }

      windowCart.querySelector(".cart__total").textContent = formatMoney.format(total);
    };

    // Carga los productos del carrito desde localStorage si existen
    const storedCartProduct = localStorage.getItem("cartProduct");
    if (storedCartProduct) {
      cartProduct = JSON.parse(storedCartProduct);
      if (cartProduct.length >= 1) {
        renderCart(); // Actualiza el carrito para mostrar los productos recuperados
      }
    }

    // Abrir carrito.
    btnOpenCart.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        renderCart(); // Muestra el carrito al hacer clic en un botón de abrir.
      });
    });

    // Cerrar carrito.
    btnCloseCart.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        windowCart.classList.remove("cart--active"); // Oculta el carrito al hacer clic en un botón de cerrar.
      });
    });

    // Cuando se hace clic en el botón "addCart", se recopilan los datos del producto seleccionado
    // y se agregan al array "cartProduct" para mostrarlos en el carrito más tarde.
    addCart.addEventListener("click", (e) => {
      let id = product.dataset.productoId; // Obtiene el ID del producto desde el atributo "data-producto-id".
      let name = product.querySelector(".product__name").innerText; // Obtiene el nombre del producto.
      let quantity = parseInt(product.querySelector("#quantity").value); // Obtiene la cantidad del producto como un número entero.
      let color = product.querySelector("#property-color input:checked").value; // Obtiene el color seleccionado del producto.
      let ShippingType = product.querySelector("#property-shipping input:checked").value; // Obtiene el tipo de envío seleccionado para el producto.

      if (cartProduct.length > 0) {
        let productInCart = false;
        cartProduct.forEach((item) => {
          if (item.id === id && item.name === name && item.color === color && item.ShippingType === ShippingType) {
            item.quantity += quantity;
            productInCart = true;
          }
        });
        if (!productInCart) {
          // Agrega los datos recopilados como un nuevo objeto al array "cartProduct".
          cartProduct.push({
            id: id,
            name: name,
            quantity: quantity,
            color: color,
            ShippingType: ShippingType,
          });
        }
      } else {
        // Agrega los datos recopilados como un nuevo objeto al array "cartProduct".
        cartProduct.push({
          id: id,
          name: name,
          quantity: quantity,
          color: color,
          ShippingType: ShippingType,
        });
      }

      //Establecemos la ruta de la imagen que se motrará cuando se preione agregar al carrito
      let srcThumb = product.querySelectorAll(".product__thumb-img")[0].src;
      if (cartProduct.color === 1) {
        srcThumb = `./public/img/thumbs/${productId}/1.jpg`;
      } else if (cartProduct.color === 2) {
        srcThumb = `./public/img/thumbs/${productId}/2.jpg`;
      } else if (cartProduct.color === 3) {
        srcThumb = `./public/img/thumbs/${productId}/3.jpg`;
      }
      cartNotification.querySelector("img").src = srcThumb;

      // Agrega la clase active para que se muestre la notificación de agregado al carrito
      cartNotification.classList.add("notification--active");

      // Oculta la notificación después de que hayan pasado 3 segundos
      setTimeout(() => {
        cartNotification.classList.remove("notification--active");
      }, 5000);

      // Guarda cartProduct en localStorage
      localStorage.setItem("cartProduct", JSON.stringify(cartProduct));
    });

    /*Esta función gestiona los eventos de clic en el carrito de compras.
  Permite eliminar productos del carrito haciendo clic en el botón de eliminar. */
    windowCart.addEventListener("click", (e) => {
      if (e.target.closest("button")?.dataset.accion === "remove-item-cart") {
        // Obtiene el elemento del producto que se va a eliminar.
        let myProduct = e.target.closest(".cart__product");
        // Encuentra el índice del producto en el carrito.
        let productIndex = [...windowCart.querySelectorAll(".cart__product")].indexOf(myProduct);

        // Filtra el producto eliminado del array 'cartProduct'.
        cartProduct = cartProduct.filter((item, index) => {
          if (index !== productIndex) {
            return item;
          }
        });

        // Actualiza el localStorage para reflejar los cambios.
        localStorage.setItem("cartProduct", JSON.stringify(cartProduct));

        // Vuelve a renderizar el carrito para reflejar los cambios.
        renderCart();
      }
    });

    // Genera la animación del carrito de compras al hacer click en el botón 'BUY'
    //Se utiliza la librería SweetAlert2
    windowCart.querySelector("#cart__btn-buy").addEventListener("click", () => {
      Swal.fire({
        title: "Do you want to purchase what's in the cart?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "YES",
        denyButtonText: `Continue shopping`,
        customClass: {
          popup: "large-swal",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Successful purchase completed.", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    });
  }
});
