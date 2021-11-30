const sections = ["Home", "PageOne", "PageTwo", "PageThree", "PageFour"];
function pageLoad() {
  //alert("pageLoad");
  showSection(0);
  imageEvent();
}
function showSection(sectionIdx) {
  sections.forEach((section, idx) => {
    if (sectionIdx === idx) {
      $("#" + section).show();
    } else {
      $("#" + section).hide();
    }
  });
}

sendAPIRequest();
sendImageRequest();
var imageIndex = 0;
var GV_IMAGES = [];
var imageCount = 4;
function imageTimer() {
  ++imageIndex;
  console.log("count", imageCount);
  if (imageIndex === imageCount) {
    //alert("reset");
    imageIndex = 0;
  }
  console.log(imageIndex);
  usaApiData(GV_IMAGES);
  setTimeout(imageTimer, 10000);
}
async function sendAPIRequest() {
  let API_KEY = "8w2DmOrxvNdghKOLw0yFdBW0JiXptiUTXd1OZkcS";
  let response = await fetch(
    "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=8w2DmOrxvNdghKOLw0yFdBW0JiXptiUTXd1OZkcS"
  );
  console.log(response);
  let data = await response.json();
  GV_IMAGES = data;
  imageCount = data.photos.length;
  console.log("IMAGE COUNT", imageCount);
  console.log(data);
  setTimeout(imageTimer, 10000);
  usaApiData(data);
}

function usaApiData(data) {
  document.querySelector(
    "#content"
  ).innerHTML = `<img alt="dayimage" src="${data.photos[imageIndex].img_src}">`;
}

async function sendImageRequest() {
  let response = await fetch(
    "https://api.nasa.gov/planetary/apod?api_key=8w2DmOrxvNdghKOLw0yFdBW0JiXptiUTXd1OZkcS"
  );
  console.log(response);
  let data = await response.json();
  console.log(data);
  useImageData(data);
}

function useImageData(data) {
  document.querySelector(
    "#imagecontent"
  ).innerHTML += `<img alt="photo" src="${data.url}">`;
  document.querySelector("#text1").innerHTML += data.explanation;
}

const searchFrom = document.querySelector(".search");
const input = document.querySelector(".input");
const newsList = document.querySelector(".news-list");

searchFrom.addEventListener("submit", retrieve);

function retrieve(e) {
  if (input.value == "") {
    alert("empty field, try again");
    return;
  }

  newsList.innerHTML = "";
  e.preventDefault();
  const apiKey = "7cccceb97d484307a45768488a0e7c3f";
  let topic = input.value;

  let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${topic}&api-key=%20Zudy5h7Ytkm4pedrotD5r3fDvDxh5cZP`;

  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);

      data.response.docs.forEach((article) => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.setAttribute("href", article.web_url);
        a.setAttribute("targer", "_blank");
        a.textContent = article.headline.main;
        li.appendChild(a);
        newsList.appendChild(li);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

var btn = document.getElementById("btnC");

btn.addEventListener("click", GenererPoids);

function GenererPoids() {
  var masse = document.getElementById("masse").value;
  var gMars = 0.379;

  var result = Math.round(masse * gMars);

  document.getElementById("result").innerHTML =
    "weight on mars <br><span>" + result + "</span> kg";
}
