
import prisma from "~/client"


export default async function loadAllProduct() {
    const products = await prisma.product.findMany({
        include: {
            Category: true, 
          },
    });

    if (!products) {
        throw new Error("No have any product!");

    }
    
    return products;

}