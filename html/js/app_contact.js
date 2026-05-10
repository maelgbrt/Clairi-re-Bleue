const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {

    const debug = ref();

    const messages = ref([]);
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

const get_messages= () => {
  axios.get('../../php/admin/message').then(response =>{
    messages.value = response.data;
  })
}



const deleteMessage = (id_message) => {
  const choix = confirm("Voulez vous vraiment supprimer ce message ?");
  if (choix){
  axios.delete(`../../php/messages/delete/${id_message}`).then(response =>{
    if(response.data.status == 'Success'){
      get_messages();
    }else
      debug.value = response.data.msg;
  })
  }
}

 onMounted(() => {      
  get_messages();
    });

    return {
     message,
     sendMessage,
     notif,
     messages,
     get_messages,
     deleteMessage,
     debug
    };
  }
}).mount('.app');  