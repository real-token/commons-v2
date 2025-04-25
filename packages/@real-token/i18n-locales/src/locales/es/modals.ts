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
} as const;

export default modals;
