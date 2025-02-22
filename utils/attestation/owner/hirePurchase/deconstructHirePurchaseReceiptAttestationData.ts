import { Attestation } from "@ethsign/sp-sdk"
import { attester, hirePurchaseReceiptSchemaID } from "@/utils/constants/addresses"
import { DataLocationOnChain } from "@ethsign/sp-sdk"

export function deconstructHirePurchaseReceiptAttestationData(recipients: string[], vin: string, receiptID: string, amount: number, currency: string, score: number ) {
    const schemaData = {
        vin: vin,
        receiptID: receiptID,
        amount: amount,
        currency: currency,
        score: score,
    }


    const deconstructedHirePurchaseReceiptAttestationData: Attestation= {
        schemaId: (hirePurchaseReceiptSchemaID), // The final number from our schema's ID.
        indexingValue: "0",
        linkedAttestationId: null, // We are not linking an attestation.
        attestTimestamp: 0, // Will be generated for us.
        revokeTimestamp: 0, // Attestation is not revoked.
        attester: attester, // Alice's address.
        validUntil: 0, // We are not setting an expiry date.
        dataLocation: DataLocationOnChain.ONCHAIN, // We are placing data on-chain.
        revoked: false, // The attestation is not revoked.
        recipients: recipients, // Bob is our recipient.
        data: schemaData // The encoded schema data.
    }   
    return deconstructedHirePurchaseReceiptAttestationData
}