window.addEventListener("scroll", throttle(onScroll, 1500));

function onScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const aboutSection = document.getElementById("about");
  const { top, height } = aboutSection.getBoundingClientRect();

  if (top <= scrollTop && top + height > scrollTop) {
    traitAnimation();
  }
}

function traitAnimation() {
  const traits = document.querySelectorAll(".trait");
  Array.from(traits).forEach((trait) => {
    const valueCircle = trait.querySelector(".trait__value");
    const circleRadius = parseInt(valueCircle.getAttribute("r"), 10);
    const circleCircumfrence = 2 * Math.PI * circleRadius;
    const value = parseInt(trait.dataset.value, 10);
    const dashStart = (value * circleCircumfrence) / 100;
    const dashEnd = circleCircumfrence - dashStart;
    const dashOffset = (25 * circleCircumfrence) / 100;

    valueCircle.setAttribute("stroke-dasharray", `${dashStart} ${dashEnd}`);
    valueCircle.setAttribute("stroke-dashoffset", dashOffset);

    valueCircle.classList.remove("animate");
    setTimeout(() => {
      valueCircle.classList.add("animate");
    }, 500);
  });
}
