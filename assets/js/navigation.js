window.addEventListener("scroll", throttle(onScroll, 500));

window.addEventListener("load", () => {
  selectNavigation();
  toggleHamburger();
});

function onScroll() {
  const navSections = [];
  const navs = document.querySelectorAll(".navigation__navs a");
  Array.from(navs).forEach((nav) => {
    const sectionId = nav.getAttribute("href").replace(/^.*#/, "#");
    const isValidSection = sectionId.startsWith("#");

    if (isValidSection) {
      const section = document.querySelector(sectionId);
      if (section) {
        navSections.push([nav, section]);
      }
    }
  });
  toggleInvertedNavigation();
  selectNavOnScroll(navSections);
}

function toggleHamburger() {
  const navContainer = document.querySelector(".navigation__navs");
  const hamburger = document.querySelector(".navigation__hamburger");

  hamburger.addEventListener("click", () => {
    navContainer.classList.toggle("open");
    hamburger.classList.toggle("open");
  });
}

function selectNavigation() {
  const navs = document.querySelectorAll(".navigation__navs a");
  navs.forEach((nav) => {
    nav.addEventListener("click", () => {
      navs.forEach((n) => {
        if (n === nav) {
          n.classList.add("selected");
        } else {
          n.classList.remove("selected");
        }
      });
    });
  });
}

function toggleInvertedNavigation() {
  if (document.body.scrollTop > 25 || document.documentElement.scrollTop > 25) {
    document.querySelector(".navigation").classList.add("invert");
  } else {
    document.querySelector(".navigation").classList.remove("invert");
  }
}

function selectNavOnScroll(navSections) {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  navSections.forEach(([nav, section]) => {
    if (section) {
      const { top, height } = section.getBoundingClientRect();

      if (top <= scrollTop && top + height > scrollTop) {
        nav.classList.add("selected");
      } else {
        nav.classList.remove("selected");
      }
    } else {
      nav.classList.remove("selected");
    }
  });
}
