// Content script - se ejecuta en todas las páginas web
console.log('Simple Time Tracking content script loaded');

// Función para detectar la página actual y enviar información
function detectCurrentPage() {
    const title = document.title;
    const url = window.location.href;
    const domain = window.location.hostname;

    // Enviar información al background script si es necesario
    chrome.runtime.sendMessage({
        action: 'pageDetected',
        data: {
            title,
            url,
            domain,
            timestamp: Date.now()
        }
    }).catch(() => {
        // Ignorar errores si el background script no está escuchando
    });
}

// Detectar cambios en el título de la página
let lastTitle = document.title;
const titleObserver = new MutationObserver((mutations) => {
    if (document.title !== lastTitle) {
        lastTitle = document.title;
        detectCurrentPage();
    }
});

// Observar cambios en el título
titleObserver.observe(document.querySelector('title'), {
    childList: true,
    subtree: true
});

// Detectar página inicial
detectCurrentPage();

// Escuchar mensajes del popup o background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
        case 'getCurrentPage':
            sendResponse({
                title: document.title,
                url: window.location.href,
                domain: window.location.hostname
            });
            break;

        default:
            console.log('Unknown action in content script:', request.action);
    }
});

// Función para mostrar notificaciones discretas (opcional)
function showTimeTrackingNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2c3e50;
        color: white;
        padding: 10px 15px;
        border-radius: 5px;
        font-family: Arial, sans-serif;
        font-size: 14px;
        z-index: 10000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        transition: opacity 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Eliminar después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Escuchar teclas de acceso rápido (opcional)
document.addEventListener('keydown', (event) => {
    // Ctrl+Shift+T para abrir el popup (esto requeriría configuración adicional)
    if (event.ctrlKey && event.shiftKey && event.key === 'T') {
        // Esta funcionalidad requeriría permisos adicionales
        console.log('Quick access shortcut pressed');
    }
});
