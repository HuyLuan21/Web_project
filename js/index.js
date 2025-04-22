const locationSelect = document.querySelector('.location-select select').value

const movieGrid = document.querySelector('.movie-grid')

const movies = JSON.parse(localStorage.getItem('movies')) || []

localStorage.setItem(
    'movies',
    JSON.stringify([
        {
            id: 1,
            name: 'DROP: BUỔI HẸN KINH HOÀNG',
            image: 'img/BuoiHenHoKinhHoang.jpg',
            videoId: 'cQ1eYm_XIcA',
            year: '2025',
            genre: 'Horror',
        },
        {
            id: 2,
            name: 'LẬT MẶT 8: VÒNG TAY NẮNG',
            image: 'img/LatMat8-VongTayNang.png',
            videoId: 'hUlBTt3NyGI',
            year: '2025',
            genre: 'Drama',
        },
        {
            id: 3,
            name: 'TAY NGHIỆP DƯ',
            image: 'img/TayNghiepDu.png',
            videoId: 'c0SG_zJarME',
            year: '2025',
            genre: 'Action',
        },
        {
            id: 4,
            name: 'PANOR : TÀ THUẬT HUYẾT NGẢI',
            image: 'img/TaThuatHuyetNgai.jpg',
            videoId: '3pciNGgdY_g',
            year: '2025',
            genre: 'Horror',
        },
        {
            id: 55,
            name: 'THÁM TỬ KIÊN: KỲ ÁN KHÔNG ĐẦU',
            image: 'img/ThamTuKien_KyAnKhongDau.jpg',
            videoId: 'wc6pZv9e_ew',
            year: '2025',
            genre: 'Mystery',
        },
    ])
)

let currentMovies = 4 // Số phim hiển thị ban đầu
const moviesPerLoad = 4 // Số phim sẽ hiển thị thêm mỗi lần click
const minMovies = 4 // Số phim tối thiểu hiển thị

function displayMovies() {
    const movieHTML = movies
        .slice(0, currentMovies)
        .map((movie) => {
            return `
             <div class="movie-card">
                 <div class="movie-poster">
                <img src="${movie.image}" alt="${movie.name}" />
                <div class="play-button" data-video-id="${movie.videoId}">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.name}</h3>
                <div class="movie-meta">
                    <span>${movie.year}</span>
                    <span>${movie.genre}</span>
                </div>
                <a href="seatselect.html?title=${movie.name}&location=${locationSelect}" class="movie-button">Đặt vé ngay</a>
            </div>
        </div>
    `
        })
        .join('')

    movieGrid.innerHTML = movieHTML

    // Khởi tạo lại sự kiện click cho các nút play trailer
    initializePlayButtons()

    // Hiển thị hoặc ẩn các nút dựa trên số lượng phim
    const loadMoreButton = document.getElementById('load-more')
    const hideButton = document.getElementById('hide-movies')

    if (currentMovies >= movies.length) {
        loadMoreButton.style.display = 'none'
    } else {
        loadMoreButton.style.display = 'block'
    }

    // Chỉ hiện nút ẩn khi số phim hiện tại lớn hơn số phim tối thiểu
    if (currentMovies > minMovies) {
        hideButton.style.display = 'block'
    } else {
        hideButton.style.display = 'none'
    }
}

// Tách phần xử lý sự kiện play button thành một hàm riêng
function initializePlayButtons() {
    const playButtons = document.querySelectorAll('.play-button')
    playButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()

            const videoId = button.dataset.videoId

            if (videoId) {
                console.log('Playing video for:', videoId)
                openVideoModal(videoId)
            } else {
                console.error('No video found for:', videoId)
            }
        })
    })
}

// Thêm sự kiện click cho nút "Xem thêm"
document.getElementById('load-more').addEventListener('click', () => {
    currentMovies += moviesPerLoad
    displayMovies()
})

// Thêm sự kiện click cho nút "Ẩn bớt"
document.getElementById('hide-movies').addEventListener('click', () => {
    currentMovies = minMovies
    displayMovies()
})

displayMovies()
