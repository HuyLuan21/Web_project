const movies = JSON.parse(localStorage.getItem('movies')) || []
const urlParams = new URLSearchParams(window.location.search)
const movieId = parseInt(urlParams.get('movie_id'))
const movie = movies.find((movie) => movie.id === movieId)

if (movie) {
    const { videoId, image: posterSrc, name, year, genre, duration, description, director, cast } = movie

    function getYouTubeEmbedUrl(videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
    }

    document.addEventListener('DOMContentLoaded', () => {
        // Get DOM elements
        const elements = {
            poster: document.querySelector('#poster'),
            title: document.querySelector('.movie-title'),
            year: document.querySelector('.release-date'),
            genre: document.querySelector('.movie-genres'),
            duration: document.querySelector('.duration'),
            description: document.querySelector('.movie-description p'),
            director: document.querySelector('.info-item:nth-child(1) .value'),
            cast: document.querySelector('.info-item:nth-child(2) .value'),
            videoContainer: document.querySelector('.video-container'),
        }

        // Update movie details
        if (elements.poster) elements.poster.src = posterSrc
        if (elements.title) elements.title.textContent = name
        if (elements.year) elements.year.innerHTML = `<i class="far fa-calendar"></i> ${year}`
        if (elements.genre) elements.genre.innerHTML = `<span class="genre">${genre}</span>`
        if (elements.duration) elements.duration.innerHTML = `<i class="far fa-clock"></i> ${duration} phút`
        if (elements.description) elements.description.textContent = description
        if (elements.director) elements.director.textContent = director
        if (elements.cast) elements.cast.textContent = cast

        // Add video if container exists
        if (elements.videoContainer) {
            elements.videoContainer.innerHTML = `
                <iframe
                    width="100%"
                    height="100%"
                    src="${getYouTubeEmbedUrl(videoId)}"
                    frameborder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            `
        }
    })
} else {
    window.location.href = 'index.html'
}
