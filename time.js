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

function get_current_msd() {
  let tai_offset = 37;
  let date = new Date();
  let millis = date.getTime();
  let jd_ut = 2440587.5 + millis / 8.64e7;
  let jd_tt = jd_ut + (tai_offset + 32.184) / 86400;
  let j2000 = jd_tt - 2451545.0;
  let msd = (j2000 - 4.5) / 1.027491252 + 44796.0 - 0.00096;
  return msd;
}

function update_times() {
  let msd = get_current_msd();
  let date = new Date();
  let mtc = (24 * msd) % 24;
  let amt = h_to_hms(mtc);
  let gale = h_to_hms(mtc + 9.161834);
  let green = h_to_hms(mtc - 8.443334);
  document.getElementsByClassName("mars_time")[0].textContent = amt;
  document.getElementsByClassName("gale_time")[0].textContent = gale;
  document.getElementsByClassName("green_time")[0].textContent = green;
  document.getElementsByClassName("earth_date")[0].textContent = date
    .toUTCString()
    .replace(/ GMT/, "");
}

function populate_time() {
  let time_box = document.getElementsByClassName("time_box")[0];

  let node;

  // Airy Mean Time
  node = document.createElement("div");
  node.textContent = "Airy Mean Time";
  node.classList.add("airy_mean_time");
  time_box.appendChild(node);

  //Mars Time
  node = document.createElement("div");
  node.classList.add("mars_time");
  time_box.appendChild(node);

  //Mars Date
  node = document.createElement("div");
  node.classList.add("mars_date_title");
  node.textContent = "TODAY";
  time_box.appendChild(node);
  node = document.createElement("div");
  node.classList.add("mars_date");
  node.textContent = Math.floor(get_current_msd());
  time_box.appendChild(node);

  //Gale Crater Time
  node = document.createElement("div");
  node.classList.add("gale_title");
  node.textContent = "Gale Crater";
  time_box.appendChild(node);
  node = document.createElement("div");
  node.classList.add("gale_time");
  time_box.appendChild(node);

  //Green Valley Time
  node = document.createElement("div");
  node.classList.add("green_title");
  node.textContent = "Green Valley";
  time_box.appendChild(node);
  node = document.createElement("div");
  node.classList.add("green_time");
  time_box.appendChild(node);

  // Earth
  node = document.createElement("div");
  node.textContent = "Earth - UTC";
  node.classList.add("earth_title");
  time_box.appendChild(node);

  node = document.createElement("div");
  node.classList.add("earth_date");
  time_box.appendChild(node);
}

populate_time();

setInterval(update_times, 100);
