import z from "zod";

export const SortParser = z.union([
  z.literal(1),
  z.literal(-1),
  z.literal("asc"),
  z.literal("ascending"),
  z.literal("desc"),
  z.literal("descending"),
]);

export const QueryParamParser = z.object({
  sort: SortParser,
  limit: z.preprocess((l: unknown) => Number(l), z.number().catch(5)),
  page: z.preprocess((p: unknown) => Number(p), z.number().catch(1)),
}).transform((data) => ({
    ...data,
    skip: (data.page - 1) * data.limit
}))
