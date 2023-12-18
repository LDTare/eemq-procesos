import db from "@/lib/prisma";
import Link from "next/link";
import {columns} from "@/app/objects/globals/usuarios/columns"
import { DataTable } from "@/app/objects/globals/usuarios/data-table";

let data = db();

async  function cargarUsuarios(){
    return await data.tbl_usuarios.findMany();
}

export const dynamic = 'force-dynamic'

async function usuariosDashboard(){
    const usuarios = await cargarUsuarios();

    return(
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={usuarios}></DataTable>
        </div>
    )
}
export default usuariosDashboard;