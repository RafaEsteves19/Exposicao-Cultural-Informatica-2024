// Supabase configuration
const url = 'https://vdfjnwgrxtsbsphhpavc.supabase.co'; // Sua URL do Supabase
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkZmpud2dyeHRzYnNwaGhwYXZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc0NjM0NTgsImV4cCI6MjA0MzAzOTQ1OH0.VU0puYZlTm0ivkdgGhxMBASeNlrtUxImdMiFWGPly00';
const database = supabase.createClient(url, key);

// Função para atualizar o contador de likes
const updateLikeCount = async () => {
    const { data, error } = await database.from('likes').select('count');

    if (error) {
        console.error('Error fetching likes:', error);
        return;
    }

    const totalLikes = data.reduce((acc, row) => acc + row.count, 0);
    document.getElementById('like-count').textContent = totalLikes;
};

// Função para adicionar likes
document.getElementById('like-button').addEventListener('click', async () => {
    const likesToAdd = 1; // Adiciona 1 like por clique

    const { error } = await database.from('likes').insert([{ count: likesToAdd }]);

    if (error) {
        console.error('Error adding likes:', error);
    } else {
        updateLikeCount(); // Atualiza a contagem de likes
    }
});

// Inicializa a contagem de likes ao carregar a página
updateLikeCount();

// Funções para smooth scroll
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

// Menu toggle
const init = () => {
    document.getElementById("menu-button").addEventListener("click", function() {
        const navbar = document.getElementById("navbar");
        navbar.classList.toggle("hidden");
    });

    // Adiciona evento ao botão de adicionar likes
    document.getElementById('add-likes').addEventListener('click', addLikes);
    
    // Inicializa a contagem de likes ao carregar a página
    updateLikeCount();
};

// Espera o DOM estar carregado
document.addEventListener('DOMContentLoaded', init);
