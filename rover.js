function imageEvent() {
    var datePicker = document.getElementById("date");
    datePicker.min = "2012-08-06";
    var button = document.getElementById("button");

    button.addEventListener("click", function () {
        var date = datePicker.value;
        console.log(date)
        //var url = `https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?earth_date=${date}&api_key=DEMO_KEY`;
        const url=`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=DEMO_KEY`;
        console.log(url)
        const myHeaders =
        {
            method: "GET",
            mode: 'cors',
            headers: {}
        };
       // alert("about to call ")
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            //    alert("callback");
                if (data)
                    var image = data.photos[0].img_src;
                var sol = data.photos[0].sol;
                var cameraName = data.photos[0].camera.full_name;
                var roverName = data.photos[0].rover.name;
                var text = `The image below was taken by the ${cameraName} on the ${roverName} rover on Martian sol ${sol}.`;
             //   console.log(response.status);
                document.getElementById("results").innerHTML = text;
                document.getElementById("image").src = image;
                document.getElementById("image").style.display = "block";
            });


    });
}