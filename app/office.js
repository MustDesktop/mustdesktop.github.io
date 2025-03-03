const downloadLink = document.getElementById('download-link');
const loadingBar = document.getElementById('loading-bar');

downloadLink.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default link behavior

    // Show the loading bar
    loadingBar.classList.remove('hidden');

    // Simulate loading progress
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);

            // Reset the loading bar
            loadingBar.classList.add('hidden');
            loadingBar.style.width = '0%';

            // Trigger the actual download
            window.location.href = downloadLink.href;
        } else {
            width += 10;
            loadingBar.style.width = `${width}%`;
        }
    }, 200); // Adjust the interval speed as needed
});