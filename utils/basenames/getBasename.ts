import { Basename } from "@coinbase/onchainkit/identity";
import { encodeFunctionData, namehash } from "viem";
import { base, baseSepolia } from "viem/chains";
import L2Resolver from "../abi/L2Resolver";
import { bigint } from "zod";
import { basenameResolver } from "../constants/addresses";

export const USERNAME_DOMAINS: Record<number, string> = {
    [baseSepolia.id]: 'basetest.eth',
    [base.id]: 'base.eth',
};
export const formatBaseEthDomain = (name: string, chainId: number): Basename => {
    return `${name}.${USERNAME_DOMAINS[chainId] ?? '.base.eth'}`.toLocaleLowerCase() as Basename;
};



export async function getBasename ( name: string, owner: `0x${string}` ) {
    
    const addressData = encodeFunctionData({
        abi: L2Resolver,
        functionName: 'setAddr',
        args: [namehash(formatBaseEthDomain(name, base.id)), owner],
    });
    
    const nameData = encodeFunctionData({
        abi: L2Resolver,
        functionName: 'setName',
        args: [
          namehash(formatBaseEthDomain(name, base.id)),
          formatBaseEthDomain(name, base.id),
        ],
    });

    const getBasenameData = encodeFunctionData({
        abi: [
            {
				"inputs":[
                    {
                        "components":[
                            {"internalType":"string","name":"name","type":"string"},
                            {"internalType":"address","name":"owner","type":"address"},
                            {"internalType":"uint256","name":"duration","type":"uint256"},
                            {"internalType":"address","name":"resolver","type":"address"},
                            {"internalType":"bytes[]","name":"data","type":"bytes[]"},
                            {"internalType":"bool","name":"reverseRecord","type":"bool"}
                        ],
                        "internalType":"struct RegistrarController.RegisterRequest",
                        "name":"request","type":"tuple"
                    }
                ],
				"name": "register",
				"outputs": [],
				"stateMutability": "payable",
				"type": "function"
			},
        ],
        functionName: "register",
        args: [{
            name: (name), 
            owner: (owner), 
            duration: BigInt(31557600), 
            resolver: (basenameResolver), 
            data: ([addressData, nameData]), 
            reverseRecord: true
        }]
    })
    return getBasenameData
}