async function weather(input = "Bhuj") {
   try {
  
    let gettingData  = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=f0063a39e8bf59a3c13c683ba4032bde&units=metric`);
    let data = await gettingData.json();


    
           document.querySelector(".search").addEventListener("click",()=>{
             let value = document.querySelector(".nav input").value.trim();
             weather(value)
           })
   
           document.querySelector(".nav input").addEventListener("keydown",(e)=>{
               if (e.key === "Enter") {
                let value = document.querySelector(".nav input").value.trim();
                weather(value)
               } 
           })
       

let a = document.querySelector(".info h2").innerHTML= data.weather[0].main;
document.querySelector(".info h3").innerHTML= data.sys.country;                     

switch (a) {
    case "Clear":
        document.querySelector(".weatherJpg img").src="/images/clear.png";
        break;

    case "Snow":
        document.querySelector(".weatherJpg img").src = "/images/snow.png";
        break;
        
    case "Rain":
        document.querySelector(".weatherJpg img").src = "/images/rain.png";
        break;

    case "Drizzle":
        document.querySelector(".weatherJpg img").src = "/images/drizzle.png";
        break;
        
    case "Mist":
        document.querySelector(".weatherJpg img").src = "/images/mist.png";
        break;

    case "Clouds":
        document.querySelector(".weatherJpg img").src = "/images/clouds.png";
        break;

    default: document.querySelector(".weatherJpg img").src="/images/clear.png";
        break;
}


document.querySelector(".midText h1").innerHTML = Math.round(data.main.temp) + "°C";
document.querySelector(".midText h3").innerHTML = "feels like " + Math.round(data.main.feels_like) + "°C";
document.querySelector(".midText h2").innerHTML = data.name;

document.querySelector(".lastText h2").innerHTML = data.main.humidity + "%";
document.querySelector(".wind h2").innerHTML = Math.round(data.wind.speed) * 3.6 + " Km/h";

document.querySelector(".err").classList.remove("errJs");
document.querySelector(".err").innerHTML = "";  



}

catch (error) {

    document.querySelector(".nav input").value="";
    document.querySelector(".nav input").placeholder ="Server Error or Invalid City Name";
    document.querySelector(".nav input").classList.add("placeJs");
    document.querySelector(".err").classList.add("errJs");
    document.querySelector(".errJs").innerHTML = "Invalid City Name:- " + input; 
    console.error("Error:", error)}
}


weather();





