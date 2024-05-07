(function () {
    var refreshTime
    var disableTDM
    var extendSearch
    //var showHintText
    var showTimeIn
    var hideButtonsDefault
    //var hideChannelsList
    var hiddenDrops
    var autoClaimValue

    //Haetaan asetukset
    chrome.storage.sync.get({
        refreshTime: 1,
        refreshRange: 1,
        disableTDM: false,
        extendSearchTime: false,
        //hintText: true,
        showTime: true,
        autoClaim: true,
        hideButtons: false,
        //hideChannels: "",
        hideDropsList: []
    }, function (items) {
        refreshTime = items.refreshTime;
        disableTDM = items.disableTDM;
        extendSearch = items.extendSearchTime;
        autoClaimValue = items.autoClaim;
        //showHintText = items.hintText;
        showTimeIn = items.showTime;
        hideButtonsDefault = items.hideButtons;
        //hideChannelsList = items.hideChannels;
        hiddenDrops = items.hideDropsList;
    });

    let getOptions = setInterval(function () {
        if (refreshTime != undefined && disableTDM == false) { //katotaa onko asetukset ladannu
            refreshTime = refreshTime * 60000 //Muunnetaan minuuteiksi

            let settingsCount = 0
            let addSettings = setInterval(() => {
                if (document.querySelector(".sc-AxjAm.jRwVsy")) {
                    let settingsDiv = document.querySelector(".sc-AxjAm.jRwVsy")
                    let settingsButton = document.createElement("div")
                    let settingsButtonSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    settingsButtonSVG.setAttribute("aria-hidden", "true");
                    settingsButtonSVG.setAttribute('viewBox', '0 0 180.24 188.4');
                    settingsButtonSVG.setAttribute('width', '18px');
                    settingsButtonSVG.setAttribute('height', '18px');
                    settingsButtonSVG.setAttribute('position', 'relative');
                    settingsButtonSVG.setAttribute('float', 'left');

                    var path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
                    path.setAttribute('d', "M180.24,0c0,38.32,0,76.64,0,114.96c-12.4,12.32-24.8,24.64-37.2,36.96c-3.84,3.92-7.68,7.84-11.52,11.76c-1.73,0.94-6.13,0.24-8.4,0.24c-6.88,0-13.76,0-20.64,0c-2.21,0-7.32-0.39-7.92,0c-2.25,0.82-4.14,3.9-5.76,5.52c-4.48,4.4-8.96,8.8-13.44,13.2c-1.84,1.92-3.68,3.84-5.52,5.76c-8.24,0-16.48,0-24.72,0c0-8.24,0-16.48,0-24.72c-0.08,0-0.16,0-0.24,0c-1.41,0.81-9.53,0.24-12.48,0.24c-10.64,0-21.28,0-31.92,0c-1.06-3.22-0.24-8.74-0.24-12.48c0-9.2,0-18.4,0-27.6c0-30.48,0-60.96,0-91.44C4.32,21.6,8.4,10.8,12.48,0C68.39,0,124.33,0,180.24,0L180.24,0z M28.8,16.56c0,10.32,0,20.64,0,30.96c3.09,1.02,11.67,0.24,15.6,0.24c11.52,0,23.04,0,34.56,0c-0.09,7.18-0.5,14.08,3.6,17.04c4.21,3.04,14.08,1.92,21.12,1.92c3.84,0,7.18-0.03,9.6-1.44c4.68-2.73,4.17-9.98,4.08-17.52c15.44,0,30.88,0,46.32,0c0.83-2.51,0.24-6.85,0.24-9.84c0-7.12,0-14.24,0-21.36C118.88,16.56,73.84,16.56,28.8,16.56L28.8,16.56z M28.8,66.72c0,22.72,0,45.44,0,68.16c2.96,0.98,8.06,0.24,11.52,0.24c8.48,0,16.96,0,25.44,0c0,8.08,0,16.16,0,24.24c0.08,0,0.16,0,0.24,0c8-8.08,16-16.16,24-24.24c15.12,0,30.24,0,45.36,0c1.11-1.67,2.92-2.92,4.32-4.32c3.28-3.28,6.56-6.56,9.84-9.84c3.36-3.36,6.72-6.72,10.08-10.08c1.4-1.4,2.65-3.21,4.32-4.32c0-13.28,0-26.56,0-39.84c-6.32,0-12.64,0-18.96,0c-3.26,0-7.22-0.31-10.08,0.24c-0.56,3.76-3.39,6.38-5.28,8.88c-6.67,8.84-16.13,10.32-31.68,10.32c-9.28,0-17.54-0.11-23.28-3.6c-3.73-2.27-7.44-5.28-9.84-8.88c-0.58-0.88-3.16-6.72-3.6-6.96C50.4,66.72,39.6,66.72,28.8,66.72L28.8,66.72z");
                    path.setAttribute('fill', '#9B67E9');

                    settingsButtonSVG.appendChild(path);
                    settingsButton.append(settingsButtonSVG)

                    settingsButton.style.marginRight = "10px"
                    settingsButton.style.marginTop = "3px"

                    //settingsButton.style.marginBottom = "-4px"
                    //settingsButton.style.color = "#9B67E9"

                    let clickSettings = document.createElement("div")
                        clickSettings.style.width = "18px"
                        clickSettings.style.height = "18px"
                        clickSettings.style.position = "absolute"
                        settingsButton.prepend(clickSettings)

                    settingsButton.addEventListener("mouseover", function (event) {
                        event.target.style.cursor = "pointer";
                    }, false);

                    settingsButton.addEventListener("mouseout", function (event) {
                        event.target.style.cursor = "default";
                    }, false);

                    settingsButton.onclick = openSettings

                    function openSettings() {
                        chrome.runtime.sendMessage({
                                message: 'buttonClicked'
                            },
                            function () {})
                    }
                    settingsDiv.prepend(settingsButton)
                    clearInterval(addSettings)
                } else if (settingsCount > 500) {
                    clearInterval(addSettings)
                } else {
                    settingsCount += 1
                }
            }, 100);

            start()
            clearInterval(getOptions)
        } else if (disableTDM == true) {
            console.log('%c !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ', 'background: #ff0000; color: #fff')
            console.log('%c Twitch Drops Manager is disabled from the settings ', 'background: #a970ff; color: #fff')
            console.log('%c !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ', 'background: #ff0000; color: #fff')
            clearInterval(getOptions)
        }
    }, 100);

    function start() {
        console.log("STARTED")
        let loadingImg = undefined
        let buttonsDiv = undefined
        let iframe = undefined
        let containerDiv = undefined
        let hideDropsButton = undefined
        let reloadButton = undefined
        let aboutContainer = undefined
        let dropContainer = undefined
        let dropElement = undefined
        let dropChannelName = "⁣"
        let removeDropsButton = undefined
        let dropsPageButton = undefined
        let dropLink = undefined
        let foundIDs = []
        let errorMessage = undefined
        let errorText = "An error occurred.  " + "<a href='javascript:void(0)' style='color: red'><u>REFRESH</u></a>"
        let noDrops = false
        let dropsShown = undefined

        checkForAbout()

        function checkForAbout() {
            console.log("ABOUT")
            let counter = 0
            let maxCount = 150
            if (extendSearch == true) {
                maxCount = 500
            }

            let aboutInterval = setInterval(() => {
                aboutContainer = document.getElementsByClassName("hHdHvp")
                if (aboutContainer.length > 0 && counter < maxCount) {
                    createGUI()
                    clearInterval(aboutInterval)
                } else if (counter >= maxCount) { //KUINKA MONTA SEKUNTTII ENNENKU TULEE ERROR, 30 sekunttia
                    console.log("%c TDM ERROR || Couldn't find page elements", 'background: #ff0000; color: #fff')
                    clearInterval(aboutInterval)
                } else {
                    counter += 1
                }
            }, 200);
        }

        function createGUI() {
            console.log("GUI")

            containerDiv = document.createElement("div")
            containerDiv.style.width = "100%"
            containerDiv.style.height = "270px"
            containerDiv.style.position = "relative"
            containerDiv.className = "TDMDiv"
            aboutContainer[0].appendChild(containerDiv)

            buttonsDiv = document.createElement("div")
            hideDropsButton = document.createElement("a")
            dropsPageButton = document.createElement("a")
            dropsPageButton.href = "https://www.twitch.tv/drops/inventory"
            dropsPageButton.target = "_blank"
            dropsPageButton.innerHTML = "Drops page"

            hideDropsButton.href = "javascript:void(0)"
            hideDropsButton.innerHTML = "Hide drops"
            hideDropsButton.style.marginRight = "15px"
            hideDropsButton.style.marginLeft = "30px"

            hideDropsButton.addEventListener("click", function (e) {
                if (hideDropsButton.innerHTML == "Hide drops") {
                    hideDrops()
                } else {
                    showDrops()
                }
            })

            if (hideButtonsDefault == true) {
                hideDrops()
            } else {
                dropsShown = true
            }
            reloadButton = document.createElement("div")

            let reloadButtonSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            reloadButtonSVG.setAttribute("aria-hidden", "true");
            reloadButtonSVG.setAttribute('viewBox', '0 0 32 32');
            reloadButtonSVG.setAttribute('width', '16px');
            reloadButtonSVG.setAttribute('height', '16px');
            reloadButtonSVG.setAttribute('float', 'left');
            reloadButtonSVG.setAttribute('position', 'relative');


            var reloadPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
            reloadPath.setAttribute('d', "M 16 4 C 10.886719 4 6.617188 7.160156 4.875 11.625 L 6.71875 12.375 C 8.175781 8.640625 11.710938 6 16 6 C 19.242188 6 22.132813 7.589844 23.9375 10 L 20 10 L 20 12 L 27 12 L 27 5 L 25 5 L 25 8.09375 C 22.808594 5.582031 19.570313 4 16 4 Z M 25.28125 19.625 C 23.824219 23.359375 20.289063 26 16 26 C 12.722656 26 9.84375 24.386719 8.03125 22 L 12 22 L 12 20 L 5 20 L 5 27 L 7 27 L 7 23.90625 C 9.1875 26.386719 12.394531 28 16 28 C 21.113281 28 25.382813 24.839844 27.125 20.375 Z ");
            reloadPath.setAttribute('fill', '#9B67E9');

            reloadButtonSVG.appendChild(reloadPath);
            reloadButton.append(reloadButtonSVG)
            reloadButton.style.height = "16px"
            reloadButton.style.width = "16px"
            reloadButton.style.marginLeft = "14px"
            reloadButton.style.display = "inline-block"
            reloadButton.style.verticalAlign = "middle"

            let clickRefresh = document.createElement("div")
            clickRefresh.style.width = "16px"
            clickRefresh.style.height = "16px"
            clickRefresh.style.position = "absolute"
            reloadButton.prepend(clickRefresh)

            reloadButton.addEventListener("mouseover", function (event) {
                event.target.style.cursor = "pointer";
            }, false);

            reloadButton.addEventListener("mouseout", function (event) {
                event.target.style.cursor = "default";
            }, false);

            reloadButton.onclick = reloadAndShow

            function reloadAndShow() {
                showDrops()
                containerDiv.appendChild(loadingImg)
                reloadIframe()
            }

            buttonsDiv.appendChild(hideDropsButton)
            buttonsDiv.appendChild(dropsPageButton)
            buttonsDiv.appendChild(reloadButton)

            containerDiv.appendChild(buttonsDiv)

            loadingImg = document.createElement("img")
            loadingImg.style.width = "auto"
            loadingImg.style.height = "85%"
            if (window.getComputedStyle(document.querySelector(".fwsYSr.tw-title")).color == "rgb(239, 239, 241)") {
                loadingImg.src = "https://i.imgur.com/U0NTzcR.gif"
            } else {
                loadingImg.src = "https://i.imgur.com/zsUrjoy.gif"
            }
            loadingImg.style.position = "absolute"
            loadingImg.style.top = "50%"
            loadingImg.style.left = "50%"
            loadingImg.style.transform = "translate(-50%, -50%)"
            loadingImg.style.opacity = "1"
            loadingImg.style.transition = "0.4s"
            if (hideButtonsDefault == false) {
                containerDiv.appendChild(loadingImg) //LISÄTÄÄN LATAUS RUUTU
            }
            createIframe()
        }

        function createIframe() {
            console.log("IFRAME")

            iframe = document.createElement("iframe")
            iframe.domain = "twitch.tv"
            iframe.src = "https://www.twitch.tv/drops/inventory"
            iframe.style.width = "100%"
            iframe.style.height = "0px"
            iframe.style.position = "relative"
            iframe.style.transition = "1s"
            iframe.style.transitionTimingFunction = "ease-in-out"
            iframe.style.opacity = "0"
            iframe.className = "TDMIframe"
            containerDiv.appendChild(iframe)

            let counter = 0
            let cleared = false
            let dropInterval = setInterval(() => {
                if (iframe.contentWindow.document.getElementsByClassName("dMuSkD")) {
                    dropContainer = iframe.contentWindow.document.getElementsByClassName("dMuSkD")
                    let maxCounter = 50
                    if (extendSearch == true) {
                        maxCounter = 500
                    }
                    if (dropContainer.length > 0 && counter < maxCounter && cleared == false) {
                        for (i = 0; i < dropContainer.length; i++) {
                            iframe.contentWindow.document.querySelector(".gelSNc").style.marginTop = "-30px"
                            iframe.contentWindow.document.querySelector(".gelSNc").style.display = "flex"
                            iframe.contentWindow.document.querySelector(".gelSNc").style.flexDirection = "row"
                            iframe.contentWindow.document.querySelector(".gelSNc").style.flexWrap = "wrap"
                            iframe.contentWindow.document.querySelector(".gelSNc").prepend(dropContainer[i])
                        }
                        let invPage = iframe.contentWindow.document.querySelector(".inventory-page")
                        let sideNav = iframe.contentWindow.document.querySelector("#sideNav")
                        let topNav = iframe.contentWindow.document.querySelector(".top-nav")
                        let header = iframe.contentWindow.document.querySelector("#twilight-sticky-header-root")
                        let root = iframe.contentWindow.document.querySelector(".kZPAIb")

                        counter = 0
                        let removeElements = setInterval(() => {
                            if (invPage && sideNav && topNav && header && root && counter < maxCounter) { // 10 sekkaa invPage && sideNav && topNav && header && root && counter < 50
                                invPage.remove()
                                sideNav.remove()
                                topNav.remove()
                                header.remove()
                                //root.prepend(buttonsDiv)
                                //buttonsDiv.append(hideDropsButton)
                                //buttonsDiv.append(dropsPageButton)
                                clearInterval(removeElements)
                                clearInterval(dropInterval)
                                getDrops()
                            } else if (counter >= maxCounter) { // counter >= 50
                                clearInterval(removeElements)
                                clearInterval(dropInterval)
                                errorText = "An error occurred while trying to load drops.  " + "<a href='javascript:void(0)' style='color:" + window.getComputedStyle(document.querySelector(".fwsYSr.tw-title")).color + "'><u>REFRESH</u></a>"
                                errorRefresh()
                            } else {
                                counter += 1
                            }
                        }, 200);

                        cleared = true

                    } else if (counter >= maxCounter) { //counter >= 50
                        clearInterval(dropInterval)
                        errorText = "No available drops found.  " + "<a href='javascript:void(0)' style='color:" + window.getComputedStyle(document.querySelector(".fwsYSr.tw-title")).color + "'><u>REFRESH</u></a>"
                        noDrops = true
                        errorRefresh()
                    } else {
                        counter += 1
                    }
                }
            }, 200);
        }

        function getDrops() {
            console.log("DROPS")

            for (i = 0; i < dropContainer.length; i++) {
                dropElement = dropContainer[i].getElementsByClassName("jfqeCv")
                for (j = 0; j < dropElement.length; j++) {
                    if (dropElement[j].getElementsByClassName("cjzcPL").length > 0 || dropElement[j].getElementsByClassName("fDLYZL").length > 0) {
                        let dropChannel = dropContainer[i].getElementsByClassName("ScCoreLink-udwpw5-0 FXIKh tw-link")[1]
                        if (dropChannel.innerText == "a participating live channel") { //JOS ON PELI
                            dropChannelName = dropChannel.href.split('game/').pop().split('?')[0]
                            fixName()
                        } else if (dropChannel.innerText.length != 0) { //JOS ON KANAVA
                            dropChannelName = dropChannel.href.split('/').pop()
                        }

                        dropLink = iframe.contentWindow.document.createElement("a")
                        dropLink.href = dropChannel.href
                        dropLink.innerHTML = dropChannelName
                        dropLink.target = "_blank"
                        dropLink.style.textAlign = "center"
                        dropLink.style.marginBottom = "3px"
                        dropLink.style.color = window.getComputedStyle(dropElement[j]).color
                        dropElement[j].prepend(dropLink)

                        dropElement[j].style.height = "240px"
                        dropElement[j].style.width = "160px"
                        dropElement[j].style.marginRight = "10px"
                        dropElement[j].style.order = 0 //MUOKKAA TÄTÄ JOS HALUU SORTTAA

                        if (dropElement[j].getElementsByClassName("fDLYZL").length > 0) { //JOS ON CLAIMATTAVISSA LISÄÄ EKAKS
                            dropElement[j].style.order = -9999999

                            if (dropElement[j].querySelector(".jMWlGV")) {
                                dropElement[j].querySelector(".jMWlGV").addEventListener("click", function (e) {
                                    if (dropElement[j]) {
                                        dropElement[j].remove()
                                    }
                                    reloadIframe()
                                })
                            }
                        }

                        let dropID = dropElement[j].querySelector("img").src
                        dropID = dropID.split('BENEFIT-').pop().split('.')[0]
                        if (foundIDs.includes(dropID)) {
                            changeID()
                        }

                        function changeID() {
                            dropID += "new"
                            if (foundIDs.includes(dropID)) {
                                changeID()
                            }
                        }

                        foundIDs.push(dropID)
                        dropElement[j].id = dropID

                        //REMOVE DROP
                        removeDropsButton = iframe.contentWindow.document.createElement("a")
                        removeDropsButton.href = "javascript:void(0)"
                        removeDropsButton.innerHTML = "X"
                        removeDropsButton.style.position = "absolute"
                        removeDropsButton.style.fontWeight = "900"
                        removeDropsButton.style.top = "5px"
                        removeDropsButton.style.right = "7px"
                        removeDropsButton.style.zIndex = "10"
                        removeDropsButton.style.color = window.getComputedStyle(dropElement[j]).color
                        removeDropsButton.style.textDecoration = "none"
                        removeDropsButton.style.transition = "0.4s"
                        removeDropsButton.style.opacity = "0.3"

                        removeDropsButton.addEventListener("mouseover", function (e) {
                            e.target.style.opacity = "1.0"
                            e.target.style.boxShadow = "0px 0px 0px 500px rgba(255, 60, 60, 0.4)"
                            e.target.style.backgroundColor = "rgba(255, 60, 60, 0.4)"
                        })

                        removeDropsButton.addEventListener("mouseout", function (e) {
                            e.target.style.opacity = "0.3"
                            e.target.style.boxShadow = "0px 0px 0px 500px rgba(255, 60, 60, 0)"
                            e.target.style.backgroundColor = "transparent"
                        })

                        removeDropsButton.addEventListener("click", function (e) {
                            hiddenDrops.push(dropID)
                            chrome.storage.sync.set({
                                hideDropsList: hiddenDrops
                            })
                            iframe.contentWindow.document.getElementById(dropID).remove()
                            checkIfIfameHasDrops()
                        })
                        dropElement[j].querySelector(".bIviRh").append(removeDropsButton)

                        if (dropElement[j].getElementsByClassName("fDLYZL").length < 1) { //JOS EI OO CLAIMABLE LISÄÄ AIKA
                            let timeLeft = dropElement[j].querySelector(".dEPHbs").innerText
                            let timePercent = timeLeft.split('%')[0]
                            let finalTime = undefined
                            let sortTime = undefined

                            if (timeLeft.includes("hour") == false && timeLeft.includes("minute") == true) {
                                let timeMinutes = timeLeft.split('of ').pop().split(' m')[0]
                                finalTime = Math.ceil(parseInt(timeMinutes - timeMinutes * timePercent / 100)) + " min (" + timePercent + "%)"
                                sortTime = Math.ceil(parseInt(timeMinutes - timeMinutes * timePercent / 100))
                            } else if (timeLeft.includes("hour") == true && timeLeft.includes("minute") == false) {
                                let timeHours = parseInt(timeLeft.split('of ').pop().split(' h')[0]) * 60
                                finalTime = Math.ceil(parseInt(timeHours - timeHours * timePercent / 100))
                                sortTime = finalTime
                                if (finalTime <= 60) {
                                    finalTime = finalTime + " min (" + timePercent + "%)"
                                } else {
                                    let getHours = Math.trunc(finalTime / 60)
                                    let getMinutes = finalTime % 60
                                    finalTime = getHours + "h " + getMinutes + "min (" + timePercent + "%)"
                                }
                            } else if (timeLeft.includes("hour") == true && timeLeft.includes("minute") == true) {
                                let hours = parseInt(timeLeft.split(' ')[2] * 60)
                                let mins = parseInt(timeLeft.split(' ')[4])
                                finalTime = hours + mins
                                sortTime = finalTime
                                let getHours = Math.trunc(finalTime / 60)
                                let getMinutes = finalTime % 60
                                finalTime = getHours + "h " + getMinutes + "min (" + timePercent + "%)"
                            }

                            if (showTimeIn == true) {
                                dropElement[j].querySelector(".dEPHbs").innerText = finalTime
                            }
                            dropElement[j].classList.add("TDMDropSort")
                            dropElement[j].classList.add(sortTime)
                        }

                        if (autoClaimValue == true && dropElement[j].getElementsByClassName("fDLYZL").length > 0) { //AUTOCLAIMERI
                            dropElement[j].querySelector(".jMWlGV").click()
                            setTimeout(() => {
                                if (dropElement[j]) {
                                    dropElement[j].remove()
                                }
                            }, 1000);

                        } else if (!hiddenDrops.includes(dropID)) { //JOS EI OO POISTETTU
                            iframe.contentWindow.document.querySelector(".gelSNc").prepend(dropElement[j]) //LISÄTÄÄN DROPPI
                            j -= 1
                        }

                    } else {
                        dropElement[j].remove()
                        j -= 1
                    }
                }
                dropContainer[i].remove()
                i -= 1
            }

            //if sort enabled
            sortDrops()

            iframe.style.opacity = "1"
            iframe.style.height = "12px"
            if (hideButtonsDefault == false || hideButtonsDefault == true && dropsShown == true) {
                iframe.style.width = "100%"
                iframe.style.height = "270px"
            }

            if (loadingImg) {
                loadingImg.style.opacity = "0"
                setTimeout(() => {
                    loadingImg.remove() //POISTETAAN LATAUS RUUTU
                }, 1200);
            }

            if (document.getElementsByClassName("TDMIframe").length > 1) {
                iframe.style.transition = "0s"
                document.getElementsByClassName("TDMIframe")[0].remove()
            }

            checkIfIfameHasDrops()
        }

        let reloadInterval = setInterval(() => {
            reloadIframe()
        }, refreshTime); //refreshTime

        function fixName() {
            dropChannelName = dropChannelName.split('%20').join(' ')
            dropChannelName = dropChannelName.split('%3A').join(':')
            dropChannelName = dropChannelName.split('%26').join('&')
            dropChannelName = dropChannelName.split('%7C').join('|')

            if (dropChannelName == "Tom Clancy's Rainbow Six Siege") {
                dropChannelName = "Rainbow Six Siege"
            } else if (dropChannelName == "Call of Duty: Black Ops Cold War") {
                dropChannelName = "Black Ops Cold War"
            } else if (dropChannelName == "Call of Duty: Warzone") {
                dropChannelName = "Call of Duty: Warzone"
            } else if (dropChannelName == "Call Of Duty: Modern Warfare") {
                dropChannelName = "Modern Warfare"
            } else if (dropChannelName == "PLAYERUNKNOWN'S BATTLEGROUNDS") {
                dropChannelName = "PUBG"
            } else if (dropChannelName == "Monster Hunter: World") {
                dropChannelName = "Monster Hunter: World"
            } else if (dropChannelName == "Counter-Strike: Global Offensive") {
                dropChannelName = "CS:GO"
            } else if (dropChannelName == "Fall Guys: Ultimate Knockout") {
                dropChannelName = "Fall Guys"
            } else if (dropChannelName == "Don't Starve Together") {
                dropChannelName = "Don't Starve Together"
            } else if (dropChannelName.length > 20) {
                dropChannelName = dropChannelName.slice(0, 20) + "..."
            }
        }

        function hideDrops() {
            hideDropsButton.innerHTML = "Show drops"
            hideDropsButton.style.marginRight = "9.5px"
            containerDiv.style.height = "12px"
            containerDiv.style.transition = "0.4s"
            if (iframe) {
                iframe.style.height = "0px"
                iframe.style.transition = "0.4s"
            }
            if (loadingImg && loadingImg.style.opacity == "1") {
                loadingImg.style.opacity = "0"
            }
            dropsShown = false
        }

        function showDrops() {
            hideDropsButton.innerHTML = "Hide drops"
            hideDropsButton.style.marginRight = "15px"
            containerDiv.style.height = "270px"
            containerDiv.style.transition = "0.4s"
            if (iframe) {
                iframe.style.height = "270px"
                iframe.style.transition = "0.4s"
            }
            if (loadingImg && loadingImg.style.opacity == "0") {
                loadingImg.style.opacity = "1"
            }
            dropsShown = true
        }

        function reloadIframe() {
            console.log("RELOADING")
            console.log("RELOADING")
            console.log("RELOADING")
            console.log("RELOADING")
            foundIDs = []
            createIframe()
        }

        function errorRefresh() {
            if (loadingImg !== undefined) {
                loadingImg.remove()
            }
            errorMessage = document.createElement("p")
            if (noDrops == false) {
                errorMessage.style.color = "#FF3537"
            } else {
                errorMessage.style.color = window.getComputedStyle(document.querySelector(".fwsYSr.tw-title")).color
                noDrops = false
            }
            errorMessage.style.fontWeight = "700"
            errorMessage.style.marginLeft = "30px"
            errorMessage.innerHTML = errorText
            buttonsDiv.prepend(errorMessage)
            hideDropsButton.remove()
            dropsPageButton.remove()
            reloadButton.remove()
            containerDiv.style.height = "15px"

            clearInterval(reloadInterval)

            errorMessage.addEventListener("click", function (e) {
                iframe.remove()
                containerDiv.remove()
                //error = false
                start()
            })
        }

        function checkIfIfameHasDrops() {
            if (iframe.contentWindow.document.getElementsByClassName("fDLYZL").length < 1 && iframe.contentWindow.document.getElementsByClassName("cjzcPL").length < 1) {
                errorText = "No available drops found.  " + "<a href='javascript:void(0)' style='color:" + window.getComputedStyle(document.querySelector(".fwsYSr.tw-title")).color + "'><u>REFRESH</u></a>"
                noDrops = true
                errorRefresh()
            }
        }

        function sortDrops() {
            let sortArray = []
            if (iframe.contentWindow.document.getElementsByClassName("TDMDropSort")) {
                let sortableDrops = iframe.contentWindow.document.getElementsByClassName("TDMDropSort")
                for (i = 0; sortableDrops.length > i; i++) {
                    sortArray.push(sortableDrops[i].classList[sortableDrops[i].classList.length - 1])
                }
                sortArray.sort(function (a, b) {
                    return a - b
                })

                for (j = 0; sortArray.length > j; j++) {
                    for (x = 0; x < sortableDrops.length;) {
                        if (sortableDrops[x].classList[sortableDrops[x].classList.length - 1] == sortArray[j]) {
                            sortableDrops[x].style.order = j
                            x = sortableDrops.length + 2
                        } else {
                            x += 1
                        }
                    }
                }
            }
        }

        chrome.runtime.onMessage.addListener(
            function (request, sender, sendResponse) {
                if (request.message === 'newURL') {
                    console.log("NEW URL")
                    clearInterval(reloadInterval)

                    console.log("DIVS: " + document.getElementsByClassName("TDMDiv").length)

                    if(document.getElementsByClassName("TDMDiv").length > 0){
                        for(i=0;i < document.getElementsByClassName("TDMDiv").length; i++){
                            document.getElementsByClassName("TDMDiv")[i].remove()
                            console.log("REMOVING: " + document.getElementsByClassName("TDMDiv").length)
                        }
                    }
                    // if(document.getElementsByClassName("TDMIframe").length > 0){
                    //     for(i=0;i < document.getElementsByClassName("TDMIframe").length; i++){
                    //         document.getElementsByClassName("TDMIframe")[i].remove()
                    //     }
                    // }
                    start()
                }
            }
        )
    }
})();