function searchBooks() {
    const apiKey = "AIzaSyBozr1CXMDulzQq-eiGroDrGsSSAGE1y4k";
    const searchInput = document.getElementById("searchInput").value;
    const resultsContainer = document.getElementById("results");

    if (!searchInput) {
        alert("Please enter a search query");
        return;
    }

    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchInput)}&key=${apiKey}`;

    // Show loading indicator
    resultsContainer.innerHTML = "Loading...";

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`API request failed with status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => displayResults(data.items))
        .catch(error => {
            console.error('Error fetching data:', error);
            resultsContainer.innerHTML = "Failed to fetch book data. Please try again later.";
        });
}

function displayResults(items) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    if (items) {
        items.forEach(item => {
            const volumeInfo = item.volumeInfo;
            const title = volumeInfo.title || 'N/A';
            const authors = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'N/A';

            const resultItem = document.createElement("div");
            resultItem.innerHTML = `
                <p><strong>Title:</strong> ${title}</p>
                <p><strong>Authors:</strong> ${authors}</p>
                <hr>
            `;

            resultsContainer.appendChild(resultItem);
        });
    } else {
        resultsContainer.innerHTML = "No results found.";
    }
}
