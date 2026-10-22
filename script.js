// JavaScript untuk interaktivitas portofolio digital
 document.addEventListener('DOMContentLoaded', () => {
    // Menu navigasi pada perangkat seluler
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu') || document.querySelector('nav ul');

    if (mobileMenu && navMenu) {
        mobileMenu.setAttribute('aria-label', 'Buka atau tutup menu navigasi');
        mobileMenu.setAttribute('role', 'button');
        mobileMenu.setAttribute('tabindex', '0');

        const toggleMenu = () => navMenu.classList.toggle('show');
        mobileMenu.addEventListener('click', toggleMenu);
        mobileMenu.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleMenu();
            }
        });
    }

    // Tutup menu seluler setelah tautan navigasi dipilih
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('show');
        });
    });

    // Tandai menu sesuai bagian halaman yang sedang dibaca
    const sections = document.querySelectorAll('main section, body > section, section[id]');
    const updateActiveLink = () => {
        let currentId = '';
        const scrollPosition = window.scrollY + 170;

        sections.forEach((section) => {
            if (section.offsetTop <= scrollPosition) currentId = section.id;
        });

        navLinks.forEach((link) => {
            const targetId = link.getAttribute('href');
            const isActive = targetId === `#${currentId}`;
            link.classList.toggle('active', isActive);
            if (isActive) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    };

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
});
