const movieTitle = document.querySelector('.movie-details h2')
const seatBtns = document.querySelectorAll('.seat:not(.available):not(.occupied):not(.guigde)')
const timeSelectItem = document.querySelectorAll('.time-select-item-btn')
const timeSelectText = document.querySelector('#time-select-text')
const urlParams = new URLSearchParams(window.location.search)
const title = urlParams.get('title')
const location = urlParams.get('location')

movieTitle.textContent = title

seatBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        console.log(e.target.dataset?.seat?.slice(0, 1))
        console.log(e.target.dataset?.seat?.slice(1))

        e.target.classList.toggle('selected')

        loadContinueBtn()

        const holdTime = 5 * 60 * 1000
        const bookingInfo = document.querySelector('.booking-info')

        bookingInfo.querySelector('#seat-count').textContent =
            document.querySelectorAll('.seat.selected:not(.guigde)').length + ' ghế'

        const [intPrice] = bookingInfo.querySelector('#price').textContent.split('đ')

        // Create our number formatter.
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })

        const totalPrice = document.querySelectorAll('.seat.selected:not(.guigde)').length * Number(intPrice) * 1000

        bookingInfo.querySelector('#total-price').textContent = formatter.format(totalPrice) + ' VND'
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
        // Remove active class from all time buttons
        timeSelectItem.forEach((item) => {
            item.classList.remove('active')
        })

        // Add active class to clicked button
        btn.classList.add('active')

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

const daySelectItem = document.querySelectorAll('.dayselect-item-btn')

daySelectItem.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const day = e.target.textContent
        console.log(day)
    })
})

function generate7Day() {
    const date = new Date()
    const day = ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7']
    const daySelectContainer = document.querySelector('.dayselect-item ul')
    daySelectContainer.innerHTML = '' // Clear existing content

    for (let i = 0; i < 7; i++) {
        const newDate = new Date(date)
        newDate.setDate(date.getDate() + i)
        const newDay = newDate.getDate() + '/' + (newDate.getMonth() + 1)
        const newDayName = day[newDate.getDay()]

        const li = document.createElement('li')
        li.className = 'dayselect-item-btn' + (i === 0 ? ' active' : '')
        li.innerHTML = `
            <span class="date">${newDay}</span>
            <span class="day">${newDayName}</span>
        `

        li.addEventListener('click', function () {
            // Remove active class from all buttons
            document.querySelectorAll('.dayselect-item-btn').forEach((btn) => {
                btn.classList.remove('active')
            })
            // Add active class to clicked button
            this.classList.add('active')
        })

        daySelectContainer.appendChild(li)
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', generate7Day)
