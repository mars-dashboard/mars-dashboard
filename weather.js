let api_url = "https://api.maas2.apollorion.com/";

async function get_weather(sol = "") {
  let data = await fetch(api_url + sol).then((result) => result.json());
  return data;
}

let make_chart = (date_list, high_data, low_data) => {
  let chart = document.getElementById("line-chart");

  new Chart(chart, {
    type: "line",
    data: {
      labels: date_list,
      datasets: [
        {
          label: "High Temperature",
          data: high_data,
          borderColor: "red",
          borderWidth: 1,
        },
        {
          label: "Low Temperature",
          data: low_data,
          borderColor: "blue",
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        labels: {
          fontColor: "rgba(255, 213, 116, .8)",
        },
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              color: "rgba(255, 213, 116, .25)",
            },
            ticks: {
              fontColor: "rgba(255, 213, 116, .8)",
              min: -100,
              max: 0,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              color: "rgba(255, 213, 116, .25)",
            },
            ticks: {
              fontColor: "rgba(255, 213, 116, .8)",
            },
          },
        ],
      },
    },
  });
};

async function populate_weather_boxes() {
  // Get current sol's data
  let data = [];
  data.push(await get_weather());
  let current_sol = data[0].sol;
  // Get twenty previous sol
  for (let i = 1; i <= 10; ++i) {
    data.push(await get_weather(current_sol - i));
  }

  let weather_boxes = document.getElementsByClassName("weather_box");
  for (let i = 0; i < weather_boxes.length; ++i) {
    let title;
    let value;

    // Date
    title = document.createElement("div");
    value = document.createElement("div");
    title.textContent = data[i].sol + 49269;
    value.textContent = "Gale Crater";
    title.classList.add("date");
    value.classList.add("date_unit");
    value.classList.add("tiny");
    weather_boxes[i].appendChild(title);
    weather_boxes[i].appendChild(value);

    // High temperatures
    title = document.createElement("div");
    value = document.createElement("div");
    title.textContent = "High Temp.";
    value.textContent = data[i].max_temp + " C";
    title.classList.add("high_title");
    value.classList.add("high_value");
    weather_boxes[i].appendChild(title);
    weather_boxes[i].appendChild(value);

    // Low Temperatures
    title = document.createElement("div");
    value = document.createElement("div");
    title.textContent = "Low Temp.";
    value.textContent = data[i].min_temp + " C";
    title.classList.add("low_title");
    value.classList.add("low_value");
    weather_boxes[i].appendChild(title);
    weather_boxes[i].appendChild(value);

    // Pressure
    title = document.createElement("div");
    value = document.createElement("div");
    title.textContent = "Low Pressure";
    value.textContent = data[i].pressure + "Pa";
    title.classList.add("pressure_title");
    value.classList.add("pressure_value");
    weather_boxes[i].appendChild(title);
    weather_boxes[i].appendChild(value);

    // Atmospheric Opactity
    title = document.createElement("div");
    value = document.createElement("div");
    title.textContent = "Atmos. Opacity";
    value.textContent = data[i].atmo_opacity;
    title.classList.add("atmo_title");
    value.classList.add("atmo_value");
    weather_boxes[i].appendChild(title);
    weather_boxes[i].appendChild(value);

    //UV Irradiance
    title = document.createElement("div");
    value = document.createElement("div");
    title.textContent = "UV Irradiance";
    value.textContent = data[i].local_uv_irradiance_index;
    title.classList.add("uv_title");
    value.classList.add("uv_value");
    weather_boxes[i].appendChild(title);
    weather_boxes[i].appendChild(value);
  }
  // Create list of temperatures
  date_list = [];
  high_data = [];
  for (let i = 0; i < data.length; ++i) {
    high_data.push(data[i].max_temp);
    date_list.push(data[i].sol + 49269);
  }
  low_data = [];
  for (let i = 0; i < data.length; ++i) {
    low_data.push(data[i].min_temp);
  }

  make_chart(date_list, high_data, low_data);
}

populate_weather_boxes();
