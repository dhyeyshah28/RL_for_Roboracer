(function () {
  function buildSlideList(decks) {
    var slides = [];
    decks.forEach(function (deck, di) {
      for (var i = 1; i <= deck.count; i++) {
        var num = ("000" + i).slice(-3);
        slides.push({
          deckIndex: di,
          deckTitle: deck.title,
          src: deck.folder + "/slide-" + num + ".png",
          indexInDeck: i,
          countInDeck: deck.count
        });
      }
    });
    return slides;
  }

  function init(config) {
    var slides = buildSlideList(config.decks);
    var current = 0;

    var img = document.getElementById("slideImg");
    var counter = document.getElementById("slideCounter");
    var deckTitleEl = document.getElementById("deckTitle");
    var moduleHeading = document.getElementById("moduleHeading");
    var progressFill = document.getElementById("progressFill");
    var prevBtn = document.getElementById("prevBtn");
    var nextBtn = document.getElementById("nextBtn");
    var tabsEl = document.getElementById("deckTabs");
    var stage = document.querySelector(".viewer-stage");

    document.title = config.moduleTitle + " — Slides | RL for Roboracer";
    if (moduleHeading) moduleHeading.textContent = config.moduleTitle;

    function preload(i) {
      if (i >= 0 && i < slides.length) {
        var im = new Image();
        im.src = slides[i].src;
      }
    }

    function render() {
      var s = slides[current];
      img.src = s.src;
      img.alt = s.deckTitle + " — slide " + s.indexInDeck;
      if (deckTitleEl) deckTitleEl.textContent = s.deckTitle;
      counter.textContent = "Slide " + (s.indexInDeck) + " of " + s.countInDeck + (config.decks.length > 1 ? "  ·  " + (current + 1) + " / " + slides.length + " total" : "");
      progressFill.style.width = ((current + 1) / slides.length * 100) + "%";
      prevBtn.disabled = current === 0;
      nextBtn.disabled = current === slides.length - 1;
      preload(current + 1);
      preload(current - 1);
      if (tabsEl) {
        Array.prototype.forEach.call(tabsEl.children, function (btn, i) {
          btn.classList.toggle("active", i === s.deckIndex);
        });
      }
      history.replaceState(null, "", "#slide-" + (current + 1));
    }

    function go(i) {
      current = Math.max(0, Math.min(slides.length - 1, i));
      render();
    }

    prevBtn.addEventListener("click", function () { go(current - 1); });
    nextBtn.addEventListener("click", function () { go(current + 1); });

    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") go(current - 1);
      if (e.key === "ArrowRight") go(current + 1);
    });

    var touchX = null;
    if (stage) {
      stage.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
      stage.addEventListener("touchend", function (e) {
        if (touchX === null) return;
        var dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 40) { go(dx < 0 ? current + 1 : current - 1); }
        touchX = null;
      }, { passive: true });
    }

    if (tabsEl) {
      if (config.decks.length > 1) {
        config.decks.forEach(function (deck, i) {
          var btn = document.createElement("button");
          btn.type = "button";
          btn.className = "deck-tab";
          if (deck.num) {
            var numEl = document.createElement("span");
            numEl.className = "deck-tab-num";
            numEl.textContent = deck.num;
            btn.appendChild(numEl);
          }
          var labelEl = document.createElement("span");
          labelEl.className = "deck-tab-label";
          labelEl.textContent = deck.tabLabel || deck.title;
          btn.appendChild(labelEl);
          btn.addEventListener("click", function () {
            var firstIndex = -1;
            for (var j = 0; j < slides.length; j++) {
              if (slides[j].deckIndex === i) { firstIndex = j; break; }
            }
            go(firstIndex);
          });
          tabsEl.appendChild(btn);
        });
      } else {
        tabsEl.hidden = true;
      }
    }

    var hashMatch = location.hash.match(/slide-(\d+)/);
    var initial = hashMatch ? parseInt(hashMatch[1], 10) - 1 : 0;
    go(initial);
  }

  window.RLSlides = { init: init };
})();
