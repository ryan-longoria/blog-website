document.addEventListener('DOMContentLoaded', () => {

    const searchInput = document.getElementById('search-input');
    const timeFilterButtons = document.querySelectorAll('.time-filter-btn');
    const sortSelect = document.getElementById('sort-select');
    const posts = document.querySelectorAll('.post');
    const categoryContent = document.querySelector('.category-content');

    // Fade-in Effect for Posts
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

    // Search Functionality
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();

        posts.forEach(post => {
            const postTitle = post.querySelector('h3').innerText.toLowerCase();
            const postContent = post.querySelector('p').innerText.toLowerCase();

            if (postTitle.includes(query) || postContent.includes(query)) {
                post.style.display = '';
            } else {
                post.style.display = 'none';
            }
        });
    });

    // Time Filtering
    timeFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            timeFilterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const timeframe = button.getAttribute('data-timeframe');
            filterPostsByTime(timeframe);
        });
    });

    function filterPostsByTime(timeframe) {
        const now = new Date();

        posts.forEach(post => {
            const postDateStr = post.getAttribute('data-date');
            const postDate = new Date(postDateStr);
            const timeDiff = now - postDate;
            const daysDiff = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days

            let displayPost = false;

            if (timeframe === 'all') {
                displayPost = true;
            } else if (timeframe === '7' && daysDiff <= 7) {
                displayPost = true;
            } else if (timeframe === '30' && daysDiff <= 30) {
                displayPost = true;
            } else if (timeframe === '365' && daysDiff <= 365) {
                displayPost = true;
            }

            if (displayPost) {
                post.style.display = '';
            } else {
                post.style.display = 'none';
            }
        });
    }

    // Set default time filter to 'All Time' on page load
    const defaultTimeFilterButton = document.querySelector('.time-filter-btn[data-timeframe="all"]');
    if (defaultTimeFilterButton) {
        defaultTimeFilterButton.click();
    }

    // Sorting Functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const sortOrder = sortSelect.value;
            sortPosts(sortOrder);
        });

        // Set default sort order to 'Newest First' on page load
        sortSelect.value = 'newest';
        sortPosts('newest');
    }

    function sortPosts(order) {
        const postsArray = Array.from(posts);

        postsArray.sort((a, b) => {
            const dateA = new Date(a.getAttribute('data-date'));
            const dateB = new Date(b.getAttribute('data-date'));

            if (order === 'newest') {
                return dateB - dateA;
            } else {
                return dateA - dateB;
            }
        });

        // Remove existing posts
        while (categoryContent.firstChild) {
            categoryContent.removeChild(categoryContent.firstChild);
        }

        // Append sorted posts
        postsArray.forEach(post => {
            categoryContent.appendChild(post);
        });
    }
});
