document.addEventListener('DOMContentLoaded', function () {
    // Admin dropdown functionality
    const adminDropdown = document.querySelector('.admin-dropdown')
    const adminButton = document.querySelector('.admin-button')

    adminButton.addEventListener('click', function (e) {
        e.stopPropagation()
        adminDropdown.classList.toggle('active')
    })

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (!adminDropdown.contains(e.target)) {
            adminDropdown.classList.remove('active')
        }
    })

    // Highlight active menu item
    const menuItems = document.querySelectorAll('.admin-left-menu a')
    const currentHash = window.location.hash || '#dashboard'

    menuItems.forEach((item) => {
        // Add click handler
        item.addEventListener('click', function (e) {
            menuItems.forEach((i) => i.classList.remove('active'))
            this.classList.add('active')

            // Update content based on hash
            updateContent(this.getAttribute('href').substring(1))
        })

        // Set initial active state
        if (item.getAttribute('href') === currentHash) {
            item.classList.add('active')
        }
    })

    // Handle initial page load
    updateContent(currentHash.substring(1))
})

function updateContent(section) {
    const contentArea = document.querySelector('.admin-content')

    // Clear existing content
    contentArea.innerHTML = ''

    // Add new content based on section
    switch (section) {
        case 'dashboard':
            renderDashboard(contentArea)
            break
        case 'movie':
            renderMovieManagement(contentArea)
            break
        case 'customers':
            renderCustomerManagement(contentArea)
            break
        case 'food':
            renderFoodManagement(contentArea)
            break
        case 'promotions':
            renderPromotionManagement(contentArea)
            break
        case 'services':
            renderServiceManagement(contentArea)
            break
        case 'tickets':
            renderTicketManagement(contentArea)
            break
        default:
            renderDashboard(contentArea)
    }
}

function renderDashboard(container) {
    container.innerHTML = `
        <h2>Bảng điều khiển</h2>
        <div class="dashboard-stats">
            <div class="stat-card">
                <h3>Tổng doanh thu</h3>
                <p class="stat-value">0 VNĐ</p>
            </div>
            <div class="stat-card">
                <h3>Số vé đã bán</h3>
                <p class="stat-value">0</p>
            </div>
            <div class="stat-card">
                <h3>Khách hàng mới</h3>
                <p class="stat-value">0</p>
            </div>
            <div class="stat-card">
                <h3>Suất chiếu hôm nay</h3>
                <p class="stat-value">0</p>
            </div>
        </div>
    `
}

// Giả lập dữ liệu phim (sau này sẽ lấy từ backend)

function renderMovieManagement(container) {
    // Chuẩn hóa dữ liệu phim cũ
    let movies = JSON.parse(localStorage.getItem('movies')) || []

    // Chuẩn hóa dữ liệu phim cũ nếu cần
    movies = movies.map((movie) => {
        // Đảm bảo duration là số
        if (typeof movie.duration === 'string') {
            movie.duration = parseInt(movie.duration.replace(/[^0-9]/g, '')) || 0
        }
        return movie
    })

    // Lưu lại dữ liệu đã chuẩn hóa
    localStorage.setItem('movies', JSON.stringify(movies))

    container.innerHTML = `
        <h2>Quản lý Phim</h2>
        <div class="movie-management">
            <div class="add-movie-section">
                <h3>Thêm/Sửa phim</h3>
                <form id="movieForm" class="add-movie-form">
                    <input type="hidden" id="movieId" name="id">
                    <div class="form-group">
                        <label for="movieName">Tên phim </label>
                        <input type="text" id="movieName" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="movieImage">Hình ảnh (URL) </label>
                        <input type="text" id="movieImage" name="image" required placeholder="img/ten-phim.jpg" 
                               onchange="previewImage(this.value)">
                        <div id="currentImage" class="preview-container"></div>
                    </div>
                    <div class="form-group">
                        <label for="movieVideoId">Video ID (YouTube) </label>
                        <input type="text" id="movieVideoId" name="videoId" required 
                               placeholder="Ví dụ: c0SG_zJarME"
                               onchange="validateYouTubeId(this.value)">
                        <div id="videoPreview" class="preview-container"></div>
                    </div>
                    <div class="form-group">
                        <label for="movieYear">Năm phát hành </label>
                        <input type="number" id="movieYear" name="year" required min="1900" max="2100">
                    </div>
                    <div class="form-group">
                        <label for="movieDuration">Thời lượng (phút) </label>
                        <input type="number" id="movieDuration" name="duration" required min="1" max="999" 
                               oninput="this.value = this.value.replace(/[^0-9]/g, '')">
                    </div>
                    <div class="form-group">
                        <label for="movieGenre">Thể loại </label>
                        <input type="text" id="movieGenre" name="genre" required>
                    </div>
                    <div class="form-group">
                        <label for="movieDirector">Đạo diễn </label>
                        <input type="text" id="movieDirector" name="director" required>
                    </div>
                    <div class="form-group">
                        <label for="movieCast">Diễn viên </label>
                        <input type="text" id="movieCast" name="cast" required>
                    </div>
                    <div class="form-group">
                        <label for="movieDescription">Mô tả </label>
                        <textarea id="movieDescription" name="description" required rows="4"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="submit-button" id="submitMovie">Lưu phim</button>
                        <button type="button" class="cancel-button" id="cancelEdit" style="display: none">Hủy</button>
                    </div>
                </form>
            </div>
            
            <div class="movie-list-section">
                <h3>Danh sách phim</h3>
                <div class="movie-list">
                    ${renderMovieList(movies)}
                </div>
            </div>
        </div>
    `

    // Preview image function
    window.previewImage = function (url) {
        const currentImageDiv = document.getElementById('currentImage')
        if (url) {
            currentImageDiv.innerHTML = `
                <img src="${url}" alt="Preview" style="max-width: 200px; margin-top: 8px;" 
                onerror="this.onerror=null; this.src='img/error.jpg'; alert('Không thể tải hình ảnh. Vui lòng kiểm tra URL');">
            `
        } else {
            currentImageDiv.innerHTML = ''
        }
    }

    // Validate YouTube ID
    window.validateYouTubeId = function (videoId) {
        const videoPreviewDiv = document.getElementById('videoPreview')
        if (videoId) {
            // Basic validation for YouTube ID format
            if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
                alert('Video ID không hợp lệ. Vui lòng kiểm tra lại.')
                return false
            }

            videoPreviewDiv.innerHTML = `
                <iframe width="200" height="113" 
                        src="https://www.youtube.com/embed/${videoId}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen
                        style="margin-top: 8px;">
                </iframe>
            `
            return true
        } else {
            videoPreviewDiv.innerHTML = ''
            return false
        }
    }

    // Add form submission handler
    const movieForm = document.getElementById('movieForm')
    const cancelButton = document.getElementById('cancelEdit')

    movieForm.addEventListener('submit', function (e) {
        e.preventDefault()

        // Validate all required fields
        const requiredFields = [
            'name',
            'image',
            'videoId',
            'year',
            'duration',
            'genre',
            'director',
            'cast',
            'description',
        ]
        for (const field of requiredFields) {
            const input = this.elements[field]
            if (!input.value.trim()) {
                alert(`Vui lòng nhập ${input.previousElementSibling.textContent.replace(' *', '')}`)
                input.focus()
                return
            }
        }

        // Validate YouTube ID
        if (!validateYouTubeId(this.elements.videoId.value)) {
            return
        }

        // Get form data
        const formData = new FormData(this)
        const movieData = Object.fromEntries(formData)

        // Additional validation
        if (parseInt(movieData.year) < 1900 || parseInt(movieData.year) > 2100) {
            alert('Năm phát hành không hợp lệ')
            return
        }

        const duration = parseInt(movieData.duration)
        if (isNaN(duration) || duration <= 0 || duration > 999) {
            alert('Thời lượng phim không hợp lệ (1-999 phút)')
            return
        }

        // Get existing movies
        const movies = JSON.parse(localStorage.getItem('movies')) || []

        try {
            if (movieData.id) {
                // Edit existing movie
                const index = movies.findIndex((m) => m.id === parseInt(movieData.id))
                if (index !== -1) {
                    movies[index] = {
                        ...movies[index],
                        ...movieData,
                        id: parseInt(movieData.id),
                        year: parseInt(movieData.year),
                        duration: parseInt(movieData.duration),
                    }
                    alert('Phim đã được cập nhật thành công!')
                }
            } else {
                // Add new movie
                const newMovie = {
                    ...movieData,
                    id: Math.max(0, ...movies.map((m) => m.id)) + 1,
                    year: parseInt(movieData.year),
                    duration: parseInt(movieData.duration),
                }
                movies.push(newMovie)
                alert('Phim đã được thêm thành công!')
            }

            // Save to localStorage
            localStorage.setItem('movies', JSON.stringify(movies))

            // Reset form and refresh movie list
            resetForm()
            renderMovieManagement(container)
        } catch (error) {
            console.error('Error saving movie:', error)
            alert('Có lỗi xảy ra khi lưu phim. Vui lòng thử lại.')
        }
    })

    cancelButton.addEventListener('click', () => {
        resetForm()
    })

    // Add event listeners for edit and delete buttons
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('edit-movie')) {
            const movieId = e.target.dataset.id
            const movies = JSON.parse(localStorage.getItem('movies')) || []
            const movie = movies.find((m) => m.id === parseInt(movieId))
            if (movie) {
                fillFormForEdit(movie)
            }
        } else if (e.target.classList.contains('delete-movie')) {
            const movieId = e.target.dataset.id
            if (confirm('Bạn có chắc chắn muốn xóa phim này?')) {
                const movies = JSON.parse(localStorage.getItem('movies')) || []
                const newMovies = movies.filter((m) => m.id !== parseInt(movieId))
                localStorage.setItem('movies', JSON.stringify(newMovies))
                alert('Phim đã được xóa thành công!')
                renderMovieManagement(container)
            }
        }
    })
}

function renderMovieList(movies) {
    if (!movies || movies.length === 0) {
        return '<p class="no-movies">Chưa có phim nào.</p>'
    }

    return `
        <div class="movie-grid">
            ${movies
                .map(
                    (movie) => `
                <div class="movie-card">
                    <div class="movie-image">
                        <img src="${movie.image}" alt="${movie.name}" onerror="this.src='img/error.jpg'">
                    </div>
                    <div class="movie-info">
                        <h4>${movie.name}</h4>
                        <p><strong>Năm:</strong> ${movie.year}</p>
                        <p><strong>Thời lượng:</strong> ${movie.duration || 0} phút</p>
                        <p><strong>Thể loại:</strong> ${movie.genre}</p>
                        <p><strong>Đạo diễn:</strong> ${movie.director}</p>
                    </div>
                    <div class="movie-actions">
                        <button class="edit-movie" data-id="${movie.id}">
                            <i class="fas fa-edit"></i> Sửa
                        </button>
                        <button class="delete-movie" data-id="${movie.id}">
                            <i class="fas fa-trash"></i> Xóa
                        </button>
                    </div>
                </div>
            `
                )
                .join('')}
        </div>
    `
}

function fillFormForEdit(movie) {
    document.getElementById('movieId').value = movie.id
    document.getElementById('movieName').value = movie.name
    document.getElementById('movieImage').value = movie.image
    document.getElementById('movieVideoId').value = movie.videoId
    document.getElementById('movieYear').value = movie.year
    document.getElementById('movieDuration').value = movie.duration
    document.getElementById('movieGenre').value = movie.genre
    document.getElementById('movieDirector').value = movie.director
    document.getElementById('movieCast').value = movie.cast
    document.getElementById('movieDescription').value = movie.description

    // Show previews
    previewImage(movie.image)
    validateYouTubeId(movie.videoId)

    // Update form state
    document.getElementById('submitMovie').textContent = 'Cập nhật phim'
    document.getElementById('cancelEdit').style.display = 'inline-block'
}

function resetForm() {
    document.getElementById('movieForm').reset()
    document.getElementById('movieId').value = ''
    document.getElementById('currentImage').innerHTML = ''
    document.getElementById('videoPreview').innerHTML = ''
    document.getElementById('submitMovie').textContent = 'Thêm phim'
    document.getElementById('cancelEdit').style.display = 'none'
}

function renderCustomerManagement(container) {
    container.innerHTML = `
        <h2>Quản lý vé</h2>
        <div class="ticket-management">
            <div class="ticket-list-section">
                <h3>Danh sách vé đã bán</h3>
                <div class="ticket-filters">
                    <div class="form-group">
                        <label for="movieFilter">Phim:</label>
                        <select id="movieFilter">
                            <option value="">Tất cả</option>
                        </select>
                    </div>
                </div>
                <div class="ticket-list">
                    <table class="ticket-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên phim</th>
                                <th>Rạp</th>
                                <th>Suất chiếu</th>
                                <th>Số ghế</th>
                                <th>Giá tiền</th>
                                <th>Ngày đặt</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody id="ticketTableBody">
                            <!-- Ticket rows will be inserted here -->
                        </tbody>
                    </table>
                </div>
                <div class="ticket-pagination">
                    <button class="pagination-btn" id="prevPage" disabled>
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <span id="pageInfo">Trang 1/1</span>
                    <button class="pagination-btn" id="nextPage" disabled>
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `

    // Load movies for filter
    const movies = JSON.parse(localStorage.getItem('movies')) || []
    const movieFilter = document.getElementById('movieFilter')
    movies.forEach((movie) => {
        const option = document.createElement('option')
        option.value = movie.name
        option.textContent = movie.name
        movieFilter.appendChild(option)
    })

    // Handle movie filter change
    movieFilter.addEventListener('change', loadTickets)

    // Initial load of tickets
    loadTickets()
}

// Helper function to safely parse JSON from localStorage
function safeJSONParse(key, defaultValue = []) {
    try {
        const data = localStorage.getItem(key)
        return data ? JSON.parse(data) : defaultValue
    } catch (error) {
        console.error(`Error parsing data from localStorage[${key}]:`, error)
        return defaultValue
    }
}

// Helper function to safely stringify and save JSON to localStorage
function safeJSONStringify(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data))
        return true
    } catch (error) {
        console.error(`Error saving data to localStorage[${key}]:`, error)
        return false
    }
}

// Update existing functions to use these helpers
function loadTickets() {
    const movieFilter = document.getElementById('movieFilter')?.value || ''

    // Get tickets from localStorage
    let tickets = safeJSONParse('bookings', [])

    // Apply movie filter
    if (movieFilter) {
        tickets = tickets.filter((ticket) => ticket.movieTitle === movieFilter)
    }

    // Store filtered tickets in localStorage for pagination
    safeJSONStringify('filteredTickets', tickets)

    // Load first page
    loadTicketsPage(1)
}

function loadTicketsPage(page, itemsPerPage = 10) {
    const tickets = JSON.parse(localStorage.getItem('filteredTickets') || '[]')
    const totalPages = Math.ceil(tickets.length / itemsPerPage)
    const start = (page - 1) * itemsPerPage
    const end = start + itemsPerPage
    const paginatedTickets = tickets.slice(start, end)

    // Update pagination buttons
    document.getElementById('prevPage').disabled = page <= 1
    document.getElementById('nextPage').disabled = page >= totalPages
    document.querySelector('.ticket-pagination span').textContent = `Trang ${page}/${totalPages}`

    // Update table with paginated tickets
    const tableBody = document.querySelector('.ticket-table tbody')
    if (paginatedTickets.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" class="no-tickets">Không có vé nào</td>
            </tr>
        `
        return
    }

    tableBody.innerHTML = paginatedTickets
        .map(
            (ticket, index) => `
        <tr>
            <td>${start + index + 1}</td>
            <td>${ticket.movieTitle}</td>
            <td>CINEMON</td>
            <td>${ticket.showTime}</td>
            <td>${ticket.selectedSeats}</td>
            <td>${ticket.totalPrice}</td>
            <td>${new Date(ticket.bookingDate).toLocaleDateString('vi-VN')}</td>
            <td>
                <div class="ticket-actions">
                    <button class="action-btn view-ticket" data-id="${ticket.bookingDate}" title="Xem chi tiết">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn delete-ticket" data-id="${ticket.bookingDate}" title="Xóa vé">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `
        )
        .join('')

    // Add event listeners for ticket actions
    document.querySelectorAll('.view-ticket').forEach((btn) => {
        btn.addEventListener('click', () => viewTicketDetails(btn.dataset.id))
    })

    document.querySelectorAll('.delete-ticket').forEach((btn) => {
        btn.addEventListener('click', () => deleteTicket(btn.dataset.id))
    })
}

function deleteTicket(bookingDate) {
    if (confirm('Bạn có chắc chắn muốn xóa vé này không?')) {
        // Get current tickets
        let bookings = safeJSONParse('bookings', [])

        // Remove the ticket
        bookings = bookings.filter((booking) => booking.bookingDate !== bookingDate)

        // Save back to localStorage
        if (safeJSONStringify('bookings', bookings)) {
            alert('Đã xóa vé thành công!')
            loadTickets()
        } else {
            alert('Có lỗi xảy ra khi xóa vé. Vui lòng thử lại.')
        }
    }
}

function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN')
}

function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(price)
}

function viewTicketDetails(bookingDate) {
    const tickets = safeJSONParse('bookings', [])
    const ticket = tickets.find((t) => t.bookingDate === bookingDate)

    if (ticket) {
        alert(`
            Chi tiết vé:
            Tên phim: ${ticket.movieTitle || 'Không có thông tin'}
            Rạp: CINEMON ${ticket.location || 'Không có thông tin'}
            Suất chiếu: ${ticket.showTime || 'Không có thông tin'}
            Số ghế: ${ticket.selectedSeats || 'Không có thông tin'}
            Giá tiền: ${ticket.totalPrice || 'Không có thông tin'}
            Trạng thái: ${ticket.status === 'completed' ? 'Đã thanh toán' : 'Chờ thanh toán'}
        `)
    } else {
        alert('Không tìm thấy thông tin vé!')
    }
}

function renderFoodManagement(container) {
    container.innerHTML = '<h2>Quản lý đồ ăn</h2>'
}

function renderPromotionManagement(container) {
    container.innerHTML = '<h2>Quản lý khuyến mãi</h2>'
}

function renderServiceManagement(container) {
    container.innerHTML = '<h2>Quản lý dịch vụ</h2>'
}

function renderTicketManagement(container) {
    container.innerHTML = `
        <h2>Quản lý vé</h2>
        <div class="ticket-filters">
            <div class="form-group">
                <label>Phim:</label>
                <select id="movie-filter">
                    <option value="">Tất cả</option>
                    <option value="1">DROP: BUỔI HẸN KINH HOÀNG</option>
                </select>
            </div>
           
        </div>

        <div class="ticket-table">
            <table>
                <thead>
                    <tr>
                        <th>Mã vé</th>
                        <th>Tên phim</th>
                        <th>Rạp</th>
                        <th>Suất chiếu</th>
                        <th>Ghế</th>
                        <th>Giá tiền</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <span class="status-badge active">Đang hoạt động</span>
                        </td>
                        <td>
                            <div class="ticket-actions">
                                <button class="action-btn view-ticket" title="Xem chi tiết">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="action-btn delete-ticket" title="Xóa">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="ticket-pagination">
            <button class="pagination-btn" id="prev-page" disabled>
                <i class="fas fa-chevron-left"></i>
            </button>
            <span>Trang 1/1</span>
            <button class="pagination-btn" id="next-page" disabled>
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    `

    // Add event listeners for filters
    document.getElementById('movie-filter')?.addEventListener('change', loadTickets)

    // Add event listeners for pagination
    document.getElementById('prev-page')?.addEventListener('click', () => {
        const currentPage = parseInt(
            document.querySelector('.ticket-pagination span').textContent.split('/')[0].replace('Trang ', '')
        )
        if (currentPage > 1) {
            loadTicketsPage(currentPage - 1)
        }
    })

    document.getElementById('next-page')?.addEventListener('click', () => {
        const [currentPage, totalPages] = document
            .querySelector('.ticket-pagination span')
            .textContent.replace('Trang ', '')
            .split('/')
            .map((num) => parseInt(num))
        if (currentPage < totalPages) {
            loadTicketsPage(currentPage + 1)
        }
    })

    // Initial load of tickets
    loadTickets()
}
