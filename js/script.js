


//To Check In Localstorage
let mainClor = localStorage.getItem("color_option");

if(mainClor !== null){

    document.documentElement.style.setProperty('--main-color', mainClor);

    //Check Fir Active Class
    document.querySelectorAll(".color-list li").forEach(element => {
        element.classList.remove("active");

        // Add Class To Active 
        if(element.dataset.color === mainClor){
            element.classList.add("active");
        }
    });
}




//Random Background Options

let backgroundOption = true;

//Varaible To Control The Interval
let backgroundIntreval;

//Check Background In Localstorage
let backgroundLocalItem  = localStorage.getItem("background_option");

if(backgroundLocalItem !== null){

    if(backgroundLocalItem === 'true'){
        backgroundOption = true;
    }else{
        backgroundOption = false;
    }

    document.querySelectorAll(".random-background span").forEach(element =>  {

        element.classList.remove("active");
    });

    if(backgroundLocalItem === 'true'){
        document.querySelector(".random-background .yes").classList.add("active");
    }else{
        document.querySelector(".random-background .no").classList.add("active");
    }
}


//Toggle Span Class On Icon
let iconSetting = document.querySelector(".toggle-settings .set");
let allSetting = document.querySelector(".setting-box");

// To Toggle Class To Icon And allSetting
iconSetting.onclick = function () {
    this.classList.toggle("fa-spin");
    allSetting.classList.toggle("open");
};

//Switch Colors
const colorLis = document.querySelectorAll(".color-list li");

// Loops On All List Items
colorLis.forEach( li => {

    // Click In Every List Item
    li.addEventListener("click" , (e) => {
        //Set Colors On Root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        
        //Set Color On LocalStorage
        localStorage.setItem("color_option" , e.target.dataset.color);

        //Remove Active Class From All Chlidern

        handelAction(e);
    });
});



//Switch Random BackgroundColors Options
const randomBackgroundEl = document.querySelectorAll(".random-background span");

// Loops On All List Items
randomBackgroundEl.forEach( span => {

    // Click In Every Span
    span.addEventListener("click" , (e) => {

        //Remove Active Class From All Chlidern

        handelAction(e);

        if(e.target.dataset.background === 'yes'){
            backgroundOption = true;
            randomizeImage();
            localStorage.setItem("background_option" , true);
        }else{
            backgroundOption = false;
            clearInterval(backgroundIntreval);
            localStorage.setItem("background_option" , false);
        }
    });
});



//Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

//GET Array Of Image
let imageArray = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"];




//Function Random Background

function randomizeImage(){
    if(backgroundOption === true){

        backgroundIntreval = setInterval( () => {
            //Get Random Number
            let randomNumber = Math.floor(Math.random() * imageArray.length);
        
            //Changing Background image by url
            landingPage.style.backgroundImage = 'url("../images/' + imageArray[randomNumber] + '")';
        },1000);
    }
}

randomizeImage();


//Select Skills Selector

let ourSkills = document.querySelector(".skills");

window.onscroll = function () { 

    //Skills Offest Top
    let skillsOffsetTop = ourSkills.offsetTop;

    //Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;

    //Window Heigth
    let windowHeigth = this.innerHeight;

    //Window Scroll Top

    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop > ( skillsOffsetTop + skillsOuterHeight - windowHeigth)){

        // all skills
        let allSiklls = document.querySelectorAll(".skill-progress span");

        allSiklls.forEach(el => {
            el.style.width = el.dataset.progress;
        });
    }
};



//Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach( img => {

    img.addEventListener("click" , (e) => {

        //create overlay element

        let overlay = document.createElement("div");

        //add className to overlay
        overlay.className = "popup-overlay";

        //append overlay to the body
        document.body.appendChild(overlay);

        //create the popup
        let popupBox = document.createElement("div");

        //Add Class To The Popup
        popupBox.className = "popup-box";


        if(img.alt !== null){

            //Createing Heading
            let imgHeading = document.createElement("h3");

            //Create Text For Heading
            let imgText = document.createTextNode(img.alt);

            //Append Image Text In Heading
            imgHeading.appendChild(imgText);

            //Append Heading In Body

            popupBox.appendChild(imgHeading);
        }

        //create the image
        let popupImage = document.createElement("img");

        //Set Image Source
        popupImage.src = img.src;

        //append image in popupBox
        popupBox.appendChild(popupImage);

        //append the popupBox in overlay
        overlay.appendChild(popupBox);

        
        //Create Close Box
        let closeButton = document.createElement("span");

        //Create The Close Text Button
        let textCloseButton = document.createTextNode("X");

        //Append Text To Close Button
        closeButton.appendChild(textCloseButton);

        //Add Class To Close Button
        closeButton.className = "close-btn";

        //Add The Close Button The Popup Box
        popupBox.appendChild(closeButton);
    });
});


//Close The Popup

document.addEventListener("click" , function (e) {

  if(e.target.className == "close-btn"){

    //Remove The Current Popup
    e.target.parentNode.remove();

    //Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});


/**Bullets */

const allBullets = document.querySelectorAll(".nav-bullets .bullet");



const allLinks = document.querySelectorAll(".links a");

function scrollToSomeWhere(elements){
  
  elements.forEach(ele => {

    ele,addEventListener("click" , (e) => {

      e.preventDefault();

    document.querySelector(e.target.dataset.section).scrollIntoView({

      behavior:"smooth"
    });

  });
});
}


scrollToSomeWhere(allLinks);
scrollToSomeWhere(allBullets);


function handelAction(ev){

    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });

    ev.target.classList.add("active");

}


// to Bullets show and hidde
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletSpan = document.querySelectorAll(".bullets-options span");
let bulletLoclItem = localStorage.getItem('bullet-options');

if(bulletLoclItem !== null){
    bulletSpan.forEach(span => {
        span.classList.remove('active');
    });
    
    if(bulletLoclItem === 'block'){
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-options .yes").classList.add('active');
    }else{
        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-options .no").classList.add('active');
    }
}



bulletSpan.forEach(span => {
    span.addEventListener('click' , (e) => {
        if(span.dataset.display === 'show'){
            bulletsContainer.style.display = 'block';
            localStorage.setItem('bullet-options' , 'block');
        }else{
            bulletsContainer.style.display = 'none';
            localStorage.setItem('bullet-options' , 'none');
        }
        handelAction(e);
    });
    
});

let restButton = document.querySelector('.rest-options');

restButton.addEventListener('click' , () => {
    localStorage.clear();
    window.location.reload();
});


// Toggle Menu
let toggleBtn = document.querySelector('.toggle-menu');
let tLinks = document.querySelector('.links');

toggleBtn.onclick = function (e){
    e.stopPropagation();
    this.classList.toggle('menu-active');
    tLinks.classList.toggle('open');
}
tLinks.onclick = function (e){
    e.stopPropagation();
}

document.addEventListener('click' , (e) => {
    if(e.target !== toggleBtn && e.target !== tLinks){
        if(tLinks.classList.contains('open')){
            toggleBtn.classList.remove('menu-active');
            tLinks.classList.remove('open');
        }
    }
});



