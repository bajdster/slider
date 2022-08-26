const body = document.querySelector("body");
const pages = document.querySelector("#pages");

const images = ['forest', 'lake', 'mount', 'sea'];

const left = document.querySelector(".prev");
const right = document.querySelector('.next')
const change = document.querySelectorAll('.change')
let currentSlide = 0;
let dotts;

const articles = document.querySelectorAll(".info");
let controlButton = document.querySelector('#controls');



function automateChangeSlide()
{
    
    currentSlide++;
    
    if(currentSlide>=images.length)
    {
        currentSlide=0;
    }
    checkDot();
    displayArticle();
    console.log(currentSlide)

    body.style.background = `url(${images[currentSlide]}.jpg)`
}

function showSlide()
{
  checkDot();
  displayArticle();
  body.style.background = `url(${images[currentSlide]}.jpg)`
}
   
function createNav(callback)
   {
        for(let i=0; i<images.length;i++)
        {
            pages.innerHTML += `<div class ="navEl" >
            <img class="dot" data-number=${i} src = "dot.png">
            
            </div>`
            callback();
        }
   }

createNav(()=>
    {
        dotts = document.querySelectorAll('.dot');
    })
   

//moving forward/backward
function changeSlide()
{
    clearInterval(interval)
    if(this.classList.contains("prev"))
    {
        currentSlide = currentSlide-1;
        if(currentSlide<0) currentSlide = images.length-1;
        checkDot();
        showSlide();
    }
    else if(this.classList.contains("next"))
    {
        currentSlide = currentSlide+1;
        if(currentSlide>images.length-1) currentSlide = 0;
        checkDot();
        showSlide();
    }
    controlButton.innerHTML = '<img src ="pause.png">'
    interval = setInterval(automateChangeSlide,3000)
}


change.forEach(button=>
    {
        button.addEventListener('click', changeSlide)
    })

    
pages.addEventListener("click", function(e)
{
    if(e.target.classList.contains('dot'))
    {
        clearInterval(interval)
        currentSlide = e.target.dataset.number;
        showSlide();
        checkDot();
        interval = setInterval(automateChangeSlide,3000)
        controlButton.innerHTML = '<img src ="pause.png">'
    }
    else if(e.target.id == 'pages')
    {
        return;
    }
})


function checkDot()
{
    for(let i = 0; i<dotts.length;i++)
        {
            dotts[i].classList.remove('active');
        }
        // this.childNodes[e.target.dataset.number].classList.add("active")
        dotts[currentSlide].classList.add("active")
}

function displayArticle()
{
    articles.forEach(el=>el.style.opacity = 0)
    articles[currentSlide].style.opacity = 1;
}

function togglePlay()
{
    if(this.innerHTML.includes("pause"))
    {
        this.innerHTML = '<img src ="play.png">'
        clearInterval(interval);
    }
    else
    {
        this.innerHTML = '<img src ="pause.png">'
        interval = setInterval(automateChangeSlide,3000)
    }
}

controlButton.addEventListener('click', togglePlay)


window.addEventListener("load", showSlide)
let interval = setInterval(automateChangeSlide,3000)

