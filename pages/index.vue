<template>
  <div class="main-container">
    <search-form-component @updateCurrentWeather="updateCurrentWeatherData" @updateThreeDaysWeather="updateNextDaysData"/>
    <section class="widget-container">
      <transition>
        <current-weather-component v-if="weatherData.current" :data="weatherData.current"/>
      </transition>
      <transition>
        <three-days-weather v-if="weatherData.nextDays.length" :data="weatherData.nextDays"></three-days-weather>
      </transition>
    </section>
  </div>
</template>

<script lang="ts">
import Vue, {reactive, ref} from 'vue'
import searchFormComponent from "~/components/search-form-component/search-form-component.vue";
import currentWeatherComponent from "~/components/current-weather-component/current-weather-component.vue";
import threeDaysWeather from "~/components/three-days-weather/three-days-weather.vue";
import {iWeatherData} from "~/interfaces/iWeatherData";
import {iShortWeatherData} from "~/interfaces/iShortWeatherData";

export default Vue.extend({
  name: 'IndexPage',
  transition: "fade",
  components: {
    searchFormComponent,
    currentWeatherComponent,
    threeDaysWeather
  },
  setup() {
    const weatherData = reactive({
      current: undefined as iWeatherData | undefined,
      nextDays: [] as Array<iShortWeatherData>
    })
    const updateCurrentWeatherData = (data: iWeatherData) => {
      weatherData.current = data
    }
    const updateNextDaysData = (data: Array<iShortWeatherData>) => {
      weatherData.nextDays = data
    }
    return {
      weatherData,
      updateCurrentWeatherData,
      updateNextDaysData
    }
  }
})
</script>

<style>
* {
  box-sizing: border-box;
  outline: none;
}

body {
  margin: 0;
  padding: 0;
  font-family: "Segoe UI";
}

h1, h2, h3, h4, h5, h6, p {
  margin: 0;
  padding: 0;
}

h1 {
  font-size: 2em;
}
.main-container {
  display: flex;
  min-width: 350px;
  flex-direction: column;
  margin: 0 auto;
  padding-inline: 10px;
  gap: 20px;
}
.widget-container {
  display: flex;
}
@media screen and (min-width: 600px) {
  .main-container{
    width: max(40%, 600px);
  }
  .widget-container{
    flex-direction: row;
    gap: 20px;
  }
}

@media screen and (min-width: 100px) and (max-width: 600px) {
  .main-container {
    width: 100%;
  }
  .widget-container{
    align-items: center;
    flex-direction: column;
    gap: 20px;
  }
}


.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
