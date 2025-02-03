
import prisma from "~/client"


export default async function loadCategory() {
    const category = await prisma.category.findMany({});
    if (!category) {
        throw new Error("No have any category!");

    }
    return category;
}