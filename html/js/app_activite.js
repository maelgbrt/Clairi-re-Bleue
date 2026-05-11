const { createApp, ref, onMounted } = Vue;
const { createI18n, useI18n } = VueI18n;

const currentLang = ref('fr');

const messages = {
  en: {
    nav: { home: "HOME", activities: "ACTIVITIES", contact: "CONTACT", about: "ABOUT" },
    page_title: "Activities",
    labels: {
      description: "Description",
      location: "Location",
      capacity: "Capacity",
      price: "Price",
      date_start: "Start date",
      date_end: "End date"
    },
    buttons: { reserve: "Book now" }
  },
  fr: {
    nav: { home: "ACCUEIL", activities: "ACTIVITÉS", contact: "CONTACT", about: "À PROPOS" },
    page_title: "Les Activités",
    labels: {
      description: "Description",
      location: "Lieu",
      capacity: "Capacité",
      price: "Prix",
      date_start: "Date début",
      date_end: "Date fin"
    },
    buttons: { reserve: "Je réserve" }
  }
};

const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  messages,
});

createApp({
  setup() {
    const tab_res = ref([]);
    const { t, locale } = useI18n();

    const get_activites = () => {
      axios.get("../../php/admin/activites").then(response => {
        tab_res.value = response.data;
      });
    };

    const changeLanguage = (lang) => {
      locale.value = lang;
    };

    onMounted(get_activites);

    return { tab_res, t, changeLanguage,
      currentLang 
     };
  }
}).use(i18n).mount('#app');