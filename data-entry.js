// Data Entry functionality
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

    // Load existing data
    loadExistingData();

    // Form submissions
    document.getElementById('mangroveForm').addEventListener('submit', saveMangroveData);
    document.getElementById('infrastructureForm').addEventListener('submit', saveInfrastructureData);
    document.getElementById('capacityForm').addEventListener('submit', saveCapacityData);
    document.getElementById('generalForm').addEventListener('submit', saveGeneralData);
});

function loadExistingData() {
    const projectData = JSON.parse(localStorage.getItem('projectData')) || {};
    
    // Load Component 1 data
    if (projectData.component1) {
        document.getElementById('hectaresReforested').value = projectData.component1.hectaresReforested || '';
        document.getElementById('seedlingsPlanted').value = projectData.component1.seedlingsPlanted || '';
        document.getElementById('survivalRate').value = projectData.component1.survivalRate || '';
        document.getElementById('communitiesInvolved').value = projectData.component1.communitiesInvolved || '';
        document.getElementById('trainingFemale').value = projectData.component1.trainingFemale || '';
        document.getElementById('trainingMale').value = projectData.component1.trainingMale || '';
        document.getElementById('mangroveChallenges').value = projectData.component1.challenges || '';
    }

    // Load Component 2 data
    if (projectData.component2) {
        document.getElementById('feedMillProduction').value = projectData.component2.feedMillProduction || '';
        document.getElementById('landingSitesProgress').value = projectData.component2.landingSitesProgress || '';
        document.getElementById('coldStorageCapacity').value = projectData.component2.coldStorageCapacity || '';
        document.getElementById('oysterFarmersFemale').value = projectData.component2.oysterFarmersFemale || '';
        document.getElementById('oysterFarmersMale').value = projectData.component2.oysterFarmersMale || '';
        document.getElementById('clamCultureParticipants').value = projectData.component2.clamCultureParticipants || '';
        document.getElementById('infrastructureNotes').value = projectData.component2.notes || '';
    }

    // Load Component 3 data
    if (projectData.component3) {
        document.getElementById('tacMeetings').value = projectData.component3.tacMeetings || '';
        document.getElementById('genderTraining').value = projectData.component3.genderTraining || '';
        document.getElementById('seahTraining').value = projectData.component3.seahTraining || '';
        document.getElementById('extensionOfficers').value = projectData.component3.extensionOfficers || '';
        document.getElementById('mobileDevices').value = projectData.component3.mobileDevices || '';
        document.getElementById('farmersRegistered').value = projectData.component3.farmersRegistered || '';
        document.getElementById('capacityChallenges').value = projectData.component3.challenges || '';
    }

    // Load general data
    if (projectData.general) {
        document.getElementById('reportingPeriod').value = projectData.general.reportingPeriod || '';
        document.getElementById('projectPhase').value = projectData.general.projectPhase || 'year2';
        document.getElementById('dataOfficer').value = projectData.general.dataOfficer || '';
    }
}

function saveMangroveData(e) {
    e.preventDefault();
    
    const projectData = JSON.parse(localStorage.getItem('projectData')) || {};
    projectData.component1 = {
        hectaresReforested: parseFloat(document.getElementById('hectaresReforested').value) || 0,
        seedlingsPlanted: parseInt(document.getElementById('seedlingsPlanted').value) || 0,
        survivalRate: parseInt(document.getElementById('survivalRate').value) || 0,
        communitiesInvolved: parseInt(document.getElementById('communitiesInvolved').value) || 0,
        trainingFemale: parseInt(document.getElementById('trainingFemale').value) || 0,
        trainingMale: parseInt(document.getElementById('trainingMale').value) || 0,
        challenges: document.getElementById('mangroveChallenges').value,
        lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem('projectData', JSON.stringify(projectData));
    showAlert('Component 1 (Mangrove) data saved successfully!', 'success');
}

function saveInfrastructureData(e) {
    e.preventDefault();
    
    const projectData = JSON.parse(localStorage.getItem('projectData')) || {};
    projectData.component2 = {
        feedMillProduction: parseFloat(document.getElementById('feedMillProduction').value) || 0,
        landingSitesProgress: parseInt(document.getElementById('landingSitesProgress').value) || 0,
        coldStorageCapacity: parseInt(document.getElementById('coldStorageCapacity').value) || 0,
        oysterFarmersFemale: parseInt(document.getElementById('oysterFarmersFemale').value) || 0,
        oysterFarmersMale: parseInt(document.getElementById('oysterFarmersMale').value) || 0,
        clamCultureParticipants: parseInt(document.getElementById('clamCultureParticipants').value) || 0,
        notes: document.getElementById('infrastructureNotes').value,
        lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem('projectData', JSON.stringify(projectData));
    showAlert('Component 2 (Infrastructure) data saved successfully!', 'success');
}

function saveCapacityData(e) {
    e.preventDefault();
    
    const projectData = JSON.parse(localStorage.getItem('projectData')) || {};
    projectData.component3 = {
        tacMeetings: parseInt(document.getElementById('tacMeetings').value) || 0,
        genderTraining: parseInt(document.getElementById('genderTraining').value) || 0,
        seahTraining: document.getElementById('seahTraining').value,
        extensionOfficers: parseInt(document.getElementById('extensionOfficers').value) || 0,
        mobileDevices: parseInt(document.getElementById('mobileDevices').value) || 0,
        farmersRegistered: parseInt(document.getElementById('farmersRegistered').value) || 0,
        challenges: document.getElementById('capacityChallenges').value,
        lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem('projectData', JSON.stringify(projectData));
    showAlert('Component 3 (Capacity) data saved successfully!', 'success');
}

function saveGeneralData(e) {
    e.preventDefault();
    
    const projectData = JSON.parse(localStorage.getItem('projectData')) || {};
    projectData.general = {
        reportingPeriod: document.getElementById('reportingPeriod').value,
        projectPhase: document.getElementById('projectPhase').value,
        dataOfficer: document.getElementById('dataOfficer').value,
        lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem('projectData', JSON.stringify(projectData));
    showAlert('General project data saved successfully!', 'success');
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.querySelector('.container').insertBefore(alertDiv, document.querySelector('.container').firstChild);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}