let api_url = "https://api.maas2.apollorion.com/";

async function get_weather(sol = "") {
  let data = await fetch(api_url + sol).then((result) => result.json());
  return data;
}

async function populate_weather_boxes() {
  // Get current sol's data
  let data = [];
  data.push(await get_weather());
  let current_sol = data[0].sol;
  // Get two previous sol
  data.push(await get_weather(current_sol - 1));
  data.push(await get_weather(current_sol - 2));
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
}

populate_weather_boxes();
