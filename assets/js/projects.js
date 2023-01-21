function selectCards(type) {
  const marginHorizontal = 10;
  const marginVertical = 10;
  const projectsContainer = document.querySelector(".projects");
  const cardsContainer = projectsContainer.querySelector(".projects__card");
  const cards = Array.from(cardsContainer.querySelectorAll(".card"));
  const containerRect = cardsContainer.getBoundingClientRect();
  const cardWidths = cards.map((card) => {
    const cardRect = card.getBoundingClientRect();
    return cardRect.width;
  });
  const maxCardWidth = Math.max(...cardWidths);
  const cardWidth = maxCardWidth + 2 * marginHorizontal;
  const cardsPerRow = Math.floor(containerRect.width / cardWidth) || 1;
  const containerMargin =
    (containerRect.width - cardsPerRow * cardWidth + marginHorizontal) / 2;
  const colHeights = Array(cardsPerRow).fill(marginVertical);

  cards.forEach((card) => {
    if (card.dataset[type] === "") {
      const cardRect = card.getBoundingClientRect();
      const minHeight = Math.min(...colHeights);
      const minIndex = colHeights.indexOf(minHeight);

      const left = containerMargin + cardWidth * minIndex;
      const top = colHeights[minIndex];
      colHeights[minIndex] =
        colHeights[minIndex] + cardRect.height + marginVertical;

      card.style.transform = `scale(1) translate3d(${left}px, ${top}px, 0px)`;
      card.style.width = `${maxCardWidth}px`;
      card.style.opacity = 1;
    } else {
      card.style.opacity = 0;
    }
  });

  const maxHeight = Math.max(...colHeights);
  projectsContainer.style["min-height"] =
    maxHeight + containerRect.y + marginVertical + "px";
  projectsContainer.style.transform = `scale(1)`;
  projectsContainer.style.transition = "min-height .5s ease";
}

function onLoad() {
  const selectors = Array.from(
    document.querySelectorAll(".projects__selector span")
  );
  selectors.forEach((selector) => {
    selector.addEventListener("click", () => {
      selectors.forEach((s) => {
        if (s === selector) {
          s.classList.add("select");
        } else {
          s.classList.remove("select");
        }
      });
      selectCards(selector.dataset.type);
    });
  });

  selectCards("all");
  const selectAll = document.querySelector(
    ".projects__selector span[data-type='all']"
  );
  selectAll.classList.add("select");
}

function onResize() {
  const selected = document.querySelector(".projects__selector span.select");
  selectCards(selected.dataset.type);
}

window.addEventListener("load", onLoad);
window.addEventListener("resize", throttle(onResize, 500));
