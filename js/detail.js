const trailer = [
    {
        title: 'Buoi Hen Ho Kinh Hoang',
        videoId:
            '<iframe width="560" height="315" src="https://www.youtube.com/embed/PwdtJ3N8pfw?si=3ce0V4onPXa41DBd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    },
    {
        title: 'Dia Dao Mat Troi Trong Bong Toi',
        videoId:
            '<iframe width="560" height="315" src="https://www.youtube.com/embed/7BTwfVoP4YY?si=lvqqLC_AddcQwE9k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    },
    {
        title: 'Tay Nghiep Du',
        videoId:
            '<iframe width="560" height="315" src="https://www.youtu<iframe width="560" height="315" src="https://www.youtube.com/embed/7BTwfVoP4YY?si=lvqqLC_AddcQwE9k" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>be.com/embed/jYuAmonOUvU?si=YKCDztTZHduppE1X" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    },
    {
        title: 'Tim Xac Ma Khong Dau',
        videoId:
            '<iframe width="560" height="315" src="https://www.youtube.com/embed/VbC9gQeJK7o?si=WkxCRg6-DIwDJdsZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
    },
]

const trailerContainer = document.querySelector('.trailer-container')

trailer.forEach((trailer) => {
    const trailerItem = document.createElement('div')
    trailerItem.classList.add('trailer-item')
    trailerItem.innerHTML = trailer.videoId
})

document.addEventListener('DOMContentLoaded', () => {
    const videoModal = document.querySelector('.video-modal')
    const videoContainer = document.getElementById('video-container')
    const modalOverlay = document.querySelector('.video-modal-overlay')
    const modalClose = document.querySelector('.video-modal-close')
    const playButtons = document.querySelectorAll('.play-button')

    // Video data with complete iframe code for each movie
    const trailerData = {
        'DROP: BUỔI HẸN KINH HOÀNG': {
            videoId: 'cQ1eYm_XIcA',
        },
        'LẬT MẶT 8: VÒNG TAY NẮNG': {
            videoId: 'hUlBTt3NyGI',
        },
        'TAY NGHIỆP DƯ': {
            videoId: 'c0SG_zJarME',
        },
        'PANOR : TÀ THUẬT HUYẾT NGẢI': {
            videoId: '3pciNGgdY_g',
        },
    }

    // Function to get clean YouTube embed URL
    function getYouTubeEmbedUrl(videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
    }

    // Function to extract video ID from YouTube URL
    function getYouTubeVideoId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url.match(regExp)
        return match && match[2].length === 11 ? match[2] : null
    }

    // Function to open modal and play video
    function openVideoModal(videoData) {
        const iframe = document.createElement('iframe')
        iframe.style.width = '100%'
        iframe.style.height = '100%'

        // Use the clean embed URL
        iframe.src = getYouTubeEmbedUrl(videoData.videoId)
        iframe.title = 'YouTube video player'
        iframe.frameBorder = '0'
        iframe.allow =
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        iframe.allowFullscreen = true

        // Clear previous content and add new iframe
        videoContainer.innerHTML = ''
        videoContainer.appendChild(iframe)

        // Show modal
        videoModal.classList.add('active')
        document.body.style.overflow = 'hidden'
    }

    // Function to close modal
    function closeVideoModal() {
        videoModal.classList.remove('active')
        videoContainer.innerHTML = '' // Clear the video
        document.body.style.overflow = '' // Restore scrolling
    }

    // Add click event listeners to play buttons
    playButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()
            const movieCard = button.closest('.movie-card')
            const movieTitle = movieCard.querySelector('.movie-title').textContent
            const videoData = trailerData[movieTitle]

            if (videoData) {
                console.log('Playing video for:', movieTitle)
                openVideoModal(videoData)
            } else {
                console.error('No video found for:', movieTitle)
            }
        })
    })

    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', closeVideoModal)

    // Close modal when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal()
        }
    })
})
