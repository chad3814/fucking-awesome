let videos = new Map();
let popupDiv = null;
function updateVideoList() {
    while (popupDiv.firstChild) {
        popupDiv.removeChild(popupDiv.firstChild);
    }
    if (videos.size === 0) {
        const noVideosMessage = document.createElement("p");
        noVideosMessage.textContent = "No videos available.";
        popupDiv.appendChild(noVideosMessage);
        return;
    }
    const videoList = document.createElement("ul");
    for (const [id, video] of videos) {
        const listItem = document.createElement("li");
        listItem.className = "video-item";
        
        const image = document.createElement("img");
        image.src = video.image;
        image.alt = video.title;
        listItem.appendChild(image);

        const infoDiv = document.createElement("div");
        infoDiv.className = "video-info";
        listItem.appendChild(infoDiv);

        const titleDiv = document.createElement("div");
        titleDiv.className = "video-title";
        infoDiv.appendChild(titleDiv);

        const title = document.createElement("span");
        title.className = "video-name";
        title.textContent = video.title;
        titleDiv.appendChild(title);
        
        const description = document.createElement("p");
        description.textContent = video.description;
        infoDiv.appendChild(description);
        
        const releaseYear = document.createElement("span");
        releaseYear.className = "video-year";
        releaseYear.textContent = video.release_year;
        titleDiv.appendChild(releaseYear);
        
        const downloadDiv = document.createElement("div");
        downloadDiv.className = "video-download";
        infoDiv.appendChild(downloadDiv);

        const videoLink = document.createElement("a");
        videoLink.href = video.video_url;
        videoLink.textContent = "Video";
        videoLink.download = true;
        downloadDiv.appendChild(videoLink);
        
        if (video.vtt_url) {
            const captionsLink = document.createElement("a");
            captionsLink.href = video.vtt_url;
            captionsLink.textContent = "Captions";
            captionsLink.download = true;
            downloadDiv.appendChild(captionsLink);
        }

        videoList.appendChild(listItem);
    }
    popupDiv.appendChild(videoList);
}

browser.runtime.onMessage.addListener(request => {
    if (request.type === "updateVideos") {
        console.log("Received videos:", request.videos);
        videos = new Map(request.videos);
        updateVideoList();
    }
});

window.addEventListener("DOMContentLoaded", async () => {
    popupDiv = document.getElementById("popup-container");
    const videoEntries = await browser.runtime.sendMessage({
        type: "getVideos"
    });
    console.log("Initial video entries:", videoEntries);
    videos = new Map(videoEntries);
    updateVideoList();
});

