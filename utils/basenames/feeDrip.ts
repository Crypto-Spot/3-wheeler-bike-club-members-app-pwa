import { parseEther } from "viem"
import { publicClient, walletClient } from "../client"

export async function feeDrip ( user: `0x${string}` ) {
    try {
        const hash = await walletClient.sendTransaction({
            to: user,
            value: parseEther("0.0001"), 
        })
        const transaction = await publicClient.waitForTransactionReceipt( 
            { 
                hash: hash,
                confirmations: 2
            }
        )
        if (transaction.status == "success") {
            console.log(hash)
            return hash
        }
    } catch (error) {
        console.log(error)
    }
}