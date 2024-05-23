"use client";
import React, { useMemo, useState, ChangeEvent } from "react";
import { useContractWrite, useContract } from "@starknet-react/core";
import { uint256 } from "starknet";
import { ERC20 as erc20ABI } from "../../ABI's/ERC20";
import useBalanceArray from "./useBalanceArray";


// TODO: transferir custom tokens erc20 a una dirección dada en un input por el usuario;
export default function Transfer() {
	//const { chain } = useNetwork();
	
	const [addressValue, setAddressValue] = useState('');
    const [amountValue, setAmountValue] = useState('');
	const [contractAddress, setContractAddress] = useState('');

	const [isButtonDisabled, setButtonDisabled] = useState(true);

	const balances = useBalanceArray();

	const { contract } = useContract({
		abi: erc20ABI,
		address: contractAddress
	});

	const handleInputAccountChange = (event: ChangeEvent < HTMLInputElement >) => {
		setAddressValue(event.target.value);
	};

	const handleInputAmountChange = (event: ChangeEvent < HTMLInputElement >) => {
		setAmountValue(event.target.value);
	};

	const handleSelectSymbolChange = (event: ChangeEvent < HTMLSelectElement >) => { 
		setContractAddress(event.target.value);
	};


    const calls = useMemo(() => {
		if (!addressValue || !contract || !amountValue) {
			setButtonDisabled(true);
			return [];
		}
		setButtonDisabled(false);
		return contract.populateTransaction["transfer"]!(addressValue, uint256.bnToUint256(BigInt(amountValue)))
	}, [contract, addressValue, amountValue]);

	const {
		writeAsync,
		data,
		isPending,
	} = useContractWrite({
		calls,
	});


    return (
		<>
		<p>Account to Transfer: </p>
        <input type="text" onChange={handleInputAccountChange} style={{ border: '1px solid black', width: '600px', textAlign: 'center'}}></input>
		<select name="select" onChange={handleSelectSymbolChange}>
			<option value="">Select Coin</option> 
			{ Object.entries(balances).map((balance) => <option key={balance[1].data?.symbol} value={balance[1].address}>{balance[1].data?.symbol != '0' ? balance[1].data?.symbol : 'STKJS'}</option>) }
			
		</select>
        <p>Amount to Transfer in wei: </p>
        <input 
			type="number" 
			onChange={handleInputAmountChange} 
			style={{ border: '1px solid black', width: '600px', textAlign: 'center'}}
		></input>
		<button 
			onClick={() => writeAsync()} 
			style={isButtonDisabled ? { border: '2px solid red', padding: '5px', backgroundColor: 'gray' } : { border: '2px solid green', padding: '5px', backgroundColor: 'green' } } 
			disabled={isButtonDisabled}
		>
			Transfer
		</button>
		<div>status: {isPending && <div>Submitting...</div>}</div>
		<p>hash:<a href={`https://sepolia.starkscan.co/tx/${data?.transaction_hash}`} target='blank'>{data?.transaction_hash}</a></p>
		</>
	);
}