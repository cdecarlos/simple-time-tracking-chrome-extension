# Simple Time Tracking - Extensión de Chrome

Una extensión de Chrome simple y efectiva para hacer seguimiento del tiempo dedicado a diferentes tareas.

## Características

- ⏱️ Cronómetro con funciones de iniciar, pausar y detener
- 📝 Seguimiento de tareas específicas
- 📊 Historial diario de actividades
- 💾 Persistencia de datos entre sesiones
- 🎨 Interfaz limpia y fácil de usar

## Estructura de Archivos

```
simple-time-tracking/
├── manifest.json         # Configuración de la extensión
├── popup.html            # Interfaz del popup
├── popup.css             # Estilos del popup
├── popup.js              # Lógica del popup
├── background.js         # Service worker
├── content.js            # Script de contenido
├── icons/                # Iconos de la extensión
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

## Instalación

### Para desarrollo:

1. Abre Chrome y ve a `chrome://extensions/`
2. Activa el "Modo de desarrollador" en la esquina superior derecha
3. Haz clic en "Cargar extensión sin empaquetar"
4. Selecciona la carpeta `simple-time-tracking`

### Para distribución:

1. Empaqueta la extensión desde `chrome://extensions/`
2. Sube el archivo `.crx` a Chrome Web Store

## Uso

1. Haz clic en el icono de la extensión en la barra de herramientas
2. Escribe la tarea en la que estás trabajando
3. Haz clic en "Iniciar" para comenzar el cronómetro
4. Usa "Pausar" para pausar temporalmente
5. Usa "Detener" para finalizar y guardar en el historial

## Funcionalidades

### Cronómetro
- Muestra tiempo en formato HH:MM:SS
- Mantiene el estado entre sesiones del navegador
- Funciones de iniciar, pausar y reanudar

### Seguimiento de Tareas
- Campo de texto para describir la tarea actual
- Visualización de la tarea activa
- Guardado automático del estado

### Historial
- Muestra todas las sesiones del día actual
- Formato legible de duración y hora
- Limpieza automática de datos antiguos (30 días)

## Permisos

- `storage`: Para guardar datos de cronómetro e historial
- `activeTab`: Para acceso básico a la pestaña actual

## Desarrollo

### Archivos principales:

- **manifest.json**: Configuración y permisos de la extensión
- **popup.html/css/js**: Interfaz de usuario del popup
- **background.js**: Service worker para funciones en segundo plano
- **content.js**: Script que se ejecuta en páginas web

### Personalización:

1. Modifica `popup.css` para cambiar la apariencia
2. Ajusta `popup.js` para añadir nuevas funcionalidades
3. Actualiza `manifest.json` para nuevos permisos o configuraciones

## TODO

- [ ] Añadir iconos personalizados
- [ ] Implementar exportación de datos
- [ ] Añadir categorías de tareas
- [ ] Crear estadísticas semanales/mensuales
- [ ] Implementar notificaciones
- [ ] Añadir shortcuts de teclado

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
