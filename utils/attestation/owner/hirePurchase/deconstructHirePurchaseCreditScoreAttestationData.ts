import { Attestation } from "@ethsign/sp-sdk"
import { attester, hirePurchaseCreditScoreSchemaID, hirePurchaseReceiptSchemaID } from "@/utils/constants/addresses"
import { DataLocationOnChain } from "@ethsign/sp-sdk"

export async function deconstructHirePurchaseCreditScoreAttestationData(recipients: string[], score: number, paidWeeks: number, invoicedWeeks: number, linkedAttestationId: string ) {
    const schemaData = {
        score: score,
        paidWeeks: paidWeeks,
        invoicedWeeks: invoicedWeeks
    }


    const deconstructedHirePurchaseCreditScoreAttestationData: Attestation= {
        schemaId: (hirePurchaseCreditScoreSchemaID), // The final number from our schema's ID.
        indexingValue: "0",
        linkedAttestationId: linkedAttestationId, // We are not linking an attestation.
        attestTimestamp: 0, // Will be generated for us.
        revokeTimestamp: 0, // Attestation is not revoked.
        attester: attester, // Alice's address.
        validUntil: 0, // We are not setting an expiry date.
        dataLocation: DataLocationOnChain.ONCHAIN, // We are placing data on-chain.
        revoked: false, // The attestation is not revoked.
        recipients: recipients, // Bob is our recipient.
        data: schemaData // The encoded schema data.
    }   
    return deconstructedHirePurchaseCreditScoreAttestationData
}