// Portfolio Works Data
const portfolioWorks = [
    {
        id: 1,
        title: "Celestial Navigation",
        category: "Interactive Design",
        thumbnailSrc: "", // Placeholder - will use CSS background
        fullImageSrc: "",
        description: "An interactive exploration of celestial bodies and their movements through space. This project combines data visualization with interactive storytelling to create an immersive experience.",
        position: "left",
        aspectRatio: "portrait"
    },
    {
        id: 2,
        title: "Urban Rhythms",
        category: "Graphic Design",
        thumbnailSrc: "",
        fullImageSrc: "",
        description: "A visual study of patterns and rhythms found in urban environments. Through systematic documentation and design exploration, this project reveals the hidden geometries of city life.",
        position: "right",
        aspectRatio: "landscape"
    },
    {
        id: 3,
        title: "Type in Motion",
        category: "Motion Graphics",
        thumbnailSrc: "",
        fullImageSrc: "",
        description: "Experimental typography that explores the relationship between letterforms and movement. This project investigates how motion can enhance typographic communication.",
        position: "left",
        aspectRatio: "square"
    },
    {
        id: 4,
        title: "Data Garden",
        category: "Information Design",
        thumbnailSrc: "",
        fullImageSrc: "",
        description: "A data visualization project that transforms complex environmental data into an organic, garden-like interface. Users can explore climate patterns through an intuitive botanical metaphor.",
        position: "right",
        aspectRatio: "portrait"
    },
    {
        id: 5,
        title: "Computational Weaving",
        category: "Generative Art",
        thumbnailSrc: "",
        fullImageSrc: "",
        description: "Exploring the intersection of traditional weaving patterns and computational design. This project generates unique textile patterns using algorithmic processes inspired by historical craft techniques.",
        position: "left",
        aspectRatio: "landscape"
    },
    {
        id: 6,
        title: "Signal & Noise",
        category: "Interactive Media",
        thumbnailSrc: "",
        fullImageSrc: "",
        description: "An interactive sound visualization that explores the boundary between meaningful signal and random noise. Users can manipulate audio parameters to create unique visual compositions.",
        position: "right",
        aspectRatio: "square"
    }
];

// Create Work Thumbnail Element
function createWorkThumbnail(workData) {
    const workItem = document.createElement('div');
    workItem.className = 'work-item';
    workItem.dataset.workId = workData.id;

    // Create thumbnail
    const thumbnail = document.createElement('div');
    thumbnail.className = 'work-thumbnail';

    // Set height based on aspect ratio
    if (workData.aspectRatio === 'portrait') {
        thumbnail.style.minHeight = '350px';
    } else if (workData.aspectRatio === 'landscape') {
        thumbnail.style.minHeight = '200px';
    } else { // square
        thumbnail.style.minHeight = '280px';
    }

    // Add placeholder color based on ID
    const colors = ['#c9d6df', '#dae5e8', '#b8c9d4', '#d4dfe5', '#a8bac7', '#cdd8de'];
    thumbnail.style.backgroundColor = colors[workData.id % colors.length];

    // Create info section
    const workInfo = document.createElement('div');
    workInfo.className = 'work-info';

    const title = document.createElement('span');
    title.className = 'work-title';
    title.textContent = workData.title;

    const category = document.createElement('span');
    category.className = 'work-category';
    category.textContent = workData.category;

    workInfo.appendChild(title);
    workInfo.appendChild(category);

    workItem.appendChild(thumbnail);
    workItem.appendChild(workInfo);

    // Add click event listener
    workItem.addEventListener('click', () => expandWork(workData.id));

    return workItem;
}

// Populate Gallery with Works
function populateGallery() {
    const leftSpan = document.getElementById('left');
    const rightSpan = document.getElementById('right');

    // Clear existing content
    leftSpan.innerHTML = '';
    rightSpan.innerHTML = '';

    // Distribute works to left and right columns
    portfolioWorks.forEach(work => {
        const thumbnail = createWorkThumbnail(work);

        if (work.position === 'left') {
            leftSpan.appendChild(thumbnail);
        } else {
            rightSpan.appendChild(thumbnail);
        }
    });
}

// Populate Detail View with Work Data
function populateDetailView(workData) {
    document.getElementById('detailTitle').textContent = workData.title;
    document.getElementById('detailCategory').textContent = workData.category;
    document.getElementById('detailText').textContent = workData.description;

    const detailImage = document.getElementById('detailMainImage');

    // Set placeholder styling
    if (workData.aspectRatio === 'portrait') {
        detailImage.style.minHeight = '600px';
    } else if (workData.aspectRatio === 'landscape') {
        detailImage.style.minHeight = '400px';
    } else {
        detailImage.style.minHeight = '500px';
    }

    // Set placeholder color
    const colors = ['#c9d6df', '#dae5e8', '#b8c9d4', '#d4dfe5', '#a8bac7', '#cdd8de'];
    detailImage.style.backgroundColor = colors[workData.id % colors.length];

    // If real image source exists, use it
    if (workData.fullImageSrc) {
        detailImage.src = workData.fullImageSrc;
        detailImage.alt = workData.title;
    } else {
        detailImage.src = '';
        detailImage.alt = 'Placeholder';
    }
}

// Track currently opened work ID
let currentlyOpenWorkId = null;

// Expand Work - Show Detail View
function expandWork(workId) {
    const work = portfolioWorks.find(w => w.id === workId);

    if (!work) {
        console.error('Work not found with ID:', workId);
        return;
    }

    // If clicking on the same work that's already open, close it
    if (currentlyOpenWorkId === workId && document.querySelector('.body').classList.contains('expanded')) {
        collapseWork();
        return;
    }

    // Populate detail view with work data
    populateDetailView(work);

    // Add expanded class to body to trigger CSS transition
    document.querySelector('.body').classList.add('expanded');

    // Update currently open work ID
    currentlyOpenWorkId = workId;
}

// Collapse Work - Return to Grid View
function collapseWork() {
    document.querySelector('.body').classList.remove('expanded');
    currentlyOpenWorkId = null;
}

// Initialize Portfolio on Page Load
document.addEventListener('DOMContentLoaded', () => {
    // Populate the gallery with portfolio works
    populateGallery();

    // Add event listener to close button
    const closeButton = document.getElementById('closeDetail');
    closeButton.addEventListener('click', collapseWork);

    console.log('Portfolio initialized with', portfolioWorks.length, 'works');
});
