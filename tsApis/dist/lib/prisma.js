import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
const { Pool } = pg;
const DATABASE = process.env.DATABASE_URL;
console.log('DATABASE_URL:', DATABASE ? "Loaded" : "Not Loaded");
if (!DATABASE) {
    throw new Error('DATABASE_URL is not defined in the enviorment variable');
}
const pool = new Pool({
    connectionString: DATABASE
});
const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });
//better connection test
export const testDatabaseConnection = async () => {
    try {
        await prisma.$queryRaw `SELECT 1`;
        console.log("Database is connected");
        return true;
    }
    catch (error) {
        console.log("connection Failed");
        return false;
    }
};
//# sourceMappingURL=prisma.js.map