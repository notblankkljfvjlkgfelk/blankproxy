export function injectYouTubeFixes($) {
  $('head').append(\`
    <style>
      ytd-popup-container, ytd-consent-bump-v2-lightbox, #dialog, #login { display: none !important; }
      #player, video { display: block !important; opacity: 1 !important; }
    </style>
    <script>
      setInterval(() => {
        const modal = document.querySelector('ytd-popup-container');
        if (modal) modal.remove();
        const player = document.getElementById('player');
        if (player) player.style.display = 'block';
      }, 500);

      ['open', 'assign', 'replace'].forEach(fn => {
        history[fn] = () => {};
        location[fn] = () => {};
      });
    </script>
  \`);
}
