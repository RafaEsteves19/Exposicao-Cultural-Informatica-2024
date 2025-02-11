require('dotenv').config();  // Carrega as variáveis do .env
import { createClient } from '@supabase/supabase-js'; // Certifique-se de que @supabase/supabase-js está instalado

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const database = createClient(supabaseUrl, supabaseKey);

// Função para atualizar o contador de likes
const updateLikeCount = async () => {
    try {
        const { data, error } = await database.from('likes').select('count');

        if (error) throw error;

        const totalLikes = data.reduce((acc, row) => acc + row.count, 0);
        document.getElementById('like-count').textContent = totalLikes;
    } catch (error) {
        console.error('Error fetching likes:', error);
    }
};

// Função para adicionar likes
const addLikes = async () => {
    try {
        const likesToAdd = 1;
        const { error } = await database.from('likes').insert([{ count: likesToAdd }]);

        if (error) throw error;

        updateLikeCount();
    } catch (error) {
        console.error('Error adding likes:', error);
    }
};

// Inicializa os eventos e a contagem de likes ao carregar a página
const init = () => {
    document.getElementById("menu-button").addEventListener("click", function() {
        const navbar = document.getElementById("navbar");
        navbar.classList.toggle("hidden");
    });

    document.getElementById('like-button').addEventListener('click', addLikes);

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

    updateLikeCount(); // Atualiza a contagem de likes
};

document.addEventListener('DOMContentLoaded', init);