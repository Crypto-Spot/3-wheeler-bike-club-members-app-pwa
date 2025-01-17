
import { usePrivy } from "@privy-io/react-auth";
import { Coins } from "lucide-react";
import { Menu } from "../topnav/menu";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useGetCurrencyRate } from "@/hooks/currencyRate/useGetCurrencyRate";
import { Countries, Country } from "@/utils/constants/countries";
import { Invoice } from "./invoice";
import { useGetInvoiceAttestations } from "@/hooks/attestations/useGetInvoiceAttestations";
import { useGetReceiptAttestations } from "@/hooks/attestations/useGetReceipAttestations";


export function Authorized() {

    const {user} = usePrivy();
    console.log(user)

    
    
    const smartWallet = user?.linkedAccounts.find((account) => account.type === 'smart_wallet');
    console.log(smartWallet?.address);
    
    

    const { invoiceAttestations, loading: loadingInvoiceAttestations } = useGetInvoiceAttestations( smartWallet?.address )
    console.log(invoiceAttestations)
    


    const { receiptAttestations, loading: loadingReceiptAttestations } = useGetReceiptAttestations( smartWallet?.address )
    console.log(receiptAttestations)

    

    const country = Countries[user?.customMetadata?.country as keyof typeof Countries] as Country;
    console.log(country)

    const { currencyRate } = useGetCurrencyRate(country.code)
    console.log(currencyRate)


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
                                                <p>750</p>
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
                                                    invoiceAttestations == null && loadingInvoiceAttestations == true && (
                                                        <p>Loading...</p>
                                                    )
                                                }
                                                {
                                                    invoiceAttestations == null && loadingInvoiceAttestations == false && (
                                                        <p>0</p>
                                                    )
                                                }
                                                {
                                                    invoiceAttestations != null && (
                                                        <p>{invoiceAttestations?.length}</p>
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
                                                    receiptAttestations == null && loadingReceiptAttestations == true && (
                                                        <p>Loading...</p>
                                                    )
                                                }
                                                {
                                                    receiptAttestations == null && loadingReceiptAttestations == false && (
                                                        <p>0</p>
                                                    )
                                                }
                                                {
                                                    receiptAttestations != null && (
                                                        <p>{receiptAttestations?.length}</p>
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
                                        invoiceAttestations == null && loadingInvoiceAttestations == true && (
                                            <p>Loading...</p>
                                        )
                                    }
                                    {
                                        invoiceAttestations == null && loadingInvoiceAttestations == false && (
                                            <>
                                                <p>Your Weekly Membership Invoices will appear here. Pay them on time for good credit standing</p>
                                            </>
                                        )
                                    }
                                    {
                                        invoiceAttestations != null && (
                                            <>
                                                {
                                                    invoiceAttestations?.map((invoiceAttestation) => (
                                                        <Invoice 
                                                            key={invoiceAttestation._id} 
                                                            address={smartWallet?.address} 
                                                            invoiceAttestation={invoiceAttestation} 
                                                            currencyRate={currencyRate!}
                                                        />
                                                    ))
                                                }
                                            </>
                                        )
                                    }
                                </div>
                            </TabsContent>
                            <TabsContent value="receipts">
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
                        </div>
                    </Tabs>

                </div>

                
            </div>
        </main>
    )
}

/*
export function Authorized() {

    const {user} = usePrivy();
    console.log(user)
    
    const smartWallet = user?.linkedAccounts.find((account) => account.type === 'smart_wallet');
    console.log(smartWallet?.address);

    const { invoiceAttestations } = useGetInvoiceAttestations( smartWallet?.address )
    console.log(invoiceAttestations)

    
    
    
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

*/