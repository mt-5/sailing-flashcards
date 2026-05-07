(() => {
  const STORAGE_KEY = "sailing-flashcards.v1";

  const els = {
    card: document.getElementById("card"),
    term: document.getElementById("card-term"),
    cat: document.getElementById("card-cat"),
    catBack: document.getElementById("card-cat-back"),
    def: document.getElementById("card-def"),
    source: document.getElementById("card-source"),
    filters: document.getElementById("filters"),
    seen: document.getElementById("seen"),
    total: document.getElementById("total"),
    bar: document.getElementById("bar"),
    prev: document.getElementById("prev"),
    next: document.getElementById("next"),
    known: document.getElementById("known"),
    shuffle: document.getElementById("shuffle"),
    reset: document.getElementById("reset"),
  };

  const state = {
    activeCat: "All",
    deck: [],
    idx: 0,
    knownIds: new Set(),
  };

  const cardId = c => `${c.cat}::${c.term}`;

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      state.knownIds = new Set(data.known || []);
      state.activeCat = data.activeCat || "All";
    } catch {}
  }
  function save() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ known: [...state.knownIds], activeCat: state.activeCat })
    );
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function buildDeck() {
    const filtered = state.activeCat === "All"
      ? CARDS
      : CARDS.filter(c => c.cat === state.activeCat);
    state.deck = filtered;
    state.idx = 0;
  }

  function renderFilters() {
    const cats = ["All", ...CATEGORIES];
    els.filters.innerHTML = "";
    cats.forEach(cat => {
      const b = document.createElement("button");
      b.className = "chip" + (cat === state.activeCat ? " active" : "");
      b.textContent = cat;
      b.addEventListener("click", () => {
        state.activeCat = cat;
        save();
        buildDeck();
        renderFilters();
        renderCard();
      });
      els.filters.appendChild(b);
    });
  }

  function renderCard() {
    if (!state.deck.length) return;
    const c = state.deck[state.idx];
    els.card.classList.remove("flipped");
    els.card.setAttribute("aria-pressed", "false");
    els.term.textContent = c.term;
    els.cat.textContent = c.cat;
    els.catBack.textContent = c.cat;
    els.def.textContent = c.def;
    els.source.textContent = c.source === "core"
      ? "From instructortoolkit.co.uk"
      : "Beginner extra";
    els.card.classList.toggle("known", state.knownIds.has(cardId(c)));
    els.known.textContent = state.knownIds.has(cardId(c)) ? "Unmark" : "I know this";

    els.total.textContent = state.deck.length;
    const seenInDeck = state.deck.filter(c => state.knownIds.has(cardId(c))).length;
    els.seen.textContent = seenInDeck;
    els.bar.style.width = state.deck.length
      ? `${(seenInDeck / state.deck.length) * 100}%`
      : "0%";
  }

  function flip() {
    const isFlipped = els.card.classList.toggle("flipped");
    els.card.setAttribute("aria-pressed", String(isFlipped));
  }

  function nextCard() {
    state.idx = (state.idx + 1) % state.deck.length;
    renderCard();
  }
  function prevCard() {
    state.idx = (state.idx - 1 + state.deck.length) % state.deck.length;
    renderCard();
  }
  function toggleKnown() {
    const c = state.deck[state.idx];
    const id = cardId(c);
    if (state.knownIds.has(id)) state.knownIds.delete(id);
    else state.knownIds.add(id);
    save();
    renderCard();
  }
  function shuffleDeck() {
    state.deck = shuffle(state.deck);
    state.idx = 0;
    renderCard();
  }
  function reset() {
    if (!confirm("Reset all 'known' marks?")) return;
    state.knownIds.clear();
    save();
    renderCard();
  }

  els.card.addEventListener("click", flip);
  els.card.addEventListener("keydown", e => {
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); }
  });
  els.next.addEventListener("click", nextCard);
  els.prev.addEventListener("click", prevCard);
  els.known.addEventListener("click", toggleKnown);
  els.shuffle.addEventListener("click", shuffleDeck);
  els.reset.addEventListener("click", reset);

  document.addEventListener("keydown", e => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "BUTTON") return;
    if (e.key === "ArrowRight") nextCard();
    else if (e.key === "ArrowLeft") prevCard();
    else if (e.key === " ") { e.preventDefault(); flip(); }
    else if (e.key.toLowerCase() === "k") toggleKnown();
    else if (e.key.toLowerCase() === "s") shuffleDeck();
  });

  load();
  buildDeck();
  renderFilters();
  renderCard();
})();
