import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const itemsRouter = createTRPCRouter({
  list: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.item.findMany();
  }),
  get: publicProcedure
    .input(z.object({ itemId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.item.findUnique({
        where: {
          id: input.itemId,
        },
      });
    }),
  getMessage: protectedProcedure.query(async ({ input, ctx }) => {
    const userId = ctx.auth.userId;
    const listing = await ctx.prisma.listing.findMany({
      where: {
        userId,
      },
      include: {
        message: true,
      },
    });
    return listing.flatMap((item) => item.message);
  }),
  sendMessage: protectedProcedure
    .input(z.object({ message: z.string(), listingId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const fromUser = await clerkClient.users.getUser(ctx.auth.userId);

      const message = await ctx.prisma.message.create({
        data: {
          fromUser: ctx.auth.userId,
          fromUserName: fromUser.username ?? "unknown",
          listingId: input.listingId,
          message: input.message,
        },
      });
      return message;
    }),
  create: protectedProcedure
    .input(
      z.object({ name: z.string(), description: z.string(), price: z.number() })
    )
    .mutation(async ({ input, ctx }) => {
      const item = await ctx.prisma.item.create({
        data: {
          ...input,
        },
      });
      return item;
    }),
});
