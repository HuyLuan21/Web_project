// Add at the beginning of the file
// Check login status
function checkLoginStatus() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const authButton = document.querySelector('.auth-button')
    const userDropdown = document.querySelector('.user-dropdown')
    const adminMenuItem = document.querySelector('.admin-only')

    if (user) {
        // Hide login button and show user dropdown
        authButton.style.display = 'none'
        userDropdown.style.display = 'block'

        // Show admin menu item if user is admin
        if (user.email === 'admin@gmail.com') {
            adminMenuItem.style.display = 'flex'
        }
    } else {
        // Show login button and hide user dropdown
        authButton.style.display = 'flex'
        userDropdown.style.display = 'none'
    }
}

// Handle user dropdown
function initializeUserDropdown() {
    const userButton = document.querySelector('.user-button')
    const userDropdown = document.querySelector('.user-dropdown')
    const logoutBtn = document.querySelector('.logout-btn')

    // Toggle dropdown on button click
    userButton.addEventListener('click', (e) => {
        e.stopPropagation()
        userDropdown.classList.toggle('active')
    })

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!userDropdown.contains(e.target)) {
            userDropdown.classList.remove('active')
        }
    })

    // Handle logout
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault()
        sessionStorage.removeItem('user')
        window.location.reload()
    })
}

// Initialize authentication features
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus()
    initializeUserDropdown()
})

let selectedLocation = document.querySelector('.location-select select').value

// Add event listener for location change
document.querySelector('.location-select select').addEventListener('change', (e) => {
    selectedLocation = e.target.value
    displayMovies() // Refresh movie display with new location
})

const movieGrid = document.querySelector('.movie-grid')

// Lấy danh sách phim từ localStorage
let movies = JSON.parse(localStorage.getItem('movies')) || []

// Nếu chưa có phim nào trong localStorage, khởi tạo với dữ liệu mẫu
if (movies.length === 0) {
    movies = [
        {
            id: 1,
            name: 'DROP: BUỔI HẸN KINH HOÀNG',
            image: 'img/BuoiHenHoKinhHoang.jpg',
            videoId: 'cQ1eYm_XIcA',
            year: '2025',
            duration: 96,
            genre: 'Horror',
            description:
                'Buổi hẹn hò đầu tiên sau nhiều năm của Violet nhanh chóng trở thành ác mộng khi cô nhận được những tin nhắn ẩn danh kỳ lạ. Kẻ gửi đe dọa giết con trai và em gái cô nếu cô không làm theo yêu cầu của hắn.',
            director: 'Christopher Landon',
            cast: 'Brandon Sklenar, Meghann Fahy; Violett Beane',
        },
        {
            id: 2,
            name: 'LẬT MẶT 8: VÒNG TAY NẮNG',
            image: 'img/LatMat8-VongTayNang.png',
            videoId: 'hUlBTt3NyGI',
            year: '2025',
            duration: 103,
            genre: 'Drama',
            description:
                'Một bộ phim về sự khác biệt quan điểm giữa ba thế hệ ông bà cha mẹ con cháu. Ai cũng đúng ở góc nhìn của mình nhưng đứng trước hoài bão của tuổi trẻ, cuối cùng thì ai sẽ là người phải nghe theo người còn lại? Và nếu ước mơ của những đứa trẻ bị cho là viển vông, thì cơ hội nào và bao giờ tuổi trẻ mới được tự quyết định tương lai của mình?',
            director: 'Lý Hải',
            cast: 'NSƯT Kim Phương, Long Đẹp Trai, NSƯT Tuyết Thu, Quách Ngọc Tuyên, Đoàn Thế Vinh, Hồng Thu, Yuno Bigboi, Anh Tú Wilson, Bảo Ngọc, Tín Nguyễn, Hồ Đông Quan, Cherry Hải My, Rio Hạo Nhiên',
        },
        {
            id: 3,
            name: 'TAY NGHIỆP DƯ',
            image: 'img/TayNghiepDu.png',
            videoId: 'c0SG_zJarME',
            year: '2025',
            duration: '122 ',
            genre: 'Action',
            description:
                'Một bộ phim về sự khác biệt quan điểm giữa ba thế hệ ông bà cha mẹ con cháu. Ai cũng đúng ở góc nhìn của mình nhưng đứng trước hoài bão của tuổi trẻ, cuối cùng thì ai sẽ là người phải nghe theo người còn lại? Và nếu ước mơ của những đứa trẻ bị cho là viển vông, thì cơ hội nào và bao giờ tuổi trẻ mới được tự quyết định tương lai của mình?',
            director: 'James Hawes',
            cast: 'Rami Malek, Rachel Brosnahan, Caitríona Balfe, Jon Bernthal, Michael Stuhlbarg, Laurence Fishburne',
        },
        {
            id: 4,
            name: 'PANOR : TÀ THUẬT HUYẾT NGẢI',
            image: 'img/TaThuatHuyetNgai.jpg',
            videoId: '3pciNGgdY_g',
            year: '2025',
            genre: 'Horror',
            duration: '103 ',
            description:
                'Câu chuyện xoay quanh PANOR, một cô gái trẻ ngây thơ sinh ra vào ngày đen tối khi một người nào đó trong làng giải phóng lời nguyền ma thuật đen. Panor được coi là điềm xấu, một người phụ nữ bị nguyền rủa mang lại vận rủi cho ngôi làng và bất kỳ ai dành thời gian với cô đều có nguy cơ trở thành nạn nhân của ma thuật đen. Panor sớm phát hiện ra rằng có thứ gì đó đen tối và mạnh mẽ đã theo dõi cô kể từ ngày cô được sinh ra, nguyền rủa cô phải sống một cuộc sống khốn khổ.',
            director: 'Putipong Saisikaew',
            cast: 'Cherprang Areekul, Jackrin Kungwankiatichai, Chalita Suansane',
        },
        {
            id: 5,
            name: 'THÁM TỬ KIÊN: KỲ ÁN KHÔNG ĐẦU',
            image: 'img/ThamTuKien_KyAnKhongDau.jpg',
            videoId: 'wc6pZv9e_ew',
            year: '2025',
            genre: 'Mystery',
            duration: '103 ',
            description:
                'Thám Tử Kiên là một nhân vật được yêu thích trong tác phẩm điện của ăn khách của NGƯỜI VỢ CUỐI CÙNG của Victor Vũ, Thám Tử Kiên: Kỳ Không Đầu sẽ là một phim Victor Vũ trở về với thể loại sở trường Kinh Dị - Trinh Thám sau những tác phẩm tình cảm lãng mạn trước đó.',
            director: 'Victor Vũ',
            cast: 'Quốc Huy, Đinh Ngọc Diệp, Quốc Anh, Minh Anh, Anh Phạm',
        },
    ]
    localStorage.setItem('movies', JSON.stringify(movies))
}

let currentMovies = 4 // Số phim hiển thị ban đầu
const moviesPerLoad = 4 // Số phim sẽ hiển thị thêm mỗi lần click
const minMovies = 4 // Số phim tối thiểu hiển thị

function displayMovies() {
    // Lấy lại danh sách phim mới nhất từ localStorage
    const updatedMovies = JSON.parse(localStorage.getItem('movies')) || []

    const movieHTML = updatedMovies
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
                    <span>${movie.duration} phút</span>
                </div>
                <a href="seatselect.html?title=${encodeURIComponent(movie.name)}&location=${encodeURIComponent(
                selectedLocation
            )}" class="movie-button">Đặt vé ngay</a>
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

    if (currentMovies >= updatedMovies.length) {
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

// Thêm event listeners cho các nút
document.getElementById('load-more').addEventListener('click', () => {
    currentMovies += moviesPerLoad
    displayMovies()
})

document.getElementById('hide-movies').addEventListener('click', () => {
    currentMovies = minMovies
    displayMovies()
})

// Hiển thị phim ban đầu
displayMovies()
