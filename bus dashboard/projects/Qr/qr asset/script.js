document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generate-btn');
    const downloadButton = document.getElementById('download-btn');
    const qrInput = document.getElementById('qr-input');
    const qrCodeContainer = document.getElementById('qr-code');

    generateButton.addEventListener('click', function() {
        const text = qrInput.value;
        qrCodeContainer.innerHTML = ''; // Clear previous QR code
        if (text.trim() !== '') {
            $(qrCodeContainer).qrcode({
                text: text,
                width: 200,
                height: 200,
                render: 'canvas'
            });

            // Show the download button
            downloadButton.style.display = 'block';
        } else {
            alert('Please enter some text to generate a QR code.');
        }
    });

    downloadButton.addEventListener('click', function() {
        const canvas = qrCodeContainer.querySelector('canvas');
        if (canvas) {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'qrcode.png';
            link.click();
        } else {
            alert('No QR code available to download.');
        }
    });
});
