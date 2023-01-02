window.addEventListener("load", () => {
  try {
    const elem = document.querySelector(
      ".home__content--typing-carousal [data-phrases]"
    );
    const phrases = JSON.parse(atob(elem.dataset.phrases));

    const carousal = new TypingCarousal({
      elem,
      phrases,
      holdingTime: 1000,
      typingDelay: 200,
      rotatingDelay: 1500,
    });

    carousal.rotate(true);
  } catch (error) {
    console.error(error);
  }
});
