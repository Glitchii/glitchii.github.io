if (new URL(location).searchParams.get('troy') !== null)
    // Inviting Troy (my discord bot)
    location.href = 'https://discord.com/oauth2/authorize?client_id=663074487335649292&scope=bot&permissions=1479928959';


addEventListener('DOMContentLoaded', () => {
    document.querySelector('.nojs').remove();
    const header = document.querySelector('header'),
        projects = header.querySelector('.menuLink.projects');

    setTimeout(() => document.body.classList.remove('notLoaded'), 1000);
    projects.addEventListener('click', e => {
        const body = document.body;
        body.classList.toggle('expand-menu');
        body.classList.toggle('projects');
    });

    document.querySelector('img').onerror = el => el.target.style.opacity = 0;
    document.querySelector('.btn.aboutProjs').addEventListener('click', e => {
        e.preventDefault();
        projects.click();
    });


    const defaultMenuProject = document.querySelector('.menuStuff .projects .project');
    for (const card of document.querySelectorAll('.cards .card:not(.hidden)')) {
        const newCard = defaultMenuProject.cloneNode(true);
        newCard.querySelector('.desc.name').innerText = card.querySelector('.title').innerText;
        newCard.querySelector('.desc.small').innerText = card.querySelector('.title').dataset.brief;
        newCard.querySelector('.top img').src = card.querySelector('img').src;
        newCard.querySelector('.desc.smaller').href = card.querySelector('.descLink').href;
        if (card.querySelector('img').classList.contains('unequal'))
            newCard.querySelector('.top img').classList.add('unequal');

        newCard.classList.remove('hidden');
        defaultMenuProject.parentElement.insertBefore(newCard, defaultMenuProject);
    }

    document.body.addEventListener('click', e => {
        if (!(e.target.closest('header') || e.target.closest('.btn.aboutProjs') || e.target.closest('.outside')) && document.body.classList.contains('expand-menu'))
            projects.click();
    });

    const win = document.querySelector('.window');
    for (const e of document.querySelectorAll('.outside'))
        e.addEventListener('click', e => {
            win.classList.toggle('active');
            document.querySelector('.next:not(.invisible)').classList.add('invisible');

            if (e.target.closest('.next.close'))
                document.querySelector('.outside.next:not(.close)')?.classList.remove('invisible');
            else if (e.target.closest('.next'))
                document.querySelector('.outside.next.close')?.classList.remove('invisible');
        });

    const updated = document.querySelector('.page-info .left .item.updated .value');
    fetch('https://api.github.com/repos/Glitchii/glitchii.github.io')
        .then(res => res.json())
        .then(res => updated.innerText = new Date(res.updated_at).toGMTString());

    for (const achor of document.getElementsByClassName('descLink frame'))
        achor.addEventListener('click', e => {
            e.preventDefault();
            const win2 = document.querySelector('.window.\\:2');
            const iframe = win2?.querySelector('iframe');
            if (!win2 || !iframe) return open(e.target.href);

            iframe.src = achor.href;
            iframe.onload = () => {
                const next = () => {
                    win.animate([{ left: '-150%' }], { duration: 900, easing: 'ease' })
                        .onfinish = () => win.classList.add('invisible');

                    win2.classList.remove('hidden');
                    document.body.classList.add('frame');
                    document.querySelectorAll('.outside.next').forEach(e => e.remove());
                }

                if (!document.querySelector('.window.active')) next();
                else {
                    document.querySelector('.outside.next:not(.close)').click();
                    setTimeout(next, 500);
                }


            };


        });
});