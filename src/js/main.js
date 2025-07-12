import Alert from "./Alert.mjs";

const alertFile = "./json/alerts.json";
const mainElement = document.getElementsByTagName("main")[0];

const alert = new Alert(mainElement, alertFile);

alert.loadAlerts();

// const alertFile = async () => {
//     const response = await fetch("./json/alerts.json");
    
//     if (!response.ok) {
//         throw new Error("Network response was not ok");
//     }
    
//     return response.json();
// };

// let a = alertFile().then(data => {
//         const alerts = data.alerts;
//         const alertList = document.querySelector(".alert-list");
//         alerts.forEach(alert => {
//             const li = document.createElement("li");
//             li.textContent = alert.message;
//             alertList.appendChild(li);
//         });
//     })    .catch(error => {
//         console.error("There was a problem with the fetch operation:", error);
//     }); 