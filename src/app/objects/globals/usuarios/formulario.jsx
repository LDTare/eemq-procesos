"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const userFields = z.object({
  nombre: z.string().min(3, {
    message: "El nombre debe contener almenos 3 caracteres",
  }),
  apellido: z.string().min(3, {
    message: "El apellido debe contener almenos 3 caracteres",
  }),
  email: z.string().email({
    message: "Ingrese un correo electronico valido",
  }),
  password: z
    .string()
    .min(8, {
      message: "La contraseña debe tener al menos 8 digitos",
    })
    .regex(/^(?=.*\d)(?=.*[A-Z]).{7,}$/, {
      message: "Debe contener al menos una mayuscula y numeros",
    }),
  telefono: z.number().lt(8, {
    message: "No se permiten numeros con mas de 9 digitos",
  }),
});

export function Usuariofrm() {
  const form = useForm({
    resolver: zodResolver(userFields),
    defaultValues: {
      nombre: "",
    },
  });
  function onSubmit(data) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(data);
  }

  return (
    <div className="xs:p-0 mx-auto md:w-full md:max-w-md rounded">
      <div className="p-5 border bg-gray-100 w-full rounded-lg divide-y divide-gray-200">
        <Form {...form}>
          <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del empleado</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese un nombre..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apellido"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido del empleado</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese un apellido..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Crear nuevo usuario</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
