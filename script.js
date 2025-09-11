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

    // Detector robusto de clique/pressão tripla.
    if (securityLink) {
        // Modo de depuração — ativa logs detalhados quando true
        const DEBUG = false; // coloque true para logs durante testes

        let pressCount = 0;
        let pressTimer = null;
        // Janela menor para detecção (mais responsiva). Ajuste se necessário.
        const WINDOW_MS = 1000; // ms

        const handlePress = (event) => {
            // Evita comportamento padrão (navegação)
            event.preventDefault();

            pressCount++;

            if (DEBUG) {
                console.debug(`[triple-press] event=${event.type} time=${Date.now()} count=${pressCount}`);
            }

            if (pressTimer) {
                clearTimeout(pressTimer);
            }

            // Reseta a contagem após WINDOW_MS
            pressTimer = setTimeout(() => {
                if (DEBUG) console.debug('[triple-press] reset count');
                pressCount = 0;
                pressTimer = null;
            }, WINDOW_MS);

            if (pressCount === 3) {
                if (DEBUG) console.debug('[triple-press] acionado: ligando para emergência');
                // Ação desejada ao detectar 3 pressões rápidas
                window.location.href = 'tel:190';

                // Limpa estado
                pressCount = 0;
                if (pressTimer) {
                    clearTimeout(pressTimer);
                    pressTimer = null;
                }
            }
        };

        // Usar pointerdown garante suporte a toque e mouse.
        securityLink.addEventListener('pointerdown', handlePress);

        // Previne navegação padrão caso o elemento seja um link.
        securityLink.addEventListener('click', (e) => e.preventDefault());
    }

});
                            clearTimeout(pressTimer);
