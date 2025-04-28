import { parseAction } from "@rabby-wallet/rabby-action";

import {
  acceptMethods,
  acceptedSendMethods,
  acceptedSignMethods,
} from "@/utils/transactions/transactionTypes";

const fetchRabby = async (url: string, body: any, method: string = "POST") => {
  const response = await fetch(`https://api.rabby.io${url}`, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      "x-client": "Rabby",
      "x-version": "0.93.12",
      "x-api-ts": "1739448969",
      "x-api-ver": "v2",
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`[${url}] ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

const handleSendTransaction = async (
  tx: any,
  serverChainId: string,
  chainId: number,
  addr: string,
  origin: string
) => {
  console.log(tx, serverChainId, chainId, addr, origin);

  if (!tx || !serverChainId || !chainId || !addr) {
    throw new Error("Missing required fields");
  }

  //first parse the Tx
  const actionData = await fetchRabby("/v1/engine/action/parse_tx", {
    chain_id: serverChainId,
    tx: {
      ...tx,
      nonce: "0x1",
      chainId: parseInt(chainId.toString()),
    },
    user_addr: addr,
    origin: origin || "",
  });

  // then pre-execute the Tx
  const datas = await fetchRabby("/v1/wallet/pre_exec_tx", {
    tx: {
      ...tx,
      nonce: "0x1",
      chainId: parseInt(chainId.toString()),
    },
    user_addr: addr,
    origin: origin || "",
    update_nonce: true,
    pending_tx_list: [],
  }).then(async (res) => {
    console.log(res);
    const parsed = parseAction({
      type: "transaction",
      data: (actionData as any).action,
      balanceChange: (res as any).balance_change,
      tx: {
        ...tx,
        gas: "0x0",
        nonce: "0x1",
        value: tx.value || "0x0",
      },
      preExecVersion: (res as any).pre_exec_version,
      gasUsed: (res as any).gas?.gas_used || 0,
      sender: tx.from,
    });
    console.log(parsed);
    return {
      parsedTx: parsed,
      preExecutedTx: res,
    };
  });

  const parsedTxNotWorking = Object.keys(datas.parsedTx).length < 2;

  return {
    parsedTx: datas.parsedTx,
    preExecutedTx: datas.preExecutedTx,
    ...(parsedTxNotWorking ? { actionData } : {}),
  };
};

const handleCommon = async (
  origin: string,
  typed_data: string,
  user_addr: string,
  serverChainId: string
) => {
  if (!typed_data || !user_addr) {
    throw new Error("Missing required fields");
  }

  const result = await fetchRabby("/v1/engine/action/parse_common", {
    origin: origin || "",
    typed_data: JSON.parse(typed_data),
    user_addr,
  })
    .then(async (result: any) => {
      const spender = result.action?.data?.spender;
      const permitSpender = JSON.parse(typed_data).domain.verifyingContract;

      let contractInfo;
      if (spender || permitSpender) {
        contractInfo = await fetchRabby(
          `/v1/contract?chain_id=${serverChainId}&id=${
            spender || permitSpender
          }`,
          {},
          "GET"
        );

        return {
          parsedCommonTx: result,
          contractInfo: (contractInfo as any).contract,
        };
      }
      return {
        parsedCommonTx: result,
      };
    })
    .catch((error) => {
      console.error(error);
      throw new Error("Failed to parse common tx");
    });

  return result;
};

export const decodeTransaction = async (
  tx: any,
  serverChainId: string,
  chainId: number,
  addr: string,
  origin: string,
  method: string,
  typed_data: string
): Promise<any> => {
  try {
    if (!acceptMethods.includes(method)) {
      throw new Error("Method not supported");
    }

    if (acceptedSignMethods.includes(method)) {
      const result = await handleCommon(
        origin,
        typed_data,
        addr,
        serverChainId
      );
      return result;
    }

    if (acceptedSendMethods.includes(method)) {
      const result = await handleSendTransaction(
        tx,
        serverChainId,
        chainId,
        addr,
        origin
      );
      return result;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error while decoding tx");
  }
};
