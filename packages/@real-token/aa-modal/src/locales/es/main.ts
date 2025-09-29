export const main = {
  button: {
    back: "Atrás",
    installed: "Instalado",
  },
  signin: {
    title: "Iniciar sesión",
    subtitle: "Tu billetera Realtoken con un clic",
  },
  providers: {
    continueWithGoogle: "Continuar con Google",
    connectExternalWallet: "Conexiones avanzadas",
    or: "o",
  },
  mode: {
    aa: "RealToken AA",
    tba: "TBA",
    external: "Otras billeteras",
  },
  readOnly: {
    title: "Ver una dirección",
    description:
      "Ver una dirección te permitirá ver todos los activos de la dirección especificada, pero no te permitirá enviar transacciones. ESTE es un modo solo de lectura.",
    label: "Introduce la dirección o ENS",
    button: "Ver",
    form: {
      placeholder: "0x... o realteam.eth",
      error: {
        required: "Se requiere una dirección o nombre ENS",
        address: "Dirección inválida",
        ens: "Nombre ENS inválido",
      },
    },
  },
  help: "Necesito ayuda",
  privacyPolicy:
    "No compartimos ningún dato relacionado con tus inicios de sesión sociales.",
  languageSwitcher: {
    en: "Inglés",
    es: "Español",
    fr: "Francés",
  },
  advancedExternalWallet: {
    terms:
      'Al hacer clic en "aceptar" confirmas con la comprensión de que el propietario de la cuenta AA será la dirección con la que estás conectado a la billetera externa utilizada.',
    acceptButton: "Aceptar",
  },
  externalConnectionModelPanel: {
    search: "Buscar una billetera",
    error: "Error al conectar",
  },
  emailPasswordless: {
    title: "Conecta con tu email",
    subtitle: "Introduce tu email",
  },
  aaChoiceModal: {
    title: "Elige tu modo de conexión",
    aa: "Conecta con tu billetera Realtoken",
    external: "Conecta con una billetera externa",
  },
  qrCodeDrawer: {
    description:
      "Escanea el código QR con una billetera compatible con WalletConnect o haz clic para copiar el enlace.",
    button: "Copiar enlace",
    getWallet: "Obtener billetera",
    noWallet: "¿No tienes {{name}}?",
    notifications: {
      copiedToClipboard: "Copiado al portapapeles",
      linkCopiedToClipboard: "Enlace copiado al portapapeles",
    },
  },
  walletInstallationDrawer: {
    title: "Obtener billetera",
    installMobile: "Instalar la aplicación {{name}}",
    installDesktop: "Instalar la extensión {{name}}",
  },
};
