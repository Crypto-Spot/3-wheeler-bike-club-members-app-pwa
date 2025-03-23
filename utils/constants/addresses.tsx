import { SchemaItem } from "@ethsign/sp-sdk"

export const attester: `0x${string}` = "0x56aD1c5746cdFCfA1E0B7960b9A95BECb57dF6f8"
export const memberBadgeSchemaID: `0x${string}` = "0x253d"
export const memberReceiptSchemaID: `0x${string}` = "0x254e"
export const memberCreditScoreSchemaID: `0x${string}` = "0x2551"
export const hirePurchaseReceiptSchemaID: `0x${string}` = "0x256a"
export const hirePurchaseCreditScoreSchemaID: `0x${string}` = "0x256f"



export const memberInvoiceSchemaData: SchemaItem[] = [{"name":"amount","type":"uint256"},{"name":"week","type":"string"}]
export const memberReceiptSchemaData: SchemaItem[] = [{"name":"amount","type":"uint256"},{"name":"currency","type":"string"},{"name":"week","type":"string"}, {"name":"score","type":"uint256"}]
export const hirePurchaseReceiptSchemaData: SchemaItem[] = [{"name":"amount","type":"uint256"},{"name":"currency","type":"string"},{"name":"week","type":"string"}, {"name":"score","type":"uint256"}]