const b = document.body;
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

/* Shuffle Videos */
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
  activateEventListenersForVideos();
});

/* Run The Video When If Clicked */
const activateEventListenersForVideos = () => {
  const videos = document.querySelectorAll(`[name="video"]`);
  const youtubeVideoPlayer = document.getElementById(`youtube-video-player`);
  const description = document.getElementById(`video-description`);
  videos.forEach(video => video.addEventListener(`click`, () => {
    if (youtubeVideoPlayer.classList.contains(`disabled`)) {
      const image = youtubeVideoPlayer.previousElementSibling.style.display = `none`;
      youtubeVideoPlayer.classList.remove(`disabled`);
    }
    youtubeVideoPlayer.src = video.dataset.src;
    description.textContent = video.querySelector(`.des`).textContent;
  }));
};
activateEventListenersForVideos();

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

/* Events Dynamic Date */
const eventDate = document.getElementById(`event-date`);
if (b.dataset.lang === `ar`)
  eventDate.textContent = `حدث أساتذة التكنولوجيا ${new Date().getFullYear() + 1}`;
else
  eventDate.textContent = `Tech Masters Event ${new Date().getFullYear() + 1}`;

/* Features Section Animation */
const features = document.querySelectorAll(`#features .box`);
const animateFeature = (feature) => {
  const el = feature.querySelector(`.wrapper`);
  if (feature.classList.contains(`quality`)) {
    if (b.dataset.lang === `ar`)
      el.style.transform = `translateX(200px)`;
    else
      el.style.transform = `translateX(-200px)`;
  }
  else if (feature.classList.contains(`time`)) {
    if (window.innerWidth <= 992 && window.innerWidth > 584) {
      el.style.transform = `translateY(calc(100% + 40px))`;
    } else if (window.innerWidth > 584) {
      el.style.transform = `translateY(100px)`;
    }
  }
  else if (feature.classList.contains(`passion`)) {
    if (b.dataset.lang === `ar`)
      el.style.transform = `translateX(-200px)`;
    else
      el.style.transform = `translateX(200px)`;
  }
};
const featuresObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const el = entry.target.querySelector(`.wrapper`);
    if (!entry.isIntersecting) {
      animateFeature(entry.target);
      return;
    }
    el.style.transform = `none`;
  });
}, { threshold: 0.3 });
features.forEach(feature => {
  animateFeature(feature);
  featuresObserver.observe(feature);
});

/* Testimonials & team Sections Animation */
const testimonials = document.querySelectorAll(`#testimonials .box`);
const teams = document.querySelectorAll(`#team .box`);
const animate = (element) => {
  element.style.transform = `translateY(20px)`;
  element.style.opacity = `0.2`;
};
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const e = entry.target.querySelector(`.wrapper`);
    if (!entry.isIntersecting) {
      animate(e);
      return;
    }
    e.style.transform = `translateY(0)`;
    e.style.opacity = `1`;
  });
}, { threshold: .5 });
testimonials.forEach(testimonial => {
  animate(testimonial.querySelector(`.wrapper`));
  observer.observe(testimonial);
});
teams.forEach(team => {
  animate(team.querySelector(`.wrapper`));
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
}, { threshold: .5 });
services.forEach(service => {
  animateServices(service);
  servicesObserver.observe(service);
});


/* Images Lazy Loading */
const lazyLoadObserver = new IntersectionObserver(entries => {
  entries.forEach(async entry => {
    if (!entry.isIntersecting) return;
    lazyLoadObserver.unobserve(entry.target);
    const res = await fetch(entry.target.dataset.src);
    const blob = await res.blob();
    entry.target.src = URL.createObjectURL(blob);
  });
}, { rootMargin: `500px` });
[...document.images].forEach(image => lazyLoadObserver.observe(image));

/* Accessibility */
document.querySelectorAll(`#testimonials`).forEach(testimonial => testimonial.setAttribute(`aria-hidden`, `true`));
if (b.dataset.lang === `ar`)
  document.body.querySelectorAll(`*`).forEach(e => e.lang = `ar`);
else
  document.body.querySelectorAll(`*`).forEach(e => e.lang = `en`);
/* Gallery Sections Animation */
const galleries = document.querySelectorAll(`#gallery .box`);
const animateGallery = (gallery) => {
  gallery.style.transform = `translateX(-50px)`;
  gallery.style.opacity = `.5`;
};
const galleryObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const el = entry.target.querySelector(`.wrapper`);
    if (!entry.isIntersecting) {
      animateGallery(el);
      return;
    }
    el.style.transform = `none`;
    el.style.opacity = `1`;
  });
}, { threshold: 0.5 });
galleries.forEach(gallery => galleryObserver.observe(gallery));

/* Articles Sections Animation */
const articles = document.querySelectorAll(`#articles .box`);
const animateArticle = (article) => {
  article.style.transform = `translateX(50px)`;
  article.style.opacity = `.5`;
};
const articleObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const el = entry.target.querySelector(`.wrapper`);
    if (!entry.isIntersecting) {
      animateArticle(el);
      return;
    }
    el.style.removeProperty(`transform`);
    el.style.opacity = `1`;
  });
}, { threshold: 0.5 });

articles.forEach(article => articleObserver.observe(article));
/* Pricing Plans Sections Animation */
const plans = document.querySelectorAll(`#plans .box`);
const animatePlan = (plan) => {
  if (b.dataset.lang === `ar`) {
    if (plan.classList.contains(`basic`)) plan.style.transform = `translateX(200px)`;
    else if (plan.classList.contains(`advanced`)) plan.style.setProperty(`transform`, `translateY(100px)`);
    else if (plan.classList.contains(`professional`)) plan.style.transform = `translateX(-200px)`;
    return;
  }
  if (plan.classList.contains(`basic`)) plan.style.transform = `translateX(-200px)`;
  else if (plan.classList.contains(`advanced`)) plan.style.setProperty(`transform`, `translateY(100px)`);
  else if (plan.classList.contains(`professional`)) plan.style.transform = `translateX(200px)`;
};
const plansObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const el = entry.target.querySelector(`.wrapper`);
    if (!entry.isIntersecting) {
      animatePlan(el);
      return;
    }
    if (el.classList.contains(`popular`)) {
      el.style.removeProperty(`transform`);
      return;
    }
    el.style.transform = `none`;
  });
}, {
  threshold: 0.2,
  rootMargin: `100px`
});
plans.forEach(plan => {
  animatePlan(plan);
  plansObserver.observe(plan);
});

/* Dark Mode */
const darkModeBtn = document.getElementById(`dark-mode`);
darkModeBtn.addEventListener(`click`, () => {
  b.classList.toggle(`dark-mode`);
});

/* settings button */
const settingsBtn = document.getElementById(`settings-btn`);
const settings = document.getElementById(`settings`);
settingsBtn.addEventListener(`click`, () => {
  settings.classList.toggle(`active`);
});