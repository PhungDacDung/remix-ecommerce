import prisma from "~/client";

export type User = {
    id: number; // hoặc number, tùy theo kiểu dữ liệu bạn định nghĩa
    name:string;
    email: string;
    password: string;
    
};

export async function getUserById(userId:number) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    // Kiểm tra nếu không tìm thấy người dùng
    if (!user) {
        throw new Error("User not found");
    }

    return user;
}