const tickets = JSON.parse(localStorage.getItem('tickets')) || []
const ticketTableBody = document.querySelector('#ticketsTableBody')

document.querySelector('#ticketsTableBody').innerHTML = tickets
    .map(
        (ticket) => `
    <tr>
        <td>${ticket.id}</td>
        <td>${ticket.movieName}</td>
        <td>${ticket.cinema}</td>
        <td>${ticket.showTime}</td>
        <td>${ticket.seats}</td>
        <td>${ticket.price}</td>
        <td>${new Date(ticket.bookingDate).toLocaleDateString('vi-VN')}</td>
    </tr>
`
    )
    .join('')
