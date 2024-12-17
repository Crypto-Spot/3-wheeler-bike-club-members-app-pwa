import { DataLocationOnChain, decodeOnChainData, SchemaItem } from "@ethsign/sp-sdk";

export async function decodeAttestation(
    attestationData: string,
    schemaData: SchemaItem[]
) {
    const res = decodeOnChainData(
        attestationData,
        DataLocationOnChain.ONCHAIN,
        schemaData
    );
    console.log(res)
    return res
}