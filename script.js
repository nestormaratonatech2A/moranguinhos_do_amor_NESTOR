document.addEventListener('DOMContentLoaded', () => {
    const emergencyTriggers = ['trigger1', 'trigger2', 'trigger3'];
    
    emergencyTriggers.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('click', () => {
                // Mostra um alerta para confirmar antes de ligar
                if (confirm('Você está prestes a ligar para a emergência (190). Deseja continuar?')) {
                    window.location.href = 'tel:190';
                }
            });
        }
    });

    const securityLink = document.getElementById('security-link');
    let clickCount = 0;
    let clickTimer = null;

    if (securityLink) {
        securityLink.addEventListener('click', (event) => {
            event.preventDefault(); // Impede a navegação
            clickCount++;

            if (clickTimer) {
                clearTimeout(clickTimer);
            }

            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 1500); // Reseta a contagem após 1.5 segundos

            if (clickCount === 3) {
                console.log("Ligando para emergência...");
                window.location.href = 'tel:190';
                clickCount = 0; // Reseta a contagem
                clearTimeout(clickTimer);
            }
        });
    }
});
