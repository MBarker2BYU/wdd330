// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export async function getData(url) {
  try 
  {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}`);
    }
    
    const data = await response.json();
    
    return [true, data];

  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);

    return [false, error];
  }
}

export function renderListWithTemplate(templateFunction, parent, list, position = "afterbegin", clear=false) {
  
  if (clear) {
    parent.innerHTML = "";
  }

  const htmlStrings = list.map(templateFunction);
  
  parent.insertAdjacentHTML(position, htmlStrings.join(""));

}

export function renderWithTemplate(template, parentElement, data, callback) {
  
  parentElement.innerHTML = template;

  if(callback) 
  {
    callback(data);
  }
}

export async function loadTemplate(path)
{
  const response = await fetch(path);
  const template = await response.text();
  
  return template;
}

export async function loadHeaderAndFooter()
{
  const header = await loadTemplate("/partials/header.html");
  const footer = await loadTemplate("/partials/footer.html");

  const headerElement = document.getElementById("main-header");
  const footerElement = document.getElementById("main-footer");

  renderWithTemplate(header, headerElement);
  renderWithTemplate(footer, footerElement);
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  alert.classList.add("alert")
  alert.innerHTML = `<p>${message}</p><span>X</span>`;
  

  // insert the alert at the top of the page
  const main = document.querySelector("main");
  main.prepend(alert);
  if (scroll) {
    window.scrollTo(0, 0);
  }
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));

}