(function (win) {
  const TypingCarousal = function TypingCarousal({
    elem,
    phrases,
    typingDelay,
    rotatingDelay,
  }) {
    this.elem = elem;
    this.phrases = phrases;
    this.typingDelay = typingDelay;
    this.rotatingDelay = rotatingDelay;

    this.currentIndex = 0;
    this.isTyping = false;
  };

  TypingCarousal.prototype.type = function (phrase, currentText, isDeleting) {
    this.isTyping = true;

    if (isDeleting) {
      currentText = phrase.substring(0, currentText.length - 1);
      this.isTyping = !!currentText.length;
    } else {
      currentText = phrase.substring(0, currentText.length + 1);
      isDeleting = phrase.length === currentText.length;
    }

    this.elem.innerText = currentText;

    if (this.isTyping) {
      setTimeout(() => {
        this.type(phrase, currentText, isDeleting);
      }, this.typingDelay);
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
