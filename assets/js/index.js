if (new URL(location).searchParams.get('troy') !== null)
    // Inviting Troy (my discord bot)
    location.href = 'https://discord.com/oauth2/authorize?client_id=663074487335649292&scope=bot&permissions=1479928959';


addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const closeScrollDelay = 500;
    let savedScrollTop = 0;
    let scrollAnimationTimers = [];

    for (const image of document.querySelectorAll('.card img, .menuStuff .project img'))
        image.addEventListener('error', () => image.style.opacity = 0);

    document.querySelector('.btn.aboutProjs')?.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector('.menuLink.projects')?.click();
    });

    const infoToggle = document.querySelector('.outside.info-toggle');
    const infoClose = document.querySelector('.outside.info-close');
    const mobileInfoToggle = document.querySelector('.menuInfoBtn');
    const scrollRoot = document.scrollingElement || document.documentElement;
    const clearScrollAnimationTimers = () => {
        for (const timer of scrollAnimationTimers)
            clearTimeout(timer);

        scrollAnimationTimers = [];
    };
    const scrollSiteToolsIntoView = () => {
        const scrollToBottom = () => scrollRoot.scrollTo({
            top: scrollRoot.scrollHeight,
            behavior: 'smooth',
        });

        clearScrollAnimationTimers();
        scrollToBottom();
        scrollAnimationTimers.push(setTimeout(scrollToBottom, 180));
        scrollAnimationTimers.push(setTimeout(scrollToBottom, 420));
    };
    const restoreSavedScrollPosition = () => {
        const restoreScroll = () => scrollRoot.scrollTo({
            top: savedScrollTop,
            behavior: 'smooth',
        });

        clearScrollAnimationTimers();
        scrollAnimationTimers.push(setTimeout(restoreScroll, closeScrollDelay));
        scrollAnimationTimers.push(setTimeout(restoreScroll, closeScrollDelay + 220));
        scrollAnimationTimers.push(setTimeout(restoreScroll, closeScrollDelay + 460));
    };
    const setPageInfoOpen = open => {
        if (open && !body.classList.contains('page-info-open'))
            savedScrollTop = scrollRoot.scrollTop;

        body.classList.toggle('page-info-open', open);
        infoToggle?.classList.toggle('invisible', open);
        infoClose?.classList.toggle('invisible', !open);
        infoToggle?.setAttribute('aria-expanded', String(open));
        infoClose?.setAttribute('aria-expanded', String(open));

        if (open)
            return scrollSiteToolsIntoView();
        
        restoreSavedScrollPosition();
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
});
