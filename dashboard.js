// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');

    // Check authentication
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
        return;
    }

    // Show demo notice if in demo mode
    if (localStorage.getItem('isDemo') === 'true') {
        const welcomeAlert = document.getElementById('welcomeAlert');
        if (welcomeAlert) {
            welcomeAlert.innerHTML = `
                <h5>👋 Demo Mode - PROREFISH Project Portal</h5>
                <p class="mb-0">FP188 - Climate Resilient Fishery Initiative | <strong>Using synthetic data for demonstration</strong></p>
                <small class="text-muted">All data shown is based on the 2023 Annual Performance Report</small>
            `;
            welcomeAlert.classList.add('alert-warning');
        }
    }

    // Logout functionality
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('isDemo');
        window.location.href = 'index.html';
    });

    // Load project data
    loadProjectData();
});

function loadProjectData() {
    // Load data from localStorage or use defaults
    const projectData = JSON.parse(localStorage.getItem('projectData')) || {
        activities: {
            total: 27,
            started: 20,
            onTrack: 5,
            delayed: 15
        },
        beneficiaries: {
            direct: {
                total: 837,
                female: 597,
                male: 240
            }
        },
        mangrove: {
            restored: 0,
            target: 2350
        }
    };

    // Update dashboard with current data
    document.getElementById('activitiesStarted').textContent = 
        `${projectData.activities.started}/${projectData.activities.total}`;
    document.getElementById('onTrackActivities').textContent = 
        projectData.activities.onTrack;
    document.getElementById('directBeneficiaries').textContent = 
        projectData.beneficiaries.direct.total;
    document.getElementById('mangroveRestoration').textContent = 
        `${projectData.mangrove.restored} ha`;
}