onload = () => {
    if (new URL(location).searchParams.get('troy') !== null) location.href = 'https://discord.com/channels/881689539192713256/881689845985054741/881990996836118548';
    document.querySelector('img').onerror = el => el.target.style.opacity = 0;
}
