/*let searchButton = document.querySelector("#search")*/

sendAPIRequest()

async function sendAPIRequest(){
    let API_KEY= "8w2DmOrxvNdghKOLw0yFdBW0JiXptiUTXd1OZkcS"
    /*let response = await fetch('https://api.nasa.gov/planetary/apod?api_key=8w2DmOrxvNdghKOLw0yFdBW0JiXptiUTXd1OZkcS');*/
    let response = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=8w2DmOrxvNdghKOLw0yFdBW0JiXptiUTXd1OZkcS');
    console.log(response)
    let data =await response.json()
    console.log(data)
    usaApiData(data)
}

function usaApiData(data){
/*document.querySelector("#content").innerHTML+=data.date*/
/*document.querySelector("#content").innerHTML+=`<img src="${data.url}">`*/
document.querySelector("#content").innerHTML+=`<img src="${data.photos[0].img_src}">`
}