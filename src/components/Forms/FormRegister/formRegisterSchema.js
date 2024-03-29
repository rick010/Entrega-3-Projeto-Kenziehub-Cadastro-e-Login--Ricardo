import { z } from "zod";

export const formRegisterSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    email: z
      .string()
      .min(1, "O e-mail é obrigatório")
      .email("O e-mail é obrigatório"),
    password: z
      .string()
      .min(8, "A senha é obrigatória e precisa de no mínimo 8 caracteres")
      .regex(/(?=.*?[A-Z])/, "digite pelo menos uma letra maiúscula")
      .regex(/(?=.*?[a-z])/, "digite pelo menos uma letra minúscula")
      .regex(/(?=.*?[0-9])/, "digite pelo menos um número")
      .regex(/[^a-zA-Z 0-9]+/g, "digite pelo menos um caracter especial"),
    confirm: z
      .string()
      .min(1, "A confirmação de senha é obrigatória")
      .refine(({ password, confirm }) => password === confirm, {
        message: "As senhas precisam corresponderem",
        path: ["confirm"],
      }),
    bio: z.string().min(1, "Este campo é obrigatório"),
    contact: z.string().regex(/(?=.*?[0-9])/, "digite 11 número"),
    course_module: z.string().min(1, "Selecione um módulo"),
  
  });