import { encodeFunctionData } from "viem";

export async function getBasename ( name: string, owner: `0x${string}`, duration: bigint, resolver: `0x${string}`, data: `0x${string}`[] ) {
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
            duration: (duration), 
            resolver: (resolver), 
            data: (data), 
            reverseRecord: true
        }]
    })
}