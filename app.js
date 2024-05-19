const downloadSpeedElement = document.getElementById('speedContainer');
const pingResultElement = document.getElementById('pingResult');
const startButton = document.getElementById('startButton');
const testImage = 'https://i.imgur.com/RJFYfBN.png'; // Reemplazar con la URL de una imagen grande
const imageSize = 2424.96; // Tamaño de la imagen en kilobytes (KB)

const calculateSpeed = (startTime, endTime) => {
    const duration = (endTime - startTime) / 1000; // Duración en segundos
    const bitsLoaded = imageSize * 8 * 1024; // Total de bits cargados
    const speedMbps = (bitsLoaded / duration) / (1024 * 1024); // Velocidad en Mbps
    return speedMbps;
};

const downloadFile = () => {
    startButton.disabled = true; // Deshabilitar el botón mientras se realiza la prueba
    const startTime = performance.now(); // Tiempo de inicio
    const img = new Image();
    img.onload = () => {
        const endTime = performance.now(); // Tiempo de fin
        const speed = calculateSpeed(startTime, endTime);
        downloadSpeedElement.innerText = 'Velocidad de Descarga: ' + speed.toFixed(2) + ' Mbps';
        startButton.disabled = false; // Re-habilitar el botón
    };
    img.onerror = () => {
        downloadSpeedElement.innerText = 'Error al descargar la imagen.';
        startButton.disabled = false;
    };
    img.src = testImage + '?t=' + startTime; // Para prevenir el caché
};

const measurePing = async () => {
    try {
        const startTime = performance.now();
        await fetch('https://check-host.net/check-ping', { method: 'HEAD' });
        const endTime = performance.now();
        const pingTime = endTime - startTime;
        pingResultElement.textContent = `Ping: ${pingTime.toFixed(2)} ms`;
    } catch (error) {
        pingResultElement.textContent = 'Error al medir el ping.';
    }
};


startButton.addEventListener('click', () => {
    downloadFile();
    measurePing();
});
