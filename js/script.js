// make the mega-menu active on hover
const showMegaMenuEl = document.getElementById("show-mega-menu");
const megaMenuEl = document.querySelector(".mega-menu");

showMegaMenuEl.addEventListener(
  "mouseover", () => megaMenuEl.classList.add("mega-menu-active")
);
showMegaMenuEl.addEventListener(
  "mouseleave", () => megaMenuEl.classList.remove("mega-menu-active")
);

/* skills */
function isScrolledIntoView(elem) {
  var rect = elem.getBoundingClientRect();
  var elemTop = rect.top;
  var elemBottom = rect.bottom;

  var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);

  return isVisible;
}
const skills = document.getElementById(`skills`);

window.addEventListener(`scroll`, (e) => {
  if (isScrolledIntoView(skills)) {
    const fills = document.querySelectorAll(`.fill`);
    fills.forEach(fill =>{
      fill.style.width = fill.dataset.width
    });
  }
});