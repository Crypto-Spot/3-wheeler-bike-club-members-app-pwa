import { usePrivy } from "@privy-io/react-auth";
import { Coins } from "lucide-react";
import { Menu } from "../topnav/menu";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useGetCurrencyRate } from "@/hooks/currencyRate/useGetCurrencyRate";
import { Countries, Country } from "@/utils/constants/countries";
import { Invoice } from "./invoice";
import { Receipt } from "./receipt";
import { OffchainMemberInvoiceAttestation, useGetMemberInvoiceAttestations } from "@/hooks/attestations/useGetMemberInvoiceAttestations";
import { useGetMemberReceiptAttestations } from "@/hooks/attestations/useGetMemberReceipAttestations";
import { useGetMemberCreditScoreAttestation } from "@/hooks/attestations/useGetMemberCreditScoreAttestation";
import { postMemberCreditScoreAttestationAction } from "@/app/actions/attestation/postMemberCreditScoreAttestationAction";
import { attest } from "@/utils/attestation/attest";
import { deconstructMemberCreditScoreAttestationData } from "@/utils/attestation/member/creditScore/deconstructMemberCreditScoreAttestationData";
import { revoke } from "@/utils/attestation/revoke";
import { calculateScore } from "@/utils/attestation/calculateScore";
import { postMemberReceiptAttestationAction } from "@/app/actions/attestation/postMemberReceiptAttestationAction";
import { deconstructMemberReceiptAttestationData } from "@/utils/attestation/member/receipt/deconstructMemberReceiptAttestationData";
import { useState } from "react";


export function Authorized() {

    const {user} = usePrivy();
    console.log(user)

    const [loadingInvoicePayment, setLoadingInvoicePayment] = useState(false)
    const [invoicePaymentLoadingId, setInvoicePaymentLoadingId] = useState<string | null>(null)
    
    const smartWallet = user?.linkedAccounts.find((account) => account.type === 'smart_wallet');
    console.log(smartWallet?.address);
    
    

    const { memberInvoiceAttestations, loading: loadingMemberInvoiceAttestations, getBackMemberInvoiceAttestations } = useGetMemberInvoiceAttestations( smartWallet?.address )
    console.log(memberInvoiceAttestations)
    


    const { memberReceiptAttestations, loading: loadingMemberReceiptAttestations, getBackMemberReceiptAttestations } = useGetMemberReceiptAttestations( smartWallet?.address )
    console.log(memberReceiptAttestations)

    
    const { memberCreditScoreAttestation, loading: loadingMemberCreditScoreAttestation, getBackMemberCreditScoreAttestation } = useGetMemberCreditScoreAttestation( smartWallet?.address )
    console.log(memberCreditScoreAttestation)

    

    const country = Countries[user?.customMetadata?.country as keyof typeof Countries] as Country;
    console.log(country)

    const { currencyRate } = useGetCurrencyRate(country.code)
    console.log(currencyRate)

    async function afterPaymentSuccess(memberInvoiceAttestation: OffchainMemberInvoiceAttestation) {
        if (!smartWallet?.address) return;

        const recepient: string[] = []
        recepient.push(smartWallet.address)
        
        const score = calculateScore(memberInvoiceAttestation.createdAt)
        
        if (!currencyRate?.rate || !currencyRate?.currency) return;

        // Deconstruct attestation data
        const deconstructedAttestationData = await deconstructMemberReceiptAttestationData(
            memberInvoiceAttestation.memberInvoiceAttestationID, 
            recepient,
            Math.ceil(Number(currencyRate.rate) * memberInvoiceAttestation.amount * 100),
            currencyRate.currency,
            memberInvoiceAttestation.week,
            score
        )

        const memberReceiptAttested = await attest(deconstructedAttestationData)
        if (memberReceiptAttested) {
            // Post receipt attestation offchain
            await postMemberReceiptAttestationAction(
                smartWallet.address,
                memberInvoiceAttestation.memberInvoiceAttestationID,
                memberReceiptAttested.attestationId,
                Math.ceil(Number(currencyRate.rate) * memberInvoiceAttestation.amount * 100),
                currencyRate.currency,
                memberInvoiceAttestation.week,
                score
            )

            if (!memberCreditScoreAttestation?.memberCreditScoreAttestationID) return;

            // Revoke previous credit score attestation
            const revokeMemberCreditScoreAttestation = await revoke(memberCreditScoreAttestation.memberCreditScoreAttestationID)
            
            if (revokeMemberCreditScoreAttestation) {
                if (
                    typeof memberCreditScoreAttestation.score === 'undefined' ||
                    typeof memberCreditScoreAttestation.paidWeeks === 'undefined' ||
                    typeof memberCreditScoreAttestation.invoicedWeeks === 'undefined'
                ) return;

                // Create new credit score attestation
                const deconstructedCreditScoreAttestationData = await deconstructMemberCreditScoreAttestationData(
                    recepient,
                    (memberCreditScoreAttestation.score + score),
                    (memberCreditScoreAttestation.paidWeeks + 1),
                    memberCreditScoreAttestation.invoicedWeeks
                )

                const memberCreditScoreAttested = await attest(deconstructedCreditScoreAttestationData)
                if (memberCreditScoreAttested) {
                    await postMemberCreditScoreAttestationAction(
                        smartWallet.address,
                        memberCreditScoreAttested.attestationId,
                        (memberCreditScoreAttestation.score + score),
                        (memberCreditScoreAttestation.paidWeeks + 1)
                    )
                }
            }
        }

        await getBackMemberInvoiceAttestations()
        await getBackMemberReceiptAttestations()
        await getBackMemberCreditScoreAttestation()
    }

    return (
        <main className="flex h-full w-full">
            <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6">
                
                <Menu/>

                <div className="flex w-full justify-center">
                    <Alert className="w-full max-w-[66rem]">
                        <Coins className="h-4 w-4" />
                        <AlertTitle className="font-bold">Membership!</AlertTitle>
                        <AlertDescription className="text-xs italic">
                            Pay Membership Dues & build your reputation.
                        </AlertDescription>
                    </Alert>
                </div>

                <div className="flex w-full justify-center">
                    <Tabs defaultValue="invoices" className="w-full max-w-[66rem]">
                        <TabsList className="flex w-full h-28 max-lg:h-52">
                            <div className="flex w-full max-lg:flex-col">
                                <div className="w-1/2 max-lg:w-full">
                                    <TabsTrigger value="score" className="w-full h-28">
                                        <div className="flex flex-col gap-2">
                                            <p>Credit Score</p>
                                            <div className="flex flex-col gap-2">
                                                {
                                                    memberCreditScoreAttestation == null && loadingMemberCreditScoreAttestation == true && (
                                                        <p>Loading...</p>
                                                    )
                                                }
                                                {
                                                    memberCreditScoreAttestation == null && loadingMemberCreditScoreAttestation == false && (
                                                        <p>0</p>
                                                    )
                                                }
                                                {
                                                    memberCreditScoreAttestation != null && (
                                                        <p>{memberCreditScoreAttestation?.score}</p>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </TabsTrigger>
                                </div>
                                <div className="w-1/2 max-lg:w-full">
                                    <TabsTrigger value="invoices" className="h-28 w-1/2">
                                        <div className="flex flex-col gap-2">
                                            <p>Invoices</p>
                                            <div className="flex flex-col gap-2">
                                                
                                                {
                                                    memberInvoiceAttestations == null && loadingMemberInvoiceAttestations == true && (
                                                        <p>Loading...</p>
                                                    )
                                                }
                                                {
                                                    memberInvoiceAttestations == null && loadingMemberInvoiceAttestations == false && (
                                                        <p>0</p>
                                                    )
                                                }
                                                {
                                                    memberInvoiceAttestations != null && (
                                                        <p>{memberInvoiceAttestations?.length}</p>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </TabsTrigger>
                                    <TabsTrigger value="receipts" className="h-28 w-1/2">
                                        <div className="flex flex-col gap-2">
                                            <p>Receipts</p>
                                            <div className="flex flex-col gap-2">
                                                {
                                                    memberReceiptAttestations == null && loadingMemberReceiptAttestations == true && (
                                                        <p>Loading...</p>
                                                    )
                                                }
                                                {
                                                    memberReceiptAttestations == null && loadingMemberReceiptAttestations == false && (
                                                        <p>0</p>
                                                    )
                                                }
                                                {
                                                    memberReceiptAttestations != null && (
                                                        <p>{memberReceiptAttestations?.length}</p>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </TabsTrigger>
                                </div>
                            </div>
                    
                        </TabsList>
                        <div className="flex flex-col gap-4 w-full flex-1 overflow-y-auto">
                            <TabsContent value="score">
                                <div className="flex flex-1 items-center justify-center">
                                    <Image 
                                        src="/images/construction.svg" 
                                        alt="sponsorship" 
                                        width={800} 
                                        height={800}
                                        className="w-auto h-auto max-w-full max-h-[66vh] object-contain" 
                                    />  
                                </div>
                            </TabsContent>
                            <TabsContent value="invoices">
                                <div className="flex flex-1 flex-col items-center justify-center">
                                    {
                                        memberInvoiceAttestations == null && loadingMemberInvoiceAttestations == true && (
                                            <p>Loading...</p>
                                        )
                                    }
                                    {
                                        memberInvoiceAttestations == null && loadingMemberInvoiceAttestations == false && (
                                            <>
                                                <p>Your Weekly Membership Invoices will appear here. Pay them on time for good credit standing</p>
                                            </>
                                        )
                                    }
                                    {
                                        memberInvoiceAttestations != null && (
                                            <>
                                                {
                                                    memberInvoiceAttestations?.map((memberInvoiceAttestation) => (
                                                        <Invoice 
                                                            key={memberInvoiceAttestation._id} 
                                                            memberInvoiceAttestation={memberInvoiceAttestation} 
                                                            currencyRate={currencyRate!}
                                                            afterPaymentSuccess={afterPaymentSuccess}
                                                            loadingInvoicePayment={loadingInvoicePayment}
                                                            setLoadingInvoicePayment={setLoadingInvoicePayment}
                                                            invoicePaymentLoadingId={invoicePaymentLoadingId}
                                                            setInvoicePaymentLoadingId={setInvoicePaymentLoadingId}
                                                        />
                                                    ))
                                                }
                                            </>
                                        )
                                    }
                                </div>
                            </TabsContent>
                            <TabsContent value="receipts">
                                <div className="flex flex-1 flex-col items-center justify-center">
                                    {
                                        memberReceiptAttestations == null && loadingMemberReceiptAttestations == true && (
                                            <p>Loading...</p>
                                        )
                                    }
                                    {
                                        memberReceiptAttestations == null && loadingMemberReceiptAttestations == false && (
                                            <>
                                                <p>Your membership receipts will appear here. Pay them on time for good credit standing</p>
                                            </>
                                        )
                                    }
                                    {
                                        memberReceiptAttestations != null && (
                                            <>
                                                {
                                                    memberReceiptAttestations?.map((memberReceiptAttestation) => (
                                                        <Receipt
                                                            key={memberReceiptAttestation._id} 
                                                            memberReceiptAttestation={memberReceiptAttestation}  
                                                        />
                                                    ))
                                                }
                                            </>
                                        )
                                    }
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>

                </div>

                
            </div>
        </main>
    )
}
