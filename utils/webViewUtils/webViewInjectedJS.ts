const injectedJS = `
  (function() {
    // ────── Disable clicks (your original code – unchanged) ──────
    document.body.style.pointerEvents = 'none';
    document.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); }, true);
    document.addEventListener('touchstart', e => e.preventDefault(), true);

    // ────── Normal inputs (surname, firstname, faculty, gender) ──────
    const get = (id) => document.querySelector(id)?.value?.trim() || '';

    // ────── Religion is a <select>, so we need the visible text ──────
    const getReligion = () => {
      const select = document.querySelector('#religion');
      if (select && select.selectedOptions && select.selectedOptions[0]) {
        return select.selectedOptions[0].text.trim();
      }
      return '';
    };

    const data = {
      surname:   get('#surname'),
      firstname: get('#firstname'),
      faculty:   get('#faculty'),
      gender:    get('#gender'),
      religion:  getReligion()                // ← only this line changed
    };

    window.ReactNativeWebView.postMessage(JSON.stringify({
      type: 'FORM_DATA',
      payload: data
    }));

    true;
  })();
`;

export default injectedJS;

