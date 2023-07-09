//!TASK 1
/*
Asynchronous programming enables executing 
multiple tasks simultaneously without blocking other code.
 Tasks like fetching data can be initiated, 
 allowing other code to continue, and handling results
  once tasks complete.  
*/


const getIP = async () => {
  try {
    const res = await fetch("https://api.ipify.org/?format=json");
    const data = await res.json();
    return data.ip;
  } catch (err) {
    console.log(err);
  }
};

const getIPData = async (ip) => {
  try {
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=country,region,city,continent,org`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const displayData = (data) => {
  const ipDataContainer = document.querySelector("#ipDataContainer");
  ipDataContainer.style.display = "block";
  ipDataContainer.innerHTML=''
  Object.entries(data).map(([key, value]) => {
    const p = document.createElement("p");
    p.textContent = `${key} : ${value}`;
    ipDataContainer.appendChild(p);
  });
};

const handleIPButton = async () => {
  const ip = await getIP();
  const ipData = await getIPData(ip);
  displayData(ipData);
};


