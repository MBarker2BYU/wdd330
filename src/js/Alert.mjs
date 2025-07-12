import { getData } from "./utils.mjs";
// Alert class to handle loading and displaying alerts from a JSON file
// It takes a main element and a file path to the JSON file containing alerts
export default class Alert 
{
    // Constructor initializes the main element and the alert file path
    // It sets up the instance variables for later use
    constructor(mainElement, alertFile) 
    {
        this.mainElement = mainElement;
        this.alertFile = alertFile;
    }
    
    // Method to load alerts from the JSON file
    // It fetches the data and calls displayAlerts to show them on the page
    async loadAlerts()
    {
        try 
        {
            const [success, obj] = await getData(this.alertFile);

            // Check if the fetch was successful
            // If not, throw an error with the object returned
            if (!success) {
                throw obj;
            }

            // Call displayAlerts to create and append the alert list to the main element
            // It passes the main element and the alerts array from the fetched data
            if (!obj || !Array.isArray(obj.alerts)) {
                throw new Error("Invalid alerts data format");
            }

            // Check if there are any alerts to display
            // If there are, call displayAlerts to show them
            if(obj.alerts.length > 0) {

                this.displayAlerts(this.mainElement, obj.alerts);

            }
        } 
        catch (error) 
        {
            console.error("There was a problem with the fetch operation:", error);
        }
    }

    // Method to display the alerts on the page
    // It creates a list of alerts and appends it to the main element
    displayAlerts(mainElement, alerts) {

        const alertList = document.createElement("ul");
        alertList.className = "alert-list";

        // Loop through each alert and create a list item
        // It sets the text content and styles based on the alert properties
        alerts.forEach(alert => {
            const alertItem = document.createElement("li");
            const alertTitle = document.createElement("h2");
            const alertDescription = document.createElement("p");

            alertItem.className = "alert-item";
            alertTitle.textContent = alert.title || "Alert"; // Default to "Alert" if no title
            alertDescription.textContent = alert.description || ""; // Default to empty string if no description
            alertItem.style.backgroundColor = alert.backColor || "white"; // Default color if not specified
            alertItem.style.color = alert.foreColor || "black"; // Default color if not specified
            alertItem.appendChild(alertTitle);
            alertItem.appendChild(alertDescription);
            alertList.appendChild(alertItem);
        });

        mainElement.prepend(alertList);
    }
}