document.addEventListener('DOMContentLoaded', () => {
    const digimonListElement = document.getElementById('digimonList');
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');

    const fetchDigimons = async (name = '') => {
        let url = 'https://digimon-api.vercel.app/api/digimon';
        if (name) {
            url = `${url}/name/${name}`;
        }

        try {
            const response = await fetch(url);
            const digimons = await response.json();
            displayDigimons(digimons);
        } catch (error) {
            console.error('Error fetching Digimons:', error);
            digimonListElement.innerHTML = '<p class="text-danger">Error fetching Digimons. Please try again later.</p>';
        }
    };

    const displayDigimons = (digimons) => {
        digimonListElement.innerHTML = '';

        if (digimons.length === 0) {
            digimonListElement.innerHTML = '<p class="text-warning">No Digimons found.</p>';
            return;
        }

        digimons.forEach(digimon => {
            const digimonItem = document.createElement('div');
            digimonItem.classList.add('col-md-4', 'digimon-item');
            digimonItem.innerHTML = `
                <img src="${digimon.img}" alt="${digimon.name}">
                <h2>${digimon.name}</h2>
                <p>${digimon.level}</p>
            `;
            digimonListElement.appendChild(digimonItem);
        });
    };

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        fetchDigimons(searchTerm);
    });

    fetchDigimons(); // Fetch all Digimons on initial load
});
