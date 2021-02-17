(function () {

    //Asetukset variablet
    var refreshTime
    var disableTDM
    var specificChannel
    var hideClaimableButton
    var showHintText

    //Haetaan asetukset
    chrome.storage.sync.get({
        refreshTime: 1,
        refreshRange: 1,
        disableTDM: false,
        specificDrops: false,
        hideClaimable: false,
        hintText: true
    }, function (items) {
        refreshTime = items.refreshTime;
        disableTDM = items.disableTDM;
        specificChannel = items.specificDrops;
        hideClaimableButton = items.hideClaimable;
        showHintText = items.hintText;

    });

    let getOptions = setInterval(function () {
        if (refreshTime != undefined) { //katotaa onko asetukset ladannu
            console.log(refreshTime)
            console.log(disableTDM)
            refreshTime = refreshTime * 60000 //Muunnetaan minuuteiksi
            console.log(refreshTime)
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
                    availableDrops[i].style.height = "240px"
                    availableDrops[i].style.width = "160px" //160px
                    let link = availableDropsContainers[j].querySelector("div.tw-mg-x-1 > div > p > a") //ottaa linkin divin tiedot

                    let linkName = link.innerText.substring(1)
                    link.style.textAlign = "center";
                    let dropName = availableDrops[i].getElementsByClassName("tw-font-size-5 tw-semibold")[0] //Otetaa dropName tekstin tiedot
                    link.style.color = ifrm.contentWindow.getComputedStyle(dropName, null).getPropertyValue("color") //Vaihetaan linkin väri dropNamen väriseks
                    link.style.paddingBottom = "5px"

                    let gameURL = link.href.split('game/').pop().split('?')[0] //Otetaa pelin linkki jos ei oo striimeri

                    for (k = 0; k < gameURL.split('%20').length + 1; k++) { //Muutetaan %20 spaceks
                        gameURL = gameURL.replace('%20', ' ')
                    }
                    for (k = 0; k < gameURL.split('%3A').length + 1; k++) { //Muutetaan %3A kaksoispisteeks
                        gameURL = gameURL.replace('%3A', ':')
                    }
                    for (k = 0; k < gameURL.split('%26').length + 1; k++) { //Muutetaan %26 andiks
                        gameURL = gameURL.replace('%26', '&')
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
                    if (availableDrops[i].getElementsByClassName("tw-align-items-center tw-align-middle tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium tw-core-button tw-core-button--overlay tw-core-button--primary tw-inline-flex tw-justify-content-center tw-overflow-hidden tw-relative").length > 0) {
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
            if(showHintText == true) {
            ifrm.height = "50px"

            var specificRefresh = document.createElement("BUTTON");
            specificRefresh.setAttribute("id", "refreshButtonTDM");
            specificRefresh.innerHTML = "Refresh";
            specificRefresh.style.textDecoration = "underline"
            scrollableContainer.prepend(specificRefresh)

            let noDropsDiv = document.createElement('p')
            noDropsDiv.style.marginTop = "10px"
            noDropsDiv.append("No eligible drops found on this channel. If this is your first time watching this channel while drops are enabled, it may take couple minutes to register")
            scrollableContainer.prepend(noDropsDiv)

            ifrm.contentWindow.document.getElementById("refreshButtonTDM").addEventListener("click", function () {
                reloadIframe()
            })

            ifrm.style.visibility = "visible"
        } 
    }
        else {
            ifrm.height = "270px"
            ifrm.style.visibility = "visible" //Kun kaikki on poistettu (ja dropit lisätty) laitetaa iframe näkyvii
            setTimeout(reloadIframe, refreshTime); //Reload funktio käyttäjän asettaman minuutin välein
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
                if(showHintText == true) {
                ifrm.height = "50px"

                var noDropsButton = document.createElement("BUTTON");
                noDropsButton.setAttribute("id", "noDropsRefreshTDM");
                noDropsButton.innerHTML = "Refresh";
                noDropsButton.style.textDecoration = "underline"
                noDropsButton.style.width = "50px"
                noDropsButton.style.marginLeft = "30px"
                ifrm.contentWindow.document.getElementsByTagName("BODY")[0].prepend(noDropsButton)

                let noDropsFoundDiv = document.createElement('p')
                noDropsFoundDiv.append("No drops found. If you think there should be drops here, try refreshing by pressing the refresh button below")
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
            if (document.querySelector("div.channel-root__info > div > div:nth-child(2)") && document.querySelector("div.tw-absolute.tw-align-items-center.tw-flex.tw-full-width.tw-justify-content-center.user-avatar-animated__live")) { //katotaa löytyykö about osa sivulta ja onko se live
                document.querySelector("div.channel-root__info > div > div:nth-child(2)").prepend(ifrm) //Lisätää iframe about osan yläpuolelle
                checkIframeDrops(); //Katotaa löytyykö droppeja iframesta
                clearInterval(insertIframe); //Lopetetaa toisto
            }
        }, 100);
    }

    //Luodaan iframe
    var ifrm = document.createElement('iframe');
    ifrm.setAttribute('src', 'https://www.twitch.tv/drops/inventory');
    ifrm.width = "100%"
    ifrm.height = "0px" //1 row 270px, 2 row 530px, 3 row 810px
    ifrm.style.visibility = "hidden" //Piilota iframe

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


    insertIframe() //Lisätää iframe aboutin yläpuolelle näkymättömänä

    let currentStream = ""
    let oldStream = undefined

    let currentGame = ""
    let oldGame = undefined

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
                    insertIframe() //Lisätää iframe uudestaa
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

    //SETTINGS
    //Valitse haluuko ALL / CHANNEL SPECIFIC drops
    //<a data-test-selector="DropsCampaignInProgressDescription-no-channels-hint-text" class="tw-link" rel="noopener noreferrer" target="_blank" href="/directory/game/Rust?tl=c2542d6d-cd10-4532-919b-3d19f30a768b">a participating live channel</a>
    //Vaiha iframen kokoo
    //iframe päälle/pois


    /*
    const progress = document.querySelector('.progress-done');
    progress.setAttribute("data-done", 10);
    progress.style.width = progress.getAttribute('data-done') + '%';
    progress.style.opacity = 1;
    */
})();