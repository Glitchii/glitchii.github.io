// This is a global file. It has content for all pages eg. header event listners, global variables etc.

// Array of projects for the header, so not to repeat the same code.
projectsObject = [
    {
        name: 'Troy',
        brief: 'Discord bot',
        description: 'A new discord bot built for fun, music, moderation, and games.\nIt has a customisable prefix, allows custom commands, custom welcome and goodbye message etc.',
        image: '/assets/imgs/Troy.png',
        link: 'https://troybot.xyz/',
    },
    {
        name: 'TempFile',
        brief: 'Stores files temprarily',
        description: 'A website that temporarily stores files that get deleted at a certain (chosen) time or date.',
        image: '/assets/imgs/tempfile.png',
        link: 'https://tempfile.site/',
    },
    {
        name: 'Cli tools',
        brief: 'Commandline tools',
        description: 'Small cli tools I made because I find myself to need them quite a lot.',
        image: '/assets/imgs/bash.svg',
        link: 'https://github.com/Glitchii/command-line-tools',
    },
    {
        name: 'EmbedBuilder',
        brief: 'Discord Embed Builder',
        description: 'Shows how a discord embed would look like from JSON input. The JSON data can then be used for my bot or any other that has embed command and uses the JSON format',
        image: 'https://raw.githubusercontent.com/Glitchii/embedbuilder/master/assets/media/gui.png',
        link: 'https://glitchii.github.io/embedbuilder/',
        unequal: true,
    },
    {
        name: 'Rickroll-terminal',
        brief: 'rickroll in name & host',
        description: 'Changes name and host in the terminal to a rickroll after a command.',
        image: '/assets/imgs/bash.svg',
        link: 'https://github.com/Glitchii/rickroll-terminal',
    },

]

addEventListener('DOMContentLoaded', () => {
    setTimeout(() => document.body.classList.remove('notLoaded'), 1000);

    header = document.querySelector('header');
    projects = header?.querySelector('.menuLink.projects');

    projects?.addEventListener('click', e => {
        const body = document.body;
        body.classList.toggle('expand-menu');
        body.classList.toggle('projects');
    });

    document.querySelector('.hbm')?.addEventListener('click', e => document.body.classList.toggle('menu'));
    document.body.addEventListener('click', e => {
        if (!(e.target.closest('header') || e.target.closest('.btn.aboutProjs') || e.target.closest('.outside')) && document.body.classList.contains('expand-menu'))
            projects.click();
    });

    const defaultMenuProject = document.querySelector('.menuStuff .projects .project');
    if (defaultMenuProject)
        for (const obj of projectsObject) {
            const newCard = defaultMenuProject.cloneNode(true);
            newCard.querySelector('.desc.name').innerText = obj.name;
            newCard.querySelector('.desc.small').innerText = obj.brief;
            newCard.querySelector('.top img').src = obj.image;
            newCard.querySelector('.desc.smaller').href = obj.link;
            obj.unequal && newCard.querySelector('.top img').classList.add('unequal');
            obj.description && newCard.setAttribute('title', obj.description);

            newCard.classList.remove('hidden');
            defaultMenuProject.parentElement.insertBefore(newCard, defaultMenuProject);
        }
});