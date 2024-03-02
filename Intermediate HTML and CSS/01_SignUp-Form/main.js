const checkPasswords = function() {
    const [pwd1, pwd2, emsg] = [document.getElementById('password'), document.getElementById('password-confirm'), document.getElementById('error-msg')];
    if(pwd1.value === pwd2.value) {
        return true;
    } else {
        pwd1.classList.add('error'); pwd2.classList.add('error'); emsg.style.visibility = 'visible';
        return false;
    }
}

/** Light/Dark Mode **/
let lightIsOn = true;
const switchModes = function() {
    const rootAccess = document.querySelector(':root');
    const logoIcon = document.getElementById('odin-logo');
    const imgAuthor = document.getElementById('img-author');
    if(lightIsOn) {
        rootAccess.classList.add('dark-mode');
        logoIcon.src = 'assets/odin-logo-b.png';
        imgAuthor.innerText = 'Nick Nice'; imgAuthor.href = 'https://unsplash.com/@nicknice';
        lightIsOn = false;
    } else {
        rootAccess.classList.remove('dark-mode');
        logoIcon.src = 'assets/odin-logo-w.png';
        imgAuthor.innerText = 'Halie West'; imgAuthor.href = 'https://unsplash.com/@haliewestphoto';
        lightIsOn = true
    }
}