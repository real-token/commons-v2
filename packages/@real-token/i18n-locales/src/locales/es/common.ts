const common = {
  footer: {
    copyright: "© {{year}} RealToken. Todos los derechos reservados.",
  },
  select: {
    noOption: "Sin opciones",
  },
  settings: {
    title: "Idioma",
    french: "Francés",
    english: "Inglés",
    spanish: "Español",
    light: "Claro",
    dark: "Oscuro",
  },
  wallet: {
    title: "Conectar billetera",
    control: "Conectar billetera",
    copy: "Copiar dirección",
    viewOn: "Ver en el explorador",
    disconnect: "Desconectar",
    network: "Red",
    DisabledGnosisSafe:
      'La conexión directa a Safe no es posible. Para conectarte a un GnosisSafe, por favor ve a safe.global y conéctate a tu Safe. En la sección "App", agrega una "aplicación personalizada" usando la URL del sitio web de yam (https://yam.realtoken.network). Podrás tener YAM directamente en la interfaz de tu Safe.',
    readOnly: {
      title: "Vigilar una dirección",
      description:
        "Puedes vigilar una dirección pero no puedes hacer nada más.",
      inputPlaceholder: "Dirección o dominio ENS que deseas vigilar",
      wrongAddressFormat: "Dirección o dominio ENS no válido",
      button: "Vigilar dirección",
    },
  },
  header: {
    notAllowedNetwork:
      "Actualmente estás conectado a YAM en una red no soportada, ",
    switchNetwork: "haz clic aquí para cambiar a {{networkName}}",
  },
  general: {
    loading: "cargando...",
    comingSoon: "Próximamente...",
    noConnectedWallet:
      "Por favor conecta una billetera para cargar la aplicación (Ayuda: abajo a la derecha)",
    nextButton: "Siguiente",
    noAdminError: "No eres un administrador.",
  },
  actionButton: {
    watchOnly:
      "Estás conectado en modo de solo lectura. Esto significa que no puedes interactuar con esta cuenta.",
  },
} as const;

export default common;
