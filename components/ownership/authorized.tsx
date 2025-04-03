import { Caravan, CircleCheck, CircleSlash, PartyPopper } from "lucide-react";
import { Menu } from "../topnav/menu";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useGetMemberReceiptAttestations } from "@/hooks/attestations/useGetMemberReceipAttestations";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useGetMemberBadgeAttestation } from "@/hooks/attestations/useGetMemberBadgeAttestation";
import { revoke } from "@/utils/attestation/revoke";
import { attest } from "@/utils/attestation/attest";
import { deconstructMemberBadgeAttestationData } from "@/utils/attestation/member/badge/deconstructMemberBadgeAttestationData";
import { updateMemberBadgeAttestationByStatusAction } from "@/app/actions/attestation/updateMemberBadgeAttestationByStatusAction";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useGetHirePurchaseReceiptAttestations } from "@/hooks/attestations/useGetHirePurchaseReceiptAttestations";
import { OffchainHirePurchaseInvoiceAttestation, useGetHirePurchaseInvoiceAttestations } from "@/hooks/attestations/useGetHirePurchaseInvoiceAttestations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Image from "next/image";
import { useGetHirePurchaseCreditScoreAttestation } from "@/hooks/attestations/useGetHirePurchaseCreditScoreAttestation";
import { Invoice } from "./invoice";
import { Receipt } from "./receipt";
import { Country } from "@/utils/constants/countries";
import { useGetCurrencyRate } from "@/hooks/currencyRate/useGetCurrencyRate";
import { Countries } from "@/utils/constants/countries";
import { useGetHirePurchaseAttestation } from "@/hooks/attestations/useGetHirePurchaseAttestation";
import { useGetOwnerPinkSlipAttestationByVin } from "@/hooks/attestations/useGetOwnerPinkSlipAttestationByVin";
import { calculateOwnershipScore } from "@/utils/attestation/calculate";
import { deconstructHirePurchaseReceiptAttestationData } from "@/utils/attestation/owner/hirePurchase/deconstructHirePurchaseReceiptAttestationData";
import { postHirePurchaseReceiptAttestationAction } from "@/app/actions/attestation/postHirePurchaseReceiptAttestationAction";
import { deconstructHirePurchaseCreditScoreAttestationData } from "@/utils/attestation/owner/hirePurchase/deconstructHirePurchaseCreditScoreAttestationData";
import { postHirePurchaseCreditScoreAttestationAction } from "@/app/actions/attestation/postHirePurchaseCreditScoreAttestationAction";

export function Authorized() {

    const {user} = usePrivy();
    console.log(user)
    const [loading, setLoading] = useState(false)
    
    const [loadingInvoicePayment, setLoadingInvoicePayment] = useState(false)
    const [invoicePaymentLoadingId, setInvoicePaymentLoadingId] = useState<string | null>(null)

    const smartWallet = user?.linkedAccounts.find((account) => account.type === 'smart_wallet');
    console.log(smartWallet?.address);
    
    const { memberReceiptAttestations } = useGetMemberReceiptAttestations( smartWallet?.address )
    console.log(memberReceiptAttestations)

    const { memberBadgeAttestation, getBackMemberBadgeAttestation } = useGetMemberBadgeAttestation( smartWallet?.address )
    console.log(memberBadgeAttestation)

    const { hirePurchaseAttestation } = useGetHirePurchaseAttestation( smartWallet?.address )
    console.log(hirePurchaseAttestation)

    const { ownerPinkSlipAttestationByVin } = useGetOwnerPinkSlipAttestationByVin( hirePurchaseAttestation?.vin )
    console.log(ownerPinkSlipAttestationByVin)

    const { hirePurchaseInvoiceAttestations, loading: loadingHirePurchaseInvoiceAttestations, getBackHirePurchaseInvoiceAttestations } = useGetHirePurchaseInvoiceAttestations( smartWallet?.address )
    console.log(hirePurchaseInvoiceAttestations)
    
    const { hirePurchaseReceiptAttestations, loading: loadingHirePurchaseReceiptAttestations, getBackHirePurchaseReceiptAttestations } = useGetHirePurchaseReceiptAttestations( smartWallet?.address )
    console.log(hirePurchaseReceiptAttestations)

    const { hirePurchaseCreditScoreAttestation, loading: loadingHirePurchaseCreditScoreAttestation, getBackHirePurchaseCreditScoreAttestation } = useGetHirePurchaseCreditScoreAttestation( smartWallet?.address )
    console.log(hirePurchaseCreditScoreAttestation)

    const country = Countries[user?.customMetadata?.country as keyof typeof Countries] as Country;
    console.log(country)

    const { currencyRate } = useGetCurrencyRate(country.code)
    console.log(currencyRate)

    
    const [filteredHirePurchaseInvoiceAttestations, setFilteredHirePurchaseInvoiceAttestations] = useState<OffchainHirePurchaseInvoiceAttestation[] | null>(null)

    useEffect(() => {

        // Filter out invoices that already have receipts
        const unresolvedInvoices = hirePurchaseInvoiceAttestations?.filter(invoice => {
            return !hirePurchaseReceiptAttestations?.some(receipt => 
                receipt.hirePurchaseInvoiceAttestationID === invoice.hirePurchaseInvoiceAttestationID
            )
        }).sort((a, b) => {
            const dateA = new Date(a.due).getTime();
            const dateB = new Date(b.due).getTime();
            return dateA - dateB; // Sort ascending (closest date first)
        })

        setFilteredHirePurchaseInvoiceAttestations(unresolvedInvoices || null)
    }, [hirePurchaseInvoiceAttestations, hirePurchaseReceiptAttestations])

    const router = useRouter();
    
    async function apply() {
        setLoading(true)
        if (!memberBadgeAttestation?.memberBadgeAttestationID) return;

        // Revoke previous member badge attestation
        const revokeMemberBadgeAttestation = await revoke(memberBadgeAttestation.memberBadgeAttestationID)

        if (revokeMemberBadgeAttestation) {
            // Create new credit score attestation
            const deconstructedMemberBadgeAttestationData = await deconstructMemberBadgeAttestationData(
                [smartWallet?.address as string],
                memberBadgeAttestation.country, 
                false,
                false,
                false,
                1
            )

            const memberBadgeAttested = await attest(deconstructedMemberBadgeAttestationData)

            if (memberBadgeAttested) {
                await updateMemberBadgeAttestationByStatusAction(
                    smartWallet?.address as string,
                    memberBadgeAttested.attestationId,
                    1
                )
            }
        }
        getBackMemberBadgeAttestation()
        setLoading(false)
    }
    
    async function afterPaymentSuccess(hirePurchaseInvoiceAttestation: OffchainHirePurchaseInvoiceAttestation) {
        if (!smartWallet?.address) return;
        console.log(hirePurchaseInvoiceAttestation)

        const recepient: string[] = []
        recepient.push(smartWallet.address)
        
        const score = calculateOwnershipScore(hirePurchaseInvoiceAttestation.due)

        if (!currencyRate?.rate || !currencyRate?.currency) return;
        // Deconstruct attestation data
        const deconstructedHirePurchaseReceiptAttestationData = await deconstructHirePurchaseReceiptAttestationData(
            recepient,
            hirePurchaseAttestation?.vin as string,
            hirePurchaseInvoiceAttestation.invoiceID,
            Math.ceil(Number(currencyRate.rate) * hirePurchaseInvoiceAttestation.amount * 100),
            currencyRate.currency,  
            score,
            hirePurchaseInvoiceAttestation.hirePurchaseInvoiceAttestationID
        )
        const hirePurchaseReceiptAttested = await attest(deconstructedHirePurchaseReceiptAttestationData)

        if (hirePurchaseReceiptAttested) {
            // Post receipt attestation offchain
            await postHirePurchaseReceiptAttestationAction(
                smartWallet.address,
                hirePurchaseInvoiceAttestation.hirePurchaseInvoiceAttestationID,
                hirePurchaseReceiptAttested.attestationId,
                hirePurchaseAttestation?.vin as string,
                hirePurchaseInvoiceAttestation.invoiceID,
                Math.ceil(Number(currencyRate.rate) * hirePurchaseInvoiceAttestation.amount * 100),
                currencyRate.currency,
                score,
            )
        }
        if(hirePurchaseCreditScoreAttestation) {
            // Revoke previous credit score attestation
            const revokeHirePurchaseCreditScoreAttestation = await revoke(hirePurchaseCreditScoreAttestation.hirePurchaseCreditScoreAttestationID)
            
           //attest
           if(revokeHirePurchaseCreditScoreAttestation) {
            const deconstructedHirePurchaseCreditScoreAttestationData = await deconstructHirePurchaseCreditScoreAttestationData(
                recepient,
                hirePurchaseCreditScoreAttestation.score + score,
                hirePurchaseCreditScoreAttestation.paidWeeks + 1,
                hirePurchaseCreditScoreAttestation.invoicedWeeks,
                hirePurchaseInvoiceAttestation.hirePurchaseAttestationID
            )
            const hirePurchaseCreditScoreAttested = await attest(deconstructedHirePurchaseCreditScoreAttestationData)
            
            //offchain
            if(hirePurchaseCreditScoreAttested) {
                await postHirePurchaseCreditScoreAttestationAction(
                    smartWallet.address,
                    hirePurchaseInvoiceAttestation.hirePurchaseAttestationID,
                    hirePurchaseCreditScoreAttested.attestationId,
                    hirePurchaseCreditScoreAttestation.score + score,
                    hirePurchaseCreditScoreAttestation.paidWeeks + 1,
                    hirePurchaseCreditScoreAttestation.invoicedWeeks
                )
            }
           }
            

           
            


        } else {
            //attest
            const deconstructedHirePurchaseCreditScoreAttestationData = await deconstructHirePurchaseCreditScoreAttestationData(
                recepient,
                score,
                1,
                93,
                hirePurchaseInvoiceAttestation.hirePurchaseAttestationID
            )
            const hirePurchaseCreditScoreAttested = await attest(deconstructedHirePurchaseCreditScoreAttestationData)
            
            //offchain
            if(hirePurchaseCreditScoreAttested) {
                await postHirePurchaseCreditScoreAttestationAction(
                    smartWallet.address,
                    hirePurchaseInvoiceAttestation.hirePurchaseAttestationID,
                    hirePurchaseCreditScoreAttested.attestationId,
                    score,
                    1,
                    93
                )
            }

           
        }
        await getBackHirePurchaseInvoiceAttestations()
        await getBackHirePurchaseReceiptAttestations()
        await getBackHirePurchaseCreditScoreAttestation()

    }
    
    return (
        <main className="flex h-full w-full">
            <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6">
                
                <Menu/>

                <div className="flex w-full justify-center mb-4">
                    <Alert className="w-full max-w-[66rem]">
                        <Caravan className="h-4 w-4" />
                        <AlertTitle className="font-bold">Ownership!</AlertTitle>
                        <AlertDescription className="text-xs italic">
                            Finance the ownership of your 3wheeler.
                        </AlertDescription>
                    </Alert>
                </div>
                {
                    !memberReceiptAttestations 
                    ? ( <>loading...</> ) 
                    :(
                        <>
                            {
                                memberReceiptAttestations.length >= 1 
                                ? (
                                    <>
                                        {
                                            memberBadgeAttestation?.status === 0
                                            &&(
                                                <>
                                                    <div className="flex items-center justify-center">
                                                        <div className="flex flex-col w-full max-w-[66rem] items-center justify-center gap-6">
                                                            <CircleCheck className="h-36 w-36" />
                                                            <p className="text-center text-lg">You are qualified to recieve a 3wheeler. Click below to apply & report at our office for in-person verification</p>
                                                            <Button onClick={apply}>
                                                            {
                                                                loading
                                                                ? (
                                                                    <>
                                                                        <motion.div
                                                                        initial={{ rotate: 0 }} // Initial rotation value (0 degrees)
                                                                        animate={{ rotate: 360 }} // Final rotation value (360 degrees)
                                                                        transition={{
                                                                            duration: 1, // Animation duration in seconds
                                                                            repeat: Infinity, // Infinity will make it rotate indefinitely
                                                                            ease: "linear", // Animation easing function (linear makes it constant speed)
                                                                        }}
                                                                    >
                                                                            <DotsHorizontalIcon/>
                                                                        </motion.div>
                                                                    </>
                                                                )
                                                                : (
                                                                    <>
                                                                        Apply
                                                                    </>
                                                                )
                                                            }
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </>
                                            ) 
                                        }
                                        {
                                            memberBadgeAttestation?.status === 1
                                            &&(
                                                <>
                                                    <div className="flex items-center justify-center">
                                                        <div className="flex flex-col w-full max-w-[66rem] items-center justify-center gap-6">
                                                            <PartyPopper className="h-36 w-36" />
                                                            <p className="text-center text-2xl">Congrats you have applied for a 3wheeler.</p>
                                                            {
                                                                memberBadgeAttestation?.driver=== true
                                                                ? (
                                                                    <>
                                                                        <p className="text-center text-lg">You have verified your identity and are ready to get started! Kindly wait, our representative will contact you to verify your address & assign a 3wheeler if you pass the credit check.</p>
                                                                    </>
                                                                )
                                                                : (
                                                                    <>
                                                                       <p className="text-center text-lg">Come to our location with a guarantor, verify your identity and get started!</p>
                                                                    </>
                                                                )
                                                            }
                                        
                                                        </div>
                                                    </div>
                                                </>
                                            )

                                        }
                                        {
                                            ownerPinkSlipAttestationByVin && memberBadgeAttestation?.status === 2
                                            &&(
                                                <>
                                                    <div className="flex flex-col gap-4 items-center justify-center">
                                                        <div className="flex flex-col w-full max-w-[66rem] items-center justify-center gap-6">
                                                            <div className="flex gap-4 items-center justify-center">
                                                                <div className="flex w-1/8">
                                                                    <Image src="/images/kekeHero.svg" alt="3wheeler" width={100} height={100} />
                                                                </div>
                                                                <div className="flex flex-col w-7/8">
                                                                    <p className="text-center text-2xl">Congrats you have been assigned a 3wheeler.</p>
                                                                    {
                                                                        ownerPinkSlipAttestationByVin && (
                                                                            <div className="flex flex-col gap-2 items-center">
                                                                                <div className="flex gap-2 items-center">
                                                                                    <p className="text-sm text-muted-foreground">VIN:</p>
                                                                                    <p className="text-sm font-medium">{ownerPinkSlipAttestationByVin.vin}</p>
                                                                                </div>
                                                                                <div className="flex gap-2 items-center">
                                                                                    <p className="text-sm text-muted-foreground">License Plate:</p>
                                                                                    <p className="text-sm font-medium">{ownerPinkSlipAttestationByVin.licensePlate}</p>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                    <p className="text-center text-lg">Pay your weekly installments on time & avoid penalties!</p>
                                                                </div>
                                                            </div>
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
                                                                                            hirePurchaseCreditScoreAttestation == null && loadingHirePurchaseCreditScoreAttestation == true && (
                                                                                                <p>Loading...</p>
                                                                                            )
                                                                                        }
                                                                                        {
                                                                                            hirePurchaseCreditScoreAttestation == null && loadingHirePurchaseCreditScoreAttestation == false && (
                                                                                                <p>0</p>
                                                                                            )
                                                                                        }
                                                                                        {
                                                                                            hirePurchaseCreditScoreAttestation != null && (
                                                                                                <p>{hirePurchaseCreditScoreAttestation?.score}</p>
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
                                                                                            filteredHirePurchaseInvoiceAttestations == null && loadingHirePurchaseInvoiceAttestations == true && (
                                                                                                <p>Loading...</p>
                                                                                            )
                                                                                        }
                                                                                        {
                                                                                            filteredHirePurchaseInvoiceAttestations == null && loadingHirePurchaseInvoiceAttestations == false && (
                                                                                                <p>0</p>
                                                                                            )
                                                                                        }
                                                                                        {
                                                                                            filteredHirePurchaseInvoiceAttestations != null && (
                                                                                                <p>{filteredHirePurchaseInvoiceAttestations?.length}</p>
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
                                                                                            hirePurchaseReceiptAttestations == null && loadingHirePurchaseReceiptAttestations == true && (
                                                                                                <p>Loading...</p>
                                                                                            )
                                                                                        }
                                                                                        {
                                                                                            hirePurchaseReceiptAttestations == null && loadingHirePurchaseReceiptAttestations == false && (
                                                                                                <p>0</p>
                                                                                            )
                                                                                        }
                                                                                        {
                                                                                            hirePurchaseReceiptAttestations != null && (
                                                                                                <p>{hirePurchaseReceiptAttestations?.length}</p>
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
                                                                                filteredHirePurchaseInvoiceAttestations == null && loadingHirePurchaseInvoiceAttestations == true && (
                                                                                    <p>Loading...</p>
                                                                                )
                                                                            }
                                                                            {
                                                                                filteredHirePurchaseInvoiceAttestations == null && loadingHirePurchaseInvoiceAttestations == false && (
                                                                                    <>
                                                                                        <p>Your Weekly Membership Invoices will appear here. Pay them on time for good credit standing</p>
                                                                                    </>
                                                                                )
                                                                            }
                                                                            {
                                                                                filteredHirePurchaseInvoiceAttestations != null && (
                                                                                    <>
                                                                                        {
                                                                                            filteredHirePurchaseInvoiceAttestations?.map((hirePurchaseInvoiceAttestation) => (
                                                                                                <Invoice 
                                                                                                    key={hirePurchaseInvoiceAttestation._id} 
                                                                                                    hirePurchaseInvoiceAttestation={hirePurchaseInvoiceAttestation} 
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
                                                                                hirePurchaseReceiptAttestations == null && loadingHirePurchaseReceiptAttestations == true && (
                                                                                    <p>Loading...</p>
                                                                                )
                                                                            }
                                                                            {
                                                                                hirePurchaseReceiptAttestations == null && loadingHirePurchaseReceiptAttestations == false && (
                                                                                    <>
                                                                                        <p>Your membership receipts will appear here. Pay them on time for good credit standing</p>
                                                                                    </>
                                                                                )
                                                                            }
                                                                            {
                                                                                hirePurchaseReceiptAttestations != null && (
                                                                                    <>
                                                                                        {
                                                                                            hirePurchaseReceiptAttestations?.map((hirePurchaseReceiptAttestation) => (
                                                                                                <Receipt
                                                                                                    key={hirePurchaseReceiptAttestation.hirePurchaseReceiptAttestationID} 
                                                                                                    hirePurchaseReceiptAttestation={hirePurchaseReceiptAttestation}  
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
                                                </>
                                            )

                                        }
                                    </>
                                ) 
                            
                                : (
                                    <>
                                        <div className="flex items-center justify-center">
                                            <div className="flex flex-col w-full max-w-[66rem] items-center justify-center gap-6">
                                                <CircleSlash className="h-36 w-36" />
                                                <p className="text-center text-lg">You are not qualified to recieve a 3wheeler yet. Pay at least one membreship dues & come back to apply</p>
                                                <Button onClick={() => router.push('/membership')}>Pay Dues</Button>
                                            </div>
                                        </div>
                                       
                                    </>
                                )
                            }
                        </>
                    )
                }
                
                
            </div>
        </main>
    )
}