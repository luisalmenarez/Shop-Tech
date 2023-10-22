"use strict";const t=document.querySelector(".header__nav"),e=document.querySelector(".open__menu"),c=document.querySelector(".main");e.addEventListener("click",(()=>{t.classList.contains("visible")?t.classList.toggle("visible"):t.classList.add("visible")})),document.addEventListener("click",(r=>{c.contains(r.target)&&r.target!==e&&t.classList.remove("visible")}));const r=document.getElementById("product"),a=document.querySelector(".product__image"),i=document.querySelector(".product__thumbs"),s=document.querySelector("#increase-quantity"),n=document.querySelector("#decrease-quantity");let o=document.querySelector("#quantity");const l=r.querySelector("#property-color");i.addEventListener("click",(t=>{if("IMG"===t.target.tagName){const e=t.target.src,c=e.lastIndexOf("/"),r=e.substring(c+1);a.src=`./public/img/products/${r}`}})),l.addEventListener("click",(t=>{if("INPUT"===t.target.tagName){const e=t.target.value;a.src=`./public/img/products/${e}.jpg`;document.querySelectorAll(".product__thumb-img").forEach(((t,c)=>{t.src=`./public/img/thumbs/${e}/${e}${c+1}.jpg`}))}})),s.addEventListener("click",(t=>{o.value=parseInt(o.value)+1})),n.addEventListener("click",(t=>{o.value=parseInt(o.value)-1,parseInt(o.value)<=1&&(o.value=1)}));var u={products:[{id:"1",name:"Sony Wireless WH-H910N",description:"Exceptional sound quality with a specially designed 30mm diaphragm unit",price:249.99,colors:["Black","Silver","Blue"],ShippingType:["Standar","Express","Store","Free"]}]};const d=document.querySelectorAll('[data-accion="open-cart"]'),p=document.querySelectorAll('[data-accion="close-cart"]'),m=document.getElementById("cart"),y=document.getElementById("add-cart"),v=document.getElementById("product"),b=document.getElementById("notification"),g=new Intl.NumberFormat("EN-EEUU",{style:"currency",currency:"USD"});let _=[];const h=()=>{m.classList.add("cart--active");m.querySelectorAll(".cart__product").forEach((t=>t.remove()));let t=0;_.length<1?m.classList.add("cart--empty"):(m.classList.remove("cart--empty"),_.forEach((e=>{u.products.forEach((c=>{c.id===e.id&&(e.price=c.price,t+=c.price*e.quantity)}));let c=v.querySelectorAll(".product__thumb-img")[0].src;"silver"===e.color?c="./public/img/thumbs/silver/silver.jpg":"blue"===e.color?c="./public/img/thumbs/blue/blue.jpg":"black"===e.color&&(c="./public/img/thumbs/black/black.jpg");let r=`\n        <div class="cart__product-info">\n          <img src="${c}" alt="" class="cart__thumb" />\n          <div>\n            <p class="cart__product-name">\n              <span class="cart__product-quantity">${e.quantity} x </span>${e.name}\n            </p>\n            <p class="cart__product-properties">\n              Shipping Type:<span>${e.ShippingType}</span> Color:<span>${e.color}</span>\n            </p>\n          </div>\n        </div>\n        <div class="cart__product-container-price">\n          <button class="cart__btn-remove-item" data-accion="remove-item-cart">\n            <i class="bi bi-x"></i>\n          </button>\n          <p class="cart__product-price">$${e.price*e.quantity}</p>\n        </div>\n      `,a=document.createElement("div");a.classList.add("cart__product"),a.innerHTML=r,m.querySelector(".cart__body").appendChild(a)}))),m.querySelector(".cart__total").textContent=g.format(t)},S=localStorage.getItem("cartProduct");S&&(_=JSON.parse(S),_.length>=1&&h()),d.forEach((t=>{t.addEventListener("click",(t=>{h()}))})),p.forEach((t=>{t.addEventListener("click",(t=>{m.classList.remove("cart--active")}))})),y.addEventListener("click",(t=>{let e=v.dataset.productoId,c=v.querySelector(".product__name").innerText,r=parseInt(v.querySelector("#quantity").value),a=v.querySelector("#property-color input:checked").value,i=v.querySelector("#property-shipping input:checked").value;if(_.length>0){let t=!1;_.forEach((s=>{s.id===e&&s.name===c&&s.color===a&&s.ShippingType===i&&(s.quantity+=r,t=!0)})),t||_.push({id:e,name:c,quantity:r,color:a,ShippingType:i})}else _.push({id:e,name:c,quantity:r,color:a,ShippingType:i});let s=v.querySelectorAll(".product__thumb-img")[0].src;"silver"===a?s="./public/img/thumbs/silver/silver.jpg":"blue"===a&&(s="./public/img/thumbs/blue/blue.jpg"),b.querySelector("img").src=s,b.classList.add("notification--active"),setTimeout((()=>{b.classList.remove("notification--active")}),2e3),localStorage.setItem("cartProduct",JSON.stringify(_))})),m.addEventListener("click",(t=>{if("remove-item-cart"===t.target.closest("button")?.dataset.accion){let e=t.target.closest(".cart__product"),c=[...m.querySelectorAll(".cart__product")].indexOf(e);_=_.filter(((t,e)=>{if(e!==c)return t})),localStorage.setItem("cartProduct",JSON.stringify(_)),h()}})),m.querySelector("#cart__btn-buy").addEventListener("click",(()=>{Swal.fire({title:"Do you want to purchase what's in the cart?",showDenyButton:!0,showCancelButton:!0,confirmButtonText:"YES",denyButtonText:"Continue shopping",customClass:{popup:"large-swal"}}).then((t=>{t.isConfirmed?Swal.fire("Successful purchase completed.","","success"):t.isDenied&&Swal.fire("Changes are not saved","","info")}))}));new class{constructor(t){this.Tabs=document.getElementById(t),this.nav=this.Tabs.querySelector(".tabs"),this.nav.addEventListener("click",(t=>{if([...t.target.classList].includes("tabs__button")){const e=t.target.dataset.tab;this.Tabs.querySelector(".tab--active")&&this.Tabs.querySelector(".tab--active").classList.remove("tab--active"),this.Tabs.querySelector(`#${e}`).classList.add("tab--active"),this.Tabs.querySelector(".tabs__button--active")&&this.Tabs.querySelector(".tabs__button--active").classList.remove("tabs__button--active"),t.target.classList.add("tabs__button--active")}}))}}("more-info");
//# sourceMappingURL=bundle.js.map
