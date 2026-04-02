document.querySelectorAll('.community img, .oc-gallery img').forEach((img) => {
  const src = img.getAttribute('src');
  if (!src) return;

  if (src.match(/\.(jpg|jpeg|png)$/i)) {
    const webp = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    img.src = webp;
    img.srcset = `${webp} 320w, ${webp} 640w, ${webp} 1024w`;
  }

  img.loading = 'lazy';
  img.decoding = 'async';
  img.fetchPriority = 'low';
  img.sizes = '(max-width: 600px) 90vw, (max-width: 900px) 45vw, 320px';

  if (!img.hasAttribute('width')) img.setAttribute('width', '500');
  if (!img.hasAttribute('height')) img.setAttribute('height', '500');
});
