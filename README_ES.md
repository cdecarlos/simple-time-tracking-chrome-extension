# Simple Time Tracking - Extensión de Chrome

Una extensión de Chrome simple y efectiva para hacer seguimiento del tiempo dedicado a diferentes tareas.

## Características

- ⏱️ Cronómetro con funciones de iniciar y detener
- 📊 Historial diario de actividades
- 💾 Persistencia de datos entre sesiones
- 🎨 Interfaz limpia y fácil de usar

### Uso

1. Haz clic en el icono de la extensión en la barra de herramientas
2. Escribe la tarea en la que estás trabajando y haz clic en "Iniciar" para comenzar el cronómetro
3. Usa "Detener" para finalizar y guardar en el historial
4. Escribe la nueva tarea en la que estas trabajando y haz clic en "Iniciar" para comenzar el cronómetro de la nueva tarea sin tener que detener el anterior

## Funcionalidades

### Cronómetro
- Muestra tiempo en formato HH:MM:SS
- Mantiene el estado entre sesiones del navegador
- Funciones de iniciar y detener

### Seguimiento de Tareas
- Campo de texto para describir la tarea actual
- Visualización de la tarea activa
- Guardado automático del estado

### Historial
- Muestra todas las sesiones del día actual
- Cada registro del historial pone hora de inicio, hora de fin, duración y descripción de la tarea

### Permisos

- `storage`: Para guardar datos de cronómetro e historial
- `activeTab`: Para acceso básico a la pestaña actual

## Instalación

### Para desarrollo:

1. Abre Chrome y ve a `chrome://extensions/`
2. Activa el "Modo de desarrollador" en la esquina superior derecha
3. Haz clic en "Cargar extensión sin empaquetar"
4. Selecciona la carpeta `simple-time-tracking-chrome-extension`

### Para distribución:

TODO: Añadir instrucciones para publicar en Chrome Web Store

## Desarrollo

### Estructura de Archivos

```
simple-time-tracking/
├── background.js         # Service worker
├── content.js            # Script de contenido
├── LICENSE               # Archivo de licencia
├── manifest.json         # Configuración de la extensión
├── popup.css             # Estilos del popup
├── popup.html            # Interfaz del popup
├── popup.js              # Lógica del popup
├── README_ES.md          # Documentación del proyecto en Español
├── README.md             # Documentación del proyecto
├── icons/                # Iconos de la extensión
  ├── icon16.png
  ├── icon32.png
  ├── icon48.png
  └── icon128.png
```

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

- [ ] Añadir instrucciones para publicar en Chrome Web Store
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

Este proyecto está bajo la Licencia GNU GPLv3 - ver el archivo [LICENSE](LICENSE) para más detalles.
