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

const sendMessage = () => {
  console.log(message.value);
  
}


 onMounted(() => {      

    });

    return {
     message,
     sendMessage
    };
  }
}).mount('#app');  