const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {
    const age = ref(15);

    const prenom = ref();


    const ageplus = () =>{
      console.log(age.value);
      age.value = age.value +1;
    }

    const dico = ref({"nom" : "mael", "age" : 20});

    const tab = ref([{"nom" : "mael", "age" : 20},{"nom" : prenom, "age" : 20}]);

    



    const tab_res = ref([]);


    const get_activites = () => {
      axios.get("../../php/admin/activites").then(response => {
        tab_res.value = response.data
      
      })
    }

  



    onMounted(() => {
      get_activites();
    });

    return { 
        age,
        ageplus,
        tab,
        dico,
        tab_res,
    };
  }
}).mount('#app');