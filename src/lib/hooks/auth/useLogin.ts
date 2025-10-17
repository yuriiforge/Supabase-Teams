import { useMutation } from '@tanstack/react-query';
import { type LoginSchema } from '../../schemas/login-schema';
import { supabase } from '../../../config/supabase-client';

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }: LoginSchema) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw new Error(error.message);
      return data;
    },
  });
};
