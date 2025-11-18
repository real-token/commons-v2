const web3 = {
  decodingError: {
    title: "API de decodificación no disponible",
    description:
      "Si confías en el origen, puedes continuar firmando la transacción a ciegas bajo tu propio riesgo",
    alwaysVerify:
      "Verifica siempre la fuente antes de firmar transacciones desconocidas",
    retry: "Reintentar",
  },
  explainTransaction: {
    common: {
      token: "Token",
      amount: "Cantidad",
      expireTime: "Fecha de expiración",
      interactContract: "Contrato de interacción",
      operation: "Operación",
      description: "Descripción",
      pay: "Pagar",
      receive: "Recibir",
      protocol: "Protocolo",
    },
    permitToken: {
      title: "Permitir token",
      permitTo: "Permitir a",
      permitData: "Datos de permiso",
    },
    tokenOrder: {
      title: "Orden de token",
    },
    approveToken: {
      title: "Aprobación de token",
      approveTo: "Aprobar a",
    },
    commonAction: {
      unknown: "Desconocido",
    },
    revokeToken: {
      title: "Revocar aprobación de token",
      revokeFrom: "Revocar de",
    },
    swapToken: {
      title: "Intercambiar token",
      simulationResults: "Resultados de simulación",
    },
    wrapToken: {
      title: "Envolver token",
    },
  },
  modals: {
    aAsignature: {
      alertNoSignature: {
        title: "No hay firmas para validar",
        description: "No hay firmas pendientes para validar.",
      },
      messageToSign: "Mensaje a firmar",
      signatureRequest: "Solicitud de firma {{index}} de {{total}}",
      alertReviewSignature: {
        description:
          "Por favor, revisa la solicitud de firma a continuación y confirma si deseas continuar.",
      },
      signatureType: "Tipo de firma:",
      buttons: {
        signMessage: "Firmar mensaje",
        reject: "Rechazar",
      },
    },
    explainAaTransaction: {
      buttons: {
        sign: "Firmar",
        reject: "Rechazar",
      },
    },
  },
};

export default web3;
