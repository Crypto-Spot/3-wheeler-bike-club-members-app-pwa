import { OffchainAttestation } from "@/hooks/transactions/useGetAttestations";
import { Card } from "../ui/card";
import { unpaidUID } from "@/utils/constants/addresses";
import { useState } from "react";
import { Ramp } from "./ramp";
import { Button } from "../ui/button";
//mport { useWatchContractEvent } from "wagmi";
//import { base } from "viem/chains";
//import { erc20Abi } from "viem";
import { sendInvoiceAttestationOnchain } from "@/utils/attest/sendAttestation";
import { updateAttestationAction } from "@/app/actions/attestation/updateAttestationAction";

//import { getInvoiceAttestationOnchain } from "@/utils/attest/getAttestation";
//import { Attestation } from "@ethereum-attestation-service/eas-sdk";

interface InvoiceProps {
    attestation: OffchainAttestation
}
export function Invoice ({ attestation }: InvoiceProps) {

    const [openCashRamp, setOpenCashRamp] = useState<boolean>(false)
    //const [paying, setPaying] = useState<boolean>(false)
    //const [reference, setReference] = useState<string | null>(null)
    //const [onchainAttest, setOnchainAttest] = useState<Attestation | null>(null)
/*
    const doCashRampPay = () => {
        
        setOpenCashRamp(true)
        const ref = attestation._id
        setReference(ref)

    }
*/
    async function dooAll(value: bigint | undefined) {
        // make onchain attestation
        const timestampNow = Date.now();
        const tx = await sendInvoiceAttestationOnchain(attestation.address as `0x${string}`, value!, attestation.week, 7, timestampNow)
        // update offchain attestation
        if (tx) {
            updateAttestationAction(attestation._id, tx)
        }
       // const res = await getInvoiceAttestationOnchain(attestation.UID)
        //setOnchainAttest(res)
        //setPaying(false)
        // send ussdc to treasury wallet/splitter(90/10) 
            
    }
    /*
    useWatchContractEvent({
        address: USDC,
        chainId: 8453,
        abi: erc20Abi,
        eventName: "Transfer",
        args: {
            to: attestation.address as `0x${string}`
            
        },
        onLogs(logs)  {
            console.log('New logs!', logs[0].args.value)
            dooAll(logs[0].args.value)
        },
    })
    */

    return(
        <>
            <Card className="flex justify-between">
                <div className="flex flex-col">
                    <p>week: {attestation.week}</p>
                    <div>
                        {
                            attestation.UID == unpaidUID 
                            ? <p>status: Unpaid</p>
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
                        dooAll(BigInt(1000))
                        
                    }}
                >
                    Pay
                </Button>
            </Card>
            {openCashRamp && <Ramp setOpenRamp={setOpenCashRamp} paymentType="deposit" address={attestation?.address as `0x${string}`} reference={"reference"} />}
        </>
    )
}