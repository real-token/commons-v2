const modals = {
  copyAddress: {
    title: "Redes Disponibles",
    description:
      "Solo las redes listadas a continuación son compatibles. Cualquier fondo enviado a otra red resultará en la pérdida de los fondos.",
    agree: "Estoy de acuerdo y entiendo",
    supportedNetworks: "Redes compatibles:",
    buttons: {
      confirm: "Copiar mi dirección",
      cancel: "Cancelar",
    },
  },
  manageWallet: {
    title: "Gestionar direcciones",
    loading: "Cargando cuentas",
    address: "Tus direcciones",
    manual: "¿No ves tu dirección? intenta conectar directamente",
    connect: "Conectar",
    switchNetwork: "Cambiar red",
  },
  watchWallet: {
    title: "Vigilar una dirección",
    button: "Vigilar",
    form: {
      address: "Dirección",
      addressPlaceholder: "Introduce la dirección a vigilar",
      errors: {
        required: "La dirección es obligatoria",
        invalid: "La dirección no es válida",
        self: "No puedes vigilarte a ti mismo",
      },
    },
  },
  sdkVersion: {
    title: "Cartera no actualizada ({{version}})",
    description:
      "Estás conectado a la versión V1. Hay una nueva versión de la cartera disponible ({{version}}). Si deseas conectarte a {{version}}, ve a la caja naranja a la izquierda en la parte superior derecha y agrega/cambia tu dirección de cartera. \n \n. Si no tienes una {{version}}, por favor contacta al soporte en el sitio web realt.co (burbuja de chat naranja en la parte inferior derecha).",
    features:
      "Aún puedes usar tu versión actual, pero podrían aparecer algunos errores y algunas funciones no están funcionando (por ejemplo, walletConnect).",
    buttons: {
      understand: "Entiendo",
      website: "Ir al sitio web realt.co",
    },
  },
} as const;

export default modals;
