// Refresh page on window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        window.location.reload();
    }, 250);
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("tourForm");

    // Form submission handler
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form input values
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();

        // Validate required fields
        if (!firstName || !lastName || !email) {
            alert("Please fill in all required fields.");
            return;
        }

        // Show success message and reset form
        alert(`Thank you, ${firstName}! We will contact you soon.`);
        form.reset();
    });

    // Mobile carousel initialization (for screens <= 768px)
    if (window.innerWidth <= 768) {
        const gallery = document.querySelector('.gallery');
        if (!gallery) return;

        // Get gallery images (limit to first 3)
        const images = Array.from(gallery.querySelectorAll('img')).slice(0, 3);
        
        // Create carousel structure
        const carouselContainer = document.createElement('div');
        carouselContainer.className = 'carousel-container';

        // Create main carousel section with navigation arrows
        const carouselMain = document.createElement('div');
        carouselMain.className = 'carousel-main';
        carouselMain.innerHTML = `
            <img src="${images[0].src}" alt="Warehouse space">
            <div class="carousel-arrows">
                <button class="carousel-arrow prev"><</button>
                <button class="carousel-arrow next">></button>
            </div>
        `;

        // Create preview images section
        const previewsContainer = document.createElement('div');
        previewsContainer.className = 'carousel-previews';
        
        // Add preview images with click handlers
        images.forEach((img, index) => {
            const preview = document.createElement('div');
            preview.className = 'preview-image';
            preview.innerHTML = `<img src="${img.src}" alt="Preview ${index + 1}">`;
            preview.addEventListener('click', () => updateMainImage(index));
            previewsContainer.appendChild(preview);
        });


  

        // Assemble carousel components
        carouselContainer.appendChild(carouselMain);
        carouselContainer.appendChild(previewsContainer);


        // Insert carousel before content
        const content = document.querySelector('.content');
        content.insertBefore(carouselContainer, content.firstChild);

        // Carousel state and main image reference
        let currentIndex = 0;
        const mainImage = carouselMain.querySelector('img');

        // Function to update main carousel image
        function updateMainImage(index) {
            currentIndex = index;
            mainImage.src = images[index].src;
            updatePreviewStates();
        }

        // Function to update preview image states (active/inactive)
        function updatePreviewStates() {
            const previews = previewsContainer.querySelectorAll('.preview-image');
            previews.forEach((preview, index) => {
                preview.style.opacity = index === currentIndex ? '0.7' : '1';
            });
        }

        // Add arrow navigation click handlers
        const prevButton = carouselMain.querySelector('.prev');
        const nextButton = carouselMain.querySelector('.next');

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            console.log(currentIndex);
            updateMainImage(currentIndex);
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateMainImage(currentIndex);
        });

        // Initialize preview states
        updatePreviewStates();
    }
});
