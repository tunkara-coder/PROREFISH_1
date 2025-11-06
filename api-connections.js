// API Connections functionality
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');

    // Check authentication
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
        return;
    }

    // Logout functionality
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('isDemo');
        window.location.href = 'index.html';
    });
});

function toggleConnection(apiType) {
    // This would typically make an API call to toggle connection status
    // For demo purposes, we'll just show an alert
    const apiNames = {
        'gcf': 'Green Climate Fund',
        'fao': 'FAO Financial System', 
        'gov': 'Government of Gambia',
        'mobile': 'Mobile Payment System'
    };
    
    alert(`Managing connection for: ${apiNames[apiType]}\n\nIn a real implementation, this would open connection settings.`);
}

function addApiConnection() {
    const form = document.getElementById('apiConnectionForm');
    const apiName = document.getElementById('apiName').value;
    const endpoint = document.getElementById('apiEndpoint').value;
    
    if (apiName && endpoint) {
        alert(`API Connection "${apiName}" added successfully!\n\nEndpoint: ${endpoint}\n\nNote: This is a demo - no actual connection was made.`);
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addApiModal'));
        modal.hide();
        
        // Reset form
        form.reset();
    } else {
        alert('Please fill in all required fields.');
    }
}

// Demo API test function
function testApiConnection(apiId) {
    console.log(`Testing API connection: ${apiId}`);
    // This would make an actual API call in production
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, message: 'Connection test successful' });
        }, 2000);
    });
}