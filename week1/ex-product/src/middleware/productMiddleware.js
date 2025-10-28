import yup from 'yup';

export const productSchema = yup.object({
  id: yup.number().integer().positive().required(),
  name: yup.string().min(3).max(255).required(),
  price: yup.number().positive().required(),
  description: yup.string().min(3).max(1000).required(),
  product: yup.string().min(2).max(100).required(),
  color: yup.string().min(2).max(50).required(),
  image: yup.string().required(),
});

export const productUpdateSchema = productSchema.deepPartial();
