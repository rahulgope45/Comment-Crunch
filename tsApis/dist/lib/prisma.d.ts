import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
export declare const prisma: PrismaClient<{
    adapter: PrismaPg;
}, never, import("@prisma/client/runtime/client").DefaultArgs>;
export declare const testDatabaseConnection: () => Promise<boolean>;
//# sourceMappingURL=prisma.d.ts.map