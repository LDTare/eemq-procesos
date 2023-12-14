import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(){
   try {
     const requisitos = await db.tbl_requisitos.findMany();
     return NextResponse.json(requisitos);
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
      const findRequisito = await db.tbl_requisitos.findUnique({
        where: {
            Nombre: data.Nombre
        },
       });
       // es una funcion para validar y verificar que ya existe un DPI con ese dato
       if(findRequisito){
        return NextResponse.json(
            {
                message: "Nombre del requisito ya existente",
            },{status: 400}
        )
       }

       const nuevoRequisito = await db.tbl_requisitos.create({
        data: {
            
            Nombre: data.Nombre,
            Descripcion: data.Descripcion,
        },
    });
    return NextResponse.json(nuevoRequisito)

    } catch (error) {
        return NextResponse.json(
        { message: error.message }, { status: 500 }
        );
    }
}