const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {

    const formules = ref([]);

    get_fomules = () => {
        axios.get('php/admin.php?entity=formules').then(response => {
            formules.value = response.data;
            console.log("les formules : ");
            console.log(response.data);
        })
    }

 onMounted(() => {     
    get_fomules(); 
    });

    return {
    formules
    };
  }
}).mount('#app');  