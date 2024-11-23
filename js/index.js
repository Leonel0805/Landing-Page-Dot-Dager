
let sound1 = document.querySelector('#sound_1');
let sound2 = document.querySelector('#sound_2');
let sound3 = document.querySelector('#sound_3');
let soundFinal = document.querySelector('#sound_final');



let elementNavbarHome = document.querySelector('#home')
let elementNavbarAboutMe = document.querySelector('#aboutme')
let elementNavbarContact = document.querySelector('#contact')
let navbarLogo = document.querySelector('.navbar__logo')

let navbarLogoPepeino = document.querySelector('.navbar__logo__layout')

console.log(navbarLogoPepeino)
navbarLogoPepeino.addEventListener('click', function(){

    console.log('clik')
})


function soundPlay(elementSound, sound){

    elementSound.addEventListener('mouseover', function() {
        sound.play(); 
    });

    elementSound.addEventListener('mouseout', function() {
        sound.pause();  
        sound.currentTime = 0; 
    });

}


soundPlay(elementNavbarHome, sound1)
soundPlay(elementNavbarAboutMe, sound2)
soundPlay(elementNavbarContact, sound3)
soundPlay(navbarLogo, soundFinal)

