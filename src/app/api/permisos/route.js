import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(){
   try {
     const permisos = await db.tbl_permisos.findMany();
     return NextResponse.json(permisos);
   } catch (error) {
     return NextResponse.json(
        { message: error.message }, { status: 500 }
        );
   }
}

export async function POST(request){
    const data = await request.json()
    try {
      // Esta variable busca en la base de datos un dato con el nombre DPI  
      const findNombre = await db.tbl_permisos.findUnique({
        where: {
            Nombre: data.Nombre
        },
       });
       // es una funcion para validar y verificar que ya existe un DPI con ese dato
       if(findNombre){
        return NextResponse.json(
            {
                message: "Nombre de permiso existente",
            },{status: 400}
        )
       }

       const nuevoPermiso = await db.tbl_permisos.create({
        data: {
            
            Nombre: data.Nombre,
            Componente: data.Componente,
        },
    });
    return NextResponse.json(nuevoPermiso)

    } catch (error) {
        return NextResponse.json(
        { message: error.message }, { status: 500 }
        );
    }
}