/*const functionUrl =
    "https://rg-resume-bbawfdbmcsd8gwa3.centralindia-01.azurewebsites.net/api/visitorCounter";*/
const functionUrl =
    "https://rgresume-apim.azure-api.net/rg-resume/visitorCounter";
fetch(functionUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch visitor count");
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("visitor-count").textContent = data.count;
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("visitor-count").textContent = "Unavailable";
    });