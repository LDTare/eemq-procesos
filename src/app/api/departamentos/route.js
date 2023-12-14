import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(){
   try {
     const departamentos = await db.tbl_departamentos.findMany();
     return NextResponse.json(departamentos);
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
      const findDepartamento = await db.tbl_departamentos.findUnique({
        where: {
            Nombre: data.Nombre
        },
       });
       // es una funcion para validar y verificar que ya existe un DPI con ese dato
       if(findDepartamento){
        return NextResponse.json(
            {
                message: "Nombre del departamento ya existente",
            },{status: 400}
        )
       }

       const nuevoDepartamento = await db.tbl_departamentos.create({
        data: {
            
            Nombre: data.Nombre,
            Descripcion: data.Descripcion,
        },
    });
    return NextResponse.json(nuevoDepartamento)

    } catch (error) {
        return NextResponse.json(
        { message: error.message }, { status: 500 }
        );
    }
}