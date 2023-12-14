import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(request, {params}){
    try {
      const tipotramite = await db.tbl_tipotramite.findUnique({
        where: {
          id: Number(params.id),
        },
      });
      return NextResponse.json(tipotramite);
    } catch (error) {
      return NextResponse.json(
        { message: error.message }, { status: 400 }
        );
    }
}

export async function DELETE(request, {params}){
    try {
      const borrarTipotramite = await db.tbl_tipotramite.delete({
        where: {
          id: Number(params.id),
        },
      });
      return NextResponse.json(borrarTipotramite);
    } catch (error) {
      return NextResponse.json(
        { message: error.message }, { status: 400 }
        );
    }
}

export async function PUT(request, {params}){
    const data = await request.json()
    try {
        const actualizarTipotramite = await db.tbl_tipotramite.update({
            where: {
                id: Number(params.id),
            },
            data: {
                Nombre: data.Nombre,
                Descripcion: data.Descripcion,
                Tiempo_estimado: data.Tiempo_estimado,
            },
        });
        return NextResponse.json(actualizarTipotramite)
    } catch (error) {
        return NextResponse.json(
            { message: error.message }, { status: 400 }
            );
    }
}