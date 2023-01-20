function selectCards(type) {
  const marginHorizontal = 10;
  const marginVertical = 10;
  const projectsContainer = document.querySelector(".projects");
  const cardsContainer = projectsContainer.querySelector(".projects__card");
  const cards = Array.from(cardsContainer.querySelectorAll(".project"));
  const containerRect = cardsContainer.getBoundingClientRect();
  const firstCardRect = cards[0].getBoundingClientRect();
  const cardWidth = firstCardRect.width + marginHorizontal;
  const cardsPerRow = Math.floor(containerRect.width / cardWidth);
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
      card.style.opacity = 1;
    } else {
      card.style.opacity = 0;
    }
  });

  const maxHeight = Math.max(...colHeights);
  projectsContainer.style.height =
    maxHeight + containerRect.y + marginVertical + "px";
}

function onLoad() {
  selectCards("all");
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
}

window.addEventListener("load", onLoad);
