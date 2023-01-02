(function (win) {
  const TypingCarousal = function TypingCarousal({
    elem,
    phrases,
    holdingTime,
    typingDelay,
    rotatingDelay,
  }) {
    this.elem = elem;
    this.phrases = phrases;
    this.holdingTime = holdingTime || 1000;
    this.typingDelay = typingDelay || 200;
    this.rotatingDelay = rotatingDelay || 1500;

    this.currentIndex = 0;
    this.isTyping = false;
  };

  TypingCarousal.prototype.type = function (phrase, currentText, isDeleting) {
    this.isTyping = true;
    let holding = false;

    if (isDeleting) {
      currentText = phrase.substring(0, currentText.length - 1);
      this.isTyping = !!currentText.length;
    } else {
      currentText = phrase.substring(0, currentText.length + 1);
      if (phrase.length === currentText.length) {
        holding = true;
        isDeleting = true;
      }
    }

    this.elem.innerText = currentText;

    if (this.isTyping) {
      setTimeout(() => {
        this.type(phrase, currentText, isDeleting);
      }, holding ? this.holdingTime : this.typingDelay);
    }
  };

  TypingCarousal.prototype.rotate = function (startType) {
    if (!this.isTyping || startType) {
      this.type(this.phrases[this.currentIndex], "", false);
      this.currentIndex =
        this.currentIndex === this.phrases.length - 1
          ? 0
          : this.currentIndex + 1;
    }
    setTimeout(() => {
      this.rotate();
    }, this.rotatingDelay);
  };

  win.TypingCarousal = TypingCarousal;
})(window);
