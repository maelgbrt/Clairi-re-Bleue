
const { createApp, ref, onMounted, computed} = Vue;

createApp({
  setup() {

        const user = ref({name: "John Doe"});
    
    return { 
    user
  };
}}).mount('#app');