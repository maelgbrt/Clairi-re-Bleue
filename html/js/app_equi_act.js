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


    const id_equipe_tech = ref(5);
    const membres_act = ref([]);
    // const id_activite = ref();

  
    const membre_equipe_tech = ref([]);

    // const get_membre_equipe = () => {
    //   axios.get("..").then(response => {
    //     membre_equipe_tech.value = response.data;
    //     id_equipe_tech.value = response.data.id_equipe_tech;
    //   })
    // };



    async function isConnected() {
    try {
        const response = await axios.get('../php/login/isConnected');
        console.log(response.data);
        return response.data.id; 
    } catch (error) {
        console.error("Erreur de session", error);
        return null;
    }
}



    const loadData = async () => {

      const id = await isConnected();
      if(id) {
        id_equipe_tech.value  = id;

        get_activites();
      }else{
        window.location.href = "login.html";
      }
    }

    const reponse = ref();


    const activites = ref([]);
    // const tab_res1 = ref([]);

    const form_choice = ref('creation');

    const get_activites = () => {
      axios.get(`../php/admin/activites/withAnimateur/${id_equipe_tech.value}`).then(response => {
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
    get_familles_activites();
}


    const update_activites = () => {
      console.log("update")
      axios.post("../php/admin.php?entity=activites&option=update",activite.value).then(response =>{
        console.log(response.data);
        loadData();
        reponse.value = "Activité mise à jour";
      })
    }


    const get_familles_activites = () => {
      axios.post(`../php/admin/activites/participants/${activite.value.id}`).then(response =>{
        membres_act.value = response.data;
      });
    }


    const supprimer_activite = (id) => {
      axios.delete(`../php/admin/activites/delete/${id}`).then(response => {
      loadData();

      })
    }

    const supprimer_reservation_famille_activite = (id) => {
      axios.get(`../php/admin/activites/reservations/delete/${id}`).then(response =>{
        console.log(response.data);
        get_familles_activites();
      })
    }

    const creation_activites = () => {
      activite.value.id_animateur = id_equipe_tech.value;
      axios.post('../php/admin.php?entity=activites&option=add', activite.value)
        .then(response => {
          loadData();
          reponse.value = "Activité créée";
        })
        .catch(error => console.error('Erreur POST:', error));
    };


const disconnect = () => {
  axios.get('../php/login/disconnected').then(response => {
    if(response.data.status == "disconnected"){
      window.location.href = "login.html";
    }else{
      console.log("error lors de la deconnexion");
    }
  })
}



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
      reponse,
      supprimer_activite,
      membres_act,
      supprimer_reservation_famille_activite,
      disconnect
    };
  }
}).mount('#app');  