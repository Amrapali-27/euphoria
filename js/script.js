// const navbarCollapsed = document.querySelector(".navbar-collapsed");
// const menu = document.querySelector(".menu");

// let isMenuOpen = false;

// menu.addEventListener("click", () => {
//   navbarCollapsed.classList.toggle("active");
//   menu.classList.toggle("animate");

//   if (isMenuOpen) {
//     document.documentElement.style.overflow = "auto";
//     document.body.style.overflow = "auto";
//     isMenuOpen = false;
//   } else {
//     document.documentElement.style.overflow = "hidden";
//     document.body.style.overflow = "hidden";
//     isMenuOpen = true;
//   }
// });


AOS.init({
    once: true,
    offset: 150,
    easing: 'ease-out-cubic'
  });

  window.addEventListener('load', () => {
    AOS.refresh();
  });