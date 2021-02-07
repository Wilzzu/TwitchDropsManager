function save_options() {
    var color = document.getElementById('color').value;
    var likesColor = document.getElementById('like').checked;
    chrome.storage.sync.set({
        favoriteColor: color,
        likesColor: likesColor
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}



refreshValue = 1

window.addEventListener('load', function () {
    document.getElementById('rangeRefresh').addEventListener("input", updateNumberRefresh);
    document.getElementById('numberRefresh').addEventListener("input", updateRangeRefresh);
    document.getElementById('resetSettings').addEventListener("click", resetButton);
    console.log(rangeRefresh.value)
})


function updateNumberRefresh() {
    document.getElementById('numberRefresh').value = document.getElementById('rangeRefresh').value;
    refreshValue = document.getElementById('rangeRefresh').value
    updateMinutes()
}

function updateRangeRefresh() {
    if (document.getElementById('numberRefresh').value > 60) {
        document.getElementById('numberRefresh').value = 60
    }
    else if (document.getElementById('numberRefresh').value < 1) {
        document.getElementById('numberRefresh').value = 1
    }
    document.getElementById('rangeRefresh').value = document.getElementById('numberRefresh').value;
    refreshValue = document.getElementById('numberRefresh').value
    updateMinutes()
}

function updateMinutes(){
    if (document.getElementById('numberRefresh').value > 1) {
        document.getElementById('minuteAmount').innerHTML = "minutes"
    } 
    else if (document.getElementById('numberRefresh').value <= 1) {
             document.getElementById('minuteAmount').innerHTML = "minute"
    }
    console.log(refreshValue)
}

function resetButton(){
    document.getElementById('minuteAmount').innerHTML = "minute"
}