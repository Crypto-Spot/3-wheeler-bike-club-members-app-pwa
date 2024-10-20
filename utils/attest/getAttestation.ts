"use server"

import { ethers } from "ethers";
import  { EAS }  from "@ethereum-attestation-service/eas-sdk";
import { easContractAddress } from "../constants/addresses";



export async function getInvoiceAttestationOnchain (UID: string){
    const provider = new ethers.JsonRpcProvider(`https://api.developer.coinbase.com/rpc/v1/base/${process.env.BASE_NODE_API_KEY}`);
       
    const eas = new EAS(easContractAddress);
    eas.connect(provider);

    const attestation = await eas.getAttestation(UID);

    console.log(attestation);
    return attestation
}