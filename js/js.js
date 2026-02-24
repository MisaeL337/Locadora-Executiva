// script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Menu Mobile ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Alternar menu ao clicar no hambúrguer
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Animação ao Rolar (Scroll Animation) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Dispara quando 10% do elemento estiver visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Para de observar após animar
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Header Background no Scroll (Opcional para efeito extra) ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.padding = '15px 0';
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // --- Formulário WhatsApp ---
    const whatsappForm = document.getElementById('whatsapp-form');

    if (whatsappForm) {
        const tipoViagemSelect = document.getElementById('tipo-viagem');
        const campoDataVolta = document.getElementById('campo-data-volta');
        const inputDataVolta = document.getElementById('data-volta');

        // Define a data mínima para os inputs de data como hoje
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('data-ida').setAttribute('min', today);
        inputDataVolta.setAttribute('min', today);

        // Lógica para mostrar/ocultar campo de data de volta
        tipoViagemSelect.addEventListener('change', () => {
            if (tipoViagemSelect.value === 'Bate e Volta') {
                campoDataVolta.style.display = 'block';
                inputDataVolta.required = true;
            } else {
                campoDataVolta.style.display = 'none';
                inputDataVolta.required = false;
                inputDataVolta.value = ''; // Limpa o valor se mudar de volta para "Só Ida"
            }
        });

        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // --- DADOS DO FORMULÁRIO ---
            const origem = document.getElementById('origem').value;
            const destino = document.getElementById('destino').value;
            const dataIdaValue = document.getElementById('data-ida').value;
            const horarioSaida = document.getElementById('horario-saida').value;
            const tipoViagem = document.getElementById('tipo-viagem').value;
            const dataVoltaValue = inputDataVolta.value;
            const passageiros = document.getElementById('passageiros').value;
            const tipoVeiculo = document.getElementById('tipo-veiculo').value;

            // Validação para data de volta
            if (tipoViagem === 'Bate e Volta' && !dataVoltaValue) {
                alert('Por favor, preencha a data de volta para viagens de Bate e Volta.');
                return;
            }

            // --- FORMATAÇÃO DAS DATAS ---
            const formatarData = (data) => {
                if (!data) return '';
                const [ano, mes, dia] = data.split('-');
                return `${dia}/${mes}/${ano}`;
            };
            const dataIda = formatarData(dataIdaValue);
            const dataVolta = formatarData(dataVoltaValue);

            // --- NÚMERO DE TELEFONE ---
            const telefone = '5511945715913'; // Número do WhatsApp

            // --- MONTAGEM DA MENSAGEM ---
            let mensagem = `Olá! Gostaria de solicitar um orçamento para um transporte.\n\n`;
            mensagem += `*Tipo de Viagem:* ${tipoViagem}\n`;
            mensagem += `*Origem:* ${origem}\n`;
            mensagem += `*Destino:* ${destino}\n`;
            mensagem += `*Data de Ida:* ${dataIda}\n`;
            mensagem += `*Horário de Saída:* ${horarioSaida}\n`;
            if (tipoViagem === 'Bate e Volta' && dataVolta) {
                mensagem += `*Data de Volta:* ${dataVolta}\n`;
            }
            mensagem += `*Nº de Passageiros:* ${passageiros}\n`;
            if (tipoVeiculo && tipoVeiculo !== 'Indiferente') {
                mensagem += `*Veículo de Preferência:* ${tipoVeiculo}\n`;
            }
            mensagem += `\nAguardando o orçamento. Obrigado!`;

            // --- CRIAÇÃO DO LINK ---
            const linkWhatsApp = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

            // --- REDIRECIONAMENTO ---
            window.open(linkWhatsApp, '_blank');
        });
    }

    // --- Lightbox (Galeria em Tela Cheia) ---
    // Cria o elemento do lightbox dinamicamente no HTML
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img src="" alt="Visualização em Tela Cheia">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Adiciona evento de clique em todas as imagens da galeria
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img && img.getAttribute('src')) {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
            }
        });
    });

    // Fechar ao clicar no X ou fora da imagem
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove('active');
        }
    });
    });
