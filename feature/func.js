let countdownInterval;

document.getElementById('preset-times').addEventListener('change', function () {
    const customInputs = document.getElementById('custom-time-inputs');
    if (this.value === 'custom') {
        customInputs.classList.remove('hidden');
    } else {
        customInputs.classList.add('hidden');
    }
    clearInterval(countdownInterval);
    document.getElementById('clock').textContent = "00:00";
});

document.getElementById('alarm-icon').addEventListener('click', function () {
    const alarmPopup = document.getElementById('alarm-popup');
    alarmPopup.classList.toggle('hidden');
});

function startCountdown(duration, display, alarmSound, stopButton) {
    let timer = duration, minutes, seconds;
    countdownInterval = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(countdownInterval);
            display.textContent = "00:00";
            alarmSound.play();
            stopButton.classList.remove('hidden');
        }
    }, 1000);
}

function showError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    setTimeout(() => errorMessage.classList.add('hidden'), 3000);
}

document.getElementById('start-timer').addEventListener('click', () => {
    const presetTimes = document.getElementById('preset-times').value;
    const alarmSoundSrc = document.getElementById('alarm-sounds').value;
    let totalSeconds;

    if (presetTimes === 'custom') {
        const hours = parseInt(document.getElementById('custom-hours').value, 10) || 0;
        const minutes = parseInt(document.getElementById('custom-minutes').value, 10) || 0;
        const seconds = parseInt(document.getElementById('custom-seconds').value, 10) || 0;
        if (isNaN(hours) || isNaN(minutes) || isNaN(seconds) || hours < 0 || minutes < 0 || seconds < 0 || (hours === 0 && minutes === 0 && seconds === 0)) {
            showError("Invalid custom time input. Please enter valid hours, minutes, and seconds.");
            return;
        }
        totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    } else {
        totalSeconds = parseInt(presetTimes, 10);
    }

    const display = document.getElementById('clock');
    const alarmSound = document.getElementById('alarm-sound');
    const stopButton = document.getElementById('stop-alarm');

    alarmSound.src = alarmSoundSrc;
    stopButton.classList.add('hidden');

    clearInterval(countdownInterval);
    startCountdown(totalSeconds, display, alarmSound, stopButton);
});

document.getElementById('stop-alarm').addEventListener('click', () => {
    const alarmSound = document.getElementById('alarm-sound');
    alarmSound.pause();
    alarmSound.currentTime = 0;
    document.getElementById('stop-alarm').classList.add('hidden');
});