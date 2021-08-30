if (new URL(location).searchParams.get('troy') !== null) location.href = 'https://discord.com/oauth2/authorize?client_id=663074487335649292&scope=bot&permissions=1479928959';

onload = () => {
    document.querySelector('img').onerror = el => el.target.style.opacity = 0;
}
