const videoModal = document.querySelector('.video-modal')
const videoContainer = document.getElementById('video-container')
const modalOverlay = document.querySelector('.video-modal-overlay')
const playButtons = document.querySelectorAll('.play-button')

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
function openVideoModal(videoId) {
    const iframe = document.createElement('iframe')
    iframe.style.width = '100%'
    iframe.style.height = '100%'

    // Use the clean embed URL
    iframe.src = getYouTubeEmbedUrl(videoId)
    iframe.title = 'YouTube video player'
    iframe.frameBorder = '0'
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
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

        const movieId = e.target.dataset.videoId || e.target.parentElement.dataset.videoId

        if (movieId) {
            console.log('Playing video for:', movieId)
            openVideoModal(movieId)
        } else {
            console.error('No video found for:', movieId)
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
