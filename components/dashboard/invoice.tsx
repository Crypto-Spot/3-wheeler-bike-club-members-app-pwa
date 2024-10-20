import { Attestation } from "@/hooks/transactions/useGetAttestations";
import { Card } from "../ui/card";
import { unpaidUID } from "@/utils/constants/addresses";

interface InvoiceProps {
    attestation: Attestation
}
export function Invoice ({ attestation }: InvoiceProps) {
    return(
        <Card>
            <div className="flex flex-col">
                <p>week: {attestation.week}</p>
                <div>
                    {
                        attestation.UID == unpaidUID 
                        ? <p>status: Unpaid</p>
                        : <p>status: Paid</p>
                    }
                </div>
            </div>

        </Card>
    )
}