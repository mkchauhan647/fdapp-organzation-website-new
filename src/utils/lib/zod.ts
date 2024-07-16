import {z , ZodTypeAny} from "zod";

export default class Zod{
  static parse = <T>(
    schema: z.ZodObject<any, "strip", z.ZodTypeAny, object, object>,
    data: T
  ) => schema.parse(data)

}