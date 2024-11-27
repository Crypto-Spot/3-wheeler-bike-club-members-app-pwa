"use server"

import { ethers } from "ethers";
import  { EAS, SchemaEncoder }  from "@ethereum-attestation-service/eas-sdk";
import { easContractAddress, schemaUID } from "../constants/addresses";



export async function sendInvoiceAttestationOnchain ( receiver: `0x${string}`, amount: bigint, week: string, score: number, timeStamp: number) {
    const provider = new ethers.JsonRpcProvider(`https://`);
    const signer = new ethers.Wallet(process.env.ATTEST_PRIVATE_KEY, provider);
   
    const eas = new EAS(easContractAddress);
    // Signer must be an ethers-like signer.
    console.log("sighner", signer)
    eas.connect(signer);

    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder("uint256 Amount,string Week,uint256 Score,uint256 CreatedAt");
    const encodedData = schemaEncoder.encodeData([
        { name: "Amount", value: BigInt(amount), type: "uint256" },
        { name: "Week", value: week, type: "string" },
        { name: "Score", value: BigInt(score), type: "uint256" },
        { name: "CreatedAt", value: BigInt(timeStamp), type: "uint256" }
    ]);
    const tx = await eas.attest({
        schema: schemaUID,
        data: {
            recipient: receiver,
            expirationTime: BigInt(0),
            revocable: true, // Be aware that if your schema is not revocable, this MUST be false
            data: encodedData,
        },
    });
    const newAttestationUID = await tx.wait();
    console.log("New attestation UID:", newAttestationUID);
    return newAttestationUID
}
