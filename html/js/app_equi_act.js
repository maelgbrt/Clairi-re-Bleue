const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {


    const activite = ref({
      "nom" : '',
      "prix" : '',
      "description" : "",
      "date_d":"",
      "date_f":"",
      "lieu":"",
      "cap_act":""
    });


    const id_equipe_tech = 1;

    const membre_equipe_tech = ref([]);

    const get_membre_equipe = () => {
      axios.get("..").then(response => {
        membre_equipe_tech.value = response.data;

      })
    };


    const loadData = () => {
      get_activites();
    }

    const reponse = ref();


    const activites = ref([]);
    // const tab_res1 = ref([]);

    const form_choice = ref('creation');

    const get_activites = () => {
      axios.get("../../php/admin/activites").then(response => {
        activites.value = response.data;
      });
    };

const modif = (act) => {

    activite.value = {
        ...act,
        date_d: act.date_d.split(' ')[0],
        date_f: act.date_f.split(' ')[0]
    };
    form_choice.value = 'modification';
}


    const update_activites = () => {
      axios.post("../../php/admin.php?entity=activites&option=update",activite.value).then(response =>{
        loadData();
        reponse.value = "Activité mise à jour";
      })
    }


    const supprimer_activite = () => {
      axios.delete("../../").then(response => {

      })
    }

    const creation_activites = () => {
      console.log(activite.value);
      axios.post('../../php/admin.php?entity=activites&option=add', activite.value)
        .then(response => {
          loadData();
          reponse.value = "Activité créée";
        })
        .catch(error => console.error('Erreur POST:', error));
    };
    onMounted(() => {
      loadData();
    });

    return {
      activite,
      activites,
      creation_activites,
      modif,
      form_choice,
      update_activites,
      reponse
    };
  }
}).mount('#app');  