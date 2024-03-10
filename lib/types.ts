import z from 'zod';
export const CategorySchema = z.union([
  z.literal('houseplant'),
  z.literal('pot'),
  z.literal('herb'),
  z.literal('others'),
]);
export type TCategory = z.infer<typeof CategorySchema>;

export const ProductSchema = z.object({
  name: z.string().min(3),
  price: z.number().min(0),
  category: CategorySchema,
  description: z.string().max(255).optional(),
  imageUrl: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
});
export type TProduct = z.infer<typeof ProductSchema>;
