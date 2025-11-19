const disableUserInteraction = 
`// ======== Disable all user interactions in the website ========
  document.body.style.pointerEvents = 'none';
  document.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); }, true);
  document.addEventListener('touchstart', e => e.preventDefault(), true);
`

export default disableUserInteraction