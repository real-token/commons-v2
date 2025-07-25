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

  walletConnect: {
    connect: "Conectar",
    disconnect: "Desconectar",
    refuse: "Rechazar",
    confirm: "Confirmar",
    confirmAll: "Confirmar todo",
    sign: "Firmar",
    activeConnections: "Conexiones activas ({{count}})",
    txToValidate: "{{count}} transacción(es) para validar",
    transaction: "Transacción",
    from: "De",
    contractInteraction: "Interacción de contrato",
    data: "Datos",
    name: "Nombre",
    params: "Parámetros",
    disabled: {
      info: "WalletConnect no es compatible con la versión de tu cartera {{version}}.",
      action:
        "Por favor, actualiza a la última versión {{version}} visitando el sitio web de realt.co y contactando al soporte (burbuja naranja en la esquina inferior derecha)",
      button: "Ir al sitio web realt.co",
    },
    sessionProposal: {
      wantToConnect: '"{{name}}" quiere conectarse',
      buttons: {
        approve: "Aprobar",
        reject: "Rechazar",
      },
      securityAlert: {
        title: "Riesgo de seguridad conocido",
        domainMismatch:
          "Este sitio web tiene un dominio que no coincide con el remitente de esta solicitud. Aprobar puede llevar a la pérdida de fondos.",
        domainMismatchTitle: "Dominio no coincide",
        unknownDomain:
          "No se puede verificar este dominio. Revisa cuidadosamente la solicitud antes de aprobar.",
        unknownDomainTitle: "Dominio desconocido",
        isScam:
          "Este dominio está marcado como inseguro por varios proveedores de seguridad. Rechaza la conexión para evitar posibles riesgos de seguridad.",
        isScamTitle: "Riesgo de seguridad conocido",
        securityRisk: "Riesgo de seguridad",
      },
      permissions: {
        title: "Permisos solicitados",
        eth_sendTransaction: "Enviar transacciones",
        personal_sign: "Firmar mensajes",
        eth_sign: "Firmar transacciones",
        eth_signTypedData: "Firmar datos tipados",
        eth_signTypedData_v4: "Firmar datos tipados v4",
        moveFundsWithoutPermissions: "Mover fondos sin permisos",
      },
      notifications: {
        title: "Propuesta de sesión",
        accepted: "Sesión aceptada",
        refused: "Sesión rechazada",
      },
    },
  },
} as const;

export default modals;
