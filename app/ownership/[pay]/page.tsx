import { Wrapper } from "@/components/ownership/pay/wrapper";

export default function Pay({ params }: { params: { pay: string } }) {
    return (
        <div>
            <Wrapper reference={params.pay} />
        </div>
    )
}
