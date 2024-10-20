
import { ethers } from "ethers";


export const provider = ethers.getDefaultProvider("base");
export const signer = new ethers.Wallet(process.env.ATTEST_PRIVATE_KEY, provider);


