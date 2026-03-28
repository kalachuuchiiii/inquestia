import z from "zod";


export const Sort = z
  .preprocess(
    (val) => (isNaN(Number(val)) ? val : Number(val)),
    z.union([
      z.literal(1),
      z.literal(-1),
      z.literal("asc"),
      z.literal("ascending"),
      z.literal("desc"),
      z.literal("descending"),
    ])
  )
  .catch("descending");

export const Limit = z.preprocess(
  (l: unknown) => Number(l),
  z.number().positive().int().catch(5)
);
export const Page = z.preprocess(
  (p: unknown) => Number(p),
  z.number().positive().int().catch(1)
);

export const QueryParamParser = z
  .object({
    sort: Sort,
    limit: Limit,
    page: Page,
  })
  .transform((data) => ({
    ...data,
    skip: (data.page - 1) * data.limit,
  }));


  export type QueryParam = z.infer<typeof QueryParamParser>;