// Execute as soon as the DOM elements are loaded even if images and other media are not yet loaded.
addEventListener('DOMContentLoaded', () => {
    document.querySelector('form')?.addEventListener('submit', e => {
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