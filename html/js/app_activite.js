const { createApp, ref, onMounted } = Vue;
const { createI18n, useI18n } = VueI18n;

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

// 1. On crée l'instance i18n d'abord
const i18n = createI18n({
  legacy: false,
  locale: 'fr',
  messages: messages,
});

// 2. On crée l'application
const app = createApp({
  setup() {
    const { t, locale } = useI18n(); // On récupère les outils i18n ici
    const tab_res = ref([]);
    
    // IMPORTANT: currentLang doit être lié à locale.value
    const currentLang = ref(locale.value);

    const get_activites = () => {
      // Chemin vers ton PHP
      axios.get("../../php/admin/activites.php")
        .then(response => {
          tab_res.value = response.data;
        })
        .catch(err => console.error("Erreur de chargement:", err));
    };

    const changeLanguage = () => {
      // Met à jour la langue de i18n quand le select change
      locale.value = currentLang.value;
    };

    onMounted(get_activites);

    return { 
      tab_res, 
      changeLanguage,
      currentLang,
      t // On expose 't' au cas où, même si on utilise $t dans le HTML
    };
  }
});

// 3. ON DIT À L'APP D'UTILISER I18N (Crucial pour enlever l'erreur $t)
app.use(i18n);

// 4. On monte enfin l'app
app.mount('#app');