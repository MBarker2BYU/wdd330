export default class Alert {
  constructor() {
    this.loadAlerts();
  }

  async loadAlerts() 
  {
    try {
      
      const response = await fetch('./alerts.json');
      const alerts = await response.json();
      
      if (alerts && alerts.length > 0) {
        const section = document.createElement('section');
        section.className = 'alert-list';
        alerts.forEach(alert => {
          const p = document.createElement('p');
          p.textContent = alert.message;
          p.style.backgroundColor = alert.background;
          p.style.color = alert.color;
          section.appendChild(p);
        });
      
        const main = document.querySelector('main');
      
        if (main) {
          main.prepend(section);
        }
      }
    } catch (error) {
      
      console.error("Error loading alerts:", error);
      
      return [];
    }
  }
    
}