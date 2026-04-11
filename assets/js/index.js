if (new URL(location).searchParams.get('troy') !== null)
    // Inviting Troy (my discord bot)
    location.href = 'https://discord.com/oauth2/authorize?client_id=663074487335649292&scope=bot&permissions=1479928959';


addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const isSmallScreen = matchMedia('(max-width: 500px)');
    const pageInfo = document.querySelector('.page-info');

    for (const image of document.querySelectorAll('.card img, .menuStuff .project img'))
        image.addEventListener('error', () => image.style.opacity = 0);

    document.querySelector('.btn.aboutProjs')?.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector('.menuLink.projects')?.click();
    });

    const infoToggle = document.querySelector('.outside.info-toggle');
    const infoClose = document.querySelector('.outside.info-close');
    const mobileInfoToggle = document.querySelector('.menuInfoBtn');
    const syncPageInfoSpace = () => {
        if (!pageInfo || !body.classList.contains('page-info-open')) {
            body.style.removeProperty('--page-info-open-space');
            return;
        }

        body.style.setProperty('--page-info-open-space', `${pageInfo.offsetHeight + 26}px`);
    };
    const scrollSiteToolsIntoView = () => {
        if (!isSmallScreen.matches || !pageInfo)
            return;

        setTimeout(() => {
            pageInfo.scrollIntoView({
                block: 'end',
                behavior: 'smooth',
            });
        }, 180);
    };
    const setPageInfoOpen = open => {
        body.classList.toggle('page-info-open', open);
        infoToggle?.classList.toggle('invisible', open);
        infoClose?.classList.toggle('invisible', !open);
        infoToggle?.setAttribute('aria-expanded', String(open));
        infoClose?.setAttribute('aria-expanded', String(open));

        requestAnimationFrame(() => {
            syncPageInfoSpace();
            open && scrollSiteToolsIntoView();
        });
    };

    infoToggle?.addEventListener('click', () => setPageInfoOpen(true));
    infoClose?.addEventListener('click', () => setPageInfoOpen(false));
    mobileInfoToggle?.addEventListener('click', () => {
        setPageInfoOpen(!body.classList.contains('page-info-open'));
        body.classList.remove('menu');
    });
    addEventListener('keydown', e => {
        if (e.key === 'Escape' && body.classList.contains('page-info-open'))
            setPageInfoOpen(false);
    });
    addEventListener('resize', syncPageInfoSpace);
});
