// Paletas de cores harmônicas que se alteram semanalmente
const colorPalettes = [
    { primary: '#6B46C1', secondary: '#E879F9', button: '#4C1D95' },   // Roxo + Magenta
    { primary: '#7C3AED', secondary: '#F97316', button: '#5B21B6' },   // Roxo + Laranja
    { primary: '#6366F1', secondary: '#06B6D4', button: '#4F46E5' },   // Índigo + Ciano
    { primary: '#8B5CF6', secondary: '#EC4899', button: '#6D28D9' },   // Roxo + Rosa
    { primary: '#A855F7', secondary: '#14B8A6', button: '#7E22CE' },   // Roxo + Teal
    { primary: '#6D28D9', secondary: '#F59E0B', button: '#5B21B6' },   // Roxo Escuro + Âmbar
    { primary: '#7E22CE', secondary: '#10B981', button: '#6B21A8' },   // Roxo Escuro + Esmeralda
    { primary: '#9333EA', secondary: '#EF4444', button: '#7E22CE' },   // Roxo + Vermelho
    { primary: '#A78BFA', secondary: '#6366F1', button: '#8B5CF6' },   // Roxo Claro + Índigo
    { primary: '#C4B5FD', secondary: '#8B5CF6', button: '#9333EA' },   // Roxo Mais Claro + Roxo
    { primary: '#5B21B6', secondary: '#FCD34D', button: '#4C1D95' },   // Roxo Muito Escuro + Âmbar
    { primary: '#6B21A8', secondary: '#06B6D4', button: '#581C87' },   // Roxo Escuro + Ciano
    { primary: '#581C87', secondary: '#10B981', button: '#4C1D95' },   // Roxo Profundo + Esmeralda
    { primary: '#6D28D9', secondary: '#EC4899', button: '#5B21B6' },   // Roxo Escuro + Rosa
    { primary: '#7E22CE', secondary: '#F97316', button: '#6B21A8' },   // Roxo Escuro + Laranja
    { primary: '#8B5CF6', secondary: '#06B6D4', button: '#7E22CE' },   // Roxo + Ciano
    { primary: '#9333EA', secondary: '#14B8A6', button: '#7E22CE' },   // Roxo + Teal
    { primary: '#A855F7', secondary: '#EF4444', button: '#8B5CF6' },   // Roxo + Vermelho
    { primary: '#B78EFF', secondary: '#F59E0B', button: '#9333EA' },   // Roxo Claro + Âmbar
    { primary: '#C4B5FD', secondary: '#10B981', button: '#A855F7' },   // Roxo Mais Claro + Esmeralda
    { primary: '#5B21B6', secondary: '#06B6D4', button: '#4C1D95' },   // Roxo Muito Escuro + Ciano
    { primary: '#6B21A8', secondary: '#EC4899', button: '#581C87' },   // Roxo Escuro + Rosa
    { primary: '#6D28D9', secondary: '#F97316', button: '#5B21B6' },   // Roxo Escuro + Laranja
    { primary: '#581C87', secondary: '#EF4444', button: '#4C1D95' },   // Roxo Profundo + Vermelho
];

// Função para aplicar paleta de cores
function applyColorPalette() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    
    // Encontra a primeira segunda-feira do ano
    let firstMonday = new Date(startOfYear);
    const dayOfWeek = firstMonday.getDay();
    const daysUntilMonday = (1 - dayOfWeek + 7) % 7;
    firstMonday.setDate(firstMonday.getDate() + daysUntilMonday);
    
    // Calcula quantas segundas-feiras passaram desde a primeira do ano
    const timeDiff = now - firstMonday;
    const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
    const mondayNumber = Math.max(0, Math.floor(timeDiff / oneWeekInMs));
    const paletteIndex = mondayNumber % colorPalettes.length;
    
    const palette = colorPalettes[paletteIndex];
    
    document.documentElement.style.setProperty('--color-primary', palette.primary);
    document.documentElement.style.setProperty('--color-secondary', palette.secondary);
    document.documentElement.style.setProperty('--color-button', palette.button);
    
    // Para debug, descomente a linha abaixo
    // console.log(`Paleta ${paletteIndex + 1}: Primary: ${palette.primary}, Secondary: ${palette.secondary}, Button: ${palette.button}`);
}

// Aplicar cores ao carregar
applyColorPalette();

// Atualizar cores a cada hora (para refletir mudança de semana)
setInterval(applyColorPalette, 60 * 60 * 1000);

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

    // Função de saída rápida
    function quickExit() {
        window.open("https://www.google.com", "_blank");
    }

    // Adicionar evento ao botão de pânico
    const panicButton = document.getElementById('panic-button');
    if (panicButton) {
        panicButton.addEventListener('click', quickExit);
    }

});
                            clearTimeout(pressTimer);
