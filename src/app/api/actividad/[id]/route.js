import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(request, {params}){
    try {
      const actividad = await db.tbl_actividad.findUnique({
        where: {
          id: Number(params.id),
        },
      });
      return NextResponse.json(actividad);
    } catch (error) {
      return NextResponse.json(
        { message: error.message }, { status: 400 }
        );
    }
}

export async function DELETE(request, {params}){
    try {
      const borrarActividad = await db.tbl_actividad.delete({
        where: {
          id: Number(params.id),
        },
      });
      return NextResponse.json(borrarActividad);
    } catch (error) {
      return NextResponse.json(
        { message: error.message }, { status: 400 }
        );
    }
}

export async function PUT(request, {params}){
    const data = await request.json()
    try {
        const actualizarActividad = await db.tbl_actividad.update({
            where: {
                id: Number(params.id),
            },
            data: {
                Nombre: data.Nombre,
                Descripcion: data.Descripcion,
                Imagen: data.Imagen,
            },
        });
        return NextResponse.json(actualizarActividad)
    } catch (error) {
        return NextResponse.json(
            { message: error.message }, { status: 400 }
            );
    }
}