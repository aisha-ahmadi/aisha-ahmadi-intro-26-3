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
const skills = [
  "HTML",
  "CSS",
  "Javascript",
  "Git",
  "GitHub",
  "Python",
  "SQL",
  "Statistical programming",
  "Data Analysis",
  "Data Visualization",
  "Machine Learning",
  "Agile Methodologies",
  "Project Management",
  "Communication Skills",
];

const skillsSection = document.getElementById("Skills");

const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement("li");
  skill.innerText = skills[i];
  skillsList.appendChild(skill);
}

const messageForm = document.forms["leave_message"];

messageForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = event.target.usersName.value;
  const email = event.target.usersEmail.value;
  const message = event.target.usersMessage.value;

  console.log(name, email, message);


  const messageSection = document.getElementById("messages");
  const messageList = messageSection.querySelector("ul");
  const newMessage = document.createElement("li");

  newMessage.innerHTML = `<a href="mailto:${email}">${name}</a> <span> ${message}</span>`;

  const removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.type = "button";

  removeButton.addEventListener("click", function () {
    const entry = removeButton.parentNode;
    entry.remove();
  });

  newMessage.appendChild(removeButton);
  messageList.appendChild(newMessage);

  event.target.reset();
});

fetch("https://api.github.com/users/aisha-ahmadi/repos")
  .then(response => response.json()) 
  .then(repositories => {
    console.log(repositories);

    const projectSection = document.getElementById('Projects');
    
    const projectList = projectSection.querySelector('ul');

    for (let i = 0; i < repositories.length; i++) {

      const project = document.createElement('li');
      
      project.innerText = repositories[i].name;
      
      projectList.appendChild(project);
    }
  })
  .catch(error => {
    console.error('Something went wrong fetching the Projects:', error);
    const projectSection = document.getElementById('Projects');
    if (projectSection) {
      projectSection.insertAdjacentHTML('beforeend', '<p>Unable to load projects at this time.</p>');
    }
  });