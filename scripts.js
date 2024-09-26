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

            const navbar = document.getElementById("navbar");
            navbar.classList.add("hidden");
        }
    });
});

document.getElementById("menu-button").addEventListener("click", function() {
    const navbar = document.getElementById("navbar");
    navbar.classList.toggle("hidden");
});

function updateLikeCount() {
    const likeCountElement = document.getElementById('like-count');
    const likes = localStorage.getItem('likes') || 0;
    likeCountElement.textContent = `${likes}`;
}

function handleLikeButtonClick() {
    let likes = localStorage.getItem('likes') || 0;
    likes++;
    localStorage.setItem('likes', likes);
    updateLikeCount();
}

document.addEventListener('DOMContentLoaded', () => {
    updateLikeCount();
    document.getElementById('like-button').addEventListener('click', handleLikeButtonClick);
});

function handleLikeButtonClick() {
    let likes = localStorage.getItem('likes') || 0;
    likes++;
    localStorage.setItem('likes', likes);
    updateLikeCount();

    const likeButton = document.getElementById('like-button');

    likeButton.classList.remove('fire', 'fire-blue', 'fire-violet');

    if (likes > 200) {
        likeButton.classList.add('fire-violet');
    } else if (likes > 150) {
        likeButton.classList.add('fire-blue');
    } else if (likes > 100) {
        likeButton.classList.add('fire');
    }
}

function promptForPassword() {
    const password = prompt("Digite a senha para zerar os likes:");
    if (password === "dev") {
        resetLikes();
    } else {
        location.reload();
    }
}

function resetLikes() {
    localStorage.setItem('likes', 0);
    updateLikeCount();
}

document.getElementById('reset-button').addEventListener('click', promptForPassword);
