const injectedJS =
    // disable clickable elements
    `
    (function() {
      // Disable all pointer events (most effective)
      document.body.style.pointerEvents = 'none';
      
      // Optional: also remove any existing click handlers
      document.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }, true);

      // Optional: disable touch events too (extra safety)
      document.addEventListener('touchstart', function(e) {
        e.preventDefault();
      }, true);

      true; // Required for RN WebView
    })();
    `;

export default injectedJS;