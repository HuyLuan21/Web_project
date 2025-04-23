const movieTitle = document.querySelector('.movie-details h2')
const movieLocation = document.querySelector('#location')
const seatBtns = document.querySelectorAll('.seat:not(.available):not(.occupied):not(.guigde)')
const timeSelectItem = document.querySelectorAll('.time-select-item-btn')
const timeSelectText = document.querySelector('#time-select-text')
const urlParams = new URLSearchParams(window.location.search)
const title = urlParams.get('title')
const location = urlParams.get('location')

// Get ticket price from configuration
const ticketConfig = JSON.parse(localStorage.getItem('ticketConfig')) || { ticketPrice: 90000 }
const priceElement = document.querySelector('#price')
priceElement.textContent = new Intl.NumberFormat('vi-VN').format(ticketConfig.ticketPrice) + 'đ/ghế'

movieTitle.textContent = title
movieLocation.textContent = location

function updateTotalPrice() {
    const selectedSeatsCount = document.querySelectorAll('.seat.selected:not(.guigde)').length
    const totalPrice = selectedSeatsCount * ticketConfig.ticketPrice

    const formatter = new Intl.NumberFormat('vi-VN')
    document.querySelector('#seat-count').textContent = selectedSeatsCount + ' ghế'
    document.querySelector('#total-price').textContent = formatter.format(totalPrice) + ' VND'
}

seatBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        console.log(e.target.dataset?.seat?.slice(0, 1))
        console.log(e.target.dataset?.seat?.slice(1))

        e.target.classList.toggle('selected')
        loadContinueBtn()
        updateTotalPrice()

        const holdTime = 5 * 60 * 1000
        let timeout = null

        if (e.target.classList.contains('selected')) {
            timeout = setTimeout(() => {
                alert('Thời gian giữ ghế đã hết.')
                e.target.classList.remove('selected')
                loadContinueBtn()
                updateTotalPrice()
            }, holdTime)
        } else {
            clearTimeout(timeout)
        }
    })
})

timeSelectItem.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        timeSelectItem.forEach((item) => item.classList.remove('active'))
        btn.classList.add('active')

        const time = e.target.textContent
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
    continueBtn.disabled = !hasSelectedSeat
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
    daySelectContainer.innerHTML = ''

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
            document.querySelectorAll('.dayselect-item-btn').forEach((btn) => {
                btn.classList.remove('active')
            })
            this.classList.add('active')
        })

        daySelectContainer.appendChild(li)
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', generate7Day)

// Add continue button click handler
document.querySelector('#continue-btn').addEventListener('click', () => {
    const selectedSeats = Array.from(document.querySelectorAll('.seat.selected:not(.guigde)'))
        .map((seat) => seat.dataset.seat)
        .join(',')

    const showTime = document.querySelector('#time-select-text').textContent
    const selectedDate = document.querySelector('.dayselect-item-btn.active .date').textContent
    const totalPrice = document.querySelector('#total-price').textContent

    // Create URL with booking information
    const paymentUrl = new URL('payment.html', window.location.href)
    paymentUrl.searchParams.set('seats', selectedSeats)
    paymentUrl.searchParams.set('showTime', showTime)
    paymentUrl.searchParams.set('date', selectedDate)
    paymentUrl.searchParams.set('totalPrice', totalPrice)
    paymentUrl.searchParams.set('title', title)
    paymentUrl.searchParams.set('location', location)

    // Redirect to payment page
    window.location.href = paymentUrl.toString()
})
