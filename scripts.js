document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const elementHeight = targetElement.offsetHeight;
            const windowHeight = window.innerHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - (windowHeight / 2) + (elementHeight / 2);

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Oculta a navbar após o clique
            const navbar = document.getElementById("navbar");
            navbar.classList.add("hidden");
        }
    });
});

document.getElementById("menu-button").addEventListener("click", function() {
    const navbar = document.getElementById("navbar");
    navbar.classList.toggle("hidden");
});
