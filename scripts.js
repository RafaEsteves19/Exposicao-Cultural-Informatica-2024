require('dotenv').config();
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const database = createClient(supabaseUrl, supabaseKey);

// Atualiza a contagem de likes
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

// Adiciona likes
const addLikes = async () => {
    try {
        const { error } = await database.from('likes').insert([{ count: 1 }]);
        if (error) throw error;
        updateLikeCount();
    } catch (error) {
        console.error('Error adding likes:', error);
    }
};

// Inicializa eventos da navbar e contador de likes
const initNavbar = () => {
    document.getElementById("menu-button").addEventListener("click", () => {
        const navbar = document.getElementById("navbar");
        navbar.classList.toggle("hidden");
    });

    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
                document.getElementById("navbar").classList.add("hidden");
            }
        });
    });
};

// Inicializa a aplicação
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    updateLikeCount();
    document.getElementById('like-button').addEventListener('click', addLikes);
});