import { plSettings } from './categories';

export const pl = {
  ...plSettings,
  routes: {
    Browse: 'Przeglądaj',
    BrowseStack: 'Przeglądaj',
    Episodes: 'Epizody',
    Login: 'Zaloguj się',
    SignUp: 'Zarejestruj się',
    ForgotPassword: 'Nie pamiętam hasła',
    Search: 'Wyszukaj',
    SearchStack: 'Wyszukaj',
    Settings: 'Ustawienia',
    SettingsStack: 'Ustawienia',
    ActionConfirm: 'Potwierdź Akcję',
    SearchResults: 'Wyniki wyszukiwania',
    MyListStack: 'Moja lista',
    OfflineStack: 'Pobrane',
  },
  forms: {
    save: 'Zapisz',
    continue: 'Kontynuuj',
    fields: {
      displayName: 'Nazwa użytkownika',
      email: 'Email',
      NickChange: 'Nazwa użytkownika',
      EmailChange: 'example@example.com',
      PasswordChange: '*************',
    },
    labels: {
      password: 'Hasło',
      NickChange: 'Nazwa użytkownika',
      EmailChange: 'Email',
      PasswordChange: 'Hasło',
      new: {
        NickChange: 'Nowa nazwa użytkownika',
        EmailChange: 'Nowy email',
        PasswordChange: 'Nowe hasło',
      },
    },
  },
  actions: {
    AccountDelete: {
      action_name: 'Usuwanie konta',
      message:
        'Jeżeli zostaniesz wylogowany, spróbuj zalogować się ponownie. Jeżeli akcja się nie powiedzie, spróbuj ponownie',
      confirm: 'Chcę usunąć swoje konto',
    },
  },
  text: {
    hello: 'Witaj',
  },
  buttons: {
    go_back: 'Powrót',
  },
  auth: {
    login: 'Zaloguj się',
    register: 'Zarejestruj się',
    forgot_password: 'Nie pamiętasz hasła?',
    password: 'Hasło',
    password_again: 'Hasło ponownie',
    new_user: 'New user? Join here',
    logout: 'Wyloguj',
    username: 'Nazwa użytkownia',
    email_verify: {
      top: 'Zweryfikuj swój adres email',
      bottom: 'i zaloguj się ponownie',
    },
    required_field: 'To pole jest wymagane',
    email_sent: 'Wyślij email',
    email_has_been_sent: 'Email został wysłany',
    errors: {
      invalid_email: 'Email jest niepoprawny',
      user_not_found:
        'Użytkownik nie został znaleziony lub hasło jest niepoprawne',
      unknown: 'Wystąpił nieznany błąd, skontaktuj się ze wsparciem',
      email_already_in_use: 'Ten użytkownik już istnieje',
      passwords_do_not_match: 'Hasła nie są takie same',
      weak_password: 'Hasło powinno mieć co najmniej 6 znaków',
    },
    continue_with: 'lub kontynuuj z',
    delete_account: 'Usuń konto',
  },
  welcomeScreen: {
    welcome: 'Witaj w',
    cto: 'Zaczynamy',
    apiLoading: 'Proszę czekać, nasze serwery rozgrzewają się',
    apiError: 'Wystąpiłem problem z serwerami',
    apiContact: 'Kiliknij tutaj, aby się z nami skontaktować',
  },
  animeSeason: {
    winter: 'Zima',
    spring: 'Wiosna',
    summer: 'Lato',
    fall: 'Jesień',
    WINTER: 'Zima',
    SPRING: 'Wiosna',
    SUMMER: 'Lato',
    FALL: 'Jesień',
  },
  anime_details: {
    see_episodes: 'Zobacz epizody',
    next_episode: 'Następny odcinek',
    format: 'Format',
    episodes: 'Epizody',
    duration: 'Długość',
    status: 'Status',
    status_list: {
      FINISHED: 'Zakończona',
      RELEASING: 'Emitowane',
      NOT_YET_RELEASED: 'Zapowiedź',
      CANCELED: 'Anulowana',
      HIATUS: 'Wstrzymana',
    },
    score: 'Ranking',
    season: 'Sezon',
    relations: 'Relacje',
    relations_list: {
      ADAPTATION: 'Adaptacja',
      PREQUEL: 'Prequel',
      SEQUEL: 'Sequel',
      PARENT: 'Rodzic',
      SIDE_STORY: 'Historia poboczna',
      CHARACTER: 'Wspólna postać',
      SUMMARY: 'Podsumowanie',
      ALTERNATIVE: 'Historia alternatywna',
      SPIN_OFF: 'Spin off',
      OTHER: 'Inne',
      SOURCE: 'Źródło',
      COMPILATION: 'Kompilacja',
      CONTAINS: 'Zawiera',
    },
    trailer: 'Zwiastun',
    links: 'Linki',
    source: 'Źródło',
  },
  watch_list: {
    watching: 'Oglądam',
    add: 'Dodaj do listy',
    finished: 'Objerzane',
  },
  anime_episodes: {
    players_not_found: 'Nie znaleziono odtwarzaczy',
    Episode: 'Odcinek',
    available_players: 'Dostępne odtwarzacze',
    load_players: 'Załaduj odtwarzacze',
    disclaimer:
      'AniWatch nie hostuje żadnych plików na własnych serwerach, udostępniamy jedynie linki do treści hostowanych na serwerach stron trzecich.',
  },
  important: {
    requireAppUpdate: {
      title: 'Wymagana aktualizacja',
      message:
        'Ta wersja aplikacji nie jest już wspierana. Wymagana aktualizacja aplikacji, aby kontynuować korzystanie z AniWatch.',
      action: 'Zaktualizuj',
      actionAlt: 'Pomoc',
    },
  },
  myList: {
    common: {
      episodes: 'Epizody',
    },
    download: {
      notFound: 'Nie znaleziono pobranych serii'
    }
  },
};
