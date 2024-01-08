"use client";

//importaciones para formulario
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

//importaciones para comportamiento
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export function Usuariofrm() {
//Estados para almacenar los datos de un usuario
const [usuario, setUsuario] = useState({
  nombre: "",
  apellido: "",
  username: "",
  password: "",
  direccion: "",
  telefono: "",
  email: "",
  rol_id: "",
});

const router = useRouter();
const params = useParams();

const userFields = z
  .object({
    nombre: z.string().min(3, {
      message: "El nombre debe contener al menos 3 caracteres",
    }),
    apellido: z.string().min(3, {
      message: "El apellido debe contener al menos 3 caracteres",
    }),
    email: z.string().email({
      message: "Ingrese un correo electrónico válido",
    }),
    password: z
      .string()
      .min(8, {
        message: "La contraseña debe tener al menos 8 dígitos",
      })
      .regex(/^(?=.*\d)(?=.*[A-Z]).{7,}$/, {
        message: "Debe contener al menos una mayúscula y números",
      }),
    confirm: z.string(),
    telefono: z
      .string()
      .regex(/^\d*$/, {
        message: "Solo se aceptan números",
      })
      .min(8, {
        message: "No se permiten números con menos de 8 dígitos",
      }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Las contraseñas no coinciden",
    path: ["confirm"],
  });

useEffect(() => {
  if (params.id) {
    fetch("/api/restricted/usuarios/" + params.id)
      .then((res) => res.json())
      .then((data) => {
        setUsuario({
          nombre: data.nombre,
          apellido: data.apellido,
          username: data.username,
          password: data.password,
          direccion: data.direccion,
          telefono: data.telefono,
          email: data.email,
          rol_id: data.rol_id,
        });
      });
  }
});

  const form = useForm({
    resolver: zodResolver(userFields),
    defaultValues: {
      nombre: "",
      apellido: "",
    },
  });
  async function onSubmit(data) {
    if (!params.id) {
      //Crear usuario
      const res = await fetch("api/restricted/usuarios", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const msg_server = await res.json();
      console.log(msg_server);
    }
    else 
    {
      const res = await fetch("api/restricted/usuarios/" + params.id, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const msg_server = await res.json();
      console.log(msg_server);
    }
    router.refresh()
    router.push("modulos/usuarios/dashboard")
    console.log(data);
  }

  return (
    <div className="xs:p-0 mx-auto md:w-full md:max-w-md rounded">
      <div className="p-5 border bg-gray-100 w-full rounded-lg divide-y divide-gray-200">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo del empleado</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Ingrese un correo..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña del empleado</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Ingrese una contraseña..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmación de contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Ingrese una contraseña..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono del empleado</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Ingrese un número de teléfono..."
                      {...field}
                    />
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
