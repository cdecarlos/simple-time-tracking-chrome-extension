// Service Worker para la extensión
console.log('Background script loaded');

// Instalar la extensión
chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');

    // Inicializar storage si es necesario
    chrome.storage.local.get(['history'], (result) => {
        if (!result.history) {
            chrome.storage.local.set({ history: {} });
        }
    });
});

// Manejar cuando se abre/cierra el popup
chrome.action.onClicked.addListener((tab) => {
    // Este evento no se dispara si hay un popup definido
    console.log('Action clicked');
});

// Escuchar mensajes de content scripts o popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('Message received:', request);

    switch (request.action) {
        case 'getTimerState':
            // Obtener estado del timer desde storage
            chrome.storage.local.get([
                'isRunning', 'isPaused', 'startTime', 'pausedTime'
            ], (result) => {
                sendResponse(result);
            });
            return true; // Indica que la respuesta es asíncrona

        case 'updateBadge':
            // Actualizar badge del icono
            updateBadge(request.text);
            break;

        default:
            console.log('Unknown action:', request.action);
    }
});

// Función para actualizar el badge del icono
function updateBadge(text) {
    chrome.action.setBadgeText({
        text: text || ''
    });

    chrome.action.setBadgeBackgroundColor({
        color: '#e74c3c'
    });
}

// Limpiar datos antiguos periódicamente (opcional)
function cleanOldData() {
    chrome.storage.local.get(['history'], (result) => {
        if (result.history) {
            const history = result.history;
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            const cutoffDate = thirtyDaysAgo.toISOString().split('T')[0];

            // Eliminar entradas más antiguas de 30 días
            Object.keys(history).forEach(date => {
                if (date < cutoffDate) {
                    delete history[date];
                }
            });

            chrome.storage.local.set({ history });
        }
    });
}

// Ejecutar limpieza una vez al día
chrome.alarms.create('cleanOldData', { periodInMinutes: 1440 }); // 24 horas

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'cleanOldData') {
        cleanOldData();
    }
});
