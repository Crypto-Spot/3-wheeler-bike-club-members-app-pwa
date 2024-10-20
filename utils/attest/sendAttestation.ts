import  { EAS, SchemaEncoder }  from "@ethereum-attestation-service/eas-sdk";

import { provider, signer } from "../attestClient";
import { easContractAddress, schemaUID } from "../constants/addresses";



export async function sendInvoiceAttestationOnchain ( receiver: `0x${string}`, amount: number, week: string, score: number, timeStamp: number) {

   
    const eas = new EAS(easContractAddress);
    // Signer must be an ethers-like signer.
    
    eas.connect(signer);

    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder("uint256 Amount,uint256 Week,bool Paid,uint256 CreatedAt,uint256 UpdatedAt");
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
}


export async function getInvoiceAttestationOnchain (UID: string){
    const eas = new EAS(easContractAddress);
    eas.connect(provider);

    const attestation = await eas.getAttestation(UID);

    console.log(attestation);
}