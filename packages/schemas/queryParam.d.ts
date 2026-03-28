import z from "zod";
export declare const SortParser: z.ZodCatch<z.ZodUnion<readonly [z.ZodLiteral<1>, z.ZodLiteral<-1>, z.ZodLiteral<"asc">, z.ZodLiteral<"ascending">, z.ZodLiteral<"desc">, z.ZodLiteral<"descending">]>>;
export declare const QueryParamParser: z.ZodPipe<z.ZodObject<{
    sort: z.ZodCatch<z.ZodUnion<readonly [z.ZodLiteral<1>, z.ZodLiteral<-1>, z.ZodLiteral<"asc">, z.ZodLiteral<"ascending">, z.ZodLiteral<"desc">, z.ZodLiteral<"descending">]>>;
    limit: z.ZodPipe<z.ZodTransform<number, unknown>, z.ZodCatch<z.ZodNumber>>;
    page: z.ZodPipe<z.ZodTransform<number, unknown>, z.ZodCatch<z.ZodNumber>>;
}, z.core.$strip>, z.ZodTransform<{
    skip: number;
    sort: 1 | -1 | "asc" | "ascending" | "desc" | "descending";
    limit: number;
    page: number;
}, {
    sort: 1 | -1 | "asc" | "ascending" | "desc" | "descending";
    limit: number;
    page: number;
}>>;
export type QueryParam = z.infer<typeof QueryParamParser>;
