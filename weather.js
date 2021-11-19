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
  // Get three previous sol
  data.push(await get_weather(current_sol - 1));
  data.push(await get_weather(current_sol - 2));
  data.push(await get_weather(current_sol - 3));
  let weather_boxes = document.getElementsByClassName("weather_box");
  for (let i = 0; i < weather_boxes.length; ++i) {
    // High temperatures
    let weather_cell = document.createElement("div");
    let title = document.createElement("div");
    let value = document.createElement("div");
    title.textContent = "High";
    value.textContent = data[i].max_temp + "C";
    weather_cell.appendChild(title);
    weather_cell.appendChild(value);
    weather_boxes[i].appendChild(weather_cell);

    // Low Temperatures
    weather_cell = document.createElement("div");
    title = document.createElement("div");
    value = document.createElement("div");
    title.textContent = "Low";
    value.textContent = data[i].min_temp + "C";
    weather_cell.appendChild(title);
    weather_cell.appendChild(value);
    weather_boxes[i].appendChild(weather_cell);

    // Atmospheric Opacity
    weather_cell = document.createElement("div");
    title = document.createElement("div");
    value = document.createElement("div");
    title.textContent = "Clarity";
    value.textContent = data[i].atmo_opacity;
    weather_cell.appendChild(title);
    weather_cell.appendChild(value);
    weather_boxes[i].appendChild(weather_cell);

    // UV Radiation
    weather_cell = document.createElement("div");
    title = document.createElement("div");
    value = document.createElement("div");
    title.textContent = "UV Radiation";
    value.textContent = data[i].local_uv_irradiance_index;
    weather_cell.appendChild(title);
    weather_cell.appendChild(value);
    weather_boxes[i].appendChild(weather_cell);
  }
}

populate_weather_boxes();
