import { SchemaItem } from "@ethsign/sp-sdk"

export const receiptSchemaID: `0x${string}` = "0x7"
export const invoiceSchemaID: `0x${string}` = "0x6"
export const attester: `0x${string}` = "0x56aD1c5746cdFCfA1E0B7960b9A95BECb57dF6f8"
export const invoiceSchemaData: SchemaItem[] = [{"name":"Amount","type":"uint256"},{"name":"Week","type":"string"}]
export const receiptSchemaData: SchemaItem[] = [{"name":"Amount","type":"uint256"},{"name":"Week","type":"string"}, {"name":"Score","type":"uint256"}]