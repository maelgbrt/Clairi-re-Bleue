const { createApp, ref, onMounted } = Vue;
const { createI18n, useI18n } = VueI18n;





const messages = {
  en: {
    nav: {
      home: "HOME",
      activities: "ACTIVITIES",
      contact: "CONTACT",
      about: "ABOUT",
      lang_fr: "French",
      lang_en: "English"
    },
    formulas: {
      dodo_title: "SLEEP Package",
      family_title: "Family Package",
      rest_title: "Rest Package",
      accommodation: "Accommodation",
      meals: "Meals",
      activities: "Activities",
      click_here: "Click here"
    },
    description: {
      part1: "Located in the heart of nature, the Camping de la Clairière Bleue welcomes you in a peaceful and green setting, ideal for holidays with family, friends or as a couple. Surrounded by trees and large natural spaces, our campsite offers you a true moment of relaxation and disconnection.",
      part2: "We offer different types of comfortable accommodation as well as spacious pitches for tents, caravans and motorhomes.",
      part3: "Many activities are available on site: canoeing, tree climbing, entertainment, sports activities and leisure areas for young and old. Camping de la Clairière Bleue makes it a point of honor to offer a warm welcome, quality services and a friendly atmosphere, to make your stay unforgettable."
    }
  },
  fr: {
    nav: {
      home: "ACCUEIL",
      activities: "ACTIVITÉS",
      contact: "CONTACT",
      about: "À PROPOS",
      lang_fr: "Français",
      lang_en: "Anglais"
    },
    formulas: {
      dodo_title: "Formule DODO",
      family_title: "Formule famille",
      rest_title: "Formule repos",
      accommodation: "Hébergement",
      meals: "Repas",
      activities: "Activités",
      click_here: "Cliquez ici"
    },
    description: {
      part1: "Situé au cœur de la nature, le Camping de la Clairière Bleue vous accueille dans un cadre paisible et verdoyant, idéal pour des vacances en famille, entre amis ou en couple. Entouré d’arbres et de grands espaces naturels, notre camping vous offre un véritable moment de détente et de déconnexion.",
      part2: "Nous proposons différents types d’hébergements confortables ainsi que des emplacements spacieux pour tentes, caravanes et camping-cars.",
      part3: "De nombreuses activités sont disponibles sur place : canoë, accrobranche, animations, activités sportives et espaces de loisirs pour petits et grands. Le Camping de la Clairière Bleue met un point d’honneur à offrir un accueil chaleureux, des services de qualité et une ambiance conviviale, afin de rendre votre séjour inoubliable."
    }
  }
};

const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  messages,
});



createApp({
  setup() {

    const { t, locale } = useI18n();
    const currentLang = ref(locale.value);

    const changeLanguage = () => {
      locale.value = currentLang.value;
    };

    const get_activites = () => {
      console.log("Composant monté et prêt.");
    };

    onMounted(get_activites);

    
    const formules = ref([]);

    get_fomules = () => {
        axios.get('php/admin.php?entity=formules').then(response => {
            formules.value = response.data;
            console.log("les formules : ");
            console.log(response.data);
        })
    }

 onMounted(() => {     
    get_fomules(); 
    });

    return { 
        t,
      currentLang, 
      changeLanguage,
      formules
    };
  }
}).use(i18n).mount('#app');
















