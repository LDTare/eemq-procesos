import { db } from "@/lib/prisma";
import Link from "next/link";
import { DataTable } from "@/app/objects/globals/usuarios/data-table";
import { columns } from "@/app/objects/globals/departamentos/columns";

async function cargarDepartamentos() {
  return await db.tbl_departamentos.findMany();
}

export const dynamic = "force-dynamic";

async function departamentosDashboard(){
    const departamentos = await cargarDepartamentos();

    return(
        <section className="container mx-auto py-5">
      <div className="p-5 bg-blue-950 text-white">
        <h1 className="text-center text-3xl font-bold">Departamentos registrados</h1>
        <button className="rounded bg-green-500 px-4 py-2">
          <Link href="/modulos/departamentos/new" passHref>
            Registrar un nuevo departamento
          </Link>
        </button>
      </div>
      <div className="container mx-auto py-5 border">
        <DataTable columns={columns} data={departamentos}></DataTable>
      </div>
    </section>
    )
}
export default departamentosDashboard;