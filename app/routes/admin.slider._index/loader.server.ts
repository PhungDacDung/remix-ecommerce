
import prisma from "~/client"


export default async function loadAllSlider() {
    const sliders = await prisma.slider.findMany({});

    if (!sliders) {
        throw new Error("No have any category!");

    }
    
    return sliders;

}