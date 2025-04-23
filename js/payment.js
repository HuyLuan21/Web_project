// Get booking information from URL parameters
const urlParams = new URLSearchParams(window.location.search)

// Booking information
const bookingInfo = {
    movieTitle: urlParams.get('title'),
    showTime: urlParams.get('showTime'),
    selectedSeats: urlParams.get('seats'),
    totalPrice: urlParams.get('totalPrice'),
    bookingDate: new Date().toISOString(),
    status: 'completed',
}

// Display booking information
document.getElementById('movie-title').textContent = bookingInfo.movieTitle
document.getElementById('show-time').textContent = bookingInfo.showTime
document.getElementById('selected-seats').textContent = bookingInfo.selectedSeats
document.getElementById('total-price').textContent = bookingInfo.totalPrice

// Handle payment button click
document.getElementById('pay-btn').addEventListener('click', () => {
    // Save to bookings history
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    bookings.push(bookingInfo)
    localStorage.setItem('bookings', JSON.stringify(bookings))

    // Save to tickets for admin management
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]')
    const ticketInfo = {
        id: Date.now().toString(), // Unique ID based on timestamp
        movieName: bookingInfo.movieTitle,
        cinema: 'CINEMON',
        showTime: bookingInfo.showTime,
        seats: bookingInfo.selectedSeats.split(','),
        price: parseInt(bookingInfo.totalPrice.replace(/[^\d]/g, '')),
        bookingDate: bookingInfo.bookingDate,
        status: 'completed',
    }
    tickets.push(ticketInfo)
    localStorage.setItem('tickets', JSON.stringify(tickets))

    // Show success message
    alert('Đặt vé thành công!')

    // Redirect to homepage
    window.location.href = 'index.html'
})
