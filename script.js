// Global variables
const sliderDuration = 800
const slideEasing = 'cubic-bezier(0.25, 0.1, 0.25, 1)'
let currentSlideIndex = 0
let slideWidth = 0
let sliderContainer = null

const slideData = [
    {
        image: 'img/CuoiMaGiaiHan.jpg',
        title: 'THE RED ENVELOPE: CƯỚI MÀ GIẢI HẠN',
    },
    {
        image: 'img/TayNghiepDu.png',
        title: 'THE AMATEUR: TAY NGHIỆP DƯ',
    },
    {
        image: 'img/BuoiHenHoKinhHoang.jpg',
        title: 'DROP: BUỔI HẸN HÒ KINH HOÀNG',
    },
    {
        image: 'img/TaThuatHuyetNgai.jpg',
        title: 'PANOR: TÀ THUẬT HUYẾT NGẢI',
    },
    {
        image: 'img/LatMat8-VongTayTrang.png',
        title: 'LẠT MẶT 8: VÒNG TAY TRẮNG',
    },
    {
        image: 'img/ThamTuKiemm_KyAnKhongDau.jpg',
        title: 'THÁM TỬ KIÊM: KỲ ÁN KHÔNG ĐÁNH DẤU',
    },
]

// Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function () {
    const navbarToggler = document.querySelector('.navbar-toggler')
    const navbarCollapse = document.querySelector('.navbar-collapse')
    const barsIcon = navbarToggler.querySelector('.fa-bars')
    const timesIcon = navbarToggler.querySelector('.fa-times')

    // Toggle mobile menu
    navbarToggler.addEventListener('click', function () {
        navbarCollapse.classList.toggle('show')
        navbarToggler.classList.toggle('collapsed')

        // Toggle icons
        if (navbarCollapse.classList.contains('show')) {
            barsIcon.style.display = 'none'
            timesIcon.style.display = 'block'
        } else {
            barsIcon.style.display = 'block'
            timesIcon.style.display = 'none'
        }
    })

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!navbarToggler.contains(event.target) && !navbarCollapse.contains(event.target)) {
            navbarCollapse.classList.remove('show')
            navbarToggler.classList.remove('collapsed')
            barsIcon.style.display = 'block'
            timesIcon.style.display = 'none'
        }
    })

    // Close menu when clicking on a menu item
    const navItems = document.querySelectorAll('.nav-item a')
    navItems.forEach((item) => {
        item.addEventListener('click', function () {
            navbarCollapse.classList.remove('show')
            navbarToggler.classList.remove('collapsed')
            barsIcon.style.display = 'block'
            timesIcon.style.display = 'none'
        })
    })

    // Active menu item highlight
    const currentLocation = location.href
    const menuItems = document.querySelectorAll('.nav-item a')
    menuItems.forEach((item) => {
        if (item.href === currentLocation) {
            item.parentElement.classList.add('active')
        }
    })

    // Slider Functionality
    sliderContainer = document.querySelector('.slider-container')
    console.log('Slider Container:', sliderContainer)
    const prevBtn = document.querySelector('.slider-arrow.prev')
    const nextBtn = document.querySelector('.slider-arrow.next')
    const dots = document.querySelectorAll('.slider-dot')

    // render slides
    const slideHtmls = slideData.map((slide, index) => {
        return `
            <div class="slide-wrapper" data-index="${index}">
                <div class="slide">
                    <div class="slide-image">
                        <img src="${slide.image}" alt="${slide.title}" />
                    </div>
                    <div class="slide-content">
                        <h2 class="slide-title">${slide.title}</h2>
                        <div class="slide-buttons"> 
                            <a href="#" class="slide-button book-now">
                                <i class="fas fa-ticket-alt"></i>
                                MUA VÉ NGAY
                            </a>
                            <a href="#" class="slide-button more-info">
                                <i class="fas fa-info-circle"></i>
                                THÔNG TIN CHI TIẾT
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `
    })

    const dotHtmls = slideData.map((slide, index) => {
        return `
            <div class="slider-dot ${index === currentSlideIndex ? 'active' : ''}" data-index="${index}"></div>
        `
    })

    // Add slides and dots to DOM
    sliderContainer.innerHTML = slideHtmls.join('')
    document.querySelector('.slider-nav').innerHTML = dotHtmls.join('')

    // Get slide elements after they are created
    const slideElements = document.querySelectorAll('.slide-wrapper')
    console.log('Slide Elements:', slideElements)
    if (slideElements.length > 0) {
        slideWidth = slideElements[0].clientWidth
        console.log('Slide Width:', slideWidth)
    }

    // Initialize dots
    initializeDots()
    console.log('Current Slide Index:', currentSlideIndex)

    // Event listeners for buttons
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation() // Prevent event from bubbling up
        nextSlide()
    })
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation() // Prevent event from bubbling up
        prevSlide()
    })

    // Touch and mouse events for all devices
    let touchStartX = 0
    let touchEndX = 0
    let isDragging = false
    let isClick = true
    let clickTimeout = null

    // Mouse events
    const slider = document.querySelector('.main-slider')
    slider.addEventListener('mousedown', (e) => {
        // Only handle drag if clicking on the slide content, not buttons
        if (!e.target.closest('.slider-arrow')) {
            isDragging = true
            isClick = true
            touchStartX = e.pageX
            e.preventDefault() // Prevent text selection
        }
    })

    slider.addEventListener('mousemove', (e) => {
        if (!isDragging) return
        touchEndX = e.pageX

        // Calculate the distance moved
        const diff = touchStartX - touchEndX
        if (Math.abs(diff) > 10) {
            // Increased threshold to detect movement
            isClick = false
            if (clickTimeout) {
                clearTimeout(clickTimeout)
                clickTimeout = null
            }
        }

        const slides = document.querySelectorAll('.slide-wrapper')
        const slideWidth = slides[0].clientWidth

        // Move the slider while dragging
        sliderContainer.style.transition = 'none'
        sliderContainer.style.transform = `translateX(-${currentSlideIndex * slideWidth + diff}px)`
    })

    slider.addEventListener('mouseup', (e) => {
        if (!isDragging) return
        isDragging = false

        if (!isClick) {
            handleSwipe()
        } else {
            // Handle click after a short delay
            clickTimeout = setTimeout(() => {
                if (!isDragging) {
                    // Handle click event here if needed
                }
            }, 100)
        }
    })

    slider.addEventListener('mouseleave', () => {
        if (!isDragging) return
        isDragging = false
        if (!isClick) {
            handleSwipe()
        }
        if (clickTimeout) {
            clearTimeout(clickTimeout)
            clickTimeout = null
        }
    })

    // Touch events
    slider.addEventListener('touchstart', (e) => {
        isClick = true
        touchStartX = e.touches[0].pageX
        e.preventDefault()
    })

    slider.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].pageX

        // Calculate the distance moved
        const diff = touchStartX - touchEndX
        if (Math.abs(diff) > 10) {
            // Increased threshold to detect movement
            isClick = false
            if (clickTimeout) {
                clearTimeout(clickTimeout)
                clickTimeout = null
            }
        }

        const slides = document.querySelectorAll('.slide-wrapper')
        const slideWidth = slides[0].clientWidth

        // Move the slider while dragging
        sliderContainer.style.transition = 'none'
        sliderContainer.style.transform = `translateX(-${currentSlideIndex * slideWidth + diff}px)`
    })

    slider.addEventListener('touchend', () => {
        if (!isClick) {
            handleSwipe()
        }
        if (clickTimeout) {
            clearTimeout(clickTimeout)
            clickTimeout = null
        }
    })

    function handleSwipe() {
        const swipeThreshold = 100 // Increased threshold
        const diff = touchStartX - touchEndX
        const slides = document.querySelectorAll('.slide-wrapper')
        const slideWidth = slides[0].clientWidth

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left (next)
                nextSlide()
            } else {
                // Swipe right (previous)
                prevSlide()
            }
        } else {
            // If swipe distance is not enough, return to current position
            sliderContainer.style.transition = `transform ${sliderDuration}ms ${slideEasing}`
            sliderContainer.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`
        }
    }

    // Dot Navigation
    const slides = document.querySelectorAll('.slide')

    function handleDotClick(dot, index) {
        // Update current slide index
        currentSlideIndex = index

        // Move to the selected slide
        sliderContainer.style.transition = `transform ${sliderDuration}ms ${slideEasing}`
        sliderContainer.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`

        // Update dot active state
        updateDotActive(currentSlideIndex)
    }

    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => handleDotClick(dot, index))
    })

    // Function to update slide width and position
    function updateSlideWidth() {
        const slideElements = document.querySelectorAll('.slide-wrapper')
        if (slideElements.length > 0) {
            slideWidth = slideElements[0].clientWidth
            // Update current slide position
            sliderContainer.style.transition = 'none'
            sliderContainer.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`
        }
    }

    // Initial setup
    updateSlideWidth()

    // Update on window resize
    let resizeTimeout
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(function () {
            updateSlideWidth()
        }, 250) // Debounce resize event
    })
})

// Update dot active state
function updateDotActive(index) {
    const dots = document.querySelectorAll('.slider-dot')
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active')
        } else {
            dot.classList.remove('active')
        }
    })
}

// Initialize dots
function initializeDots() {
    const sliderNav = document.querySelector('.slider-nav')
    if (!sliderNav) {
        console.error('Slider navigation container not found')
        return
    }

    // Clear existing dots
    sliderNav.innerHTML = ''

    // Create new dots based on slideData
    slideData.forEach((_, index) => {
        const dot = document.createElement('div')
        dot.className = `slider-dot ${index === currentSlideIndex ? 'active' : ''}`
        dot.setAttribute('data-index', index)
        sliderNav.appendChild(dot)
    })

    // Add click event listeners to dots
    const dots = document.querySelectorAll('.slider-dot')
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Update current slide index
            currentSlideIndex = index

            // Move to the selected slide
            sliderContainer.style.transition = `transform ${sliderDuration}ms ${slideEasing}`
            sliderContainer.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`

            // Update dot active state
            updateDotActive(currentSlideIndex)
        })
    })
}

const nextSlide = () => {
    const slideList = document.querySelectorAll('.slide-wrapper')
    const slideWidth = slideList[0].clientWidth

    if (currentSlideIndex === slideList.length - 1) {
        // Move from last to first slide
        sliderContainer.style.transition = `transform ${sliderDuration}ms ${slideEasing}`
        sliderContainer.style.transform = `translateX(0)`
        currentSlideIndex = 0
    } else {
        // Normal next slide
        sliderContainer.style.transition = `transform ${sliderDuration}ms ${slideEasing}`
        sliderContainer.style.transform = `translateX(-${(currentSlideIndex + 1) * slideWidth}px)`
        currentSlideIndex++
    }

    // Update dot active state
    updateDotActive(currentSlideIndex)
}

const prevSlide = () => {
    const slideList = document.querySelectorAll('.slide-wrapper')
    const slideWidth = slideList[0].clientWidth

    if (currentSlideIndex === 0) {
        // Move from first to last slide
        sliderContainer.style.transition = `transform ${sliderDuration}ms ${slideEasing}`
        sliderContainer.style.transform = `translateX(-${(slideList.length - 1) * slideWidth}px)`
        currentSlideIndex = slideList.length - 1
    } else {
        // Normal previous slide
        sliderContainer.style.transition = `transform ${sliderDuration}ms ${slideEasing}`
        sliderContainer.style.transform = `translateX(-${(currentSlideIndex - 1) * slideWidth}px)`
        currentSlideIndex--
    }

    // Update dot active state
    updateDotActive(currentSlideIndex)
}
