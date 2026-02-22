document.addEventListener('DOMContentLoaded', () => {
    const modLinks = document.querySelectorAll('.mod-link');

    modLinks.forEach(link => {
        const url = link.href;

        if (url.includes('gamebanana.com/mods/')) {
            const modId = url.split('/mods/')[1];
            const contentBox = link.parentElement;

            const thumbContainer = document.createElement('div');
            thumbContainer.className = 'gb-thumb-container';
            thumbContainer.style.textAlign = 'center';
            thumbContainer.style.margin = '15px 0';
            
            contentBox.insertBefore(thumbContainer, link);

            link.style.display = 'none';

            fetch(`https://gamebanana.com/apiv11/Mod/${modId}?_csvProperties=_sName,_aPreviewMedia`)
                .then(response => response.json())
                .then(data => {
                    if (data._aPreviewMedia && data._aPreviewMedia._aImages) {
                        const imgData = data._aPreviewMedia._aImages[0];
                        const thumbUrl = `${imgData._sBaseUrl}/${imgData._sFile}`;

                        thumbContainer.innerHTML = `
                            <a href="${url}" target="_blank" style="text-decoration: none; display: inline-block;">
                                <img src="${thumbUrl}" alt="Mod Preview" 
                                     style="max-width:100%; height:auto; border: 5px solid #ffcc00; 
                                            border-radius: 15px; box-shadow: 8px 8px 0px #333; 
                                            transition: transform 0.2s ease; cursor: pointer;">
                                <div style="margin-top: 10px; font-weight: bold; color: #333; font-size: 14px;">
                                </div>
                            </a>
                        `;

                        const img = thumbContainer.querySelector('img');
                        img.onmouseover = () => { img.style.transform = 'scale(1.02) rotate(1deg)'; };
                        img.onmouseout = () => { img.style.transform = 'scale(1) rotate(0deg)'; };
                    }
                })
                .catch(err => {
                    link.style.display = 'inline-block';
                    console.warn("Błąd API GameBanana:", err);
                });
        }
    });
});