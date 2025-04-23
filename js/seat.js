const movieTitle = document.querySelector('.movie-details h2')
const seatBtns = document.querySelectorAll('.seat:not(.available):not(.occupied):not(.guigde)')
const timeSelectItem = document.querySelectorAll('.time-select-item-btn')
const timeSelectText = document.querySelector('#time-select-text')
const urlParams = new URLSearchParams(window.location.search)
const title = urlParams.get('title')

// Get ticket price from configuration
const ticketConfig = JSON.parse(localStorage.getItem('ticketConfig')) || { ticketPrice: 90000 }
const priceElement = document.querySelector('#price')
priceElement.textContent = new Intl.NumberFormat('vi-VN').format(ticketConfig.ticketPrice) + 'đ/ghế'

movieTitle.textContent = title

function updateTotalPrice() {
    const selectedSeatsCount = document.querySelectorAll('.seat.selected:not(.guigde)').length
    const totalPrice = selectedSeatsCount * ticketConfig.ticketPrice

    const formatter = new Intl.NumberFormat('vi-VN')
    document.querySelector('#seat-count').textContent = selectedSeatsCount + ' ghế'
    document.querySelector('#total-price').textContent = formatter.format(totalPrice) + ' VND'
}
seatBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.target.classList.toggle('selected')
        loadContinueBtn()
        updateTotalPrice()

        // Update selected seats text
        const selectedSeats = Array.from(document.querySelectorAll('.seat.selected:not(.guigde)'))
            .map((seat) => seat.dataset.seat)
            .join(', ')
        document.querySelector('#selected-seats-text').textContent = selectedSeats || 'Chưa chọn ghế'

        const holdTime = 5 * 60 * 1000
        let timeout = null

        if (e.target.classList.contains('selected')) {
            timeout = setTimeout(() => {
                alert('Thời gian giữ ghế đã hết.')
                e.target.classList.remove('selected')
                loadContinueBtn()
                updateTotalPrice()
                // Update selected seats text after timeout
                const remainingSeats = Array.from(document.querySelectorAll('.seat.selected:not(.guigde)'))
                    .map((seat) => seat.dataset.seat)
                    .join(', ')
                document.querySelector('#selected-seats-text').textContent = remainingSeats || 'Chưa chọn ghế'
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

// Add continue button click handler
document.querySelector('#continue-btn').addEventListener('click', () => {
    const selectedSeats = Array.from(document.querySelectorAll('.seat.selected:not(.guigde)'))
        .map((seat) => seat.dataset.seat)
        .join(',')

    const showTime = document.querySelector('#time-select-text').textContent
    const totalPrice = document.querySelector('#total-price').textContent

    // Create URL with booking information
    const paymentUrl = new URL('payment.html', window.location.href)
    paymentUrl.searchParams.set('seats', selectedSeats)
    paymentUrl.searchParams.set('showTime', showTime)
    paymentUrl.searchParams.set('totalPrice', totalPrice)
    paymentUrl.searchParams.set('title', title)

    // Redirect to payment page
    window.location.href = paymentUrl.toString()
})
