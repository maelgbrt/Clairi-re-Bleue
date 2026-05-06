
const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {

const nom = ref(0);


const addition = () =>{
    nom.value = nom.value + 1
    console.log(personnes.value);
}






const push = ()=>{


    const personnesv2 =ref({
age : age.value,
nom : prenom.value
})

console.log(personnesv2.value);

personnes.value.push(personnesv2.value);
console.log(personnes.value);


}

const personnes = ref([
    { nom: "Mael", age: 14 },
    { nom: "Léa", age: 22 },
    { nom: "Lucas", age: 18 }
]);

const age =ref();
const prenom = ref();


  onMounted(() => {
    });

    return { 
        nom,
        addition,
        personnes,
        prenom,
        age,
        push
        
    };
  }
}).mount('#app');


