const notifications = {
  copyAddress: {
    title: "Copiado ✅",
    message: "Dirección copiada al portapapeles",
  },
  transactions: {
    onchain: {
      onSent: {
        title: "Transacción pendiente",
        message: "Por favor confirme la transacción en su billetera",
      },
      onWaitingBlockchain: {
        title: "Esperando validación de blockchain",
        message: "Su transacción está siendo validada en la blockchain",
      },
      onComplete: {
        title: "Transacción confirmada",
        message: "Su transacción ha sido confirmada exitosamente",
      },
      onFail: {
        title: "Transacción fallida",
        message: "Ocurrió un error al procesar su transacción",
      },
    },
    native: {
      onSent: {
        title: "Transferencia pendiente",
        message: "Por favor confirme la transferencia de tokens nativos en su billetera",
      },
      onWaitingBlockchain: {
        title: "Esperando validación de blockchain",
        message: "Su transferencia está siendo validada en la blockchain",
      },
      onComplete: {
        title: "Transferencia confirmada",
        message: "Su transferencia de tokens nativos ha sido confirmada exitosamente",
      },
      onFail: {
        title: "Transferencia fallida",
        message: "Ocurrió un error al procesar su transferencia",
      },
    },
    erc20Approve: {
      onSent: {
        title: "Aprobación pendiente",
        message: "Por favor confirme la aprobación del token en su billetera",
      },
      onWaitingBlockchain: {
        title: "Esperando validación de blockchain",
        message: "Su aprobación está siendo validada en la blockchain",
      },
      onComplete: {
        title: "Aprobación confirmada",
        message: "La aprobación del token ha sido confirmada exitosamente",
      },
      onFail: {
        title: "Aprobación fallida",
        message: "Ocurrió un error al procesar la aprobación del token",
      },
      withDetails: {
        onSent: {
          title: "Aprobación pendiente",
          message: "Por favor confirme la aprobación de {{amount}} para {{spender}}",
        },
        onComplete: {
          title: "Aprobación confirmada",
          message: "{{amount}} aprobado exitosamente para {{spender}}",
        },
        onFail: {
          title: "Aprobación fallida",
          message: "Falló la aprobación de {{amount}} para {{spender}}",
        },
      },
    },
    erc20Transfer: {
      onSent: {
        title: "Transferencia pendiente",
        message: "Por favor confirme la transferencia de tokens en su billetera",
      },
      onWaitingBlockchain: {
        title: "Esperando validación de blockchain",
        message: "Su transferencia está siendo validada en la blockchain",
      },
      onComplete: {
        title: "Transferencia confirmada",
        message: "La transferencia de tokens ha sido confirmada exitosamente",
      },
      onFail: {
        title: "Transferencia fallida",
        message: "Ocurrió un error al procesar la transferencia de tokens",
      },
      withDetails: {
        onSent: {
          title: "Transferencia pendiente",
          message: "Por favor confirme la transferencia de {{amount}} a {{recipient}}",
        },
        onComplete: {
          title: "Transferencia confirmada",
          message: "{{amount}} transferido exitosamente a {{recipient}}",
        },
        onFail: {
          title: "Transferencia fallida",
          message: "Falló la transferencia de {{amount}} a {{recipient}}",
        },
      },
    },
    signMessageErc20: {
      onSent: {
        title: "Firma pendiente",
        message: "Por favor firme el mensaje de permiso ERC20 en su billetera",
      },
      onComplete: {
        title: "Firma confirmada",
        message: "La firma del permiso ERC20 ha sido creada exitosamente",
      },
      onFail: {
        title: "Firma fallida",
        message: "Ocurrió un error al firmar el permiso ERC20",
      },
      withDetails: {
        onSent: {
          title: "Firma de permiso pendiente",
          message: "Por favor firme el permiso para {{amount}} a {{spender}}",
        },
        onComplete: {
          title: "Firma de permiso confirmada",
          message: "Permiso firmado exitosamente para {{amount}} a {{spender}}",
        },
        onFail: {
          title: "Firma de permiso fallida",
          message: "Falló la firma del permiso para {{amount}} a {{spender}}",
        },
      },
    },
    signMessageCoinBridge: {
      onSent: {
        title: "Firma pendiente",
        message: "Por favor firme el mensaje de permiso en su billetera",
      },
      onComplete: {
        title: "Firma confirmada",
        message: "La firma del permiso ha sido creada exitosamente",
      },
      onFail: {
        title: "Firma fallida",
        message: "Ocurrió un error al firmar el permiso",
      },
      withDetails: {
        onSent: {
          title: "Firma de permiso pendiente",
          message: "Por favor firme el permiso para {{amount}} a {{spender}}",
        },
        onComplete: {
          title: "Firma de permiso confirmada",
          message: "Permiso firmado exitosamente para {{amount}} a {{spender}}",
        },
        onFail: {
          title: "Firma de permiso fallida",
          message: "Falló la firma del permiso para {{amount}} a {{spender}}",
        },
      },
    },
    signMessage: {
      onSent: {
        title: "Firma pendiente",
        message: "Por favor firme el mensaje en su billetera",
      },
      onComplete: {
        title: "Firma confirmada",
        message: "El mensaje ha sido firmado exitosamente",
      },
      onFail: {
        title: "Firma fallida",
        message: "Ocurrió un error al firmar el mensaje",
      },
    },
  },
} as const;

export default notifications;
