import { z } from 'zod';

export const ReserveDataSchema = (data: any, currentSlug: string) => {
  const schema: Record<string, z.ZodTypeAny> = {};

  const range = () => {
    if (currentSlug == 'normal') return { min: 1, max: 4 }
    else if (currentSlug == 'family') return { min: 4, max: 15 }
    else if (currentSlug == 'vip') return { min: 1, max: 6 }
    else {
      return { min: 1, max: 4 }
    }
  }

  let min = range().min
  let max = range().max

  data.forEach((item: any) => {
    let validation: any

    switch (item) {
      case 'name':
        validation = z.string()
          .min(3, { message: 'يجب أن يحتوي الاسم 3 أحرف على الأقل' })
          .regex(/^[^\d]/, { message: 'يجب أن لايبدأ الاسم برقم' });
        break;

      case 'phone':
        validation = z
          .string()
          .regex(/^09\d{8}$/, { message: 'يجب ادخال رقم هاتف صالح وأن يبدأ ب 09' });
        break;

      case 'personsNum':
        validation = z
          .string()
          .transform((val) => Number(val)) // Convert the string to a number
          .refine((val) => val >= min, { message: `عدد الأفراد لا يمكن أن يكون أقل من ${min}` }) // Minimum value
          .refine((val) => val <= max, { message: `يجب أن لايتجاوز عدد الأفراد ${max} أشخاص` }); // Maximum value
        break;

    }


    schema[item] = validation;
  })

  return z.object(schema);
};
