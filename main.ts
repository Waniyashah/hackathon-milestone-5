// Get references to the form and display areas
const form=document.querySelector('form') as HTMLFormElement;
const resumedisplayelement=document.getElementById('display-cv') as HTMLDivElement;
const cvContentelement=document.getElementById('cv-content') as HTMLDivElement;
const shareablelinkcontainer=document.getElementById('shareable-link-box') as HTMLDivElement;
const shareableLinkElement=shareablelinkcontainer.querySelector('a') as HTMLAnchorElement;
const downloadpdfbutton=document.getElementById('download') as HTMLButtonElement;

// Handle form submission
form.addEventListener('submit', (event: Event) => {
  event.preventDefault(); // prevent page reload

  // Collect input values
  const name = (document.getElementById('Name') as HTMLInputElement).value;
  const email = (document.getElementById('Email') as HTMLInputElement).value;
  const contact = (document.getElementById('Contact') as HTMLInputElement).value;

  // Get education, experience, and skills as arrays
  const educationElements = document.querySelectorAll('input[name="education[]"]') as NodeListOf<HTMLInputElement>;
  const experienceElements = document.querySelectorAll('input[name="experience[]"]') as NodeListOf<HTMLInputElement>;
  const skillsElements = document.querySelectorAll('input[name="skills[]"]') as NodeListOf<HTMLInputElement>;

  const education = Array.from(educationElements).map(el => el.value);
  const experience = Array.from(experienceElements).map(el => el.value);
  const skills = Array.from(skillsElements).map(el => el.value);

  // Save form data in localStorage with the username as the key
  const resumeData = {
    name,
    email,
    contact,
    education,
    experience,
    skills
  };

  localStorage.setItem(name, JSON.stringify(resumeData));

  // Generate the resume content dynamically
  const resumeHTML = `
    <h2>Personal Information</h2>
    <p><b>Name:</b> <span contenteditable="true">${name}</span></p>
    <p><b>Email:</b> <span contenteditable="true">${email}</span></p>
    <p><b>Contact:</b> <span contenteditable="true">${contact}</span></p>
    <h3>Education</h3>
    <ul>${education.map(item => `<li contenteditable="true">${item}</li>`).join('')}</ul>
    <h3>Experience</h3>
    <ul>${experience.map(item => `<li contenteditable="true">${item}</li>`).join('')}</ul>
    <h3>Skills</h3>
    <ul>${skills.map(item => `<li contenteditable="true">${item}</li>`).join('')}</ul>
  `;

  // Display the generated resume
  cvContentelement.innerHTML=resumeHTML;
  resumedisplayelement.style.display='block';
  resumedisplayelement?.scrollIntoView({behavior:"smooth"})

  // Generate the shareable link
  const baseUrl = window.location.origin;
  const shareableURL = `${baseUrl}?username=${encodeURIComponent(name)}/resume`;
  
  shareablelinkcontainer.style.display = 'block';
  shareableLinkElement.href = shareableURL;
  shareableLinkElement.textContent = shareableURL;
});

//for diplay the username in url
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('name');

  if (username) {
    // Hide form and show resume
    form.style.display = 'none';

    const savedResumeData = localStorage.getItem(username);
    if (savedResumeData) {
      const resumeData = JSON.parse(savedResumeData);

      const resumeHTML = `
        <h2>Personal Information</h2>
        <p><b>Name:</b> <span contenteditable="true">${resumeData.name}</span></p>
        <p><b>Email:</b> <span contenteditable="true">${resumeData.email}</span></p>
        <p><b>Contact:</b> <span contenteditable="true">${resumeData.contact}</span></p>
        <h3>Education</h3>
        <ul>${resumeData.education.map((item: string) => `<li contenteditable="true">${item}</li>`).join('')}</ul>
        <h3>Experience</h3>
        <ul>${resumeData.experience.map((item: string) => `<li contenteditable="true">${item}</li>`).join('')}</ul>
        <h3>Skills</h3>
        <ul>${resumeData.skills.map((item: string) => `<li contenteditable="true">${item}</li>`).join('')}</ul>
      `;

      // Display the resume
      cvContentelement.innerHTML=resumeHTML;
      resumedisplayelement.style.display='block';
    } else {
      alert('No resume data found for this user.');
    }
  }
});

// Handle adding additional input fields for education, experience, and skills
document.getElementById('add-education')?.addEventListener('click', () => {
  const educationList = document.getElementById('education-list') as HTMLUListElement;
  const li = document.createElement('li');
  li.innerHTML = '<input type="text" name="education[]" placeholder="Enter your education" required>';
  educationList.appendChild(li);
});

document.getElementById('add-experience')?.addEventListener('click', () => {
  const experienceList = document.getElementById('work-experience-list') as HTMLUListElement;
  const li = document.createElement('li');
  li.innerHTML = '<input type="text" name="experience[]" placeholder="Enter your experience" required>';
  experienceList.appendChild(li);
});

document.getElementById('add-skills')?.addEventListener('click', () => {
  const skillsList = document.getElementById('skills-list') as HTMLUListElement;
  const li = document.createElement('li');
  li.innerHTML = '<input type="text" name="skills[]" placeholder="Enter your skills" required>';
  skillsList.appendChild(li);
});

// Handle PDF download
downloadpdfbutton.addEventListener('click', () => {
  window.print(); // Open the print dialog to allow PDF download
});
