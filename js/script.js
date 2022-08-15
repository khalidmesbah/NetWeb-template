/* Make The mega-menu Active On Hover */
const showMegaMenuEl = document.getElementById("show-mega-menu");
const megaMenuEl = document.querySelector(".mega-menu");
document.addEventListener(`mouseover`, (e) => {
  if (e.target.matches(`#show-mega-menu`) || e.target.matches(`.mega-menu`) || e.target.closest(`.mega-menu`)) {
    megaMenuEl.classList.add("mega-menu-active");
  } else {
    megaMenuEl.classList.remove("mega-menu-active");
  }
});
megaMenuEl.addEventListener(`click`, () => {
  megaMenuEl.classList.remove("mega-menu-active");
});

/* Animate Width On Scrolling */
const skills = document.querySelectorAll(`.skill`);
const skillsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const el = entry.target.querySelector(`.fill`);
    if (entry.isIntersecting) {
      skillsObserver.unobserve(entry.target);
      el.style.width = el.dataset.width;
    }
  });
}, { threshold: 1 });
skills.forEach(skill => skillsObserver.observe(skill));

/* Shuffle Button */
const shuffleBtn = document.getElementById(`shuffle`);
shuffleBtn.addEventListener(`click`, () => {
  const shuffledElements = (() => {
    const items = [...document.getElementById(`shuffledElements`).children];
    let currentIndex = items.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [items[currentIndex], items[randomIndex]] = [
        items[randomIndex], items[currentIndex]];
    }
    return items;
  })();
  let res = ``;
  shuffledElements.forEach(e => res += e.outerHTML);
  document.getElementById(`shuffledElements`).innerHTML = res;
});

/* Countdown Timer */
const lastSecondOfTheYear = new Date(`Dec 31, ${new Date().getFullYear()} 23:59:59`).getTime();
const daysEl = document.querySelector(`.days`);
const hoursEl = document.querySelector(`.hours`);
const minutesEl = document.querySelector(`.minutes`);
const secondsEl = document.querySelector(`.seconds`);
const countDown = () => {
  const milliSecondsTillTheNewYear = lastSecondOfTheYear - Date.now();
  daysEl.textContent = Math.round(milliSecondsTillTheNewYear / 1000 / 60 / 60 / 24);
  hoursEl.textContent = Math.round(milliSecondsTillTheNewYear / 1000 / 60 / 60) % 24;
  minutesEl.textContent = Math.round(milliSecondsTillTheNewYear / 1000 / 60) % 60;
  secondsEl.textContent = Math.round(milliSecondsTillTheNewYear / 1000) % 60;
};
(countDown)();
setInterval(countDown, 1000);

/* Increase Numbers On Scrolling */
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const el = entry.target.querySelector(`.number`);
    if (entry.isIntersecting) {
      statsObserver.unobserve(entry.target);
      const goal = el.dataset.goal;
      const interval = setInterval(() => goal == ++el.textContent && clearInterval(interval), 2000 / goal);
    }
  });
}, { threshold: 1 });
const stats = document.querySelectorAll(`#stats .box`);
stats.forEach(stat => statsObserver.observe(stat));

/* Fix The Header */
const header = document.getElementById(`header`);
const main = document.getElementById(`main`);
window.addEventListener(`scroll`, (e) => {
  if (window.innerWidth >= 767) {
    if (window.scrollY > 72) {
      main.style.paddingTop = `72px`;
      header.classList.add(`fixed`);
    } else {
      main.style.paddingTop = `0px`;
      header.classList.remove(`fixed`);
    }
  } else {
    if (window.scrollY > 90) {
      main.style.paddingTop = `90px`;
      header.classList.add(`fixed`);
    } else {
      main.style.paddingTop = `0px`;
      header.classList.remove(`fixed`);
    }
  }
});

/* Scroll To Top When logo Is clicked */
const logo = document.getElementById(`logo`);
logo.addEventListener(`click`, () => {
  window.location.hash = `#`;
  window.scrollTo(0, 0);
});

/* Events Dynamic Date */
const eventDate = document.getElementById(`event-date`);
eventDate.textContent = `Tech Masters Event ${new Date().getFullYear() + 1}`;

/* Features Section Animation */
const features = document.querySelectorAll(`#features .box`);
const animateFeature = (feature) => {
  if (feature.classList.contains(`quality`)) feature.style.transform = `translateX(-200px)`;
  else if (feature.classList.contains(`time`)) feature.style.transform = `translateY(100px)`;
  else if (feature.classList.contains(`passion`)) feature.style.transform = `translateX(200px)`;
};
const featuresObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      animateFeature(entry.target);
      return;
    }
    entry.target.style.transform = `none`;
  });
}, {
  threshold: 0.2,
  rootMargin: `100px`
});
features.forEach(feature => {
  animateFeature(feature);
  featuresObserver.observe(feature);
});

/* Testimonials & team Sections Animation */
const testimonials = document.querySelectorAll(`#testimonials .box`);
const teams = document.querySelectorAll(`#team .box`);
const animate = (testimonial) => {
  testimonial.style.transform = `translateY(20px)`;
  testimonial.style.opacity = `0.2`;
};
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      animate(entry.target);
      return;
    }
    entry.target.style.transform = `translateY(0)`;
    entry.target.style.opacity = `1`;
  });
}, { threshold: 1 });
testimonials.forEach(testimonial => {
  animate(testimonial);
  observer.observe(testimonial);
});
teams.forEach(team => {
  animate(team);
  observer.observe(team);
});

/* Animate Services On Scroll */
const services = document.querySelectorAll(`#services .box`);
const animateServices = (service) => {
  service.querySelector(`.cover`).classList.remove(`cover-removed`);
};
const servicesObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      animateServices(entry.target);
      return;
    }
    entry.target.querySelector(`.cover`).classList.add(`cover-removed`);
  });
}, { threshold: 1 });
services.forEach(service => {
  animateServices(service);
  servicesObserver.observe(service);
});


/* Images Lazy Loading */
const lazyLoadObserver = new IntersectionObserver(entries => {
  entries.forEach(async entry => {
    if (!entry.isIntersecting) return;
    const res = await fetch(entry.target.dataset.src);
    const blob = await res.blob();
    entry.target.src = URL.createObjectURL(blob);
  });
});
[...document.images].forEach(image => lazyLoadObserver.observe(image));

/* Accessibility */
document.querySelectorAll(`#testimonials`).forEach(testimonial => testimonial.setAttribute(`aria-hidden`,`true`));
document.body.querySelectorAll(`*`).forEach(e => e.lang = `en`);