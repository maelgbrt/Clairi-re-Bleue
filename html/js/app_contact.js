const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {


const message = ref({
  "objet" : null,
  "nom" : null,
  "prenom":null,
  "mail" : null,
  "text" : null
})

const notif = ref();

const sendMessage = () => {
  console.log(message.value);
  axios.post("../../php/admin/message",message.value).then(response =>{
    console.log(response.data);
    if (response.data.status == "Success"){
      notif.value = "Message envoyé avec Succes";
    }else{
      notif.value = "Erreur lors de l'envoie du Message";
    }
  })

}


 onMounted(() => {      

    });

    return {
     message,
     sendMessage,
     notif
    };
  }
}).mount('#app');  