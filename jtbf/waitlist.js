/* JTBF waitlist: progressive enhancement for the Kit form.
   Without JavaScript the form posts straight to Kit, which shows its own confirmation page.
   With JavaScript it posts with fetch and shows the result in place. Every message is read from
   data- attributes on the form, so the English and Traditional Chinese pages share this file.
   The Kit form ID lives only in the form's action attribute on each page (placeholder: KIT_FORM_ID). */
(function () {
  var form = document.getElementById('waitlist');
  if (!form || !window.fetch || !window.FormData) return;
  var input = form.querySelector('input[type="email"]');
  var button = form.querySelector('button[type="submit"]');
  var status = form.querySelector('.wl-status');
  var fields = form.querySelector('.wl-fields');
  var d = form.dataset;
  var busy = false;
  // Our own message, in the page's language, instead of the browser's validation bubble.
  form.noValidate = true;

  function notice(title, body) {
    status.innerHTML = '';
    var box = document.createElement('div');
    box.className = 'n-notice';
    box.setAttribute('role', 'alert');
    var t = document.createElement('div');
    var s = document.createElement('strong'); s.textContent = title; t.appendChild(s);
    if (body) t.appendChild(document.createTextNode(body));
    box.appendChild(t);
    status.appendChild(box);
  }

  function done() {
    var box = document.createElement('div');
    box.className = 'wl-done';
    box.setAttribute('tabindex', '-1');
    var s = document.createElement('strong'); s.textContent = d.msgDoneTitle;
    var p = document.createElement('p'); p.textContent = d.msgDoneBody;
    box.appendChild(s); box.appendChild(p);
    fields.hidden = true;
    status.innerHTML = '';
    status.appendChild(box);
    box.focus();
    try {
      if (window.goatcounter && window.goatcounter.count) {
        window.goatcounter.count({ path: 'jtbf-waitlist-signup', title: 'JTBF waitlist sign-up', event: true });
      }
    } catch (e) {}
  }

  function setBusy(on) {
    busy = on;
    button.setAttribute('aria-disabled', on ? 'true' : 'false');
    button.textContent = on ? d.msgSending : d.msgButton;
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (busy) return;
    if (!input.value.trim() || !input.checkValidity()) {
      input.setAttribute('aria-invalid', 'true');
      notice(d.msgInvalid, '');
      input.focus();
      return;
    }
    input.removeAttribute('aria-invalid');
    // Until Kit is set up the action still holds the placeholder: say so kindly and send nothing anywhere.
    if (form.action.indexOf('KIT_FORM_ID') !== -1) {
      notice(d.msgErrorTitle, d.msgNotReady);
      return;
    }
    setBusy(true);
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (res) { return res.json().catch(function () { return { status: res.ok ? 'success' : 'error' }; }); })
      .then(function (data) {
        setBusy(false);
        if (data && data.status === 'success') { done(); return; }
        var badEmail = data && data.errors && data.errors.fields && data.errors.fields.indexOf && data.errors.fields.indexOf('email_address') !== -1;
        if (badEmail) { input.setAttribute('aria-invalid', 'true'); notice(d.msgInvalid, ''); input.focus(); }
        else notice(d.msgErrorTitle, d.msgError);
      })
      .catch(function () { setBusy(false); notice(d.msgErrorTitle, d.msgError); });
  });

  input.addEventListener('input', function () { input.removeAttribute('aria-invalid'); });
})();

/* GoatCounter opt-out, the same as the studio page: GoatCounter's count.js skips counting while
   localStorage "skipgc" is "t". Labels come from the button's data- attributes. */
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
