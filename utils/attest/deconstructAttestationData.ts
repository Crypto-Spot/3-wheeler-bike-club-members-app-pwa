import { Attestation, DataLocationOnChain } from "@ethsign/sp-sdk"
import { attester, memberReceiptAttestationID } from "../constants/addresses"

export async function deconstructAttestationData( linkedAttestationId: string, recipients: string[], amount: number, currency: string, week: string, score: number ) {

    const schemaData = {
        amount: amount,
        currency: currency,
        week: week,
        score: score
    }
    const deconstructedAttestationData: Attestation= {
        schemaId: (memberReceiptAttestationID), // The final number from our schema's ID.
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

    return deconstructedAttestationData
}