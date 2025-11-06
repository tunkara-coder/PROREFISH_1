// Activities Started detail page
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

    // Load activities data
    loadActivitiesData();
});

function loadActivitiesData() {
    const projectData = JSON.parse(localStorage.getItem('projectData')) || {};
    const activities = JSON.parse(localStorage.getItem('activities')) || [];

    // Update progress percentage
    const progress = ((projectData.activities?.started || 20) / (projectData.activities?.total || 27) * 100).toFixed(0);
    document.getElementById('progressPercentage').textContent = `${progress}%`;

    // Create chart
    createActivitiesChart(projectData);

    // Populate activities table
    populateActivitiesTable(activities);
}

function createActivitiesChart(projectData) {
    const ctx = document.getElementById('activitiesChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Started', 'Not Started', 'On Track', 'Delayed'],
            datasets: [{
                data: [
                    projectData.activities?.started || 20,
                    (projectData.activities?.total || 27) - (projectData.activities?.started || 20),
                    projectData.activities?.onTrack || 5,
                    (projectData.activities?.started || 20) - (projectData.activities?.onTrack || 5)
                ],
                backgroundColor: [
                    '#28a745',
                    '#6c757d',
                    '#ffc107',
                    '#dc3545'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function populateActivitiesTable(activities) {
    const tableBody = document.getElementById('activitiesTable');
    
    if (activities.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted">
                    No activities added yet. <a href="data-entry.html">Add some activities</a>.
                </td>
            </tr>
        `;
        return;
    }

    let tableHTML = '';
    activities.forEach(activity => {
        const statusBadge = getStatusBadge(activity.status);
        const componentName = getComponentName(activity.component);
        
        tableHTML += `
            <tr>
                <td>${activity.name}</td>
                <td>${componentName}</td>
                <td>${statusBadge}</td>
                <td>${activity.date}</td>
                <td>
                    <div class="progress" style="height: 6px;">
                        <div class="progress-bar ${getProgressBarClass(activity.status)}" 
                             style="width: ${getProgressWidth(activity.status)}%"></div>
                    </div>
                </td>
            </tr>
        `;
    });

    tableBody.innerHTML = tableHTML;
}

function getStatusBadge(status) {
    const badges = {
        'not-started': '<span class="badge bg-secondary">Not Started</span>',
        'in-progress': '<span class="badge bg-warning">In Progress</span>',
        'completed': '<span class="badge bg-success">Completed</span>',
        'delayed': '<span class="badge bg-danger">Delayed</span>'
    };
    return badges[status] || '<span class="badge bg-secondary">Unknown</span>';
}

function getComponentName(component) {
    const components = {
        '1': 'Mangrove Ecosystems',
        '2': 'Infrastructure & Aquaculture',
        '3': 'Capacity Development'
    };
    return components[component] || 'Unknown';
}

function getProgressBarClass(status) {
    const classes = {
        'not-started': 'bg-secondary',
        'in-progress': 'bg-warning',
        'completed': 'bg-success',
        'delayed': 'bg-danger'
    };
    return classes[status] || 'bg-secondary';
}

function getProgressWidth(status) {
    const widths = {
        'not-started': 0,
        'in-progress': 50,
        'completed': 100,
        'delayed': 25
    };
    return widths[status] || 0;
}