const url = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCG6QEHCBfWZOnv7UVxappyw&part=snippet%2Cid&order=date&maxResults=20';const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'd34b52e7ddmsh1e7282148222763p16bdf6jsn34a59966ba71',
		'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
	}
};



const content = document.getElementById('content') || null;
const errorMessage = document.getElementById('error-message');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

async function fetchData(url_api){
    const response = await fetch(url_api, options);
    const data = await response.json();

    return data;
}

(async () => {
    try {
        const videos = await fetchData(url);

        if (!videos.items || videos.items.length === 0) throw new Error('No videos found');

        let view = videos.items.slice(0, 20).map(video => `
            <div data-video-id="${video.id.videoId}" 
                class="video-item flex-none w-64 group relative cursor-pointer">
                <div class="flex-none w-64 group relative">
                    <div class="w-full bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75">
                        <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                    </div>
                    <div class="mt-2">
                        <h3 class="text-sm text-gray-700 font-medium truncate">${video.snippet.title}</h3>
                    </div>
                </div>  
            </div>
        `).join('');

        content.innerHTML = view;
        errorMessage.classList.add('hidden'); // Oculta mensaje de error si todo está bien

        
// Reproductor de video
const videoItems = document.querySelectorAll('.video-item');
const videoPlayer = document.getElementById('video-player');
const youtubeIframe = document.getElementById('youtube-iframe');
const closePlayer = document.getElementById('close-player');

videoItems.forEach(item => {
    item.addEventListener('click', () => {
        const videoId = item.getAttribute('data-video-id');
        youtubeIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        videoPlayer.classList.remove('hidden');
    });
});

// Cerrar reproductor
closePlayer.addEventListener('click', () => {
    youtubeIframe.src = '';
    videoPlayer.classList.add('hidden');
});

    } catch (error) {
     console.error('Error fetching data:', error);
        errorMessage.classList.remove('hidden');
    }
})();

// Carrusel
prevBtn.addEventListener('click', () => {
    content.scrollBy({ left: -300, behavior: 'smooth' });
});

nextBtn.addEventListener('click', () => {
    content.scrollBy({ left: 300, behavior: 'smooth' });
});

