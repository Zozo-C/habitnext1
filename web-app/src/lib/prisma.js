// Placeholder Prisma client - using mock data only
// All database operations are disabled for demo mode

export const prisma = {
  user: { findMany: async () => [], findUnique: async () => null },
  assignment: { findMany: async () => [], findUnique: async () => null },
  task: { findMany: async () => [], findUnique: async () => null },
  template: { findMany: async () => [], findUnique: async () => null },
  habit: { findMany: async () => [], findUnique: async () => null },
  expert: { findMany: async () => [], findUnique: async () => null },
  aspiration: { findMany: async () => [], findUnique: async () => null },
  planCategory: { findMany: async () => [], findUnique: async () => null },
};

export default prisma;
