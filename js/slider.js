document.addEventListener('DOMContentLoaded', function () {
    // Global variables
    const sliderDuration = 600
    const slideEasing = 'cubic-bezier(0.25, 0.1, 0.25, 1)'
    let currentSlideIndex = 0

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
    const sliderContainer = document.querySelector('.slider-container')
    const prevBtn = document.querySelector('.slider-arrow.prev')
    const nextBtn = document.querySelector('.slider-arrow.next')
    const dots = document.querySelectorAll('.slider-dot')
    const slideElements = document.querySelectorAll('.slide')

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
                            <a href="seatselect.html" class="slide-button book-now">
                                <i class="fas fa-ticket-alt"></i>
                                MUA VÉ NGAY
                            </a>
                            <a href="detail.html" class="slide-button more-info">
                                <i class="fas fa-info-circle"></i>
                                THÔNG TIN CHI TIẾT
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `
    })

    sliderContainer.innerHTML = slideHtmls.join('')

    // Initialize dots
    const dotHtmls = slideData.map((_, index) => {
        return `<div class="slider-dot ${index === currentSlideIndex ? 'active' : ''}" data-index="${index}"></div>`
    })
    document.querySelector('.slider-nav').innerHTML = dotHtmls.join('')

    const nextSlide = () => {
        const slideList = document.querySelectorAll('.slide-wrapper')
        const slideWidth = slideList[0].clientWidth

        if (currentSlideIndex >= slideList.length - 1) {
            // Khi ở slide cuối, chuẩn bị chuyển về slide đầu
            const firstSlide = slideList[0].cloneNode(true)
            sliderContainer.appendChild(firstSlide)

            currentSlideIndex++
            sliderContainer.style.transition = `transform ${sliderDuration}ms ${slideEasing}`
            sliderContainer.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`

            // Cập nhật dot về vị trí đầu tiên
            updateDotActive(0)

            setTimeout(() => {
                sliderContainer.style.transition = 'none'
                currentSlideIndex = 0
                sliderContainer.style.transform = `translateX(0)`
                sliderContainer.removeChild(firstSlide)
            }, sliderDuration)
        } else {
            currentSlideIndex++
            sliderContainer.style.transition = `transform ${sliderDuration}ms ${slideEasing}`
            sliderContainer.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`
            updateDotActive(currentSlideIndex)
        }
    }

    const prevSlide = () => {
        const slideList = document.querySelectorAll('.slide-wrapper')
        const slideWidth = slideList[0].clientWidth

        if (currentSlideIndex <= 0) {
            // Khi ở slide đầu, chuẩn bị chuyển về slide cuối
            const lastSlide = slideList[slideList.length - 1].cloneNode(true)
            sliderContainer.insertBefore(lastSlide, slideList[0])

            sliderContainer.style.transition = 'none'
            sliderContainer.style.transform = `translateX(-${slideWidth}px)`

            // Cập nhật dot về vị trí cuối cùng
            updateDotActive(slideList.length - 1)

            setTimeout(() => {
                sliderContainer.style.transition = `transform ${sliderDuration}ms ${slideEasing}`
                sliderContainer.style.transform = 'translateX(0)'

                setTimeout(() => {
                    sliderContainer.style.transition = 'none'
                    currentSlideIndex = slideList.length - 1
                    sliderContainer.removeChild(lastSlide)
                    sliderContainer.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`
                }, sliderDuration)
            }, 50)
        } else {
            currentSlideIndex--
            sliderContainer.style.transition = `transform ${sliderDuration}ms ${slideEasing}`
            sliderContainer.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`
            updateDotActive(currentSlideIndex)
        }
    }

    // Event listeners for buttons
    nextBtn.addEventListener('click', nextSlide)
    prevBtn.addEventListener('click', prevSlide)

    // Update dots
    function updateDotActive(index) {
        const dots = document.querySelectorAll('.slider-dot')
        const totalSlides = slideData.length

        // Đảm bảo index nằm trong khoảng hợp lệ
        const normalizedIndex = ((index % totalSlides) + totalSlides) % totalSlides

        dots.forEach((dot, i) => {
            if (i === normalizedIndex) {
                dot.classList.add('active')
            } else {
                dot.classList.remove('active')
            }
        })
    }

    // Initialize dots
    function initializeDots() {
        const dots = document.querySelectorAll('.slider-dot')
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const slideList = document.querySelectorAll('.slide-wrapper')
                const slideWidth = slideList[0].clientWidth

                currentSlideIndex = index
                sliderContainer.style.transition = `transform ${sliderDuration}ms ${slideEasing}`
                sliderContainer.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`
                updateDotActive(currentSlideIndex)
            })
        })
    }

    // Initialize dots
    initializeDots()

    // Handle window resize
    window.addEventListener('resize', () => {
        const slideList = document.querySelectorAll('.slide-wrapper')
        const slideWidth = slideList[0].clientWidth

        // Cập nhật vị trí của slider ngay lập tức không có animation
        sliderContainer.style.transition = 'none'
        sliderContainer.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`
    })
})
