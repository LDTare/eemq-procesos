import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(){
   try {
     const actividad = await db.tbl_actividad.findMany();
     return NextResponse.json(actividad);
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
       const nuevaActividad = await db.tbl_actividad.create({
        data: {
            
            Nombre: data.Nombre,
            Descripcion: data.Descripcion,
            Imagen: data.Imagen,
        },
    });
    return NextResponse.json(nuevaActividad)

    } catch (error) {
        return NextResponse.json(
        { message: error.message }, { status: 500 }
        );
    }
}