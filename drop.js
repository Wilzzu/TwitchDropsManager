(function () {

    //Asetukset variablet
    var refreshTime
    var disableTDM
    var specificChannel
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
        specificDrops: false,
        hideClaimable: false,
        hintText: true,
        showTime: true,
        hideButtons: false,
        hideChannels: ""
    }, function (items) {
        refreshTime = items.refreshTime;
        disableTDM = items.disableTDM;
        specificChannel = items.specificDrops;
        hideClaimableButton = items.hideClaimable;
        showHintText = items.hintText;
        showTimeIn = items.showTime;
        hideButtonsDefault = items.hideButtons;
        hideChannelsList = items.hideChannels;
    });

    let getOptions = setInterval(function () {
        if (refreshTime != undefined) { //katotaa onko asetukset ladannu
            console.log(refreshTime)
            console.log(disableTDM)
            refreshTime = refreshTime * 60000 //Muunnetaan minuuteiksi
            console.log(refreshTime)
            start()
            clearInterval(getOptions); //Lopetetaa toisto
        }
    }, 100);

    function reloadIframe() { //Päivitetää minuuti välein
        ifrm.style.visibility = "hidden"
        ifrm.contentWindow.location.reload();
        checkIframeDrops();
    }

    let foundSpecificDrop = false
    let foundClaimableDrop = false

    function takeDrops() {

        for (j = 0; j < availableDropsContainers.length; j++) {

            let availableDrops = availableDropsContainers[j].getElementsByClassName("tw-flex tw-flex-column tw-mg-t-2")

            for (i = 0; i < availableDrops.length; i++) { //Chekkaa monta containerii on ja käy jokase läpi

                if (availableDrops[i].getElementsByClassName("tw-visible").length > 0) { //Monta droppia on containeri sisäl
                    availableDrops[i].style.margin = "0" //Muokataan dropin ulkonäköä          
                    availableDrops[i].style.marginRight = "15px"
                    availableDrops[i].style.height = "245px"
                    availableDrops[i].style.width = "160px" //160px

                    let timeLeftDiv = availableDrops[i].querySelector("div.tw-align-center.tw-mg-t-05")
                    let timeLeft = timeLeftDiv.innerText
                    if (timeLeft.includes("hour") == true && timeLeft.includes("minute") == false) {

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

                    let link = availableDropsContainers[j].querySelector("div.tw-mg-x-1 > div > p > a") //ottaa linkin divin tiedot
                    let linkName = link.innerText.substring(1)
                    link.style.textAlign = "center";
                    let dropName = availableDrops[i].getElementsByClassName("tw-font-size-5 tw-semibold")[0] //Otetaa dropName tekstin tiedot
                    link.style.color = ifrm.contentWindow.getComputedStyle(dropName, null).getPropertyValue("color") //Vaihetaan linkin väri dropNamen väriseks
                    link.style.paddingBottom = "5px"

                    //let test = "https://www.twitch.tv/directory/game/The%20Elder%20Scrolls%20V%3A%20Skyrim?"

                    let gameURL = link.href.split('game/').pop().split('?')[0] //Otetaa pelin linkki jos ei oo striimeri link.href.

                    gameURL = gameURL.split('%20').join(' ')
                    gameURL = gameURL.split('%3A').join(':')
                    gameURL = gameURL.split('%26').join('&')

                    if (gameURL == "Tom Clancy's Rainbow Six Siege") {
                        gameURL = "Rainbow Six Siege"
                    } 
                    else if (gameURL == "Call of Duty: Black Ops Cold War") {
                        gameURL = "Black Ops Cold War"
                    } 
                    else if (gameURL == "Call of Duty: Warzone") {
                        gameURL = "Call of Duty: Warzone"
                    } 
                    else if (gameURL == "Call Of Duty: Modern Warfare") {
                        gameURL = "Modern Warfare"
                    } 
                    else if (gameURL == "PLAYERUNKNOWN'S BATTLEGROUNDS") {
                        gameURL = "PUBG"
                    } 
                    else if (gameURL == "Monster Hunter: World") {
                        gameURL = "Monster Hunter: World"
                    } 
                    else if (gameURL == "Counter-Strike: Global Offensive") {
                        gameURL = "CS:GO"
                    } 
                    else if (gameURL == "Fall Guys: Ultimate Knockout") {
                        gameURL = "Fall Guys"
                    } 
                    else if (gameURL.length > 20) {
                        gameURL = gameURL.slice(0, 20)
                        gameURL = gameURL += "..."
                    }

                    if (link.innerHTML == "a participating live channel") {
                        if (gameURL.length > 0) {
                            link.innerHTML = gameURL //Muutetaa teksti pelin nimeks
                        } else {
                            link.innerHTML = "‎" //Jos ei löytyny linkkiä jätetää teksti tyhjäks
                        }
                    }

                    availableDrops[i].prepend(link) //Lisätää linkki dropin yläpuolelle
                    availableDrops[i].style.cssFloat = "left"

                    if (specificChannel == true) { //Jos specificChannel asetus on päällä
                        if (currentStream.toLowerCase() == linkName.toLowerCase()) { //Katotaa onko channelin ja dropin henkilön nimi sama
                            scrollableContainer.appendChild(availableDrops[i]) //Lisätään droppi containerii
                            foundSpecificDrop = true //Muutetaan specificDrop value trueks
                        } else if (currentGame.toLowerCase() == gameURL.toLowerCase()) { //Katotaanko onko striimattavan pelin ja dropin pelin nimi sama
                            scrollableContainer.appendChild(availableDrops[i])
                            foundSpecificDrop = true
                        }

                    } else {
                        scrollableContainer.appendChild(availableDrops[i]) //Lisätää koko juttu headerii
                    }
                } else { //Sama mutta jos on "Claim now" button
                    if (availableDrops[i].getElementsByClassName("ScCoreButton-sc-1qn4ixc-0 ScCoreButtonPrimary-sc-1qn4ixc-1 hZEZfD tw-core-button").length > 0) {
                        if (hideClaimableButton == false) { //Jos claimable drops ei oo laitettu pois asetuksista
                            foundClaimableDrop = true
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

                                let gameURL = link.href.split('game/').pop().split('?')[0]

                                for (k = 0; k < gameURL.split('%20').length + 1; k++) {
                                    gameURL = gameURL.replace('%20', ' ')
                                }
                                for (k = 0; k < gameURL.split('%3A').length + 1; k++) {
                                    gameURL = gameURL.replace('%3A', ':')
                                }
                                for (k = 0; k < gameURL.split('%26').length + 1; k++) {
                                    gameURL = gameURL.replace('%26', 'and')
                                }

                                if (link.innerHTML == "a participating live channel") {
                                    if (gameURL.length > 0) {
                                        link.innerHTML = gameURL
                                    } else {
                                        link.innerHTML = "‎"
                                    }
                                }
                                availableDrops[i].prepend(link)
                            } else {
                                let nullLink = document.createElement('p')
                                nullLink.append("‎")
                                nullLink.style.marginBottom = "5px"
                                availableDrops[i].prepend(nullLink)
                            }

                            availableDrops[i].style.cssFloat = "left"
                            scrollableContainer.prepend(availableDrops[i])
                        }
                    }
                }
            }

        }
        if (specificChannel == true && foundSpecificDrop == false && foundClaimableDrop == false) {
            if (showHintText == false) {
                ifrm.height = "50px"

                var specificRefresh = document.createElement("BUTTON");
                specificRefresh.setAttribute("id", "refreshButtonTDM");
                specificRefresh.innerHTML = "Refresh";
                specificRefresh.style.textDecoration = "underline"
                scrollableContainer.prepend(specificRefresh)

                let noDropsDiv = document.createElement('p')
                noDropsDiv.style.marginTop = "10px"
                noDropsDiv.append("No eligible drops found on this channel. If this is your first time watching the channel while drops are enabled, it may take couple minutes to register.")
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
                console.log("up0 ei oo null")
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
                foundSpecificDrop = false
                foundClaimableDrop = false
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
                    noDropsFoundDiv.append("No drops found. If you believe there should be drops here, try refreshing by pressing the refresh button below.")
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
                console.log(waitForDrops)
            }
        }, 100);

    }


    function insertIframe() {
        let insertIframe = setInterval(function () {
            if (document.querySelector("div.channel-root__info > div > div:nth-child(2)") && document.querySelector("div.ScHaloIndicator-sc-1l14b0i-1.jYqVGu.tw-halo__indicator > div > div") && document.querySelector("div.tw-flex-grow-0.tw-flex-shrink-1")) { //katotaa löytyykö about osa sivulta ja onko se live
                console.log(hideChannelsList)
                if (hideChannelsList.toLowerCase().split(", ").indexOf(oldStream.toLowerCase()) == -1) { //TOIMII NÄI MUTTA TUSKI SAA KAIKKII TIETOI AJOIS
                    document.querySelector("div.channel-root__info > div > div:nth-child(2)").prepend(ifrm) //Lisätää iframe about osan yläpuolelle
                    checkIframeDrops(); //Katotaa löytyykö droppeja iframesta

                    //Buttonit
                    if (buttonsAdded == false) {

                        dropsPageButton = document.createElement("BUTTON");
                        var dropsPageButtonText = document.createTextNode("Drops page");
                        dropsPageButton.appendChild(dropsPageButtonText);
                        dropsPageButton.style.paddingLeft = "10px"
                        dropsPageButton.style.color = "#9B67E9"

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

                        buttonsAdded = true
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
    var buttonsAdded = false

    let currentStream = ""
    let oldStream = undefined

    let currentGame = ""
    let oldGame = undefined

    var hideIframeButton
    var dropsPageButton

    function start() {
        if (disableTDM == false) {
            ifrm.setAttribute('src', 'https://www.twitch.tv/drops/inventory');
            ifrm.width = "100%"
            ifrm.height = "0px" //1 row 270px, 2 row 530px, 3 row 810px
            ifrm.style.visibility = "hidden" //Piilota iframe
            insertIframe() //Lisätää iframe aboutin yläpuolelle näkymättömänä

            //Chekataa 2 sec välein vaihtuuko striimin nimi
            setInterval(() => {
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
                            ifrm.style.visibility = "hidden" //Piilotetaa iframe
                            if (hideChannelsList.toLowerCase().split(", ").indexOf(oldStream.toLowerCase()) == -1) {
                                hideIframeButton.style.visibility = 'visible'
                                dropsPageButton.style.visibility = 'visible'

                            insertIframe() //Lisätää iframe uudestaa
                            } else {
                                ifrm.height = "0px"
                                hideIframeButton.style.visibility = 'hidden';
                                dropsPageButton.style.visibility = 'hidden';
                                clearTimeout(reloadTime)
                            }
                        }
                    }
                } else { //Ei löydy nimi diviä
                    console.log("No stream found")
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
                } else { //Ei löydy nimi diviä
                    console.log("No game found")
                }
            }, 2000);

        } else {
            console.log('%c !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ', 'background: #ff0000; color: #fff')
            console.log('%c Twitch Drops Manager is disabled in the settings ', 'background: #a970ff; color: #fff')
            console.log('%c !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ', 'background: #ff0000; color: #fff')
        }
    }


    //Päivitä iframe 10 seka välei
    /*
    refresh = setInterval(function () {
        ifrm.contentWindow.location.reload();
        dropsPage = ifrm.contentWindow.document
    }, 10000);
*/


    //Progressbaaria
    /*

        function progressBar() {
            //Progress baari
            //voi korvata vaa iframella :(
            var progressDiv = document.createElement('div');
            progressDiv.className = "progress";

            var dataDiv = document.createElement('div');
            dataDiv.className = 'progress-done';
            dataDiv.setAttribute("data-done", 80);

            progressDiv.appendChild(dataDiv)
            //----------------------------------------------

            //Teksti
            var createParagraph = document.createElement("P");
            var teksti = document.createTextNode("2h40m");
            createParagraph.appendChild(teksti);
            dataDiv.appendChild(createParagraph)
            //----------------------------------------------

            document.querySelector("div.tw-flex.tw-flex-column.tw-flex-grow-0.tw-flex-shrink-1.tw-justify-content-start > div > div > div:nth-child(1)").prepend(progressDiv)

        }


        time = setInterval(function() {
            if (document.querySelector("div.tw-flex.tw-flex-column.tw-flex-grow-0.tw-flex-shrink-1.tw-justify-content-start > div > div > div:nth-child(1)")) {
                progressBar();
                const progress = document.querySelector('.progress-done');
                progress.setAttribute("data-done", 80);
                progress.style.width = progress.getAttribute('data-done') + '%';
                progress.style.opacity = 1;
                clearInterval(time);
            }
        }, 1000);

    /*

        //IF NAME "se dropin divin nimi" SHOW
        //ELSE "No available drops found" <- iframen sisälle muokkaa toi teksti
        //Kaks iframee päällekkäi
        //Eka päivittyy taustalla -> Kun on päivittyny nii päällimmäinen katoo -> Päällimmäinen päivittyy sillä aikaa ku on poissa -> sit venataa minuutti ja alkaa alusta

        /*
            var dropReq = new XMLHttpRequest();
            dropReq.open('GET', 'https://www.twitch.tv/drops/inventory');
            dropReq.onload = function() {
                var dropData = dropReq.responseText;
                console.log(dropData)
            }

            dropReq.send();
        */

    //muunna prosentit tunneiks ja minuuteiks


    /*
    const progress = document.querySelector('.progress-done');
    progress.setAttribute("data-done", 10);
    progress.style.width = progress.getAttribute('data-done') + '%';
    progress.style.opacity = 1;
    */
})();