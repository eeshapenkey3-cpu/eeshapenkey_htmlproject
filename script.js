
document.addEventListener('DOMContentLoaded', () => {

    const formSection = document.querySelector('.form-section form');
    const fullNameInput = document.getElementById('full-name');
    const emailInput = document.getElementById('email');
    const messageTextarea = document.getElementById('message');
    const robotCheckbox = document.querySelector('.checkbox-group input[type="checkbox"]');

    if (!formSection) {
        console.error('Form element not found. Please check the HTML selector.');
        return; 
    }

    function validateField(element) {

        if (element.type === 'checkbox') {
            return element.checked;
        }

        if (element.value.trim() === '') {
            return false;
        }

        if (element.id === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(element.value.trim());
        }

        return true;
    }


    function toggleErrorState(element, isValid) {
        const parentGroup = element.closest('.input-group') || element.closest('.checkbox-group');
        
        if (parentGroup) {
            if (!isValid) {
                parentGroup.classList.add('error');
            } else {
                parentGroup.classList.remove('error');
            }
        }
    }

    formSection.addEventListener('submit', function(event) {

        event.preventDefault();

        let formIsValid = true;

        const requiredElements = [fullNameInput, emailInput, messageTextarea, robotCheckbox];

        requiredElements.forEach(element => {
            const isValid = validateField(element);
            toggleErrorState(element, isValid); 
            
            if (!isValid) {
                formIsValid = false;
            }
        });

        if (formIsValid) {
            console.log('✅ Form is valid! Capturing data...');

            const formData = new FormData(formSection);
            

            const dataToLog = Object.fromEntries(formData.entries());
            
 
            console.log('--- FORM SUBMISSION DATA CAPTURED ---');
            console.log(dataToLog); 
            console.log('JSON Format (copyable):');
            console.log(JSON.stringify(dataToLog, null, 2)); 
            console.log('-----------------------------------');

            alert('You have submitted'); 

            formSection.reset();
            
        } else {
            console.log('❌ Form is invalid. Please complete all required fields.');
        }
    });

    const carouselContainer = document.querySelector('.carousel-container');
    const imagesWrapper = carouselContainer ? carouselContainer.querySelector('.images-wrapper') : null;
    const slides = imagesWrapper ? Array.from(imagesWrapper.querySelectorAll('.slide')) : [];

    if (carouselContainer && imagesWrapper && slides.length > 0) {
        let currentIndex = 0;
        let slideWidth = carouselContainer.clientWidth;

        function updateSizes() {
            slideWidth = carouselContainer.clientWidth;
            slides.forEach(s => { s.style.width = slideWidth + 'px'; });
            imagesWrapper.style.transform = `translateX(${ -currentIndex * slideWidth }px)`;
        }

        updateSizes();
        window.addEventListener('resize', updateSizes);

        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        function goTo(index) {
            currentIndex = (index + slides.length) % slides.length;
            imagesWrapper.style.transform = `translateX(${ -currentIndex * slideWidth }px)`;
        }

        if (prevBtn) prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goTo(currentIndex + 1));
    }

    // Enlarge images on hover (adds/removes a class so CSS handles the animation)
    const hoverTargets = document.querySelectorAll('.media-top-img, .media-column .slide');
    hoverTargets.forEach(img => {
        img.addEventListener('pointerenter', () => img.classList.add('hover-enlarge'));
        img.addEventListener('pointerleave', () => img.classList.remove('hover-enlarge'));
    });
});

