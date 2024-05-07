function save_options() {
	var getRefreshNumber = document.getElementById("numberRefresh").value;
	var getRefreshRange = document.getElementById("rangeRefresh").value;
	var getDisableTDM = document.getElementById("disableTDM").checked;
	// var getSpecificDrops = document.getElementById('specificDrops').checked;
	var getExtendSearchTime = document.getElementById("extendSearchTime").checked;
	//var getHintText = document.getElementById('hintText').checked;
	var getShowTime = document.getElementById("showTime").checked;
	var getHideButtons = document.getElementById("hideButtons").checked;
	var getAutoClaim = document.getElementById("autoClaim").checked;
	//var getHideChannels = document.getElementById('hideChannels').value;

	chrome.storage.sync.set(
		{
			refreshTime: getRefreshNumber,
			refreshRange: getRefreshRange,
			disableTDM: getDisableTDM,
			// specificDrops: getSpecificDrops,
			extendSearchTime: getExtendSearchTime,
			//hintText: getHintText,
			showTime: getShowTime,
			hideButtons: getHideButtons,
			autoClaim: getAutoClaim,
			//hideChannels: getHideChannels,
		},
		function () {
			// Update status to let user know options were saved.
			var status = document.getElementById("status");
			status.style.opacity = "100%";
			setTimeout(function () {
				status.style.opacity = "0%";
			}, 2200);
		}
	);
}

function restore_options() {
	chrome.storage.sync.get(
		{
			refreshTime: 1,
			refreshRange: 1,
			disableTDM: false,
			// specificDrops: false,
			extendSearchTime: false,
			hintText: false,
			showTime: true,
			hideButtons: false,
			autoClaim: true,
			//hideChannels: ""
		},
		function (items) {
			document.getElementById("numberRefresh").value = items.refreshTime;
			document.getElementById("rangeRefresh").value = items.refreshRange;
			document.getElementById("disableTDM").checked = items.disableTDM;
			// document.getElementById('specificDrops').checked = items.specificDrops;
			document.getElementById("extendSearchTime").checked = items.extendSearchTime;
			//document.getElementById('hintText').checked = items.hintText;
			document.getElementById("showTime").checked = items.showTime;
			document.getElementById("hideButtons").checked = items.hideButtons;
			document.getElementById("autoClaim").checked = items.autoClaim;
			//document.getElementById('hideChannels').value = items.hideChannels;
			updateMinutes();
		}
	);
}

let refreshValue = undefined;

window.addEventListener("load", function () {
	restore_options();
	document.getElementById("rangeRefresh").addEventListener("input", updateNumberRefresh);
	document.getElementById("numberRefresh").addEventListener("input", updateRangeRefresh);
	document.getElementById("resetSettings").addEventListener("click", resetSettings);
	document.getElementById("resetDrops").addEventListener("click", resetDrops);
	document.getElementById("saveSettings").addEventListener("click", save_options);
});

function updateNumberRefresh() {
	rangeSteps();
	document.getElementById("numberRefresh").value = document.getElementById("rangeRefresh").value;
	refreshValue = document.getElementById("rangeRefresh").value;
	updateMinutes();
}

function rangeSteps() {
	if (document.getElementById("rangeRefresh").value <= 1) {
		document.getElementById("rangeRefresh").step = 0.1;
	} else {
		document.getElementById("rangeRefresh").step = 1;
	}
	if (document.getElementById("rangeRefresh").value < 0.5) {
		document.getElementById("rangeRefresh").value = 0.5;
	}
}

function updateRangeRefresh() {
	if (document.getElementById("numberRefresh").value >= 1) {
		document.getElementById("numberRefresh").step = 1.0;
		document.getElementById("numberRefresh").min = 0;
	} else {
		document.getElementById("numberRefresh").step = 0.1;
		document.getElementById("numberRefresh").min = 0.5;
	}

	if (document.getElementById("numberRefresh").value > 60) {
		document.getElementById("numberRefresh").value = 60;
	} else if (document.getElementById("numberRefresh").value < 0.5) {
		document.getElementById("numberRefresh").value = 0.5;
	}

	document.getElementById("rangeRefresh").value = document.getElementById("numberRefresh").value;
	refreshValue = document.getElementById("numberRefresh").value;
	updateMinutes();
}

function updateMinutes() {
	if (document.getElementById("numberRefresh").value > 1) {
		document.getElementById("minuteAmount").innerHTML = "minutes";
	} else if (document.getElementById("numberRefresh").value == 1) {
		document.getElementById("minuteAmount").innerHTML = "minute";
	} else if (document.getElementById("numberRefresh").value <= 1) {
		document.getElementById("minuteAmount").innerHTML = "minutes";
	}
}

function resetSettings() {
	if (confirm("Reset to default settings?")) {
		document.getElementById("numberRefresh").value = 5;
		document.getElementById("rangeRefresh").value = 5;
		document.getElementById("disableTDM").checked = false;
		// document.getElementById('specificDrops').checked = false;
		document.getElementById("extendSearchTime").checked = false;
		//document.getElementById('hintText').checked = false;
		document.getElementById("showTime").checked = true;
		document.getElementById("hideButtons").checked = false;
		//document.getElementById('hideChannels').value = "";
		document.getElementById("autoClaim").checked = true;
		chrome.storage.sync.set({
			hideDropsList: [],
		});
		save_options();
		document.getElementById("minuteAmount").innerHTML = "minutes";
	}
}

function resetDrops() {
	if (confirm("Reset hidden drops?")) {
		chrome.storage.sync.set({
			hideDropsList: [],
		});
		var dropsStatus = document.getElementById("dropsStatus");
		dropsStatus.style.opacity = "100%";
		setTimeout(function () {
			dropsStatus.style.opacity = "0%";
		}, 2700);
	}
}
