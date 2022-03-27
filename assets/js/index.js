// This is a global file that has content for all pages eg. header event listners etc.
addEventListener('DOMContentLoaded', () => {
    document.querySelector('.nojs')?.remove();
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
});