// Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Movie List Navigation
    const movieList = document.querySelector('.movie-list')
    const moviePrevBtn = document.querySelector('.movie-list-arrow.prev')
    const movieNextBtn = document.querySelector('.movie-list-arrow.next')
    const movieCards = document.querySelectorAll('.movie-card')

    if (movieList && moviePrevBtn && movieNextBtn && movieCards.length > 0) {
        // Tính số phim hiển thị mỗi lần dựa vào kích thước container
        const calculateMoviesPerView = () => {
            const containerWidth = movieList.parentElement.offsetWidth - 100 // Trừ padding
            const movieWidth = movieCards[0].offsetWidth + 30 // width + gap
            return Math.floor(containerWidth / movieWidth)
        }

        let moviesPerView = calculateMoviesPerView()

        const nextMovie = () => {
            const maxIndex = movieCards.length - moviesPerView
            if (currentMovieIndex >= maxIndex) {
                // Reset về đầu khi ở cuối
                currentMovieIndex = 0
            } else {
                // Di chuyển theo số phim hiển thị
                currentMovieIndex = Math.min(currentMovieIndex + moviesPerView, maxIndex)
            }
            const translateX = -currentMovieIndex * (movieCards[0].offsetWidth + 30)
            movieList.style.transition = `transform ${sliderDuration}ms ${slideEasing}`
            movieList.style.transform = `translateX(${translateX}px)`
            updateArrowVisibility()
        }

        const prevMovie = () => {
            if (currentMovieIndex <= 0) {
                // Chuyển đến cuối khi ở đầu
                currentMovieIndex = movieCards.length - moviesPerView
            } else {
                // Di chuyển theo số phim hiển thị
                currentMovieIndex = Math.max(currentMovieIndex - moviesPerView, 0)
            }
            const translateX = -currentMovieIndex * (movieCards[0].offsetWidth + 30)
            movieList.style.transition = `transform ${sliderDuration}ms ${slideEasing}`
            movieList.style.transform = `translateX(${translateX}px)`
            updateArrowVisibility()
        }

        // Kiểm tra và ẩn/hiện nút prev/next
        const updateArrowVisibility = () => {
            moviePrevBtn.style.opacity = currentMovieIndex <= 0 ? '0' : '1'
            movieNextBtn.style.opacity = currentMovieIndex >= movieCards.length - moviesPerView ? '0' : '1'
        }

        movieNextBtn.addEventListener('click', nextMovie)
        moviePrevBtn.addEventListener('click', prevMovie)

        // Handle window resize
        window.addEventListener('resize', () => {
            moviesPerView = calculateMoviesPerView()
            // Đảm bảo currentMovieIndex không vượt quá giới hạn mới
            currentMovieIndex = Math.min(currentMovieIndex, movieCards.length - moviesPerView)
            const translateX = -currentMovieIndex * (movieCards[0].offsetWidth + 30)
            movieList.style.transition = 'none'
            movieList.style.transform = `translateX(${translateX}px)`
            updateArrowVisibility()
        })

        // Khởi tạo trạng thái ban đầu
        updateArrowVisibility()
    }

    // Movie Grid Navigation
    function initializeMovieGrid() {
        const gridContainer = document.querySelector('.movie-grid-container')
        const grid = document.querySelector('.movie-grid')
        const prevButton = document.querySelector('.movie-grid-arrow.prev')
        const nextButton = document.querySelector('.movie-grid-arrow.next')
        const dots = document.querySelectorAll('.dot')

        if (!grid || !prevButton || !nextButton) return

        let currentPage = 0
        let itemsPerPage = getItemsPerPage()
        const totalItems = grid.children.length
        const totalPages = Math.ceil(totalItems / itemsPerPage)

        function getItemsPerPage() {
            if (window.innerWidth <= 480) return 1
            if (window.innerWidth <= 768) return 2

            return 4
        }

        function updateGrid() {
            // Move grid to current page
            grid.style.transition = 'transform 0.5s ease'
            grid.style.transform = `translateX(-${currentPage * 100}%)`

            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentPage)
            })

            // Update buttons
            prevButton.style.opacity = currentPage === 0 ? '0.5' : '1'
            nextButton.style.opacity = currentPage === totalPages - 1 ? '0.5' : '1'
        }

        function moveNext() {
            if (currentPage < totalPages - 1) {
                currentPage++
                updateGrid()
            }
        }

        function movePrev() {
            if (currentPage > 0) {
                currentPage--
                updateGrid()
            }
        }

        // Event Listeners
        nextButton.addEventListener('click', moveNext)
        prevButton.addEventListener('click', movePrev)

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentPage = index
                updateGrid()
            })
        })

        // Handle window resize
        window.addEventListener('resize', () => {
            const newItemsPerPage = getItemsPerPage()
            if (newItemsPerPage !== itemsPerPage) {
                itemsPerPage = newItemsPerPage
                currentPage = 0
                updateGrid()
            }
        })

        // Initial setup
        updateGrid()
    }

    // Initialize when DOM is loaded
    initializeMovieGrid()
})

// Combo Grid Navigation
const comboGrid = document.querySelector('.combo-grid')
const comboPrevBtn = document.querySelector('.combo-grid-arrow.prev')
const comboNextBtn = document.querySelector('.combo-grid-arrow.next')
const comboDots = document.querySelector('.combo-grid-dots')
let comboCurrentPage = 0
let comboItemsPerPage = getComboItemsPerPage()

function getComboItemsPerPage() {
    if (window.innerWidth <= 480) return 1
    if (window.innerWidth <= 992) return 2
    if (window.innerWidth <= 1200) return 3
    return 4
}

function initComboGrid() {
    const comboCards = document.querySelectorAll('.combo-card')
    const totalPages = Math.ceil(comboCards.length / comboItemsPerPage)

    // Create dots
    comboDots.innerHTML = ''
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('button')
        dot.classList.add('dot')
        if (i === 0) dot.classList.add('active')
        dot.addEventListener('click', () => {
            comboCurrentPage = i
            updateComboGrid()
        })
        comboDots.appendChild(dot)
    }

    updateComboGrid()
    updateComboButtons()
}

function updateComboGrid() {
    const comboCards = document.querySelectorAll('.combo-card')
    const startIndex = comboCurrentPage * comboItemsPerPage
    const endIndex = startIndex + comboItemsPerPage

    comboCards.forEach((card, index) => {
        if (index >= startIndex && index < endIndex) {
            card.style.display = 'block'
        } else {
            card.style.display = 'none'
        }
    })

    // Update dots
    const dots = comboDots.querySelectorAll('.dot')
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === comboCurrentPage)
    })

    updateComboButtons()
}

function updateComboButtons() {
    const comboCards = document.querySelectorAll('.combo-card')
    const totalPages = Math.ceil(comboCards.length / comboItemsPerPage)

    comboPrevBtn.style.visibility = comboCurrentPage === 0 ? 'hidden' : 'visible'
    comboNextBtn.style.visibility = comboCurrentPage >= totalPages - 1 ? 'hidden' : 'visible'
}

// Event Listeners
comboPrevBtn.addEventListener('click', () => {
    if (comboCurrentPage > 0) {
        comboCurrentPage--
        updateComboGrid()
    }
})

comboNextBtn.addEventListener('click', () => {
    const comboCards = document.querySelectorAll('.combo-card')
    const totalPages = Math.ceil(comboCards.length / comboItemsPerPage)
    if (comboCurrentPage < totalPages - 1) {
        comboCurrentPage++
        updateComboGrid()
    }
})

window.addEventListener('resize', () => {
    const newItemsPerPage = getComboItemsPerPage()
    if (newItemsPerPage !== comboItemsPerPage) {
        comboItemsPerPage = newItemsPerPage
        comboCurrentPage = 0
        initComboGrid()
    }
})

// Initialize combo grid when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initComboGrid()
})

// Video Modal Functionality
document.addEventListener('DOMContentLoaded', function () {
    const videoModal = document.querySelector('.video-modal')
    const videoModalOverlay = document.querySelector('.video-modal-overlay')
    const videoModalClose = document.querySelector('.video-modal-close')
    const trailerFrame = document.getElementById('trailer-frame')
    const playButtons = document.querySelectorAll('.play-button')

    // Open modal with specific trailer
    function openVideoModal(videoId) {
        if (!videoId) return

        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
        console.log('Opening video with URL:', embedUrl)

        trailerFrame.src = embedUrl
        videoModal.classList.add('active')
        document.body.style.overflow = 'hidden'
    }

    // Close modal
    function closeVideoModal() {
        videoModal.classList.remove('active')
        trailerFrame.src = ''
        document.body.style.overflow = ''
    }

    // Add click event to play buttons
    playButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()

            const videoId = button.dataset.videoId
            console.log('Video ID from data attribute:', videoId)

            if (videoId) {
                openVideoModal(videoId)
            } else {
                console.error('No video ID found on button')
            }
        })
    })

    // Close modal events
    videoModalOverlay?.addEventListener('click', closeVideoModal)
    videoModalClose?.addEventListener('click', closeVideoModal)

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeVideoModal()
        }
    })
})
