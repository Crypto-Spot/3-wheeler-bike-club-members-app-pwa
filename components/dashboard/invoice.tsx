import { OffchainInvoiceAttestation } from "@/hooks/attestations/useGetInvoiceAttestations";
import { Card } from "../ui/card";
import { useState } from "react";
import { Button } from "../ui/button";

interface InvoiceProps {
    invoiceAttestation: OffchainInvoiceAttestation
}

export function Invoice ({ invoiceAttestation }: InvoiceProps) {

    
    

    return(
        <>
            <Card className="flex justify-between">
                <div className="flex flex-col">
                    <p>week: {invoiceAttestation._id}</p>
                    <div>
                        {
                            invoiceAttestation.invoiceSchemaID 
                            ? <p>status: Unpaid {invoiceAttestation.invoiceSchemaID }</p>
                            : (
                                <>
                                    <p>status: Paid</p>
                        
                                </>
                            
                            )
                        }
                    </div>
                </div>
                <Button
                    onClick={()=>{
                        
                        //setPaying(true)
                        //doCashRampPay()
                        
                    }}
                >
                    Pay
                </Button>
            </Card>
        </>
    )
}