
    // Automatically dismiss the alert after 5 seconds
    document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        const alert = document.getElementById('success-alert');
        if (alert) {
            // Programmatically trigger Bootstrap's alert close behavior
            alert.classList.remove('show'); // Hides it visually
            alert.classList.add('fade');
            setTimeout(() => alert.remove(), 150); // Remove from DOM (optional)
        }
    }, 3500); // 5 seconds
});
