(function () {
    
    function reloadIframe() { //Päivitetää minuuti välein
        ifrm.style.visibility = "hidden"
        ifrm.contentWindow.location.reload();
        checkIframeDrops();
    }

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
                    scrollableContainer.appendChild(availableDrops[i]) //Lisätää koko juttu headerii
                } 
                
                else { //Sama mutta jos on "Claim now" button
                    if (availableDrops[i].getElementsByClassName("tw-align-items-center tw-core-button-icon tw-inline-flex").length > 0) {
                        availableDrops[i].style.margin = "0"
                        availableDrops[i].style.marginRight = "15px"
                        availableDrops[i].style.height = "240px"
                        availableDrops[i].style.width = "160px" //160px
                        let link = availableDropsContainers[j].querySelector("div.tw-mg-x-1 > div > p > a")
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
                        availableDrops[i].style.cssFloat = "left"
                        scrollableContainer.prepend(availableDrops[i])
                    }
                }
            }
        }
        ifrm.style.visibility = "visible" //Kun kaikki on poistettu (ja dropit lisätty) laitetaa iframe näkyvii
        setTimeout(reloadIframe, 60000); //Reload funktio minuuti välein
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
                takeDrops()
                clearInterval(removeElements)
            } else {
                console.log("up0 on null")
            }
        }, 500);
    }

    function checkIframeDrops() {
        iframeCreate = setInterval(function () {
            if (ifrm.contentWindow.document.getElementsByClassName("tw-border-radius-medium tw-c-background-base tw-elevation-1 tw-flex tw-flex-grow-0 tw-flex-row tw-mg-b-2")[0]) { //Jos dropit löytyy iframesta
                if (ifrm.contentWindow.document.querySelector("div.inventory-max-width > div:nth-child(1)")) { //Kattoo löytyykö "In Progress" teksti
                    createIframe(); //Tehdään iframe näyttökelposeks    
                    clearInterval(iframeCreate); //Lopetetaa toisto
                }
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
        }, 1000);
    }

    //Luodaan iframe
    var ifrm = document.createElement('iframe');
    ifrm.setAttribute('src', 'https://www.twitch.tv/drops/inventory');
    ifrm.width = "100%"
    ifrm.height = "250px" //1 row 250px, 2 row 530px, 3 row 810px
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


    //Chekataa 2 sec välein vaihtuuko striimin nimi
    setInterval(() => {
        let streamNameDiv = document.querySelector("div.tw-align-items-center.tw-flex > a") //Striimin nimi div
        if (streamNameDiv != null) {    //Katotaa löytyykö divi
            if (streamNameDiv.innerText.length > 0) {   //Jos löytyy katotaan onko siinä tekstiä
                currentStream = streamNameDiv.innerText //Laitetaan löydetty nimi currentStreamiin
                if (oldStream == undefined) {  //Jos ei oo vielä oldStream
                    oldStream = currentStream   //Lisätää nykyne striimi oldStreamii
                    console.log("laitettii uus striimi vanhaks")
                }
                if (currentStream == oldStream) {   //Jos nykyne striimi sama kun vanha
                    console.log("Sama striimi")
                } else {
                    oldStream = currentStream   //Jos on uus striimi, nii lisätään sen nimi oldStreamii
                    ifrm.style.visibility = "hidden" //Piilotetaa iframe
                    insertIframe() //Lisätää iframe uudestaa
                    console.log("Uus striimi")
                }
            }
        } else {    //Ei löydy nimi diviä
            console.log("No stream found")
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