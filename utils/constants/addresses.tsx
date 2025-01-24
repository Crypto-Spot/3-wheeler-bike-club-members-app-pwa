import { SchemaItem } from "@ethsign/sp-sdk"


export const memberReceiptSchemaID: `0x${string}` = "0xa"
export const attester: `0x${string}` = "0x56aD1c5746cdFCfA1E0B7960b9A95BECb57dF6f8"
export const memberInvoiceSchemaData: SchemaItem[] = [{"name":"amount","type":"uint256"},{"name":"week","type":"string"}]
export const memberReceiptSchemaData: SchemaItem[] = [{"name":"amount","type":"uint256"},{"name":"currency","type":"string"},{"name":"week","type":"string"}, {"name":"score","type":"uint256"}]