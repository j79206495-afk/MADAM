(function () {
  var toast = document.getElementById('toast'), timer;
  function show(m) {
    toast.textContent = m;
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(function () { toast.classList.remove('show'); }, 2600);
  }

  var vcf = [
    'BEGIN:VCARD', 'VERSION:3.0',
    'N:Pacaldo;Maybelle;Serna;Ar.;',
    'FN:Ar. Maybelle Serna Pacaldo',
    'TITLE:Architect',
    'TEL;TYPE=CELL:+639951807215',
    'EMAIL:Maypacaldo13@gmail.com',
    'URL:https://www.instagram.com/bellendaaaaa',
    'END:VCARD', ''
  ].join('\r\n');

  // Plain link download (works in Acode preview / most WebViews)
  function download() {
    var a = document.createElement('a');
    a.href = 'contact.vcf';           // static file beside index.html
    a.download = 'Maybelle-Pacaldo.vcf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    show('Contact file downloaded');
  }

  document.getElementById('save').addEventListener('click', function () {
    var file = null;
    try { file = new File([vcf], 'Maybelle-Pacaldo.vcf', { type: 'text/vcard' }); } catch (e) {}

    // 1) Native share sheet when supported
    if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({ files: [file], title: 'Ar. Maybelle Serna Pacaldo' })
        .catch(function (err) { if (err && err.name !== 'AbortError') download(); });
      return;
    }

    // 2) Fallback: download contact.vcf
    try { download(); }
    catch (e) { show('Tap Phone, then "Add to contacts"'); }
  });
})();
