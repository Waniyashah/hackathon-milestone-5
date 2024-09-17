var _a, _b, _c;
// Get references to the form and display areas
var form = document.querySelector('form');
var resumedisplayelement = document.getElementById('display-cv');
var cvContentelement = document.getElementById('cv-content');
var shareablelinkcontainer = document.getElementById('shareable-link-box');
var shareableLinkElement = shareablelinkcontainer.querySelector('a');
var downloadpdfbutton = document.getElementById('download');
// Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent page reload
    // Collect input values
    var name = document.getElementById('Name').value;
    var email = document.getElementById('Email').value;
    var contact = document.getElementById('Contact').value;
    // Get education, experience, and skills as arrays
    var educationElements = document.querySelectorAll('input[name="education[]"]');
    var experienceElements = document.querySelectorAll('input[name="experience[]"]');
    var skillsElements = document.querySelectorAll('input[name="skills[]"]');
    var education = Array.from(educationElements).map(function (el) { return el.value; });
    var experience = Array.from(experienceElements).map(function (el) { return el.value; });
    var skills = Array.from(skillsElements).map(function (el) { return el.value; });
    // Save form data in localStorage with the username as the key
    var resumeData = {
        name: name,
        email: email,
        contact: contact,
        education: education,
        experience: experience,
        skills: skills
    };
    localStorage.setItem(name, JSON.stringify(resumeData));
    // Generate the resume content dynamically
    var resumeHTML = "\n    <h2>Personal Information</h2>\n    <p><b>Name:</b> <span contenteditable=\"true\">".concat(name, "</span></p>\n    <p><b>Email:</b> <span contenteditable=\"true\">").concat(email, "</span></p>\n    <p><b>Contact:</b> <span contenteditable=\"true\">").concat(contact, "</span></p>\n    <h3>Education</h3>\n    <ul>").concat(education.map(function (item) { return "<li contenteditable=\"true\">".concat(item, "</li>"); }).join(''), "</ul>\n    <h3>Experience</h3>\n    <ul>").concat(experience.map(function (item) { return "<li contenteditable=\"true\">".concat(item, "</li>"); }).join(''), "</ul>\n    <h3>Skills</h3>\n    <ul>").concat(skills.map(function (item) { return "<li contenteditable=\"true\">".concat(item, "</li>"); }).join(''), "</ul>\n  ");
    // Display the generated resume
    cvContentelement.innerHTML = resumeHTML;
    resumedisplayelement.style.display = 'block';
    resumedisplayelement === null || resumedisplayelement === void 0 ? void 0 : resumedisplayelement.scrollIntoView({ behavior: "smooth" });
    // Generate the shareable link
    var baseUrl = window.location.origin;
    var shareableURL = "".concat(baseUrl, "?username=").concat(encodeURIComponent(name), "/resume");
    shareablelinkcontainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
//for diplay the username in url
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('name');
    if (username) {
        // Hide form and show resume
        form.style.display = 'none';
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            var resumeHTML = "\n        <h2>Personal Information</h2>\n        <p><b>Name:</b> <span contenteditable=\"true\">".concat(resumeData.name, "</span></p>\n        <p><b>Email:</b> <span contenteditable=\"true\">").concat(resumeData.email, "</span></p>\n        <p><b>Contact:</b> <span contenteditable=\"true\">").concat(resumeData.contact, "</span></p>\n        <h3>Education</h3>\n        <ul>").concat(resumeData.education.map(function (item) { return "<li contenteditable=\"true\">".concat(item, "</li>"); }).join(''), "</ul>\n        <h3>Experience</h3>\n        <ul>").concat(resumeData.experience.map(function (item) { return "<li contenteditable=\"true\">".concat(item, "</li>"); }).join(''), "</ul>\n        <h3>Skills</h3>\n        <ul>").concat(resumeData.skills.map(function (item) { return "<li contenteditable=\"true\">".concat(item, "</li>"); }).join(''), "</ul>\n      ");
            // Display the resume
            cvContentelement.innerHTML = resumeHTML;
            resumedisplayelement.style.display = 'block';
        }
        else {
            alert('No resume data found for this user.');
        }
    }
});
// Handle adding additional input fields for education, experience, and skills
(_a = document.getElementById('add-education')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
    var educationList = document.getElementById('education-list');
    var li = document.createElement('li');
    li.innerHTML = '<input type="text" name="education[]" placeholder="Enter your education" required>';
    educationList.appendChild(li);
});
(_b = document.getElementById('add-experience')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    var experienceList = document.getElementById('work-experience-list');
    var li = document.createElement('li');
    li.innerHTML = '<input type="text" name="experience[]" placeholder="Enter your experience" required>';
    experienceList.appendChild(li);
});
(_c = document.getElementById('add-skills')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () {
    var skillsList = document.getElementById('skills-list');
    var li = document.createElement('li');
    li.innerHTML = '<input type="text" name="skills[]" placeholder="Enter your skills" required>';
    skillsList.appendChild(li);
});
// Handle PDF download
downloadpdfbutton.addEventListener('click', function () {
    window.print(); // Open the print dialog to allow PDF download
});
