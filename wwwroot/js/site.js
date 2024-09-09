var elements = {
    aboutDiv: $('#about'),
    downloadResumeButton: $('[data-selector="downloadResume"]'),
    viewResumeButton: $('[data-selector="viewResume"]'),
    viewAboutMeButton: $('[data-selector="aboutMe"]'),
    viewContactButton: $('[data-selector="contact"]'),
    linkedInButton: $('[data-selector="linkedIn"]'), 
    phoneNumber: $('[data-selector="phoneNumber"]'),
    skillButtons: $('.skill'),
    skillhtml: $('[data-selector="html"]'),
    skillcss: $('[data-selector="css"]'),
    submitButton: $('#submitContact'),
    toTopButton: $('[data-selector="toTop"]'),
    email: $('[data-selector="email"]'),
    form: $('#myForm'),
    name: $('#name'),
    email: $('#email'),
    phone: $('#phone'),
    message: $('#message'),
    successMessage: $('#successMessage')

}
var initialize = function () {
    elements.downloadResumeButton.click(downloadResume);
    elements.viewResumeButton.click(viewResume);
    elements.viewAboutMeButton.click(viewAboutMe);
    elements.viewContactButton.click(viewContact);
    elements.linkedInButton.click(viewLinkedIn);
    elements.phoneNumber.click(copyValue);
    elements.email.click(copyValue);
    elements.toTopButton.click(toTop);
    elements.skillButtons.click(function (event) {
        var skillClass = event.target.innerHTML;

        if (skillClass == "C#") {
            skillClass = "C\\#";
        }
        else if (skillClass == ".NET" ) {
            skillClass = '.\\NET'
        }

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');

            if (skillClass == "Java" || skillClass == "HTML" || skillClass == "JavaScript") {

                $("." + skillClass).css('display', 'none');
            }
            else {

                
                //$('.' + skillClass).css('background-color', '');
                $("[class='" + skillClass + "']").css('background-color', '');
            }

        } else {
            $(this).addClass('active');
            if (skillClass == "Java" || skillClass == "HTML" || skillClass == "JavaScript") {

                $("." + skillClass).css('display', '');
            }
            else {

               
                // $('.' + skillClass).css('background-color', 'yellow');
                $("[class='" + skillClass + "']").css('background-color', 'yellow');
            }
            
        }
        
        //selected(event);
    });
   /* elements.skillhtml.click(function (event) {
        selected(event);
    });
    elements.skillcss.click(function (event) {
        selected(event);
    });          */

    document.getElementById("myForm").addEventListener("submit", function (event) {
        event.preventDefault();

        //const formData = new FormData(this);

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
            url: 'Home/Submit', // Replace with your actual action method URL
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
var copyValue = function () {
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


var selected = function (event) {

    alert(event.target.innerHTML);
}

const toTop = function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });

}
var viewAboutMe = function () {
    document.getElementById('why').scrollIntoView({ behavior: 'smooth' });
}

var viewContact = function () {

    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}
var viewLinkedIn = function () {
    window.open("https://www.linkedin.com/in/connor-wilson-b942b8156", '_blank');
};

var viewResume = function () {
    //alert("view resume button clicked");
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
}
var downloadResume = function () {
    window.open("/Connor Wilson Resume.pdf", '_blank');
}



initialize();