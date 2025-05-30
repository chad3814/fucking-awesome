const videos = new Map();

const searchTypes = ['new-qid', 'nodeid', 'similar'];

function listener(details) {
    console.log("Request details:", details);
    const url = new URL(details.url);
    const params = url.searchParams;
    if (!params?.has('searchType') || !searchTypes.includes(params.get('searchType'))) {
        return;
    }
    const filter = browser.webRequest.filterResponseData(details.requestId);
    const decoder = new TextDecoder("utf-8");
    let data = '';

    filter.ondata = event => {
        filter.write(event.data);
        data += decoder.decode(event.data, { stream: true });
    };

    filter.onstop = () => {
        console.log("Filter stopped.");
        filter.disconnect();

        data = JSON.parse(data);
        console.log("Received data:", data);
        for (const video of data.results) {
            if (video.drm !== 0) {
                console.log(`Skipping video ${video.ttile} due to DRM.`);
                continue;
            }
            const release_year = video.release_date ? video.release_date.match(/\d\d\d\d/)[0] : '';
            videos.set(video.id, {
                image: video.main_picture,
                title: video.title,
                description: video.description,
                video_url: video.video_url,
                vtt_url: video.cc_path,
                release_year,
            });
        }
        browser.runtime.sendMessage({
            type: "updateVideos",
            videos: Array.from(videos.entries()),
        });
    }

    filter.onerror = error => {
        console.error("Error in filter:", error);
        filter.disconnect();
    };
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "getVideos") {
        console.log("Sending videos:", Array.from(videos.entries()));
        return sendResponse(Array.from(videos.entries()));
    }
});

browser.webRequest.onBeforeRequest.addListener(
    listener,
    { urls: ["https://fawesome.tv/home/new/v414/api/recipes.php*"]},
    ["blocking"]
);
console.log("Background script loaded and listener registered.");