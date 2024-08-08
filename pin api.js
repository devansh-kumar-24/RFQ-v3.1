// Function to get location details based on postal code
function Location(code) {
    const arr = ["", "", ""];
    const apiEndpoint = `https://api.postalpincode.in/pincode/${code}`;

    // Make a GET request to the API endpoint
    return fetch(apiEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data[0].Status === "Success") {
                arr[0] = data[0].PostOffice[0].District;
                arr[1] = data[0].PostOffice[0].State;
                arr[2] = data[0].PostOffice[0].Country;
            }
            return arr;
        })
        .catch(error => {
            console.error('Error fetching location details:', error);
            return arr; // Return the empty array in case of error
        });
}

// Event listener for postal code input
document.getElementById("b-pin").addEventListener("input", async () => {
    const postalCode = document.getElementById("b-pin").value;
    const locationData = await Location(postalCode);

    // Update form fields with the retrieved data
    document.getElementById("b-city").value = locationData[0];
    document.getElementById("b-state").value = locationData[1];

});

document.getElementById("s-pin").addEventListener("input", async () => {
    const postalCode = document.getElementById("s-pin").value;
    const locationData = await Location(postalCode);

    // Update form fields with the retrieved data
    document.getElementById("s-state").value = locationData[1];
});