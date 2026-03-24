document.addEventListener('DOMContentLoaded', () => {
    // --- THEME TOGGLE LOGIC ---
    const themeToggle = document.getElementById('theme-toggle');
    const iconSpan = themeToggle.querySelector('.icon');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        updateIcon(savedTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = prefersDark ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', initialTheme);
        updateIcon(initialTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (theme === 'dark') {
            iconSpan.textContent = '☀️'; 
        } else {
            iconSpan.textContent = '🌙'; 
        }
    }

    // --- PHOTO GALLERY MODAL LOGIC ---
    const photoBtns = document.querySelectorAll('.btn-photos');
    const modal = document.getElementById('photo-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.modal-close');
    const nextBtn = document.getElementById('modal-next');
    const prevBtn = document.getElementById('modal-prev');

    let currentPhotoArray = [];
    let currentPhotoIndex = 0;

    // Open modal when a "View Photos" button is clicked
    photoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const photosData = btn.getAttribute('data-photos');
            if (photosData) {
                currentPhotoArray = JSON.parse(photosData);
                currentPhotoIndex = 0;
                
                // Hide prev/next buttons if there is only 1 photo
                if(currentPhotoArray.length <= 1) {
                    nextBtn.style.display = 'none';
                    prevBtn.style.display = 'none';
                } else {
                    nextBtn.style.display = 'block';
                    prevBtn.style.display = 'block';
                }

                updateModalImage();
                modal.style.display = 'flex';
            }
        });
    });

    function updateModalImage() {
        modalImg.src = currentPhotoArray[currentPhotoIndex];
    }

    // Close Modal
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Click outside image to close
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Next Button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentPhotoIndex = (currentPhotoIndex + 1) % currentPhotoArray.length;
            updateModalImage();
        });
    }

    // Previous Button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentPhotoIndex = (currentPhotoIndex - 1 + currentPhotoArray.length) % currentPhotoArray.length;
            updateModalImage();
        });
    }
});
