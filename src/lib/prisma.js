import { PrismaClient } from "@prisma/client";
let prisma;

function db(){
    if (!prisma) {
        prisma = new PrismaClient();
    }
    return prisma;
}
export default db;