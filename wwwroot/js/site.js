const elements = {
    copyEmail: $('[data-selector="email"]'),
    downloadResumeButton: $('[data-selector="downloadResume"]'),
    email: $('#email'),
    form: $('#myForm'),
    links: $('.link'),
    message: $('#message'),
    name: $('#name'),
    navBarToggler: $('#navbarToggler'),
    navLinks: $('.nav-item'),
    phone: $('#phone'),
    phoneNumber: $('[data-selector="phoneNumber"]'),
    skillButtons: $('.skill'),
    skillcss: $('[data-selector="css"]'),
    submitButton: $('#submitContact'),
    successMessage: $('#successMessage'),
};

const notifications = [
    { name: "duolingo", url: "https://www.duolingo.com/profile/Connor660733"},
    { name: "balancedMan", url: "https://sigep.org/the-sigep-experience/awards/ulysses-grant-dubach-scroll/" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/connorwilson48" },
    { name: "github", url: "https://github.com/wilscon" },
    { name: "nike", url: "https://www.linkedin.com/posts/connorwilson48_technology-innovation-nike-activity-6520143949003395072-HTKI/" },
    { name: "URSA", url: "https://undergradresearch.oregonstate.edu/ursa-engage" },
    { name: "mathResearchPoster", url: "/Math Learning Assistant Research Poster.pdf" },
    { name: "researchPoster", url: "/Undergraduate Research Poster.pdf"},
];
const initialize = function () {
    
    elements.links.click(openLink);
    elements.downloadResumeButton.click(downloadResume);
    elements.navLinks.click(viewSection)
    elements.phoneNumber.click(copyValue);
    elements.copyEmail.click(copyValue);
    elements.navBarToggler.click(toggleNavBar);
    elements.skillButtons.click(toggleSkillButton);
    document.getElementById("myForm").addEventListener("submit", function (event) {
        event.preventDefault();

        var name = elements.name.val();
        var email = elements.email.val();
        var phone = elements.phone.val();
        var message = elements.message.val();

        let formData = {

            name: name,
            email: email,
            phoneNumber: phone,
            message, message,
        };

        $.ajax({
            url: 'Home/Submit', 
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function (response) {
                if (response.success) {
                    elements.successMessage.css("display", "");
                    elements.form[0].reset();
                    elements.form.css("display", "none");
                    
                } else {
                    alert("Failed to submit contact information.");
                }
            },
            error: function (xhr, status, error) {
                alert("An error occurred: " + error);
            }
        });
    }); 

};  

const toggleSkillButton = function (event) {
    var skillClass = event.target.innerHTML;

    if (skillClass == "C#") {
        skillClass = "C\\#";
    }
    else if (skillClass == ".NET Core") {
        skillClass = '.\\NET'
    }

    if ($(this).hasClass('active')) {
        $(this).removeClass('active');

        if (skillClass == "Java") {

            $("." + skillClass).css('display', 'none');
        }
        else {
            $("[class='" + skillClass + "']").css('background-color', '');
        }

    } else {
        $(this).addClass('active');
        if (skillClass == "Java") {

            $("." + skillClass).css('display', '');
        }
        else {
            $("[class='" + skillClass + "']").css('background-color', 'yellow');
        }
    }
};

const toggleNavBar = function () {
    $(this).toggleClass('open');
}

const copyValue = function () {
    let start = $(this).text().indexOf(' ') + 2;
    let finish = $(this).text().indexOf('\n');
    finish = $(this).text().indexOf('\n', finish + 1);
    let text = $(this).text().substring(start, finish);
    navigator.clipboard.writeText(text);

    let spanElement = $(this).find('span');
    let originalText = spanElement.text();
    spanElement.text("Copied");
    setTimeout(function () {
        spanElement.text(originalText);
    }, 2000);
}

const openLink = function (event) {

    notification = notifications.find(notification => notification.name === event.target.dataset.selector);
    window.open(notification.url, '_blank');

    if (notification.name != 'LinkedIn') {
        $.ajax({
            url: '/Home/' + notification.name,
            type: 'POST',
            contentType: 'application/json',
            success: function (response) {


            },
            error: function (xhr, status, error) {
                console.log("An error occurred: " + error);
            }
        });
    }
}

const selected = function (event) {

    alert(event.target.innerHTML);
}

const viewSection = function (event) {
    const sectionId = document.getElementById(event.target.dataset.selector);
    const navbarHeight = document.querySelector('.navbar').offsetHeight - 1;
    const sectionPosition = sectionId.offsetTop - navbarHeight;
    window.scrollTo({
        top: sectionPosition,
        behavior: 'smooth'

    });
}

const downloadResume = function () {
    window.open("/Connor Wilson Resume.pdf", '_blank');
}

initialize();