const bookNowBtns = document.querySelectorAll('.movie-button')
const locationSelect = document.querySelector('.location-select select')

bookNowBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const parentElement = e.target.parentElement
        const title = parentElement.querySelector('.movie-title').textContent
        const location = locationSelect.value

        window.location.href = `seatselect.html?title=${title}&location=${location}`
    })
})
