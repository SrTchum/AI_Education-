// JavaScript do Quiz

const quizData = [
    {
        pergunta: "O que é Machine Learning?",
        opcoes: [
            "Um tipo de robô físico",
            "Um sistema que aprende com dados",
            "Um programa de edição de vídeo"
        ],
        respostaCorreta: 1
    },
    {
        pergunta: "Qual tecnologia permite que a IA gere texto?",
        opcoes: [
            "Redes Neurais Convolucionais",
            "LLMs (Large Language Models)",
            "Blockchain"
        ],
        respostaCorreta: 1
    }
];

let perguntaAtual = 0;
let score = 0;

const quizContainer = document.getElementById('quiz-container');
const perguntaElement = document.getElementById('pergunta');
const opcoesElement = document.getElementById('opcoes');
const proximaBtn = document.getElementById('proxima');
const resultadoElement = document.getElementById('resultado');

document.getElementById('iniciar-quiz').addEventListener('click', () => {
    document.getElementById('iniciar-quiz').classList.add('hidden');
    quizContainer.classList.remove('hidden');
    carregarPergunta();
});

function carregarPergunta() {
    const q = quizData[perguntaAtual];
    perguntaElement.textContent = q.pergunta;
    opcoesElement.innerHTML = q.opcoes
        .map((opcao, index) => 
            `<div class="opcao" onclick="selecionarOpcao(${index})">${opcao}</div>`
        ).join('');
}

function selecionarOpcao(index) {
    const opcoes = document.querySelectorAll('.opcao');
    opcoes.forEach(opcao => opcao.style.background = 'white');
    
    if (index === quizData[perguntaAtual].respostaCorreta) {
        opcoes[index].style.background = '#48bb78';
        score++;
    } else {
        opcoes[index].style.background = '#f56565';
    }
    proximaBtn.disabled = false;
}

proximaBtn.addEventListener('click', () => {
    perguntaAtual++;
    if (perguntaAtual < quizData.length) {
        carregarPergunta();
        proximaBtn.disabled = true;
    } else {
        quizContainer.classList.add('hidden');
        resultadoElement.textContent = `Você acertou ${score} de ${quizData.length} perguntas! 🎉`;
    }
});

// Scroll Suave para Seções

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = link.getAttribute('href');
        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Highlight da Seção Ativa no Menu

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector(`nav a[href="#${id}"]`);
        if (entry.isIntersecting) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}, { threshold: 0.5 }); // Ativa quando 50% da seção está visível

// Observe todas as seções
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Salvar preferência no localStorage
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Carregar preferência salva
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}