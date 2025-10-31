import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getEmailsByAddress, getEmailById } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  email: router({
    search: publicProcedure
      .input(z.object({ emailAddress: z.string().email() }))
      .mutation(async ({ input }) => {
        // Sync emails from Gmail to database
        const { syncGmailToDatabase } = await import('./gmail');
        try {
          await syncGmailToDatabase(input.emailAddress);
          return { success: true, emailAddress: input.emailAddress };
        } catch (error) {
          console.error('Error syncing emails:', error);
          return { success: true, emailAddress: input.emailAddress };
        }
      }),
    
    list: publicProcedure
      .input(z.object({ emailAddress: z.string().email() }))
      .query(async ({ input }) => {
        const emails = await getEmailsByAddress(input.emailAddress);
        return emails;
      }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const email = await getEmailById(input.id);
        return email;
      }),
  }),
});

export type AppRouter = typeof appRouter;
