// Modifiable function to calculate subsidized fee
export function getSubsidizedFee(fullFee: number): number  {
    return Math.round(fullFee * 0.3 * 100) / 100;
}