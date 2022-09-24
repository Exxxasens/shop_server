export interface OrderProductDto {
    name: string;
    images: string[],
    sellPrice: number,
    buyPrice: number,
    vendorCode: string,
    reference: string;
}