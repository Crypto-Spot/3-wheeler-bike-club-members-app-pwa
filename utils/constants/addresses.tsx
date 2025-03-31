import { SchemaItem } from "@ethsign/sp-sdk"

export const attester: `0x${string}` = process.env.ATTESTER as `0x${string}`
export const memberBadgeSchemaID: `0x${string}` = process.env.MEMBER_BADGE_SCHEMA_ID as `0x${string}`
export const memberReceiptSchemaID: `0x${string}` = process.env.MEMBER_RECEIPT_SCHEMA_ID as `0x${string}`
export const memberCreditScoreSchemaID: `0x${string}` = process.env.MEMBER_CREDIT_SCORE_SCHEMA_ID as `0x${string}`
export const hirePurchaseReceiptSchemaID: `0x${string}` = process.env.HIRE_PURCHASE_RECEIPT_SCHEMA_ID as `0x${string}`
export const hirePurchaseCreditScoreSchemaID: `0x${string}` = process.env.HIRE_PURCHASE_CREDIT_SCORE_SCHEMA_ID as `0x${string}`



export const memberInvoiceSchemaData: SchemaItem[] = [{"name":"amount","type":"uint256"},{"name":"week","type":"string"}]
export const memberReceiptSchemaData: SchemaItem[] = [{"name":"amount","type":"uint256"},{"name":"currency","type":"string"},{"name":"week","type":"string"}, {"name":"score","type":"uint256"}]
export const hirePurchaseReceiptSchemaData: SchemaItem[] = [{"name":"amount","type":"uint256"},{"name":"currency","type":"string"},{"name":"week","type":"string"}, {"name":"score","type":"uint256"}]