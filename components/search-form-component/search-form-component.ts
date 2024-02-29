import {computed, defineComponent, ref} from "vue"
import cityData from "../../resources/city.list.json"
import axios from "axios";
import {formatWeather} from "../../helpers/weatherFormatter"
import {formatWeatherShort} from "../../helpers/weatherFormatter"

export default defineComponent({
  name: "search-form-component",
  emits: ['updateCurrentWeather', 'updateThreeDaysWeather'],
  setup(props, {emit}) {
    const cityName = ref("")
    const showList = ref(false)
    const similiarCities: any = []
    const apiKey = "05a33b29401f9146dcff627510af4d30"
    const computedCitiesList = computed(() => {
      return similiarCities
    })
    const setShowList = (flag: boolean) => {
      showList.value = flag
    }
    const getForecast = async (city: any) => {
      setShowList(false)
      cityName.value = city.name
      await getForecastOneDay(city)
      await getForecastThreeDays(city)
    }
    const getForecastOneDay = async (city: any) => {
      emit('updateCurrentWeather', undefined)
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=${apiKey}&units=metric`
      const res = await axios.get(apiUrl)
      emit('updateCurrentWeather', formatWeather(res.data))
    }
    const getForecastThreeDays = async (city: any) => {
      emit('updateThreeDaysWeather', [])
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?id=${city.id}&appid=${apiKey}&units=metric`
      const res = await axios.get(apiUrl)
      emit('updateThreeDaysWeather', formatWeatherShort(res.data))
    }
    const findCities = () => {
      emit('updateCurrentWeather', undefined)
      emit('updateThreeDaysWeather', [])
      similiarCities.length = 0
      if (cityName.value.trim() === "") return
      for (let city of cityData as Iterable<any>) {
        if (city.name.toLowerCase().startsWith(cityName.value.toLowerCase()) && !similiarCities.includes())
          similiarCities.push(city);
        if (similiarCities.length === 5)
          break;
      }
    }
    return {
      getForecast,
      findCities,
      setShowList,
      cityName,
      showList,
      computedCitiesList
    }
  }
})
