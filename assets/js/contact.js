addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form.contact');
    form?.addEventListener('submit', e => {
        e.preventDefault();

        const name = form.querySelector('.field.name input')?.value.trim() || '';
        const email = form.querySelector('.field.email input')?.value.trim() || '';
        const message = form.querySelector('.field.message textarea')?.value.trim() || '';
        const mine = `edrine.kis+${location.hostname}@gmail.com`;
        let body = `${message}\n\n`;
        const subject = `Message from ${name || email || location.href}`;

        if (!name && email)
            body += email;
        else if (name) {
            body += name;
            if (email)
                body += ` (${email})`;
        }

        location.href = `mailto:${mine}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body + `\nSent from ${location.href}`)}`;
    });
});
