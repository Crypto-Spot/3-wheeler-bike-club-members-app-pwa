import { basenameSchemaID } from "@/utils/constants/addresses";
import { Avatar, Identity, Name } from "@coinbase/onchainkit/identity";
import { base } from "viem/chains";



interface DisplayBasenameProps {
    address: `0x${string}` | undefined;
}

export function Basenames({ address }: DisplayBasenameProps) {
    return (
      <Identity
        address={address}
        // @ts-expect-error/base-chain-mismatch-viem
        chain={base}
        schemaId={basenameSchemaID}
      >
        <Avatar 
          className="flex w-4 h-4" 
          address={address} 
          // @ts-expect-error/base-chain-mismatch-viem
          chain={base} 
        />
        <Name 
          address={address} 
          // @ts-expect-error/base-chain-mismatch-viem
          chain={base} />
      </Identity>
    );
  }