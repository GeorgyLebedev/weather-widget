import {computed, defineComponent, ref} from "vue";
import {iWeatherData} from "~/interfaces/iWeatherData";

export default defineComponent({
  name: "current-weather-component",
  props: {
    data: {
      type: Object as ()=> iWeatherData,
    }
  },
  setup(props) {
   const data = ref(props.data)
    return {
      data
    }
  }
})
