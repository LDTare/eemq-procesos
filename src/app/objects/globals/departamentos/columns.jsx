"use client";
import { useRouter } from "next/navigation";

export const columns = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "descripcion",
    header: "Descripción",
  },
  {
    accessorKey: "estado",
    header: "Estado",
    enableHiding: false,
    cell:({ row }) => {
      const estado = row.original;
      return (
        <p className={estado.estado = false? "text-red-500 font-semibold" : "text-green-500 font-semibold"}> { estado.estado = false? "Inactivo": "Registrado"} </p>
      )
    }
  },
  {
    id: "acciones",
    enableHiding: false,
    cell: ({ row }) => {
      const departamento = row.original;
      const router = useRouter();
      return (
        <button
          className=" rounded hover:bg-gray-700 bg-gray-500 py-1 px-2 text-slate-200"
          onClick={() => {
            router.push("/modulos/departamentos/edit/" + departamento.id);
          }}
        >
          Ver detalles
        </button>
      );
    },
  },
];
