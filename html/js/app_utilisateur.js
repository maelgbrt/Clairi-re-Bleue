const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {
    const confirmation = ref(false);
    const menuOpen = ref(false);
    const id_famille = ref();
    const payeur = ref([]);
    const activites = ref([]);
    const fifo_activite = ref([]);
    const data = ref([]);
    const nb_membre = ref(null);
    const displayMenu = ref(true);
    const choiceMenu = ref('famille');
    const emplacements = ref([]);
    const month = ref(new Date().toISOString().slice(0, 7));
    const date_debut = ref();
    const date_fin = ref();
    const NumEmplacement = ref();
    const ResaEmplacement = ref([]);
    const ChoiceOverlay = ref(null);
    const Infos_activites = ref([]);
    const id_payeur = ref();
    const membresFamilles = ref([]);
    const ajoutMembre = ref();
    const calendrier = ref([]);
    const creneaux = ref([]);                   // ✅ déclaré une seule fois
    const rechercheCreneaux = ref(false);        // ✅ ajouté (manquait)
    const dateDebutEmplacement = ref(null);
    const dateFinEmplacement = ref(null);
    const error = ref();

    const membre = ref({
      "nom": '',
      "prenom": '',
      "date_naissance": ''
    });

    const Pos_emplacements = [
      { id: 1, x: 0, y: 20 },
      { id: 2, x: 0, y: 0 },
      { id: 3, x: 0, y: 0 },
      { id: 4, x: 0, y: 0 },
      { id: 5, x: 0, y: 0 },
      { id: 6, x: 0, y: 0 },
      { id: 7, x: 0, y: 0 },
      { id: 8, x: 0, y: 0 },
      { id: 9, x: 0, y: 0 },
      { id: 10, x: 0, y: 0 },
      { id: 11, x: 0, y: 0 },
      { id: 15, x: 0, y: 0 },
      { id: 12, x: 0, y: 0 },
      { id: 13, x: 0, y: 0 },
      { id: 14, x: 0, y: 0 },
    ];

    data.value = {
      id_famille: id_famille.value,
    };

    // ✅ Une seule version de grouperDatesConsecutives
    const grouperDatesConsecutives = (dates) => {
      if (dates.length === 0) return [];

      const resultats = [];
      let debut = dates[0];
      let fin = dates[0];

      for (let i = 1; i < dates.length; i++) {
        const lendemainAttendu = new Date(fin.split(' ')[0]);
        lendemainAttendu.setDate(lendemainAttendu.getDate() + 1);
        const lendemainStr = lendemainAttendu.toISOString().split('T')[0];
        const jourActuelStr = dates[i].split(' ')[0];

        if (lendemainStr === jourActuelStr) {
          fin = dates[i];
        } else {
          resultats.push({ id: resultats.length + 1, debut, fin });
          debut = dates[i];
          fin = dates[i];
        }
      }

      resultats.push({ id: resultats.length + 1, debut, fin });
      rechercheCreneaux.value = true;
      return resultats;
    };

    // ✅ Une seule version de creneauxDispo
    const creneauxDispo = () => {
      const datesLibres = calendrier.value
        .filter(cal => cal.reservation === null)
        .map(cal => cal.date);

      creneaux.value = grouperDatesConsecutives(datesLibres);
      console.log("Voici les créneaux :", creneaux.value);
    };

    const InscrireFamilleEmplacement = (num_emplacement, capacite) => {
      if (nb_membre.value <= 0) {
        alert("Vous devez etre plus de 0");
        nb_membre.value = 0;
        return;
      } else if (nb_membre.value > capacite) {
        alert("Vous etes trop nombreux");
        nb_membre.value = null;
        return;
      } else {
        const postData = {
          num_emplacement: num_emplacement,
          id_famille: id_famille.value,
          nb_membre: nb_membre.value,
          date_debut: date_debut.value,
          date_fin: date_fin.value
        };

        NumEmplacement.value = num_emplacement;
        console.log("Numéro d'emplacement sélectionné :", NumEmplacement.value);
        console.log("Données envoyées à l'API :", postData);

        axios.post('../../php/admin/emplacements/reservations/add', postData).then(response => {
          if (response.data.status === 'compromis') {
            calendrier.value = response.data.calendrier;
            console.log(calendrier.value);
            creneauxDispo();
          } else if (response.data.status === 'success') {
            alert("Réservation réussie !");
            loadData();
          }
        });
      }
    };

    const reserverCreneau = (creneau) => {
      date_debut.value = creneau.debut;
      date_fin.value = creneau.fin;
      console.log("Nouvelles dates :", date_debut.value, date_fin.value);
      InscrireFamilleEmplacement(NumEmplacement.value);
    };

    const get_payeur = async (id) => {
      id_famille.value = await isConnected();
      axios.get(`../../php/utilisateur.php?entity=payeur&id=${id_famille.value}`)
        .then((response) => {
          payeur.value = response.data;
        })
        .catch(err => console.error("Erreur API :", err));
    };

    const get_reservation_famille = () => {
      console.log("Récupération de la réservation d'emplacement pour la famille ID :", id_famille.value);
      axios.get(`../../php/utilisateur.php?entity=emplacements&option=reservation&id=${id_famille.value}`)
        .then((response) => {
          ResaEmplacement.value = response.data;
        })
        .catch(err => console.error("Erreur API :", err));
    };

    const reserverActivite = (id_activite) => {
      if (nb_membre.value <= 0) {
        alert("Le nombre de personnes doit être supérieur à 0");
        nb_membre.value = 0;
        return;
      }
      data.value.id_activite = id_activite;
      data.value.nb_membre = nb_membre.value;
      data.value.id_famille = id_famille.value;

      axios.post('../../php/utilisateur.php?entity=users&option=reservation&secondOption=add', data.value)
        .then(() => {
          loadData();
          nb_membre.value = null;
        })
        .catch(err => console.error("Erreur API :", err));
    };

    const deleteFifo = (activite) => {
      id = activite.file_attente_activite.id_attente
      axios.get(`../../php/admin/activites/fifo/delete/` + id).then(() => {
        loadData();
        nb_membre.value = null;
      });
    };

    const addFifoMb = (activite) => {
      id = activite.file_attente_activite.id_attente
      data.value = { "nb_membre_aj": nb_membre.value };
      console.log(data.value);
      axios.post(`../../php/utilisateur.php?entity=activites&option=fifo&secondOption=addM&id=${id}`, data.value).then(() => {
        loadData();
        nb_membre.value = null;
      });
    };




 function updateResaActivite(activite,nb_membre){
   data.value = {"id_activite" : activite.id_activite,"id_famille" : id_famille.value,"nb_membre" : nb_membre}
   console.log(data.value);
    axios.post(`../../php/admin.php?entity=activites&option=reservations&secondOption=updateCapResa&id=${nb_membre}`,data.value).then(response =>{
      console.log(response.data);
    })
    }


  
    // updateFifo(activite);












   const delFifoMb = (activite) => {
  if (!nb_membre.value || nb_membre.value <= 0) {
    alert("Veuillez saisir un nombre");
    return;
  }

  console.log("ho hey");

  const nb_fifo_actuel = activite.file_attente_activite.nb_membre;
  const nb_apres_retrait = nb_fifo_actuel - nb_membre.value;
  

  console.log("après retrait:", nb_apres_retrait,"acivite capacite : " ,activite.cap_act);

  if (nb_membre.value > nb_fifo_actuel) {
    alert("Vous n'êtes pas autant dans la file d'attente");
    return;
  } else if (nb_apres_retrait == 0) {
    // Plus personne → juste supprimer la fifo
    deleteFifo(activite).then(() => loadData());
  } else if (nb_apres_retrait <= activite.cap_act) {
   
    console.log("on peut le metre ds resa")
    nb_membre.value = nb_apres_retrait
    console.log(activite);
    updateResaActivite(activite,nb_apres_retrait);
    deleteFifo(activite)
    loadData();
  }else{
    console.log("il va la");
    const payload = { nb_membre_aj: nb_membre.value, signe: '-' };
    axios.post(`../../php/utilisateur.php?entity=activites&option=fifo&secondOption=delM&id=${activite.file_attente_activite.id_attente}`, payload)
      .then(() => { loadData(); nb_membre.value = null; });
  }
};

    const deleteReservationActivite = (activite) => {
      id_res_activite = activite.id_reservation_activite

      axios.get(`../../php/admin.php?entity=activites&option=reservations&secondOption=delete&id=${id_res_activite}`).then(() => {
        loadData();
      });
    };

    const deleteReservation = (id_res_empl) => {
      axios.post(`../../php/utilisateur.php?entity=emplacements&option=delete&id=${id_res_empl}`)
        .then(() => {
          alert("Réservation supprimée !");
          get_reservation_famille();
        })
        .catch(err => console.error("Erreur API :", err));
    };

    const get_activites_with_reservations = (id_famille) => {
      axios.get(`../../php/utilisateur.php?entity=activites&option=with_reservations&id=${id_famille}`)
        .then((response) => {
          console.log("les activites que je recup");
          console.log(response.data);
          activites.value = response.data;
        })
        .catch(err => console.error("Erreur API :", err));
    };

    const get_membres_famille = () => {
      axios.get(`../../php/admin/familles/membres/${id_famille.value}`).then(response => {
        membresFamilles.value = response.data;
      });
    };

    const get_emplacements = () => {
      axios.get('../../php/admin/emplacements/mois/' + month.value).then(response => {
        emplacements.value = response.data;
        console.log("les emplacements");
        console.log(response.data);
      });
    };

    const disconnect = () => {
      axios.get('../php/login/disconnected').then(response => {
        if (response.data.status == "disconnected") {
          window.location.href = "login.html";
        } else {
          console.log("error lors de la deconnexion");
        }
      });
    };

    const createMembre = () => {
      membre.value.id_famille = id_famille.value;
      axios.post("../../php/admin/familles/membres/add", membre.value).then(() => {
        loadData();
        ajoutMembre.value = !ajoutMembre.value;
      });
    };

    const deleteMembre = (id_membre) => {
      axios.delete(`../../php/admin/familles/membres/delete/${id_membre}`).then(() => {
        loadData();
      });
    };

    const InfoActivite = (id_activite) => {
      ChoiceOverlay.value = 'InfoActivite';
      Infos_activites.value.id_activite = id_activite;
      axios.get(`../../php/utilisateur.php?entity=activites&id=${id_activite}`).then(reponse => {
        Infos_activites.value = reponse.data;
      });
    };

    const ajouterMembreActivite = (activite) => {
      data.value.id_famille = id_famille.value;
      data.value.id_activite = activite.id_activite;
      data.value.id_reservation_activite = activite.id_reservation_activite;
      data.value.nb_membre = nb_membre.value;

      // if(nb_membre.value <= activite.cap_act){
      axios.post(`../../php/utilisateur.php?entity=activites&option=ajouter_membre`, data.value)
        .then(() => { loadData() })
        .catch(err => console.error("Erreur API :", err));
      // }else{

      // }
    };

    const retirerMembreActivite = (activite) => {
      data.value.id_famille = id_famille.value
      data.value.id_activite = activite.id_activite;
      data.value.id_reservation_activite = activite.id_reservation_activite;
      data.value.nb_membre = nb_membre.value;
      nb_places_deja_resa = activite.nb_reservations
      if(nb_places_deja_resa == nb_membre.value){
        console.log("condition 1")
        deleteReservationActivite(activite);
      }else if(nb_membre.value <= nb_places_deja_resa){
        axios.post(`../../php/utilisateur.php?entity=activites&option=retirer_membre`, data.value)
          .then(() => { loadData() })
          .catch(err => console.error("Erreur API :", err));
      }else{
        error.value = "Vous tentez de retirer plus de membre que vous l'êtes"
      }
    };

    const MajInfos = () => {
      axios.post(`../../php/utilisateur.php?entity=users&option=update`, payeur.value).then(() => {
        loadData();
        confirmation.value = true;
        setTimeout(() => { confirmation.value = false; }, 3000);
      });
    };

    async function isConnected() {
      try {
        const response = await axios.get('../../php/login/isConnected.php');
        if (response.data.role == 'famille') {
          return response.data.id;
        } else {
          return null;
        }
      } catch (error) {
        console.error("Erreur de session", error);
        return null;
      }
    }

    const loadData = async () => {
      const id = await isConnected();
      console.log("c quoi le id : ", id);
      if (id) {
        id_famille.value = id;
        get_payeur(id);
        get_activites_with_reservations(id);
        get_reservation_famille(id);
        get_emplacements();
        get_membres_famille();
      } else {
        window.location.href = "login.html";
      }
    };

    onMounted(() => {
      loadData();
    });

    return {
      id_famille,
      payeur,
      get_payeur,
      activites,
      get_activites_with_reservations,
      reserverActivite,
      deleteReservation,
      ajouterMembreActivite,
      retirerMembreActivite,
      nb_membre,
      displayMenu,
      choiceMenu,
      emplacements,
      date_debut,
      date_fin,
      InscrireFamilleEmplacement,
      creneaux,
      calendrier,
      NumEmplacement,
      ResaEmplacement,
      Pos_emplacements,
      ChoiceOverlay,
      InfoActivite,
      Infos_activites,
      disconnect,
      menuOpen,
      deleteReservationActivite,
      deleteFifo,
      addFifoMb,
      delFifoMb,
      MajInfos,
      confirmation,
      membresFamilles,
      ajoutMembre,
      membre,
      createMembre,
      deleteMembre,
      reserverCreneau,       // ✅
      rechercheCreneaux,     // ✅
      error
    };
  }
}).mount('#app');