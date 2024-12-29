"use server"

import { IndexService } from "@ethsign/sp-sdk";



export async function getAttestation(attestationID: string){
    const indexService = new IndexService("mainnet");
    const res = await indexService.queryAttestation(attestationID);
    console.log(res)
    return res
}