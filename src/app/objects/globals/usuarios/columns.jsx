"use client";
import { useRouter } from "next/navigation";

export const columns = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "apellido",
    header: "Apellido",
  },
  {
    accessorKey: "puesto_id",
    header: "Puesto",
    enableHiding: false,
    cell: ({row}) => {
      const rol = row.original;
      return(
        <p>{rol.puestos.nombre}</p>
      )
    }
  },
  {
    accessorKey: "telefono",
    header: "Telefono",
  },
  {
    accessorKey: "email",
    header: "E-mail",
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
      const usuario = row.original;
      const router = useRouter();
      return (
        <button
          className=" rounded hover:bg-gray-700 bg-gray-500 py-1 px-2 text-slate-200"
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
