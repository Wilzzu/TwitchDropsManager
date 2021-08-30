(function () {

    

    //Asetukset variablet
    var refreshTime
    var disableTDM
    // var specificChannel
    var hideClaimableButton
    var showHintText
    var showTimeIn
    var hideButtonsDefault
    var hideChannelsList

    //Haetaan asetukset
    chrome.storage.sync.get({
        refreshTime: 1,
        refreshRange: 1,
        disableTDM: false,
        // specificDrops: false,
        hideClaimable: false,
        hintText: true,
        showTime: true,
        hideButtons: false,
        hideChannels: ""
    }, function (items) {
        refreshTime = items.refreshTime;
        disableTDM = items.disableTDM;
        // specificChannel = items.specificDrops;
        hideClaimableButton = items.hideClaimable;
        showHintText = items.hintText;
        showTimeIn = items.showTime;
        hideButtonsDefault = items.hideButtons;
        hideChannelsList = items.hideChannels;
    });

    let getOptions = setInterval(function () {
        if (refreshTime != undefined) { //katotaa onko asetukset ladannu
            refreshTime = refreshTime * 60000 //Muunnetaan minuuteiksi
            start()
            clearInterval(getOptions); //Lopetetaa toisto
        }
    }, 100);

    function reloadIframe() { //Päivitetää minuuti välein
        ifrm.style.visibility = "hidden"
        ifrm.contentWindow.location.reload();
        checkIframeDrops();
    }

    let foundDrops = 0
    let dropName = ""
    let lastGame = ""
    let lastGameLink = ""
    let lastColor = "white"

    function takeDrops() {

        for (j = 0; j < availableDropsContainers.length; j++) {

            let availableDrops = availableDropsContainers[j].getElementsByClassName("tw-flex tw-flex-column tw-mg-t-2")

            for (i = 0; i < availableDrops.length; i++) { //Chekkaa monta containerii on ja käy jokase läpi

                if (availableDrops[i].querySelector('[data-test-selector]').classList.contains("tw-visible") == true){
                    let dropID = availableDrops[i].querySelector("img").src
                    console.log(dropID)
                    dropID = dropID.split('BENEFIT-').pop().split('.')[0]
                    console.log(dropID)
                    console.log(dropID)
                    console.log(dropID)
                    console.log(dropID)

                    if (hideDropList.split(", ").indexOf(dropID) == -1){
                    
                    availableDrops[i].style.margin = "0" //Muokataan dropin ulkonäköä          
                    availableDrops[i].style.marginRight = "15px"
                    availableDrops[i].style.height = "245px"
                    availableDrops[i].style.width = "160px" //160px
                    availableDrops[i].id = dropID
                    let timeLeftDiv = availableDrops[i].querySelector("div.tw-align-center.tw-mg-t-05")
                    let timeLeft = timeLeftDiv.innerText
                    if (timeLeft.includes("hour") == true && timeLeft.includes("minute") == true) { //TEE LOPPUUN

                        let percentageDone = timeLeft.split('%')[0]
                        let totalTimeWithHours = timeLeft.split('of ')[1]
                        let totalTime = totalTimeWithHours.split(' ')[0];
                        let percentNumber = (100 - parseInt(percentageDone)) / 100
                        let timeNumber = parseInt(totalTime) * 60

                        let totalTimeLeft = Math.ceil(percentNumber * timeNumber)

                        if (showTimeIn == true) {

                            if (totalTimeLeft == 1) {
                                timeLeftDiv.innerHTML = "1 min (99%)"
                            } else if (totalTimeLeft > 1 && totalTimeLeft < 60) {
                                timeLeftDiv.innerHTML = totalTimeLeft + " min (" + percentageDone + "%)"
                            } else if (totalTimeLeft >= 60) {
                                let getHours = Math.trunc(totalTimeLeft / 60)
                                let getMinutes = totalTimeLeft % 60

                                timeLeftDiv.innerHTML = getHours + "h " + getMinutes + "min (" + percentageDone + "%)"
                            }
                        }
                    }
                    else if (timeLeft.includes("hour") == true && timeLeft.includes("minute") == false) {

                        let percentageDone = timeLeft.split('%')[0]
                        let totalTimeWithHours = timeLeft.split('of ')[1]
                        let totalTime = totalTimeWithHours.split(' ')[0];
                        let percentNumber = (100 - parseInt(percentageDone)) / 100
                        let timeNumber = parseInt(totalTime) * 60

                        let totalTimeLeft = Math.ceil(percentNumber * timeNumber)

                        if (showTimeIn == true) {

                            if (totalTimeLeft == 1) {
                                timeLeftDiv.innerHTML = "1 min (99%)"
                            } else if (totalTimeLeft > 1 && totalTimeLeft < 60) {
                                timeLeftDiv.innerHTML = totalTimeLeft + " min (" + percentageDone + "%)"
                            } else if (totalTimeLeft >= 60) {
                                let getHours = Math.trunc(totalTimeLeft / 60)
                                let getMinutes = totalTimeLeft % 60

                                timeLeftDiv.innerHTML = getHours + "h " + getMinutes + "min (" + percentageDone + "%)"
                            }
                        }
                    }
                    else if (timeLeft.includes("hour") == false && timeLeft.includes("minute") == true) {

                        console.log("TIMELEFT: " + timeLeft)
                        let percentageDone = timeLeft.split('%')[0]
                        console.log("PERCENTAGE DONE: " + percentageDone)
                        let totalTimeMinutes = timeLeft.split('of ')[1]
                        console.log("totalTimeMinutes: " + totalTimeMinutes)
                        let totalTime = totalTimeMinutes.split(' ')[0];
                        console.log("totalTime: " + totalTime)
                        let percentNumber = (100 - parseInt(percentageDone)) / 100
                        console.log("percentNumber: " + percentNumber)
                        let timeNumber = parseInt(totalTime)
                        console.log("timeNumber: " + timeNumber)

                        let totalTimeLeft = Math.ceil(percentNumber * timeNumber)
                        console.log("totalTimeLeft: " + totalTimeLeft)

                        if (showTimeIn == true) {

                            if (totalTimeLeft == 1) {
                                timeLeftDiv.innerHTML = "1 min (99%)"
                            } else {
                                timeLeftDiv.innerHTML = totalTimeLeft + " min (" + percentageDone + "%)"
                            } 
                        }
                    }


                    let link = availableDropsContainers[j].querySelector("div.tw-mg-x-1 > div > p > a") //ottaa linkin divin tiedot
                    if (link != null){
                        
                    link.style.textAlign = "center";
                    dropName = availableDrops[i].getElementsByClassName("tw-font-size-5 tw-semibold")[0] //Otetaa dropName tekstin tiedot
                    link.style.color = ifrm.contentWindow.getComputedStyle(dropName, null).getPropertyValue("color") //Vaihetaan linkin väri dropNamen väriseks
                    link.style.paddingBottom = "5px"

                    lastGameLink = link.href
                    lastColor = link.style.color

                    //let test = "https://www.twitch.tv/directory/game/The%20Elder%20Scrolls%20V%3A%20Skyrim?"

                    let gameURL = link.href.split('game/').pop().split('?')[0] //Otetaa pelin linkki jos ei oo striimeri link.href.

                    gameURL = gameURL.split('%20').join(' ')
                    gameURL = gameURL.split('%3A').join(':')
                    gameURL = gameURL.split('%26').join('&')
                    gameURL = gameURL.split('%7C').join('|')

                    if (gameURL == "Tom Clancy's Rainbow Six Siege") {
                        gameURL = "Rainbow Six Siege"
                    } else if (gameURL == "Call of Duty: Black Ops Cold War") {
                        gameURL = "Black Ops Cold War"
                    } else if (gameURL == "Call of Duty: Warzone") {
                        gameURL = "Call of Duty: Warzone"
                    } else if (gameURL == "Call Of Duty: Modern Warfare") {
                        gameURL = "Modern Warfare"
                    } else if (gameURL == "PLAYERUNKNOWN'S BATTLEGROUNDS") {
                        gameURL = "PUBG"
                    } else if (gameURL == "Monster Hunter: World") {
                        gameURL = "Monster Hunter: World"
                    } else if (gameURL == "Counter-Strike: Global Offensive") {
                        gameURL = "CS:GO"
                    } else if (gameURL == "Fall Guys: Ultimate Knockout") {
                        gameURL = "Fall Guys"
                    } else if (gameURL == "Don't Starve Together") {
                        gameURL = "Don't Starve Together"
                    }else if (gameURL.length > 20) {
                        gameURL = gameURL.slice(0, 20)
                        gameURL = gameURL += "..."
                    }

                    if (link.innerHTML == "a participating live channel") {
                        if (gameURL.length > 0) {
                            link.innerHTML = gameURL //Muutetaa teksti pelin nimeks
                            lastGame = gameURL
                        } else {
                            link.innerHTML = "‎" //Jos ei löytyny linkkiä jätetää teksti tyhjäks
                        }
                    }

                    availableDrops[i].prepend(link) //Lisätää linkki dropin yläpuolelle
                }
                else {
                    let nullHref = document.createElement("a")
                                nullHref.target = '_blank';
                                if (lastGame.length > 0) {
                                    nullHref.href = lastGameLink
                                    nullHref.innerHTML = lastGame
                                } else {
                                    nullHref.innerHTML = "‎"
                                }
                                nullHref.style.color = lastColor
                                nullHref.style.textAlign = "center"
                                nullHref.style.marginBottom = "5px"
                                availableDrops[i].prepend(nullHref)
                }
                
                    availableDrops[i].style.cssFloat = "left"

                    removeDropButton = document.createElement("BUTTON");
                    var removeDropButtonText = document.createTextNode("X");
                    removeDropButton.appendChild(removeDropButtonText);
                    removeDropButton.style.outline = "none"
                    removeDropButton.style.color = ifrm.contentWindow.getComputedStyle(dropName, null).getPropertyValue("color")
                    removeDropButton.className = "removeDropButton"
                    removeDropButton.style.backgroundColor = "transparent"
                    removeDropButton.style.position = "absolute"
                    removeDropButton.style.fontWeight = "900"
                    removeDropButton.style.opacity = "0.3"
                    removeDropButton.style.transform = "translate(65px, -45px)"
                    removeDropButton.style.transition = "0.4s"  
                    removeDropButton.style.boxShadow = "0px 0px 0px 500px rgba(255, 200, 200, 0)"


                    removeDropButton.addEventListener("mouseover", function (event) {
                        event.target.style.color = "#ff3333"
                        event.target.style.opacity = "1"
                        event.target.style.boxShadow = "0px 0px 0px 500px rgba(255, 55, 55, 0.3)"
                        event.target.style.backgroundColor = "rgba(255, 55, 55, 0.3)"
                    }, false);
                
                    removeDropButton.addEventListener("mouseout", function (event) {
                        event.target.style.color = ifrm.contentWindow.getComputedStyle(dropName, null).getPropertyValue("color")
                        event.target.style.opacity = "0.3"
                        event.target.style.boxShadow = "0px 0px 0px 500px rgba(255, 200, 200, 0)"
                        event.target.style.backgroundColor = "transparent"

                    
                    }, false);
                
                    removeDropButton.onclick = removeDropFunc
                
                    function removeDropFunc() {
                        hideDropList += dropID + ", "
                        console.log(hideDropList)
                        ifrm.contentWindow.document.getElementById(dropID).remove()
                    }
                    availableDrops[i].querySelector("div.tw-align-items-center.tw-c-background-alt.tw-flex.tw-justify-content-center.tw-pd-2.tw-relative").append(removeDropButton)


                    scrollableContainer.appendChild(availableDrops[i]) //Lisätää koko juttu headerii
                    foundDrops += 1
                }

                } else { //Sama mutta jos on "Claim now" button
                    if (availableDrops[i].querySelector("button") !== null) {
                        if (availableDrops[i].querySelector("button").classList.contains("ScCoreButton-sc-1qn4ixc-0") == true){
                         
                            dropName = availableDrops[i].getElementsByClassName("tw-font-size-5 tw-semibold")[0] //Otetaa dropName tekstin tiedot
                            availableDrops[i].style.margin = "0"
                            availableDrops[i].style.marginRight = "15px"
                            availableDrops[i].style.height = "240px"
                            availableDrops[i].style.width = "160px" //160px
                            let link = availableDropsContainers[j].querySelector("div.tw-mg-x-1 > div > p > a")
                            if (link != null) {
                                link.style.textAlign = "center";
                                let dropName = availableDrops[i].getElementsByClassName("tw-font-size-5 tw-semibold")[0]
                                link.style.color = ifrm.contentWindow.getComputedStyle(dropName, null).getPropertyValue("color")
                                link.style.paddingBottom = "5px"

                                lastGameLink = link.href
                                lastColor = link.style.color


                                let gameURL = link.href.split('game/').pop().split('?')[0]

                                gameURL = gameURL.split('%20').join(' ')
                                gameURL = gameURL.split('%3A').join(':')
                                gameURL = gameURL.split('%26').join('&')
                                gameURL = gameURL.split('%7C').join('|')

                                if (gameURL == "Tom Clancy's Rainbow Six Siege") {
                                    gameURL = "Rainbow Six Siege"
                                } else if (gameURL == "Call of Duty: Black Ops Cold War") {
                                    gameURL = "Black Ops Cold War"
                                } else if (gameURL == "Call of Duty: Warzone") {
                                    gameURL = "Call of Duty: Warzone"
                                } else if (gameURL == "Call Of Duty: Modern Warfare") {
                                    gameURL = "Modern Warfare"
                                } else if (gameURL == "PLAYERUNKNOWN'S BATTLEGROUNDS") {
                                    gameURL = "PUBG"
                                } else if (gameURL == "Monster Hunter: World") {
                                    gameURL = "Monster Hunter: World"
                                } else if (gameURL == "Counter-Strike: Global Offensive") {
                                    gameURL = "CS:GO"
                                } else if (gameURL == "Fall Guys: Ultimate Knockout") {
                                    gameURL = "Fall Guys"
                                } else if (gameURL == "Don't Starve Together") {
                                    gameURL = "Don't Starve Together"
                                } else if (gameURL.length > 20) {
                                    gameURL = gameURL.slice(0, 20)
                                    gameURL = gameURL += "..."
                                }

                                if (link.innerHTML == "a participating live channel") {
                                    if (gameURL.length > 0) {
                                        link.innerHTML = gameURL
                                        lastGame = gameURL
                                    } else {
                                        link.innerHTML = "‎"
                                    }
                                }
                                availableDrops[i].prepend(link)
                            } else {
                                //let nullLink = document.createElement('p')
                                let nullHref = document.createElement("a")
                                nullHref.target = '_blank';
                                if (lastGame.length > 0) {
                                    nullHref.href = lastGameLink
                                    nullHref.innerHTML = lastGame
                                } else {
                                    nullHref.innerHTML = "‎"
                                }
                                nullHref.style.color = lastColor
                                nullHref.style.textAlign = "center"
                                nullHref.style.marginBottom = "5px"
                                availableDrops[i].prepend(nullHref)
                            }


                            removeDropButton = document.createElement("BUTTON");
                    var removeDropButtonText = document.createTextNode("X");
                    removeDropButton.appendChild(removeDropButtonText);
                    removeDropButton.style.outline = "none"
                    removeDropButton.style.color = ifrm.contentWindow.getComputedStyle(dropName, null).getPropertyValue("color")
                    removeDropButton.className = "removeDropButton"
                    removeDropButton.style.backgroundColor = "transparent"
                    removeDropButton.style.position = "absolute"
                    removeDropButton.style.fontWeight = "900"
                    removeDropButton.style.opacity = "0.3"
                    removeDropButton.style.transform = "translate(65px, -45px)"
                    removeDropButton.style.transition = "0.4s"  
                    removeDropButton.style.boxShadow = "0px 0px 0px 500px rgba(255, 200, 200, 0)"


                    removeDropButton.addEventListener("mouseover", function (event) {
                        event.target.style.color = "#ff3333"
                        event.target.style.opacity = "1"
                        event.target.style.boxShadow = "0px 0px 0px 500px rgba(255, 30, 30, 0.5)"
                        event.target.style.backgroundColor = "rgba(255, 30, 30, 0.5)"
                    }, false);
                
                    removeDropButton.addEventListener("mouseout", function (event) {
                        event.target.style.color = ifrm.contentWindow.getComputedStyle(dropName, null).getPropertyValue("color")
                        event.target.style.opacity = "0.3"
                        event.target.style.boxShadow = "0px 0px 0px 500px rgba(255, 200, 200, 0)"
                        event.target.style.backgroundColor = "transparent"

                    
                    }, false);
                
                    removeDropButton.onclick = removeDropFunc
                
                    function removeDropFunc() {
                        hideDropList += dropID + ", "
                        console.log(hideDropList)
                        ifrm.contentWindow.document.getElementById(dropID).remove()
                    }
                    availableDrops[i].querySelector("div.tw-align-items-center.tw-c-background-alt.tw-flex.tw-justify-content-center.tw-pd-2.tw-relative").append(removeDropButton)



                            availableDrops[i].style.cssFloat = "left"
                            scrollableContainer.prepend(availableDrops[i])
                            foundDrops += 1

                        }
                    }
                }
            }

        }
        if (foundDrops == 0) {
            if (showHintText == false) {
                ifrm.height = "50px"

                var specificRefresh = document.createElement("BUTTON");
                specificRefresh.setAttribute("id", "refreshButtonTDM");
                specificRefresh.innerHTML = "Refresh";
                specificRefresh.style.textDecoration = "underline"
                scrollableContainer.prepend(specificRefresh)

                let noDropsDiv = document.createElement('p')
                noDropsDiv.style.marginTop = "10px"
                noDropsDiv.append("No eligible drops found. If this is your first time watching the channel while drops are enabled, it may take couple minutes to register.")
                scrollableContainer.prepend(noDropsDiv)

                ifrm.contentWindow.document.getElementById("refreshButtonTDM").addEventListener("click", function () {
                    reloadIframe()
                })

                ifrm.style.visibility = "visible"
            }
        } else {
            ifrm.height = "275px"
            ifrm.style.visibility = "visible" //Kun kaikki on poistettu (ja dropit lisätty) laitetaa iframe näkyvii
            reloadTime = setTimeout(reloadIframe, refreshTime); //Reload funktio käyttäjän asettaman minuutin välein
        }
    }

    function createIframe() {
        let removeElements = setInterval(function () {
            up0 = ifrm.contentWindow.document.querySelector("div.tw-flex.tw-flex-column.tw-flex-nowrap.tw-full-height > nav")
            up1 = ifrm.contentWindow.document.querySelector("#twilight-sticky-header-root > div");
            up2 = ifrm.contentWindow.document.querySelector("div.tw-flex-grow-1.tw-mg-b-2");
            up3 = ifrm.contentWindow.document.querySelector("div.inventory-max-width > div:nth-child(1)");
            down0 = ifrm.contentWindow.document.querySelector("div.root-scrollable.scrollable-area > div.simplebar-scroll-content > div > div > div > div > div > div > div:nth-child(3)")
            sidenav = ifrm.contentWindow.document.getElementById("sideNav");
            titleDrops = ifrm.contentWindow.document.querySelector("div.title-bar.tw-flex.tw-pd-b-1 > div");
            scroll1 = ifrm.contentWindow.document.querySelector("div.root-scrollable.scrollable-area > div.simplebar-track.vertical")
            dropsBody = ifrm.contentWindow.document.getElementsByTagName("BODY")[0];
            containerit = ifrm.contentWindow.document.querySelector("div.inventory-max-width")
            header = ifrm.contentWindow.document.querySelector("#twilight-sticky-header-root")
            marginEdit = ifrm.contentWindow.document.querySelector("div.root-scrollable.scrollable-area > div.simplebar-scroll-content > div > div > div > div")
            scrollableContainer = ifrm.contentWindow.document.querySelector("div.root-scrollable.scrollable-area > div.simplebar-scroll-content > div > div > div > div > div > div")
            availableDropsContainers = ifrm.contentWindow.document.getElementsByClassName("tw-border-radius-medium tw-c-background-base tw-elevation-1 tw-flex tw-flex-grow-0 tw-flex-row tw-mg-b-2")

            if (up0 != null && up1 != null && up2 != null && up3 != null && down0 != null && sidenav != null && titleDrops != null && dropsBody != null && header != null) {
                up0.style.display = "none";
                up1.style.marginTop = "-30px";
                up2.style.display = "none";
                up3.style.display = "none";
                down0.style.display = "none";
                sidenav.style.display = "none";
                titleDrops.style.display = "none";
                //scroll1.style.display = "none";
                //dropsBody.style.visibility = "hidden";
                containerit.style.display = "none"
                header.style.display = "none"
                marginEdit.style.marginTop = "-30px"
                scrollableContainer.style.visibility = "visible"
                
                takeDrops()
                clearInterval(removeElements)
            } else {
                console.log("Failed to load drops") //Tähän joku "Failed to load drops" jne
            }
        }, 100);
    }

    let waitForDrops = 0

    function checkIframeDrops() {
        waitForDrops = 0
        iframeCreate = setInterval(function () {
            if (ifrm.contentWindow.document.getElementsByClassName("tw-border-radius-medium tw-c-background-base tw-elevation-1 tw-flex tw-flex-grow-0 tw-flex-row tw-mg-b-2")[0]) { //Jos dropit löytyy iframesta
                if (ifrm.contentWindow.document.querySelector("div.inventory-max-width > div:nth-child(1)")) { //Kattoo löytyykö "In Progress" teksti
                    createIframe(); //Tehdään iframe näyttökelposeks    
                    clearInterval(iframeCreate); //Lopetetaa toisto
                }
            } else if (waitForDrops > 20) {
                if (showHintText == false) {
                    ifrm.height = "50px"

                    var noDropsButton = document.createElement("BUTTON");
                    noDropsButton.setAttribute("id", "noDropsRefreshTDM");
                    noDropsButton.innerHTML = "Refresh";
                    noDropsButton.style.textDecoration = "underline"
                    noDropsButton.style.width = "50px"
                    noDropsButton.style.marginLeft = "30px"
                    ifrm.contentWindow.document.getElementsByTagName("BODY")[0].prepend(noDropsButton)

                    let noDropsFoundDiv = document.createElement('p')
                    noDropsFoundDiv.append("No drops found. If you believe there should be drops here, try refreshing by pressing the button below.")
                    noDropsFoundDiv.style.marginLeft = "30px"
                    ifrm.contentWindow.document.getElementsByTagName("BODY")[0].prepend(noDropsFoundDiv)

                    ifrm.contentWindow.document.getElementById("root").style.visibility = "hidden"
                    ifrm.style.visibility = "visible"

                    ifrm.contentWindow.document.getElementById("noDropsRefreshTDM").addEventListener("click", function () {
                        noDropsButton.remove()
                        noDropsFoundDiv.remove()
                        checkIframeDrops()
                    })
                
                }
                clearInterval(iframeCreate)
            } else {
                waitForDrops += 1
            }
        }, 100);

    }

    
    function insertIframe() {
        let insertIframe = setInterval(function () {
            if (document.querySelector("div.channel-root__info > div > div:nth-child(2)") && document.querySelector("div.ScHaloIndicator-sc-1l14b0i-1.jYqVGu.tw-halo__indicator > div > div") && document.querySelector("div.tw-flex-grow-0.tw-flex-shrink-1") && oldStream != undefined) { //katotaa löytyykö about osa sivulta ja onko se live

                if (hideChannelsList.toLowerCase().split(", ").indexOf(oldStream.toLowerCase()) == -1) { //TOIMII NÄI MUTTA TUSKI SAA KAIKKII TIETOI AJOIS
                    document.querySelector("div.channel-root__info > div > div:nth-child(2)").prepend(ifrm) //Lisätää iframe about osan yläpuolelle
                    
                    checkIframeDrops(); //Katotaa löytyykö droppeja iframesta

                    //Buttonit

                    if (document.getElementsByClassName("iFrameSettingsButton").length == 0 && document.getElementsByClassName("dropsPageButton").length == 0 && document.getElementsByClassName("iFrameButton").length == 0) {
                    addButtons()
                }
                    clearInterval(insertIframe); //Lopetetaa toisto
                } else {
                    clearInterval(insertIframe);
                }
            }
        }, 100);
    }

    //Luodaan iframe
    var ifrm = document.createElement('iframe');

    //Listataan kaikki iframen elementit mitä tullaan käyttää
    var up0 = ""
    var up1 = ""
    var up2 = ""
    var up3 = ""
    var down0 = ""
    var sidenav = ""
    var titleDrops = ""
    var scroll1 = ""
    var dropsBody = ""
    var containerit = ""
    var header = ""
    var marginEdit = ""
    var scrollableContainer = ""
    var availableDropsContainers = ""

    var hideDropsButton = false

    let currentStream = ""
    let oldStream = undefined

    let currentGame = ""
    let oldGame = undefined

    var hideIframeButton
    var dropsPageButton
    var settingsButton

    var hideDropList = "" 

    function settingsButtonFunc(){
        settingsButton = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        settingsButton.setAttribute("aria-hidden", "true");
        settingsButton.setAttribute('viewBox', '0 0 512 512');
        settingsButton.setAttribute('width', '16px');
        settingsButton.setAttribute('height', '16px');
        settingsButton.className = "iFrameSettingsButton"


        var path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        path.setAttribute('d', "M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z");
        path.setAttribute('fill', '#9B67E9');

        settingsButton.appendChild(path);

        settingsButton.style.marginLeft = "10px"
        settingsButton.style.marginBottom = "-4px"
        //settingsButton.style.color = "#9B67E9"

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
                function () {});

        }
    }

    function addButtons() {

        settingsButtonFunc()

        dropsPageButton = document.createElement("BUTTON");
        var dropsPageButtonText = document.createTextNode("Drops page");
        dropsPageButton.appendChild(dropsPageButtonText);
        dropsPageButton.style.paddingLeft = "10px"
        dropsPageButton.style.color = "#9B67E9"
        dropsPageButton.className = "dropsPageButton"


        dropsPageButton.addEventListener("mouseover", function (event) {
            event.target.style.textDecoration = "underline"
        }, false);

        dropsPageButton.addEventListener("mouseout", function (event) {
            event.target.style.textDecoration = "none"
        }, false);

        dropsPageButton.onclick = dropsPageFunc

        function dropsPageFunc() {
            var win = window.open("https://www.twitch.tv/drops/inventory", '_blank');
            win.focus();
        }

        hideIframeButton = document.createElement("BUTTON");
        var hideIframeButtonText = document.createTextNode("Hide drops");
        hideIframeButton.appendChild(hideIframeButtonText);
        hideIframeButton.style.paddingLeft = "30px"
        hideIframeButton.style.color = "#9B67E9"
        hideIframeButton.className = "iFrameButton"

        hideIframeButton.addEventListener("mouseover", function (event) {
            event.target.style.textDecoration = "underline"
        }, false);

        hideIframeButton.addEventListener("mouseout", function (event) {
            event.target.style.textDecoration = "none"
        }, false);


        if (hideButtonsDefault == true) {
            hideDropsButton = true
            //ifrm.style.visibility = "hidden"
            ifrm.style.float = "left"
            ifrm.style.marginLeft = "-1000000px"
            //ifrm.style.float = "left"

            hideIframeButtonText.nodeValue = "Show drops"
        }

        hideIframeButton.onclick = hideButtonFunc

        function hideButtonFunc() {
            if (hideDropsButton == false) {
                hideDropsButton = true
                //ifrm.style.visibility = "hidden"
                ifrm.style.float = "left"
                ifrm.style.marginLeft = "-1000000px"
                //ifrm.style.float = "left"

                hideIframeButtonText.nodeValue = "Show drops"
            } else {
                hideDropsButton = false
                //ifrm.style.visibility = "visible"
                hideIframeButtonText.nodeValue = "Hide drops"
                ifrm.style.float = "none"
                ifrm.style.marginLeft = "0px"
            }
        }

        document.querySelector("div.tw-flex-grow-0.tw-flex-shrink-1").append(hideIframeButton)
        document.querySelector("div.tw-flex-grow-0.tw-flex-shrink-1").append(dropsPageButton)
        document.querySelector("div.tw-flex-grow-0.tw-flex-shrink-1").append(settingsButton)
    }

    function start() {
        if (disableTDM == false) {

            ifrm.setAttribute('src', 'https://www.twitch.tv/drops/inventory');
            ifrm.width = "100%"
            ifrm.height = "0px" //1 row 270px, 2 row 530px, 3 row 810px
            ifrm.style.visibility = "hidden" //Piilota iframe
            insertIframe() //Lisätää iframe aboutin yläpuolelle näkymättömänä
            let gameCheckTime = 0

            let nameCheck = setInterval(function () {
            let streamNameDiv = document.querySelector("div.tw-align-items-center.tw-flex > a") //Striimin nimi div
        
                        if (streamNameDiv != null) { //Katotaa löytyykö divi
                            if (streamNameDiv.innerText.length > 0) { //Jos löytyy katotaan onko siinä tekstiä
                                currentStream = streamNameDiv.innerText //Laitetaan löydetty nimi currentStreamiin
                                if (oldStream == undefined) { //Jos ei oo vielä oldStream
                                    oldStream = currentStream //Lisätää nykyne striimi oldStreamii

                                }
                                if (currentStream == oldStream) { //Jos nykyne striimi sama kun vanha
                                } else {
                                    oldStream = currentStream //Jos on uus striimi, nii lisätään sen nimi oldStreamii
                                    console.log(oldStream)


                                    ifrm.style.visibility = "hidden" //Piilotetaa iframe
                                    if (hideChannelsList.toLowerCase().split(", ").indexOf(oldStream.toLowerCase()) == -1) {
                                        hideIframeButton.style.visibility = 'visible'
                                        dropsPageButton.style.visibility = 'visible'
                                        settingsButton.style.visibility = 'visible'
        
        
                                        insertIframe() //Lisätää iframe uudestaa
                                    } else {
                                        ifrm.height = "0px"
                                        hideIframeButton.style.visibility = 'hidden';
                                        dropsPageButton.style.visibility = 'hidden';
                                        settingsButton.style.visibility = 'hidden';
                                        clearTimeout(reloadTime)
                                    }
                                }
                            }
                        }
        
                        let gameNameDiv = document.querySelector("div.tw-align-items-center.tw-flex-wrap.tw-inline-flex.tw-mg-r-1 > a") //Pelin nimi div
        
                        if (gameNameDiv != null) { //Katotaa löytyykö divi
                            if (gameNameDiv.innerText.length > 0) { //Jos löytyy katotaan onko siinä tekstiä
                                currentGame = gameNameDiv.innerText //Laitetaan löydetty nimi currentStreamiin
                            
                                if (oldGame == undefined) { //Jos ei oo vielä oldStream
                                    oldGame = currentGame //Lisätää nykyne striimi oldStreamii
                                }
                                if (currentGame == oldGame) { //Jos nykyne striimi sama kun vanha
                                } else {
                                    oldGame = currentGame //Jos on uus striimi, nii lisätään sen nimi oldStreamii
                                    ifrm.style.visibility = "hidden" //Piilotetaa iframe
                                }
                            }
                        }
                        gameCheckTime += 1
                        console.log(gameCheckTime)
                        if(gameCheckTime > 20){
                            clearInterval(nameCheck);
                        }

                        console.log(oldGame + oldStream)
                        if(oldGame !== undefined && oldStream !== undefined){
                            clearInterval(nameCheck);
                        } 
                    }, 500);

            //Chekataa vaihtuuko striimin url
            chrome.runtime.onMessage.addListener(
                function(request, sender, sendResponse) {
                  // listen for messages sent from background.js
                  if (request.message === 'newURL') {        
                    console.log(request.url) // new url
                    gameCheckTime = 0
                    urlCheck = setInterval(function () {
                        let streamNameDiv = document.querySelector("div.tw-align-items-center.tw-flex > a") //Striimin nimi div
        
                        if (streamNameDiv != null) { //Katotaa löytyykö divi
                            if (streamNameDiv.innerText.length > 0) { //Jos löytyy katotaan onko siinä tekstiä
                                currentStream = streamNameDiv.innerText //Laitetaan löydetty nimi currentStreamiin

                                if (oldStream == undefined) { //Jos ei oo vielä oldStream
                                    oldStream = currentStream //Lisätää nykyne striimi oldStreamii

                                }
                                if (currentStream == oldStream) { //Jos nykyne striimi sama kun vanha
                                } else {
                                    oldStream = currentStream //Jos on uus striimi, nii lisätään sen nimi oldStreamii
                                    clearInterval(urlCheck);


                                    ifrm.style.visibility = "hidden" //Piilotetaa iframe
                                    if (hideChannelsList.toLowerCase().split(", ").indexOf(oldStream.toLowerCase()) == -1) {
                                        // hideIframeButton.style.visibility = 'visible'
                                        // dropsPageButton.style.visibility = 'visible'
                                        // settingsButton.style.visibility = 'visible'   // EI TOIMI NÄÄ

                                        insertIframe() //Lisätää iframe uudestaa
                                    } 
                                    
                                    else {
                                        ifrm.height = "0px"
                                        // hideIframeButton.style.visibility = 'hidden';
                                        // dropsPageButton.style.visibility = 'hidden';
                                        // settingsButton.style.visibility = 'hidden';
                                        clearTimeout(reloadTime)
                                    }
                                }
                            }
                        }
        
                        let gameNameDiv = document.querySelector("div.tw-align-items-center.tw-flex-wrap.tw-inline-flex.tw-mg-r-1 > a") //Pelin nimi div
        
                        if (gameNameDiv != null) { //Katotaa löytyykö divi
                            if (gameNameDiv.innerText.length > 0) { //Jos löytyy katotaan onko siinä tekstiä
                                currentGame = gameNameDiv.innerText //Laitetaan löydetty nimi currentStreamiin
                            
                                if (oldGame == undefined) { //Jos ei oo vielä oldStream
                                    oldGame = currentGame //Lisätää nykyne striimi oldStreamii
                                }
                                if (currentGame == oldGame) { //Jos nykyne striimi sama kun vanha
                                } else {
                                    oldGame = currentGame //Jos on uus striimi, nii lisätään sen nimi oldStreamii
                                    ifrm.style.visibility = "hidden" //Piilotetaa iframe
                                }
                            }
                        }

                        gameCheckTime += 1
                        console.log(gameCheckTime)

                        if(gameCheckTime > 20){
                            clearInterval(urlCheck);
                        }

                    }, 500);

                  }
              });

        } else {
            console.log('%c !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ', 'background: #ff0000; color: #fff')
            console.log('%c Twitch Drops Manager is disabled in the settings ', 'background: #a970ff; color: #fff')
            console.log('%c !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ', 'background: #ff0000; color: #fff')

            let aboutTime = 0

            checkAbout = setInterval(function () {
                if (aboutTime < 20) {

                    if (document.getElementsByClassName("tw-align-middle tw-font-size-7 tw-inline-block tw-mg-b-05 tw-mg-r-0")[0]){

                        settingsButtonFunc()
                        settingsButton.style.marginLeft = "10px"
                        settingsButton.style.margintop = "-15px"
                        document.getElementsByClassName("tw-align-middle tw-font-size-7 tw-inline-block tw-mg-b-05 tw-mg-r-0")[0].append(settingsButton)
                        clearInterval(checkAbout)

                    }

                } else {
                    clearInterval(checkAbout)
                }
                console.log(aboutTime)
                aboutTime += 1

        }, 500)

        }
    }

})();