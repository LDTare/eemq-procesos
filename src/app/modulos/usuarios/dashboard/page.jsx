import { db } from "@/lib/prisma";
import Link from "next/link";
import { columns } from "@/app/objects/globals/usuarios/columns";
import { DataTable } from "@/app/objects/globals/usuarios/data-table";

async function cargarUsuarios() {
  return await db.tbl_usuarios.findMany({
    include: {
      puestos: true,
    },
  });
}

export const dynamic = "force-dynamic";

async function usuariosDashboard() {
  const usuarios = await cargarUsuarios();

  return (
    <section className="container mx-auto py-5">
      <div className="p-5 bg-blue-950 text-white">
        <h1 className="text-center text-3xl font-bold">Usuarios registrados</h1>
        <button className="rounded bg-green-500 px-4 py-2">
          <Link href="/modulos/usuarios/new" passHref>
            Registrar un nuevo usuario
          </Link>
        </button>
      </div>
      <div className="container mx-auto py-5 border">
        <DataTable columns={columns} data={usuarios}></DataTable>
      </div>
    </section>
  );
}
export default usuariosDashboard;
