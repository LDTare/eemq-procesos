"use client";
import { useRouter } from "next/navigation";

export const columns = [
  {
    accessorKey: "estado",
    header: "estado",
  },
  {
    accessorKey: "puesto_id",
    header: "puesto",
  },
  {
    accessorKey: "telefono",
    header: "telefono",
  },
  {
    accessorKey: "email",
    header: "email",
  },
  {
    accessorKey: "apellido",
    header: "apellido",
  },
  {
    accessorKey: "nombre",
    header: "nombre",
  },
  {
    id: "acciones",
    enableHiding: false,
    cell: ({ row }) => {
      const usuario = row.original;
      const router = useRouter();
      return (
        <button
          className=" rounded hover:bg-gray-700 bg-gray-500 py-1 px-2"
          onClick={() => {
            router.push("/modulos/usuarios/edit/" + usuario.id);
          }}
        >
          Ver detalles
        </button>
      );
    },
  },
];
