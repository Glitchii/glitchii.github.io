window.onload = () => {
    document.querySelector('img').onerror = el => el.target.style.opacity = 0;
}