import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(){
   try {
     const tipotramite = await db.tbl_tipotramite.findMany();
     return NextResponse.json(tipotramite);
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
      const findTipotramite = await db.tbl_tipotramite.findUnique({
        where: {
            Nombre: data.Nombre
        },
       });
       // es una funcion para validar y verificar que ya existe un DPI con ese dato
       if(findTipotramite){
        return NextResponse.json(
            {
                message: "Nombre del tipo de trámite ya existente",
            },{status: 400}
        )
       }

       const nuevoTipotramite = await db.tbl_tipotramite.create({
        data: {
            
            Nombre: data.Nombre,
            Descripcion: data.Descripcion,
            Tiempo_estimado: data.Tiempo_estimado,
        },
    });
    return NextResponse.json(nuevoTipotramite)

    } catch (error) {
        return NextResponse.json(
        { message: error.message }, { status: 500 }
        );
    }
}