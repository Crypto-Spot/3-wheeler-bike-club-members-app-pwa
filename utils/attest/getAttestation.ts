"use server"

import { IndexService } from "@ethsign/sp-sdk";



export async function getAttestations(attestationID: string){
    const indexService = new IndexService("mainnet");
    const res = await indexService.queryAttestation(attestationID);
    console.log(res)
    return res
}