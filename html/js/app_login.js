
const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {
    const action = ref('connexion');
    
    const connexion = ref({
        mail_saisi: '',
        password_saisi: ''
    });

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
      axios.post('../../php/login/connected',connexion.value).then(response => {
        let res = response.data;
        if (res.status == "success"){
          if(res.role == "equipe_tech"){
            if (res.access == 1){
              window.location.href = "admin.html";
            }else{
              window.location.href = "equipe.html";
            }
            console.log(res);
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
        console.log(mail_reinitialisation.value);
        let data = {
        "Adress": mail_reinitialisation.value
    };
        axios.post("../../php/gestion_mail.php?entity=reinitialiser",data).then(response => {
          console.log(response.data);
          log.value = response.data.msg;
        })
    }





    onMounted(() => {
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
        log

    };
  }
}).mount('#app');