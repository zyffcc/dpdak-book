// Simple image lightbox for Jupyter Book / Sphinx
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    // Create overlay once
    var overlay = document.createElement('div');
    overlay.id = 'image-lightbox-overlay';
    overlay.innerHTML = '<span class="lb-close" aria-label="Close">×</span><img alt="lightbox">';
    document.body.appendChild(overlay);

    var imgEl = overlay.querySelector('img');

    function close() {
      overlay.classList.remove('show');
      // Clear src to allow reloading SVGs consistently in some browsers
      setTimeout(function(){ imgEl.removeAttribute('src'); }, 150);
    }

    // Close when clicking the backdrop or the close button
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target.classList.contains('lb-close')) {
        close();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });

    function bindOpen(el, href) {
      if (!href) return;
      el.addEventListener('click', function (ev) {
        // Let modified clicks behave normally (open in new tab, etc.)
        if (ev.button !== 0 || ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.altKey) return;
        ev.preventDefault();
        imgEl.src = href;
        overlay.classList.add('show');
      });
    }

    // Case 1: anchors that wrap images (Sphinx often uses a.image-reference)
    document.querySelectorAll('a.image-reference').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href && /(\.png|\.jpe?g|\.gif|\.svg)([?#].*)?$/i.test(href)) {
        bindOpen(a, href);
      }
    });

    // Case 2: bare images not inside anchors
    var selectors = ['article img', '.bd-article img', '.bd-content img'];
    document.querySelectorAll(selectors.join(',')).forEach(function (img) {
      if (img.closest('a.image-reference')) return; // already handled
      var src = img.getAttribute('src');
      if (src) bindOpen(img, src);
    });
  });
})();
