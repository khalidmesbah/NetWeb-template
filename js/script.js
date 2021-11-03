// make the mega-menu active on hover

const showMegaMenuEl = document.getElementById("show-mega-menu");
const MegaMenuEl = document.querySelector(".mega-menu");

showMegaMenuEl.addEventListener("mouseover", () => {
  MegaMenuEl.classList.add("mega-menu-active"); 
  MegaMenuEl.focus();
});
MegaMenuEl.addEventListener("focusout", () =>
  MegaMenuEl.classList.remove("mega-menu-active")
);
