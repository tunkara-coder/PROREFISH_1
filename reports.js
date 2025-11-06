// Reports functionality
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

    // Load project summary
    loadProjectSummary();
});

function loadProjectSummary() {
    const projectData = JSON.parse(localStorage.getItem('projectData')) || {};
    const activities = JSON.parse(localStorage.getItem('activities')) || [];

    let summaryHTML = `
        <div class="row">
            <div class="col-md-6">
                <h6>Activities Overview</h6>
                <p>Total Planned: <strong>${projectData.activities?.total || 27}</strong></p>
                <p>Started: <strong>${projectData.activities?.started || 20}</strong></p>
                <p>On Track: <strong>${projectData.activities?.onTrack || 5}</strong></p>
            </div>
            <div class="col-md-6">
                <h6>Beneficiaries</h6>
                <p>Direct Beneficiaries: <strong>${projectData.beneficiaries?.direct?.total || 837}</strong></p>
                <p>Female: <strong>${projectData.beneficiaries?.direct?.female || 597}</strong></p>
                <p>Male: <strong>${projectData.beneficiaries?.direct?.male || 240}</strong></p>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <h6>Mangrove Restoration</h6>
                <p>Hectares Restored: <strong>${projectData.mangrove?.restored || 0} ha</strong></p>
                <p>Target: <strong>${projectData.mangrove?.target || 2350} ha</strong></p>
                <p>Progress: <strong>${((projectData.mangrove?.restored || 0) / (projectData.mangrove?.target || 2350) * 100).toFixed(1)}%</strong></p>
            </div>
        </div>
    `;

    document.getElementById('projectSummary').innerHTML = summaryHTML;
}

function generatePerformanceReport() {
    const projectData = JSON.parse(localStorage.getItem('projectData')) || {};
    
    // Create a simple PDF report (in real implementation, use a PDF library)
    const reportContent = `
        PROREFISH GAMBIA - PERFORMANCE REPORT
        Generated on: ${new Date().toLocaleDateString()}
        
        ACTIVITIES:
        - Total Planned: ${projectData.activities?.total || 27}
        - Started: ${projectData.activities?.started || 20}
        - On Track: ${projectData.activities?.onTrack || 5}
        - Completion Rate: ${((projectData.activities?.started || 20) / (projectData.activities?.total || 27) * 100).toFixed(1)}%
        
        BENEFICIARIES:
        - Direct Beneficiaries: ${projectData.beneficiaries?.direct?.total || 837}
        - Female: ${projectData.beneficiaries?.direct?.female || 597}
        - Male: ${projectData.beneficiaries?.direct?.male || 240}
        
        MANGROVE RESTORATION:
        - Hectares Restored: ${projectData.mangrove?.restored || 0} ha
        - Target: ${projectData.mangrove?.target || 2350} ha
        - Progress: ${((projectData.mangrove?.restored || 0) / (projectData.mangrove?.target || 2350) * 100).toFixed(1)}%
    `;
    
    downloadFile(reportContent, 'performance-report.txt', 'text/plain');
    showAlert('Performance report generated successfully!', 'success');
}

function generateBeneficiaryReport() {
    const projectData = JSON.parse(localStorage.getItem('projectData')) || {};
    
    const csvContent = `Beneficiary Type,Female,Male,Total
Direct Beneficiaries,${projectData.beneficiaries?.direct?.female || 597},${projectData.beneficiaries?.direct?.male || 240},${projectData.beneficiaries?.direct?.total || 837}`;
    
    downloadFile(csvContent, 'beneficiary-report.csv', 'text/csv');
    showAlert('Beneficiary report generated successfully!', 'success');
}

function generateEnvironmentalReport() {
    const projectData = JSON.parse(localStorage.getItem('projectData')) || {};
    
    const reportContent = `
        PROREFISH GAMBIA - ENVIRONMENTAL REPORT
        Generated on: ${new Date().toLocaleDateString()}
        
        MANGROVE RESTORATION:
        - Hectares Restored: ${projectData.mangrove?.restored || 0} ha
        - Target: ${projectData.mangrove?.target || 2350} ha
        - Progress: ${((projectData.mangrove?.restored || 0) / (projectData.mangrove?.target || 2350) * 100).toFixed(1)}%
        
        CARBON SEQUESTRATION (Estimated):
        - CO2 sequestered: ${(projectData.mangrove?.restored || 0) * 3.5} tonnes/year
        - Based on average mangrove carbon sequestration rate of 3.5 tCO2/ha/year
    `;
    
    downloadFile(reportContent, 'environmental-report.txt', 'text/plain');
    showAlert('Environmental report generated successfully!', 'success');
}

function exportAllData(format) {
    const projectData = JSON.parse(localStorage.getItem('projectData')) || {};
    const activities = JSON.parse(localStorage.getItem('activities')) || [];
    
    const allData = {
        projectData: projectData,
        activities: activities,
        exportDate: new Date().toISOString()
    };
    
    let content, filename, mimeType;
    
    switch(format) {
        case 'json':
            content = JSON.stringify(allData, null, 2);
            filename = 'prorofish-data-export.json';
            mimeType = 'application/json';
            break;
        case 'csv':
            content = convertToCSV(allData);
            filename = 'prorofish-data-export.csv';
            mimeType = 'text/csv';
            break;
        case 'pdf':
            content = `PROREFISH Data Export - ${new Date().toLocaleDateString()}\n\n` + 
                     JSON.stringify(allData, null, 2);
            filename = 'prorofish-data-export.txt';
            mimeType = 'text/plain';
            break;
    }
    
    downloadFile(content, filename, mimeType);
    showAlert(`Data exported as ${format.toUpperCase()} successfully!`, 'success');
}

function convertToCSV(data) {
    // Simple CSV conversion for main metrics
    let csv = 'Metric,Value\n';
    csv += `Total Activities,${data.projectData.activities?.total || 27}\n`;
    csv += `Activities Started,${data.projectData.activities?.started || 20}\n`;
    csv += `Direct Beneficiaries,${data.projectData.beneficiaries?.direct?.total || 837}\n`;
    csv += `Mangrove Restored (ha),${data.projectData.mangrove?.restored || 0}\n`;
    return csv;
}

function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.querySelector('.container').insertBefore(alertDiv, document.querySelector('.container').firstChild);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}