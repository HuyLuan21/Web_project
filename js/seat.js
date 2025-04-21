const movieTitle = document.querySelector('.movie-details h2')
const seatBtns = document.querySelectorAll('.seat')
const timeSelectItem = document.querySelectorAll('.time-select-item-btn')
const timeSelectText = document.querySelector('#time-select-text')

const urlParams = new URLSearchParams(window.location.search)
const title = urlParams.get('title')
const location = urlParams.get('location')

movieTitle.textContent = title

seatBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        console.log(e.target.dataset.seat.slice(0, 1))
        console.log(e.target.dataset.seat.slice(1))

        e.target.classList.toggle('selected')

        loadContinueBtn()

        const holdTime = 5 * 60 * 1000

        let timeout = null

        if (e.target.classList.contains('selected')) {
            timeout = setTimeout(() => {
                alert('Hello world')
            }, holdTime)
        } else {
            clearTimeout(timeout)
        }
    })
})

timeSelectItem.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const time = e.target.textContent
        // Map text to number
        const [hours, minutes] = time.split(':').map(Number)

        let newHours = hours + 2
        let newMinutes = minutes + 10

        if (newMinutes >= 60) {
            newHours += 1
            newMinutes -= 60
        }

        if (newHours >= 24) {
            newHours -= 24
        }

        const endTime = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`
        timeSelectText.textContent = `${time} - ${endTime}`
    })
})

const loadContinueBtn = () => {
    const hasSelectedSeat = document.querySelectorAll('.seat.selected:not(.guigde)').length > 0
    const continueBtn = document.querySelector('.continue-btn')

    if (hasSelectedSeat) {
        continueBtn.removeAttribute('disabled')
    } else {
        continueBtn.setAttribute('disabled', 'disabled')
    }
}
