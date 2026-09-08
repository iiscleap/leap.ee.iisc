document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('menu-open-btn');
    const closeBtn = document.getElementById('menu-close-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = document.querySelectorAll('.mobile-menu-link');

    function openMenu() {
        mobileMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 
    }

    function closeMenu() {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
    }
    openBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});
