document.addEventListener('DOMContentLoaded', () => {
    const headerMusic = document.getElementById('headerMusic');
    const musicToggle = document.getElementById('musicToggle');

    headerMusic.play();

    musicToggle.addEventListener('click', () => {
        if (headerMusic.paused) {
            headerMusic.play();
            musicToggle.textContent = '⏸️ play Musik';
        } else {
            headerMusic.pause();
            musicToggle.textContent = '▶️ pause Musik';
        }
    });
});

const BOT_TOKEN = '7544131853:AAFfd_SDdS15lVYuhJtuU5MlzM7-TB8NieY';
const CHAT_ID = '-4796263519';

document.getElementById('anonimForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const senderName = document.getElementById('senderName').value.trim();
    const message = document.getElementById('message').value.trim();
    const responseMessage = document.getElementById('responseMessage');

    if (!message) {
        alert('Pesan tidak boleh kosong!');
        return;
    }

    const finalMessage = senderName
        ? `Nama: ${senderName}\nPesan Anonim:\n\n${message}`
        : `Pesan Anonim:\n\n${message}`;

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: finalMessage 
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            responseMessage.classList.remove('hidden');
            responseMessage.textContent = 'Pesan berhasil dikirim!';
        } else {
            responseMessage.classList.remove('hidden');
            responseMessage.textContent = 'Gagal mengirim pesan. Coba lagi Yuk :)';
        }

        // Reset form
        document.getElementById('senderName').value = '';
        document.getElementById('message').value = '';

        setTimeout(() => {
            responseMessage.classList.add('hidden');
        }, 5500);
    })
    .catch(err => {
        alert('Anda sedang Ofline coba lagi yuk 🌏: ' + err.message);
    });
});