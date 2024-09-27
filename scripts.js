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
    let likes = parseInt(localStorage.getItem('likes')) || 0; // Ensure likes is a number
    likes++;
    localStorage.setItem('likes', likes);
    updateLikeCount();
    sendLikesToAPI(likes);
    
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

function sendLikesToAPI(likes) {
    fetch('https://exposicao-cultural-2024-en0ypz46e.vercel.app/api/likes', { // Atualizar aqui
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ likes })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
        console.error('Erro ao enviar likes para a API:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateLikeCount();
    document.getElementById('like-button').addEventListener('click', handleLikeButtonClick);
});

function promptForPassword() {
    const password = prompt("Digite a senha:");
    if (password === "dev") {
        promptForNumber();
    } else {
        location.reload();
    }
}

function promptForNumber() {
    const likes = parseInt(localStorage.getItem('likes')) || 0;
    const number = parseInt(prompt("Digite um número:"));

    if (!isNaN(number)) {
        const newLikes = likes + number;
        localStorage.setItem('likes', newLikes);
        updateLikeCount();
        sendLikesToAPI(newLikes);
    } else {
        alert("Por favor, digite um número válido.");
    }
}

document.getElementById('reset-button').addEventListener('click', promptForPassword);