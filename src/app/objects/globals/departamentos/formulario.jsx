"use client";

//importaciones para el formulario
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

export function Departamentofrm() {
//Estados de almacenamiento para los deparamentos
const [departamento, setDepartamento] = useState({
  nombre: "",
  descripcion: "",
});

//Router para redirecciones
const router = useRouter();
const params = useParams();

//Reglas para el formulario
const depaFields = z.object({
  nombre: z.string().min(3).max(50),
  descripcion: z.string().optional(),
});

//Carga de información de la BD
useEffect(() => {
  if (params.id) {
    fetch("/api/restricted/departamentos/" + params.id)
      .then((res) => res.json())
      .then((data) => {
        setDepartamento(data);
      });
  }
});


  const form = useForm({
    resolver: zodResolver(depaFields),
    defaultValues: {
      nombre: "",
      descripcion: "",
    },
  });

  async function onSubmit(data) {
    if (!params.id) {
      //Crear departamento
      const res = await fetch("/api/restricted/departamentos", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const msg_server = await res.json();
      console.log(msg_server);
    } else {
      const res = await fetch("api/restricted/departamentos/" + params.id, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const msg_server = await res.json();
      console.log(msg_server);
    }
    router.refresh();
    router.push("/modulos/departamentos/dashboard");
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
                  <FormLabel> Nombre del departamento </FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese un nombre..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Descripción del departamento </FormLabel>
                  <FormControl>
                    <Input type="textfield" placeholder="Ingrese una descripcion..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <Button type="submit">Crear Departamento</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
