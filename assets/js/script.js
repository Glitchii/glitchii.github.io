if (new URL(location).searchParams.get('troy') !== null)
    // Inviting Troy (my discord bot)
    location.href = 'https://discord.com/oauth2/authorize?client_id=663074487335649292&scope=bot&permissions=1479928959';


addEventListener('DOMContentLoaded', () => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) document.body.classList.add(currentTheme);

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
    const win2 = document.querySelector('.window:nth-of-type(2)');

    for (const e of document.querySelectorAll('.outside.next'))
        e.addEventListener('click', e => {
            win.classList.toggle('active');
            document.querySelector('.next:not(.invisible)').classList.add('invisible');

            if (e.target.closest('.next.close'))
                document.querySelector('.outside.next:not(.close)')?.classList.remove('invisible');
            else if (e.target.closest('.next'))
                document.querySelector('.outside.next.close')?.classList.remove('invisible');

            if (document.body.classList.contains('otherWindow')) {
                document.body.classList.remove('otherWindow');
                win.classList.remove('invisible');

                win2.animate([{ left: '150%' }], { duration: 900, easing: 'ease' })
                    .onfinish = () => win2.classList.add('hidden');

                win.animate([{ left: '-150%' }, { left: '50%' }], { duration: 900, easing: 'ease' })
            }
        });

    const updated = document.querySelector('.page-info .left .item.updated .value');
    fetch('https://api.github.com/repos/Glitchii/glitchii.github.io')
        .then(res => res.json())
        .then(res => updated.innerText = new Date(res.pushed_at).toGMTString());

    document.querySelector('.menuLink.contact').addEventListener('click', e => {
        e.preventDefault();
        if (!win2) return open(e.target.href);

        const small = matchMedia('(max-width: 500px)').matches;
        const next = noAnimation => {
            const next = () => {
                win.classList.add('invisible');
                document.querySelector('form .field.message textarea')?.focus();
            };
            if (noAnimation) next();
            else win.animate([{ left: '-150%' }], { duration: 1000, easing: 'ease' }).onfinish = next;

            win2.classList.remove('hidden');
            document.body.classList.add('otherWindow');
            // document.querySelectorAll('.outside.next').forEach(e => e.remove());
        }


        if (!document.querySelector('.window.active')) next(small);
        else {
            document.querySelector('.outside.next:not(.close)').click();
            small ? next(true) : setTimeout(next, 500)
        }
    });

    for (const theme of document.querySelectorAll('.themes .theme[data-theme]'))
        theme.addEventListener('click', e => {
            const theme = e.target.dataset.theme;
            if (theme) {
                document.body.classList.remove('light', 'dark', 'darker');
                document.body.classList.add(theme);

                localStorage.removeItem('theme');
                if (theme !== 'darker')
                    // Darker theme is the default
                    localStorage.setItem('theme', theme);
            }
        });

    document.querySelector('.hbm').addEventListener('click', e => document.body.classList.toggle('menu'));
    document.querySelector('form').addEventListener('submit', e => {
        e.preventDefault();
        let name = document.querySelector('form .field.name input').value,
            email = document.querySelector('form .field.email input').value,
            mine = 'glitchii@tempfile.site',
            body = `${document.querySelector('form .field.message textarea').value}\n\n`,
            subject = `Message from ${name || email || location.href}`;

        if (!name && email) body += email;
        else if (name) {
            body += (name || email)
            email && (body += ` (${email})`);
        }
        open(`mailto:${mine}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body + `\nSent from ${location.href}`)}`);

    });

});