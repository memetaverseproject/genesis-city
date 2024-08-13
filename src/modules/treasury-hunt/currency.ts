import BigNumber from "bignumber.js";
import { BIG_TEN } from "../../lib/bignumber";


const currencies: any = {
    '0x0000000000000000000000000000000000000000': {
        decimals: 18
    },
    // inutap
    '0x5175ffa72649b90e1850ba355ea2788316755922': {
        decimals: 18
    },

    // siba
    '0x24024448384c8254de72ef06098808e1ed352b14': {
        decimals: 18
    },

    // usdt
    '0x397fe2cf015c9a89af79607cf3b6f943415a7841': {
        decimals: 18
    },

    // meme
    '0x68741b16564bd49948c4af1b3a73d8069ee1afc8': {
        decimals: 18
    }
}


export function getDecimals(tokenAddr: string) {
    return currencies[tokenAddr].decimals;
}

export function getBalanceAmount(amount: BigNumber, decimals: number = 18) {
    return amount.dividedBy(BIG_TEN.pow(decimals));
}

export function getDecimalAmount(amount: BigNumber, decimals: number = 18) {
    return amount.times(BIG_TEN.pow(decimals))
}