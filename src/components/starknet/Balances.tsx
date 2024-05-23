"use client";
import React from 'react';
//import { useAccount, useBalance } from "@starknet-react/core";
import useBalanceArray from "./useBalanceArray";



// TODO: obtener el balance de la wallet de tu token erc20 desplegado y mostrarlo en pantalla;

export default function Balances() {
      
    const { strkBalance, ethBalance } = useBalanceArray();
    
    //console.log(ethBalance);

    //if (strkBalance.isLoading && ethBalance.isLoading) return <div>Loading STRK...</div>;
    //if ((strkBalance.isError || strkBalance!.data) && (ethBalance.isError || ethBalance!.data)) return <div>{strkBalance.error?.message || ethBalance.error?.message}</div>;
    return <div>{strkBalance.data?.value.toString()}  {strkBalance.data?.symbol}{' ---- '} {ethBalance.data?.value.toString()} {ethBalance.data?.symbol} </div>
    
}
