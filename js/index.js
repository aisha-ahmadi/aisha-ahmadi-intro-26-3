/*const body = document.querySelector("body");
const footer = document.createElement("footer");
body.appendChild(footer);
*/

//Get the current date
const today = new Date();

//Get the current year
const thisYear = today.getFullYear(); 

//Select the body element from the DOM and assign it to a variable called body
const body = document.querySelector("body");

//Create the footer element --> Only in memory for now
const footerElement = document.createElement("footer");

//Append the footer element to the body --> now it exists on the live page
document.body.appendChild(footerElement);

//Use the DOM Selection (querySelector) to find the footer element on the live page
//and assign it to a variable called footer.
const footer = document.querySelector("footer");  

//create the copyright text and append it to the footer
const copyright = document.createElement("p");

copyright.innerHTML = `&copy; ${thisYear} Aisha Ahmadi. All rights reserved.`;

footer.appendChild(copyright);

//Skills Section
const skills = ["HTML", "CSS", "Javascript", "Git", "GitHub", "Python", "SQL", "Statistical programming", "Data Analysis", "Data Visualization", "Machine Learning", "Agile Methodologies", "Project Management", "Communication Skills"];

const skillsSection = document.getElementById("Skills");

const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill); 
}
