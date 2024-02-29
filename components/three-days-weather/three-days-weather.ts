import {defineComponent, ref} from "vue";
import {iShortWeatherData} from "~/interfaces/iShortWeatherData";
export default defineComponent({
  name: "three-days-weather",
  props:{
    data: {
      type: Array as()=>Array<iShortWeatherData>,
    }
  },
  setup(props){
    const data = ref(props.data)
    return {
      data
    }
  }
})
