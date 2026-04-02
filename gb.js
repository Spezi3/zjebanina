document.addEventListener('DOMContentLoaded', () => {
    const modLinks = document.querySelectorAll('.mod-link');

    modLinks.forEach(link => {
        const url = link.href;
        const contentBox = link.parentElement;
        const modMatch = url.match(/gamebanana\.com\/mods\/(\d+)/i);

        if (!contentBox || !modMatch) {
            return;
        }

        const modId = modMatch[1];
        const thumbContainer = document.createElement('div');
        thumbContainer.className = 'gb-thumb-container';
        thumbContainer.style.textAlign = 'center';
        thumbContainer.style.margin = '15px 0';

        fetch(`https://gamebanana.com/apiv11/Mod/${modId}?_csvProperties=_sName,_aPreviewMedia`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`GameBanana API request failed: ${response.status}`);
                }

                return response.json();
            })
            .then(data => {
                const image = data?._aPreviewMedia?._aImages?.[0];

                if (!image?._sBaseUrl || !image?._sFile) {
                    return;
                }

                const thumbLink = document.createElement('a');
                thumbLink.href = url;
                thumbLink.target = '_blank';
                thumbLink.rel = 'noopener noreferrer';
                thumbLink.style.textDecoration = 'none';
                thumbLink.style.display = 'inline-block';

                const img = document.createElement('img');
                img.src = `${image._sBaseUrl}/${image._sFile}`;
                img.alt = data?._sName ? `${data._sName} preview` : 'Mod Preview';
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
                img.style.border = '5px solid #ffcc00';
                img.style.borderRadius = '15px';
                img.style.boxShadow = '8px 8px 0px #333';
                img.style.transition = 'transform 0.2s ease';
                img.style.cursor = 'pointer';
                img.addEventListener('mouseover', () => {
                    img.style.transform = 'scale(1.02) rotate(1deg)';
                });
                img.addEventListener('mouseout', () => {
                    img.style.transform = 'scale(1) rotate(0deg)';
                });

                thumbLink.appendChild(img);
                thumbContainer.appendChild(thumbLink);
                contentBox.insertBefore(thumbContainer, link);
                link.style.display = 'none';
            })
            .catch(err => {
                console.warn('Blad API GameBanana:', err);
            });
    });
});