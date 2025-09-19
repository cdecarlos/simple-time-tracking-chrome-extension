// Estado del cronómetro
let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let currentTaskName = '';

// Elementos del DOM
const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const taskInput = document.getElementById('taskInput');
const currentTask = document.getElementById('currentTask');
const todayHistory = document.getElementById('todayHistory');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// Inicializar cuando se carga el popup
document.addEventListener('DOMContentLoaded', function () {
	loadState();
	loadTodayHistory();

	// Event listeners
	startBtn.addEventListener('click', startNewTask);
	stopBtn.addEventListener('click', stopTimer);
	clearHistoryBtn.addEventListener('click', clearTodayHistory);
	taskInput.addEventListener('keypress', function (e) {
		console.log(e.key);
		if (e.key === 'Enter') {
			startNewTask();
		}
	});
});

// Cargar estado guardado
async function loadState() {
	try {
		const result = await chrome.storage.local.get([
			'isRunning', 'startTime', 'currentTaskName'
		]);

		isRunning = result.isRunning || false;
		startTime = result.startTime || 0;
		currentTaskName = result.currentTaskName || '';

		if (currentTaskName) {
			taskInput.value = '';
			currentTask.textContent = currentTaskName;
		} else {
			currentTask.textContent = 'No hay tarea en ejecución';
		}

		if (isRunning && startTime) {
			elapsedTime = Date.now() - startTime;
			updateDisplay();
			startInterval();
			updateButtonStates('running');
		} else {
			updateButtonStates('stopped');
		}
	} catch (error) {
		console.error('Error loading state:', error);
	}
}

// Guardar estado
async function saveState() {
	try {
		await chrome.storage.local.set({
			isRunning,
			startTime,
			currentTaskName
		});
	} catch (error) {
		console.error('Error saving state:', error);
	}
}

// Iniciar nueva tarea
async function startNewTask() {
	const newTaskName = taskInput.value.trim();

	// Validar que hay un nombre de tarea
	if (!newTaskName) {
		alert('Por favor, ingresa un nombre para la tarea');
		taskInput.focus();
		return;
	}

	// Si ya hay una tarea en ejecución, guardarla antes de empezar la nueva
	if (isRunning && currentTaskName) {
		await saveCurrentTask();
		// Recargar historial después de guardar la tarea anterior
		await loadTodayHistory();
	}

	// Iniciar nueva tarea
	currentTaskName = newTaskName;
	isRunning = true;
	startTime = Date.now();
	elapsedTime = 0;

	// Actualizar UI
	currentTask.textContent = currentTaskName;
	startInterval();
	updateButtonStates('running');

	// Limpiar input para la próxima tarea
	taskInput.value = '';

	await saveState();
}

// Detener tarea actual y guardar
async function stopTimer() {
	if (isRunning && currentTaskName) {
		await saveCurrentTask();

		// Resetear estado
		isRunning = false;
		startTime = 0;
		elapsedTime = 0;
		currentTaskName = '';

		clearInterval(timerInterval);
		updateDisplay();
		updateButtonStates('stopped');

		// Limpiar UI
		currentTask.textContent = 'No hay tarea en ejecución';

		await saveState();
		// Recargar historial después de guardar
		await loadTodayHistory();
	}
}

// Iniciar intervalo del cronómetro
function startInterval() {
	clearInterval(timerInterval);
	timerInterval = setInterval(() => {
		elapsedTime = Date.now() - startTime;
		updateDisplay();
	}, 1000);
}

// Actualizar display del cronómetro
function updateDisplay() {
	const hours = Math.floor(elapsedTime / 3600000);
	const minutes = Math.floor((elapsedTime % 3600000) / 60000);
	const seconds = Math.floor((elapsedTime % 60000) / 1000);

	timerDisplay.textContent =
		`${hours.toString().padStart(2, '0')}:` +
		`${minutes.toString().padStart(2, '0')}:` +
		`${seconds.toString().padStart(2, '0')}`;
}

// Actualizar estados de botones
function updateButtonStates(state) {
	switch (state) {
		case 'stopped':
			startBtn.disabled = false;
			stopBtn.disabled = true;
			startBtn.textContent = 'Iniciar';
			break;
		case 'running':
			startBtn.disabled = false;
			stopBtn.disabled = false;
			startBtn.textContent = 'Iniciar';
			break;
	}
}

// Guardar tarea actual en historial
async function saveCurrentTask() {
	if (!currentTaskName || !startTime) {
		console.log('No saving task: missing taskName or startTime', { currentTaskName, startTime });
		return;
	}

	const duration = Date.now() - startTime;
	const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

	console.log('Saving task:', { currentTaskName, duration, date });

	try {
		const result = await chrome.storage.local.get(['history']);
		const history = result.history || {};

		if (!history[date]) {
			history[date] = [];
		}

		const taskEntry = {
			task: currentTaskName,
			duration: duration,
			startTime: startTime,
			endTime: Date.now(),
			timestamp: Date.now()
		};

		history[date].push(taskEntry);

		await chrome.storage.local.set({ history });
		console.log(`Tarea guardada exitosamente: ${currentTaskName} - ${formatDuration(duration)}`);
		console.log('History after save:', history[date]);
	} catch (error) {
		console.error('Error saving task to history:', error);
	}
}

// Cargar historial de hoy
async function loadTodayHistory() {
	const today = new Date().toISOString().split('T')[0];
	console.log('Loading history for date:', today);

	try {
		const result = await chrome.storage.local.get(['history']);
		const history = result.history || {};
		const todayEntries = history[today] || [];

		console.log('Today entries found:', todayEntries.length, todayEntries);

		todayHistory.innerHTML = '';

		if (todayEntries.length === 0) {
			todayHistory.innerHTML = '<div style="color: #7f8c8d; font-style: italic;">No hay registros hoy</div>';
			return;
		}

		todayEntries.reverse(); // Mostrar las más recientes primero

		todayEntries.forEach(entry => {
			const item = document.createElement('div');
			item.className = 'history-item';

			const duration = formatDuration(entry.duration);
			const startTime = new Date(entry.startTime).toLocaleTimeString('es-ES', {
				hour: '2-digit',
				minute: '2-digit'
			});
			const endTime = new Date(entry.endTime).toLocaleTimeString('es-ES', {
				hour: '2-digit',
				minute: '2-digit'
			});

			item.innerHTML = `
                <div class="history-task">${entry.task}</div>
                <div class="history-time">${duration} (${startTime} - ${endTime})</div>
            `;

			todayHistory.appendChild(item);
		});
	} catch (error) {
		console.error('Error loading today history:', error);
	}
}

// Formatear duración
function formatDuration(milliseconds) {
	const hours = Math.floor(milliseconds / 3600000);
	const minutes = Math.floor((milliseconds % 3600000) / 60000);
	const seconds = Math.floor((milliseconds % 60000) / 1000);

	if (hours > 0) {
		return `${hours}h ${minutes}m`;
	} else if (minutes > 0) {
		return `${minutes}m ${seconds}s`;
	} else {
		return `${seconds}s`;
	}
}

// Limpiar el historial de hoy
async function clearTodayHistory() {
	if (!confirm('¿Estás seguro de que quieres eliminar todo el historial de hoy?')) {
		return;
	}

	const today = new Date().toISOString().split('T')[0];

	try {
		const result = await chrome.storage.local.get(['history']);
		const history = result.history || {};

		// Eliminar solo el historial de hoy
		if (history[today]) {
			delete history[today];
			await chrome.storage.local.set({ history });
			console.log('Historial de hoy eliminado');
			loadTodayHistory(); // Recargar la vista
		}
	} catch (error) {
		console.error('Error al limpiar el historial:', error);
	}
}
