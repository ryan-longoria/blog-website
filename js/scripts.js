// Mobile Menu Toggle with Animation
const menuToggle = document.getElementById('mobile-menu');
const nav = document.querySelector('nav ul');
const dropdown = document.querySelector('.dropdown');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('open');

        // Toggle aria-expanded attribute for accessibility
        const isExpanded = menuToggle.classList.contains('open');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });
}

// Handle Dropdown Click on Mobile
if (dropdown) {
    dropdown.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault(); // Prevent default link behavior
            dropdown.querySelector('.dropdown-content').classList.toggle('show');
        }
    });
}

// Close the dropdown if clicked outside
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Initialize Particles.js
if (window.particlesJS) {
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 20,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true
            },
            "size": {
                "value": 3,
                "random": true
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out"
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                }
            }
        },
        "retina_detect": true
    });
}

// Contact Form Validation
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || message === '') {
            e.preventDefault();
            alert('Please fill in all fields.');
        } else {
            alert('Thank you for your message!');
            // Proceed with form submission or AJAX request
        }
    });
}

// Dark Mode Toggle
const toggleButton = document.getElementById('dark-mode-toggle');

if (toggleButton) {
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Change the icon based on the mode
        if (document.body.classList.contains('dark-mode')) {
            toggleButton.textContent = '☀️';
        } else {
            toggleButton.textContent = '🌙';
        }
    });
}

// Fade-in Effect for Posts and Contact Form
document.addEventListener('DOMContentLoaded', () => {
    const elementsToFade = document.querySelectorAll('.post, .contact-form, .post-content');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elementsToFade.forEach(element => {
        observer.observe(element);
    });
});

const filterButtons = document.querySelectorAll('.filter-btn');
const posts = document.querySelectorAll('.posts .post');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'active' class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add 'active' class to the clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        posts.forEach(post => {
            if (filter === 'all' || post.getAttribute('data-category') === filter) {
                post.style.display = 'block';
                // Optionally, trigger fade-in effect
                setTimeout(() => {
                    post.classList.add('visible');
                }, 100);
            } else {
                post.style.display = 'none';
                post.classList.remove('visible');
            }
        });
    });
});

// Initialize by showing all posts
document.addEventListener('DOMContentLoaded', () => {
    const elementsToFade = document.querySelectorAll('.post');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elementsToFade.forEach(element => {
        observer.observe(element);
    });
});