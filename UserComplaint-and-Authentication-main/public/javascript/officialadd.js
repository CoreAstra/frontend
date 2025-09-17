document.addEventListener('DOMContentLoaded', () => {
    const stateDropdown = document.getElementById('state');
    const cityDropdown = document.getElementById('city');
    const localityDropdown = document.getElementById('locality');

    const sectors = {
        'Jharkhand': {
            'Ranchi': ['Main Road', 'Harmu', 'Lalpur Chowk'],
            'Jamshedpur': ['Bistupur', 'Sakchi', 'Sonari'],
            'Dhanbad': ['Bank More', 'Saraidhela', 'Bartand']
        },
        'Bihar': {
            'Patna': ['Kankarbagh', 'Boring Road', 'Ashok Rajpath'],
            'Gaya': ['Civil Lines', 'Swarajpuri Road', 'Bodh Gaya'],
            'Bhagalpur': ['Tilkamanjhi', 'Nathnagar', 'Khalifabagh']
        },
        'West Bengal': {
            'Kolkata': ['Park Street', 'Salt Lake', 'Gariahat'],
            'Howrah': ['Shibpur', 'Belur Math', 'Dobson Road'],
            'Durgapur': ['Benachity', 'City Centre', 'Bidhannagar']
        },
        'Karnataka': {
            'Bengaluru': ['MG Road', 'Koramangala', 'Whitefield'],
            'Mysuru': ['Devaraja Mohalla', 'Kuvempunagar', 'Gokulam'],
            'Mangaluru': ['Hampankatta', 'Lalbagh', 'Surathkal']
        }
    };

    // Populate State dropdown
    Object.keys(sectors).forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateDropdown.appendChild(option);
    });

    // Populate City dropdown on State change
    stateDropdown.addEventListener('change', () => {
        const selectedState = stateDropdown.value;
        cityDropdown.innerHTML = '<option value="" disabled selected>Select City</option>';
        localityDropdown.innerHTML = '<option value="" disabled selected>Select Locality</option>';

        Object.keys(sectors[selectedState]).forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            cityDropdown.appendChild(option);
        });
    });

    // Populate Locality dropdown on City change
    cityDropdown.addEventListener('change', () => {
        const selectedState = stateDropdown.value;
        const selectedCity = cityDropdown.value;
        localityDropdown.innerHTML = '<option value="" disabled selected>Select Locality</option>';

        sectors[selectedState][selectedCity].forEach(locality => {
            const option = document.createElement('option');
            option.value = locality;
            option.textContent = locality;
            localityDropdown.appendChild(option);
        });
    });
});
