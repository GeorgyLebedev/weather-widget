import {iWeatherData} from "~/interfaces/iWeatherData";
import {iShortWeatherData} from "~/interfaces/iShortWeatherData";
import weatherIcons from "~/helpers/weatherIcons";
export function formatWeather(data:any):iWeatherData {
  return {
    city: data.name,
    weather: data.weather[0].main,
    temperature: formatTemperature(data.main.temp),
    temperatureFeels: formatTemperature(data.main.feels_like),
    windSpeed: data.wind.speed,
    windDirection: getWindDirection(data.wind.deg),
    humidity: data.main.humidity,
    pressure: String(data.main.pressure*0.75),
    weatherIconData: getWeatherIcon(data.weather[0].main)
  }
}
export function formatWeatherShort(data:any):iShortWeatherData|Array<iShortWeatherData>{
  const indexes=[9,17,25]
  const result=[] as Array<iShortWeatherData>
  indexes.forEach((index)=>{
    result.push({
      dayText:getTextDate(data.list[index].dt),
      dayMonth:getDayMonth(data.list[index].dt),
      temperature:formatTemperature(data.list[index].main.temp),
      weather:data.list[index].weather[0].main,
      weatherIconData:getWeatherIcon(data.list[index].weather[0].main)
    })
  })
  return result
}
function getWeatherIcon(weather:string):string{
  switch (weather.toLowerCase()) {
    case "clear":
      return weatherIcons.clear
    case "clouds":
      return weatherIcons.cloudy
    case "rain":
      return weatherIcons.rain
    case "heavy rain":
      return weatherIcons.heavyRain
    case "storm":
      return weatherIcons.storm
    case "snow":
      return weatherIcons.snow
    case "mist":
      return weatherIcons.mist
    default:
      return weatherIcons.clear
  }
}
function getTextDate(unix:number):string{
  const date = new Date(unix * 1000);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
}
function getDayMonth(unix:number) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const date = new Date(unix * 1000); // умножаем на 1000, так как в Unix-метках время обычно в секундах, а new Date() ожидает миллисекунды
  const day = date.getDate();
  const month = months[date.getMonth()];
  return `${day} ${month}`;
}
function formatTemperature(value: number): string {
  let result = ""
  if (value > 0)
    result += "+"
  result += Math.ceil(value)
  result += "°С"
  return result
}

function getWindDirection(deg: number) {
  if (deg >= 337.5 || deg < 22.5) {
    return "N";
  } else if (deg >= 22.5 && deg < 67.5) {
    return "NE";
  } else if (deg >= 67.5 && deg < 112.5) {
    return "E";
  } else if (deg >= 112.5 && deg < 157.5) {
    return "SE";
  } else if (deg >= 157.5 && deg < 202.5) {
    return "S";
  } else if (deg >= 202.5 && deg < 247.5) {
    return "SW";
  } else if (deg >= 247.5 && deg < 292.5) {
    return "W";
  } else {
    return "NW";
  }
}
