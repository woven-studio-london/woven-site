/* Woven Studio page, shared by index.html (English) and zh-hant/index.html (Traditional Chinese).
   Words the script shows come from data- attributes in each page, so the script carries no copy. */

/* How we work: the mark draws itself when it scrolls into view; hovering a principle or discipline lights its thread. */
(function () {
  var loom = document.querySelector('.loom');
  var crown = loom && loom.querySelector('.crown');
  var replay = document.getElementById('replay');
  if (!loom) return;
  function draw() {
    loom.classList.remove('is-drawing'); crown.classList.remove('is-drawing');
    void loom.getBoundingClientRect();
    loom.classList.add('is-drawing'); crown.classList.add('is-drawing');
  }
  replay.addEventListener('click', draw);
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { draw(); io.disconnect(); } });
    }, { threshold: 0.5 });
    io.observe(loom);
  }
  function on(k) { if (k == null) loom.removeAttribute('data-on'); else loom.setAttribute('data-on', k); }
  document.querySelectorAll('.discipline').forEach(function (li) {
    li.addEventListener('mouseenter', function () { on(li.dataset.k); });
    li.addEventListener('mouseleave', function () { on(null); });
  });
  function onp(k) { if (k == null) loom.removeAttribute('data-p'); else loom.setAttribute('data-p', k); }
  document.querySelectorAll('.belief').forEach(function (li) {
    li.addEventListener('mouseenter', function () { onp(li.dataset.p); });
    li.addEventListener('mouseleave', function () { onp(null); });
  });
  loom.querySelectorAll('.t[data-p], .pl[data-p]').forEach(function (el) {
    el.addEventListener('mouseenter', function () { onp(el.dataset.p); });
    el.addEventListener('mouseleave', function () { onp(null); });
  });
  loom.querySelectorAll('.w[data-k], .fan[data-k]').forEach(function (el) {
    el.addEventListener('mouseenter', function () { on(el.dataset.k); });
    el.addEventListener('mouseleave', function () { on(null); });
  });
})();

/* Copy the email address. Labels: the button's own text, data-copied and data-selected. */
(function () {
  var b = document.getElementById('copy-email'), a = document.getElementById('email-addr');
  if (!b || !a) return;
  var idle = b.textContent;
  function show(text) { b.textContent = text; setTimeout(function () { b.textContent = idle; }, 1800); }
  b.addEventListener('click', function () {
    var done = function () { show(b.dataset.copied); };
    var select = function () { var r = document.createRange(); r.selectNodeContents(a); var sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); show(b.dataset.selected); };
    try { navigator.clipboard.writeText(a.textContent).then(done, select); } catch (e) { select(); }
  });
})();

/* GoatCounter opt-out, stored in this browser only. Labels: data-off and data-on. */
(function () {
  var b = document.getElementById('gc-toggle'); if (!b) return;
  function off() { try { return localStorage.getItem('skipgc') === 't'; } catch (e) { return false; } }
  function label() { b.textContent = off() ? b.dataset.on : b.dataset.off; }
  b.addEventListener('click', function () {
    try { off() ? localStorage.removeItem('skipgc') : localStorage.setItem('skipgc', 't'); } catch (e) {}
    label();
  });
  label();
})();
