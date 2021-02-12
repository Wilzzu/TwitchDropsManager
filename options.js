function save_options() {
    var getRefreshNumber = document.getElementById('numberRefresh').value;
    var getRefreshRange = document.getElementById('rangeRefresh').value;
    var getDisableTDM = document.getElementById('disableTDM').checked;
    var getSpecificDrops = document.getElementById('specificDrops').checked;
    chrome.storage.sync.set({
        refreshTime: getRefreshNumber,
        refreshRange: getRefreshRange,
        disableTDM: getDisableTDM,
        specificDrops: getSpecificDrops
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 1750);
    });
}



function restore_options() {
    chrome.storage.sync.get({
        refreshTime: 1,
        refreshRange: 1,
        disableTDM: false,
        specificDrops: false
    }, function (items) {
        document.getElementById('numberRefresh').value = items.refreshTime;
        document.getElementById('rangeRefresh').value = items.refreshRange;
        document.getElementById('disableTDM').checked = items.disableTDM;
        document.getElementById('specificDrops').checked = items.specificDrops;
        updateMinutes()
    });
}

let refreshValue = undefined

window.addEventListener('load', function () {
    restore_options()
    document.getElementById('rangeRefresh').addEventListener("input", updateNumberRefresh);
    document.getElementById('numberRefresh').addEventListener("input", updateRangeRefresh);
    document.getElementById('resetSettings').addEventListener("click", restore_options);
    document.getElementById('saveSettings').addEventListener('click', save_options);
})


function updateNumberRefresh() {
    rangeSteps()
    document.getElementById('numberRefresh').value = document.getElementById('rangeRefresh').value;
    refreshValue = document.getElementById('rangeRefresh').value
    updateMinutes()
}

function rangeSteps() {
    if (document.getElementById('rangeRefresh').value <= 1) {
        document.getElementById('rangeRefresh').step = 0.1
    } 
    else {
        document.getElementById('rangeRefresh').step = 1
    }
    if (document.getElementById('rangeRefresh').value < 0.1) {
        document.getElementById('rangeRefresh').value = 0.1
    } 
}

function updateRangeRefresh() {
    if (document.getElementById('numberRefresh').value >= 1) {
        document.getElementById('numberRefresh').step = 1.0
        document.getElementById('numberRefresh').min = 0
    } 
    else {
        document.getElementById('numberRefresh').step = 0.1
        document.getElementById('numberRefresh').min = 0.1
    }

    if (document.getElementById('numberRefresh').value > 60) {
        document.getElementById('numberRefresh').value = 60
    } else if (document.getElementById('numberRefresh').value < 0.1) {
        document.getElementById('numberRefresh').value = 0.1
    }
    
    document.getElementById('rangeRefresh').value = document.getElementById('numberRefresh').value;
    refreshValue = document.getElementById('numberRefresh').value
    updateMinutes()
}

function updateMinutes() {
    if (document.getElementById('numberRefresh').value > 1) {
        document.getElementById('minuteAmount').innerHTML = "minutes"
    } else if (document.getElementById('numberRefresh').value == 1) {
        document.getElementById('minuteAmount').innerHTML = "minute"
    } else if (document.getElementById('numberRefresh').value <= 1) {
        document.getElementById('minuteAmount').innerHTML = "minutes"
    }
    console.log(refreshValue)
}

function resetButton() {
    document.getElementById('minuteAmount').innerHTML = "minute"
}