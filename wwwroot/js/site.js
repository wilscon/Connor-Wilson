var elements = {
    resumeButton: $('[data-selector="resume"]'),
    linkedInButton: $('[data-selector="linkedIn"]'), 
    phoneNumber: $('[data-selector="phoneNumber"]'),
    email: $('[data-selector="email"]'),
}
var initialize = function () {
    elements.resumeButton.click(viewResume);
    elements.linkedInButton.click(viewLinkedIn);
    elements.phoneNumber.click(copyValue);
    elements.email.click(copyValue);
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
var viewLinkedIn = function () {
    window.open("https://www.linkedin.com/in/connor-wilson-b942b8156", '_blank');
};
var viewResume = function () {
    window.open("/Resume.pdf", '_blank');
}

initialize();