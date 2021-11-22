const sections = [ 'Home', 'PageOne', 'PageTwo', 'PageThree', 'PageFour']
function pageLoad ()
{
    //alert("pageLoad");
    showSection(0);
}
function showSection (sectionIdx)
{
    sections.forEach((section, idx)=>{
        if (sectionIdx===idx)
        {
            $("#"+section).show();
        }
        else {
            $("#"+section).hide();
        }
    });
}

sendAPIRequest()
sendImageRequest()
var imageIndex=0;
var GV_IMAGES=[];
var imageCount=4;
function imageTimer()
{
    ++imageIndex;
    console.log ("count", imageCount);
    if (imageIndex===imageCount)
    {
        //alert("reset");
        imageIndex=0;   
    }
    console.log(imageIndex);
    usaApiData(GV_IMAGES);
    setTimeout(imageTimer, 10000);
}
async function sendAPIRequest(){
    let API_KEY= "8w2DmOrxvNdghKOLw0yFdBW0JiXptiUTXd1OZkcS"
    let response = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=8w2DmOrxvNdghKOLw0yFdBW0JiXptiUTXd1OZkcS');
    console.log(response)
    let data =await response.json()
    GV_IMAGES=data;
   imageCount=data.photos.length;
console.log("IMAGE COUNT", imageCount);
    console.log(data)
    setTimeout(imageTimer, 10000);
    usaApiData(data)
}

function usaApiData(data){
document.querySelector("#content").innerHTML=`<img src="${data.photos[imageIndex].img_src}">`
}

async function sendImageRequest(){
    let response = await fetch('https://api.nasa.gov/planetary/apod?api_key=8w2DmOrxvNdghKOLw0yFdBW0JiXptiUTXd1OZkcS');
    console.log(response)
    let data =await response.json()
    console.log(data)
    useImageData(data)
}

function useImageData(data){
document.querySelector("#imagecontent").innerHTML+=`<img src="${data.url}">`
document.querySelector("#text1").innerHTML+=data.explanation
}

const searchFrom = document.querySelector('.search')
const input = document.querySelector('.input')
const newsList = document.querySelector('.news-list')

searchFrom.addEventListener('submit',retrieve)

function retrieve(e){
    if(input.value== ''){
        alert('empty field, try again')
        return
    }

newsList.innerHTML=''
e.preventDefault()
const apiKey='7cccceb97d484307a45768488a0e7c3f'
let topic = input.value;
  
let url =`https://newsapi.org/v2/everything?q=${topic}&from=2021-11-15&sortBy=publishedAt&apiKey=7cccceb97d484307a45768488a0e7c3f`

fetch(url).then((res)=>{
    return res.json()
}).then((data)=>{
console.log(data)

data.articles.forEach(article=>{
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.setAttribute('href',article.url);
    a.setAttribute('targer','_blank');
    a.textContent=article.title;
    li.appendChild(a);
    newsList.appendChild(li)
})
}).catch((error)=>{
    console.log(error)
})
}

function h_to_hms(h) {
    var x = h * 3600;
    var hh = Math.floor(x / 3600);
    if (hh < 10) hh = "0" + hh;
    var y = x % 3600;
    var mm = Math.floor(y / 60);
    if (mm < 10) mm = "0" + mm;
    var ss = Math.round(y % 60);
    if (ss < 10) ss = "0" + ss;
    return hh + ":" + mm + ":" + ss;
  }
  
  setInterval(function(){
    var tai_offset = 37;
    var date = new Date();
    var millis = date.getTime();
    var jd_ut = 2440587.5 + (millis / 8.64E7);
    var jd_tt = jd_ut + (tai_offset + 32.184) / 86400;
    var j2000 = jd_tt - 2451545.0;
    var msd = (((j2000 - 4.5) / 1.027491252) + 44796.0 - 0.00096);
    var mtc = (24 * msd) % 24;
  
    document.querySelector('p.time').innerText = h_to_hms(mtc);
  }, 100);