// Shared header, project-menu, and theme behavior for every page.
const projectsObject = [
    {
        name: 'Troy',
        brief: 'Discord bot',
        description: 'A new discord bot built for fun, music, moderation, and games.\nIt has a customisable prefix, allows custom commands, custom welcome and goodbye message etc.',
        image: '/assets/imgs/Troy.png',
        link: 'https://troybot.xyz/',
        cta: 'Try it out',
        imageAlt: 'Troy bot screenshot',
    },
    {
        name: 'TempFile',
        brief: 'Temp file storing',
        description: 'A website that temporarily stores files that get deleted at a certain (chosen) time or date.',
        image: '/assets/imgs/tempfile.png',
        link: 'https://tempfile.site/',
        cta: 'Website',
        imageAlt: 'TempFile screenshot',
    },
    {
        name: 'Rickroll-terminal',
        brief: 'Commandline tools',
        description: 'A small bash script that turns your terminal name and host into a Rickroll after each command.',
        image: '/assets/imgs/bash.svg',
        link: 'https://github.com/Glitchii/rickroll-terminal',
        cta: 'View source',
        imageAlt: 'Bash logo',
    },
    {
        name: 'EmbedBuilder',
        brief: 'Discord Embed Builder',
        description: 'Shows how a discord embed would look like from JSON input. The JSON data can then be used for my bot or any other that has embed command and uses the JSON format',
        image: 'https://raw.githubusercontent.com/Glitchii/embedbuilder/master/assets/media/gui.png',
        link: 'https://glitchii.github.io/embedbuilder/',
        cta: 'Try it out',
        cardClass: 'embCard',
        imageAlt: 'EmbedBuilder screenshot',
        unequal: true,
    },
    {
        name: 'Cli tools',
        brief: 'Commandline tools',
        description: 'Small cli tools I made because I find myself to need them quite a lot.',
        image: '/assets/imgs/bash.svg',
        link: 'https://github.com/Glitchii/command-line-tools',
        cta: 'Contribute',
        imageAlt: 'Bash logo',
    },

];

const renderMenuProjects = () => {
    const defaultMenuProject = document.querySelector('.menuStuff .projects .project');
    if (!defaultMenuProject)
        return;

    for (const obj of projectsObject) {
        const newCard = defaultMenuProject.cloneNode(true);
        const image = newCard.querySelector('.top img');

        newCard.querySelector('.desc.name').innerText = obj.name;
        newCard.querySelector('.desc.small').innerText = obj.brief;
        image.src = obj.image;
        image.alt = obj.imageAlt || `${obj.name} preview`;
        newCard.querySelector('.desc.smaller').href = obj.link;
        obj.unequal && image.classList.add('unequal');
        obj.description && newCard.setAttribute('title', obj.description);

        newCard.classList.remove('hidden');
        defaultMenuProject.parentElement.insertBefore(newCard, defaultMenuProject);
    }
};

addEventListener('DOMContentLoaded', () => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme)
        document.body.classList.add(currentTheme);

    setTimeout(() => document.body.classList.remove('notLoaded'), 350);
    document.querySelector('noscript')?.remove();

    const header = document.querySelector('header');
    const projects = header?.querySelector('.menuLink.projects');
    const toggleProjects = () => {
        document.body.classList.toggle('expand-menu');
        document.body.classList.toggle('projects');
    };

    projects?.addEventListener('click', event => {
        event.preventDefault();
        toggleProjects();
    });

    document.querySelector('.hbm')?.addEventListener('click', () => document.body.classList.toggle('menu'));
    document.body.addEventListener('click', e => {
        if (!(e.target.closest('header') || e.target.closest('.btn.aboutProjs') || e.target.closest('.outside')) && document.body.classList.contains('expand-menu'))
            toggleProjects();
    });

    renderMenuProjects();

    for (const theme of document.querySelectorAll('.themes .theme[data-theme]'))
        theme.addEventListener('click', e => {
            const theme = e.target.dataset.theme;
            if (!theme)
                return;

            document.body.classList.remove('light', 'dark', 'darker');
            document.body.classList.add(theme);

            localStorage.removeItem('theme');
            if (theme !== 'darker')
                localStorage.setItem('theme', theme);
        });

    for (const printTrigger of document.querySelectorAll('[data-action="print"]'))
        printTrigger.addEventListener('click', () => print());
});
