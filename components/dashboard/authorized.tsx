import { usePrivy } from "@privy-io/react-auth";
import Image from "next/image";
import { Logout } from "./logout";
import { Invoice } from "./invoice";
import { OffchainInvoiceAttestation, useGetInvoiceAttestations } from "@/hooks/attestations/useGetInvoiceAttestations";
import { useGetCurrencyRate } from "@/hooks/currencyRate/useGetCurrencyRate";
import { Countries, Country } from "@/utils/constants/countries";


export function Authorized() {

    const {user} = usePrivy();
    
    const smartWallet = user?.linkedAccounts.find((account) => account.type === 'smart_wallet');
    console.log(smartWallet?.address);
    const { invoiceAttestations } = useGetInvoiceAttestations( smartWallet?.address )
    console.log(invoiceAttestations)

    
    const country = Countries[user?.customMetadata?.country as keyof typeof Countries] as Country;
    console.log(country)

    const { currencyRate } = useGetCurrencyRate(country.code)
    console.log(currencyRate)
    
    const privyUserMetadata = user?.customMetadata
    
    return (
        <main className="flex flex-col w-full h-full items-center gap-8 p-24 max-md:p-6">
                <div className="flex w-full justify-between">
                    <div>
                        <Image
                            src="/icons/512x512.png"
                            alt=""
                            width={40}
                            height={40}
                        />
                    </div>
                    <div className="flex gap-3">
                        <Logout/>
                    </div>
                </div>
            
                
                <div className="flex w-full items-center justify-center">
                    {
                        !privyUserMetadata
                        && (
                            <div>
                                <p>whoa! make profile woodie...</p>
                            </div>
                        )
                    }
                    {
                        privyUserMetadata && smartWallet
                        && (
                            <div className="flex flex-col gap-8">
                                <div>
                                    <p>{privyUserMetadata.firstname} {privyUserMetadata.lastname}</p>
                                    <p>Welcome:{smartWallet?.address as `0x${string}`} </p>
                                </div>
                                <div>
                                    {
                                        !invoiceAttestations 
                                        ?(
                                            <>
                                                Your Weekly Membership Invoices will appear here. Pay them on time for good credit
                                            </>
                                        )

                                        :(
                                            <div className="flex flex-col gap-8">
                                                <div className="flex flex-col gap-2">
                                                    <p>Click any of the Invoices to pay you weekly membership dues on time & stay in good credit Standing</p>
                                                    <p>Your Total score is: </p>
                                                </div>
                                                <div>
                                                {invoiceAttestations?.map((invoiceAttestation: OffchainInvoiceAttestation) => (
                                                    <Invoice key={invoiceAttestation._id} address={smartWallet?.address} invoiceAttestation={invoiceAttestation} currencyRate={currencyRate!}/>
                                                ))}
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                    
                    
                </div>
        </main>
    )
}