import { useMutation } from '@tanstack/react-query';
import type { RegisterSchema } from '../../schemas/register-schema';
import { supabase } from '../../../config/supabase-client';

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterSchema) => {
      const { email, password, firstName, lastName } = data;

      const { error, data: result } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { firstName, lastName },
        },
      });

      if (error) throw error;

      return result;
    },
  });
};
