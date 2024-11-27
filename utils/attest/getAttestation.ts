"use server"

import { ethers } from "ethers";
import  { EAS }  from "@ethereum-attestation-service/eas-sdk";
import { easContractAddress } from "../constants/addresses";



export async function getInvoiceAttestationOnchain (UID: string){
    const provider = new ethers.JsonRpcProvider(`https://`);
       
    const eas = new EAS(easContractAddress);
    eas.connect(provider);

    const attestation = await eas.getAttestation(UID);

    console.log(attestation);
    return attestation
}