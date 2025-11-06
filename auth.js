// Authentication and demo access
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const demoAccessBtn = document.getElementById('demoAccess');

    // Handle form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simple validation
        if (email && password) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            window.location.href = 'dashboard.html';
        }
    });

    // Demo access
    demoAccessBtn.addEventListener('click', function() {
        document.getElementById('email').value = 'demo@prorofish.gm';
        document.getElementById('password').value = 'demo123';
        
        // Auto login after 1 second
        setTimeout(() => {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', 'demo@prorofish.gm');
            localStorage.setItem('isDemo', 'true');
            window.location.href = 'dashboard.html';
        }, 1000);
    });

    // Check if user is already logged in
    if (localStorage.getItem('isLoggedIn') === 'true' && window.location.pathname.endsWith('index.html')) {
        window.location.href = 'dashboard.html';
    }
});