const movies = JSON.parse(localStorage.getItem('movies')) || []
const urlParams = new URLSearchParams(window.location.search)
const movieId = parseInt(urlParams.get('movie_id'))
const movie = movies.find((movie) => movie.id === movieId)

if (movie) {
    const videoId = movie.videoId
    const posterSrc = movie.image

    function getYouTubeEmbedUrl(videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
    }

    document.addEventListener('DOMContentLoaded', () => {
        const poster = document.querySelector('#poster')
        if (poster) {
            poster.src = posterSrc // Cập nhật hình ảnh
        }
        const videoContainer = document.querySelector('.video-container')
        if (!videoContainer) return

        videoContainer.innerHTML = `
        <iframe
            width="100%"
            height="100%"
            src="${getYouTubeEmbedUrl(videoId)}"
            frameborder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
        ></iframe>
    `
    })
} else {
    window.location.href = '#'
}
