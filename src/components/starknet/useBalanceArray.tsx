import { useAccount, useBalance } from "@starknet-react/core";

const STRK_ADDRESS = import.meta.env.VITE_STRK_ADDRESS;
const ETH_ADDRESS = import.meta.env.VITE_ETH_ADDRESS;


// Hook personalizado para devolver balances
export default function useBalanceArray() {

  
  // TODO: obtener el balance de la wallet de tu token erc20 desplegado y mostrarlo en pantalla;
  

      const { address } = useAccount();

      const strk = useBalance({
          token: STRK_ADDRESS,
          address,
          watch: true
      });
      
      const eth = useBalance({
          token: ETH_ADDRESS,
          address,
          watch: true
      })

      const strkBalance = {...strk, address: STRK_ADDRESS};
      const ethBalance = {...eth, address: ETH_ADDRESS};

  

  return  { strkBalance, ethBalance } ;

}