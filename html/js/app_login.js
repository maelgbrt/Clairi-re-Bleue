
const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {
    const action = ref('connexion');
    
    const connexion = ref({
        mail_saisi: '',
        password_saisi: ''
    });

    const isLoading = ref(false);
    const connected = ref(false);

    const mail_reinitialisation = ref();

    const log = ref ();
    const inscription = ref({
      nom : '',
      prenom : '',
      date_n : '',
      mail : '',
      tel : '',
      adresse : '',
      ville : '',
      code_postal : '',
      password : '',
      confirm_password : ''
    })

    const error = ref(null);

    const handleLogin = () => {
      console.log(connexion.value);
      axios.post('../php/login/connected',connexion.value).then(response => {
        let res = response.data;
        console.log(res);
        if (res.status == "success"){
          if(res.role == "equipe_tech"){
            window.location.href = "equipe.html";
          }else if(res.role == 'admin'){
            window.location.href = "admin.html";    
          }else{
            window.location.href = "utilisateur.html";
          }
        } else if(res.status == "failed" && res.debug){
          console.log(res);
          error.value = "Mot de Passe ou Adresse Mail Incorrect";
        }else{
          console.log("error");
        }
      })
    }

    const handleRegister = () => {
      if (inscription.value.confirm_password != inscription.value.password){
        error.value = "Les mots de passe ne correspondent pas";
      }else{
        console.log("mdp correspondent")
        axios.post('../php/admin/familles/create',inscription.value).then(response =>  {
          if(response.data.status == "success"){
            connexion.value.mail_saisi = inscription.value.mail;
            connexion.value.password_saisi = inscription.value.password;
            console.log(connexion.value);
            handleLogin();
          }else{
            console.log(response.data);
            error.value = response.data.msg;
          }
        })
      }
    }

const mdp_reset = () => {
        console.log("on va reinitialiser mail : ");
        isLoading.value = true;
        console.log(mail_reinitialisation.value);
        let data = {
        "Adress": mail_reinitialisation.value
    };
        axios.post("../php/gestion_mail.php?entity=reinitialiser",data).then(response => {
          console.log(response.data);
          log.value = response.data.msg;
          isLoading.value =false;
        })
    }

const isConnected = () => {
  axios.get('../php/login/isConnected').then(response => {
    console.log(response.data);
    
    if (response.data.status == "connected") {
      action.value = 'chargement';

      setTimeout(() => {
        if (response.data.role == "famille") {
          window.location.href = "utilisateur.html";    
        } else if (response.data.role == 'admin') {
          window.location.href = "admin.html";    
        } else {
          window.location.href = 'equipe.html';
        }
      }, 3000); // 3000ms = 3 secondes
    }
  });
}


    onMounted(() => {
      isConnected();
    });

    return { 
        action,
        connexion,
        handleLogin,
        error,
        inscription,
        handleRegister,
        mdp_reset,
        mail_reinitialisation,
        log,
        isLoading,
        connected

    };
  }
}).mount('#app');