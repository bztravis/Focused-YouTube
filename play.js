const forceTheater = setInterval(function() {
    let video = document.querySelector('.html5-video-container')
    if (video) {
        let theaterActive = video.offsetWidth == window.innerWidth

        let tBtn = document.getElementsByClassName('ytp-size-button')
        button = tBtn[0]

        if (button != null) {
            if (!theaterActive) {        
                button.click()
            }

            button.remove()

            if (theaterActive) {
                clearInterval(forceTheater)
            }
    }
}

}, 1000)


/* const setSearchFocus = setTimeout(() => {
    document.querySelector('input').focus()
}, 0) */