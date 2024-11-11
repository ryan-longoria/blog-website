document.addEventListener('DOMContentLoaded', () => {
    // Fuse.js Search Functionality for index.html

    // Initialize Fuse.js
    let fuse;
    const searchInput = document.getElementById('search-input');
    const suggestionsContainer = document.getElementById('search-suggestions');
    let postsData = [];

    // Fetch the posts data from posts.json
    fetch('posts.json')
        .then((response) => response.json())
        .then((data) => {
            postsData = data;
            console.log('Posts Data:', postsData);

            // Initialize Fuse.js
            const options = {
                keys: ['title', 'excerpt', 'category'],
                threshold: 0.4, // Adjust for sensitivity
                includeScore: true,
            };

            fuse = new Fuse(postsData, options);
            console.log('Fuse Initialized:', fuse); 
        })
        .catch((error) => {
            console.error('Error fetching posts data:', error);
        });

    // Autocomplete Search Input Event Listeners
    searchInput.addEventListener('input', onSearchInput);
    searchInput.addEventListener('keydown', onSearchKeyDown);

    let selectedIndex = -1;

    function onSearchInput() {
        const query = searchInput.value.trim();

        if (query.length > 0 && fuse) {
            // Perform the search using Fuse.js
            const results = fuse.search(query);
            const suggestions = results.map((result) => result.item).slice(0, 5); // Limit to top 5 suggestions
            displaySuggestions(suggestions);
        } else {
            // Clear suggestions if query is empty
            suggestionsContainer.innerHTML = '';
            suggestionsContainer.style.display = 'none';
            searchInput.setAttribute('aria-expanded', 'false');
        }
    }

    function highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    function displaySuggestions(suggestions) {
        // Clear previous suggestions
        suggestionsContainer.innerHTML = '';

        if (suggestions.length === 0) {
            suggestionsContainer.style.display = 'none';
            searchInput.setAttribute('aria-expanded', 'false');
            return;
        }

        suggestionsContainer.style.display = 'block';
        searchInput.setAttribute('aria-expanded', 'true');

        suggestions.forEach((post, index) => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.setAttribute('data-url', post.url);
            suggestionItem.setAttribute('data-index', index);

            const highlightedTitle = highlightMatch(post.title, searchInput.value);
            const highlightedExcerpt = highlightMatch(post.excerpt, searchInput.value);

            suggestionItem.innerHTML = `
                <a href="${post.url}">
                    <strong>${highlightedTitle}</strong><br />
                    <small>${highlightedExcerpt}</small>
                </a>
            `;

            suggestionsContainer.appendChild(suggestionItem);
        });

        selectedIndex = -1;
    }

    function onSearchKeyDown(e) {
        const suggestions = suggestionsContainer.querySelectorAll('.suggestion-item');
        if (suggestions.length > 0) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                // Move selection down
                selectedIndex = (selectedIndex + 1) % suggestions.length;
                updateSuggestionSelection(suggestions);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                // Move selection up
                selectedIndex = (selectedIndex - 1 + suggestions.length) % suggestions.length;
                updateSuggestionSelection(suggestions);
            } else if (e.key === 'Enter') {
                // Navigate to the selected suggestion
                if (selectedIndex >= 0) {
                    const selectedSuggestion = suggestions[selectedIndex];
                    window.location.href = selectedSuggestion.getAttribute('data-url');
                }
            }
        }
    }

    function updateSuggestionSelection(suggestions) {
        suggestions.forEach((item) => item.classList.remove('selected'));
        if (selectedIndex >= 0) {
            suggestions[selectedIndex].classList.add('selected');
            // Ensure the selected item is visible
            suggestions[selectedIndex].scrollIntoView({ block: 'nearest' });
        }
    }

    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
            suggestionsContainer.innerHTML = '';
            suggestionsContainer.style.display = 'none';
            searchInput.setAttribute('aria-expanded', 'false');
        }
    });
});
