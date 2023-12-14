import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(request, {params}){
    try {
      const permisos = await db.tbl_permisos.findUnique({
        where: {
          id: Number(params.id),
        },
      });
      return NextResponse.json(permisos);
    } catch (error) {
      return NextResponse.json(
        { message: error.message }, { status: 400 }
        );
    }
}

export async function DELETE(request, {params}){
    try {
      const borrarPermiso = await db.tbl_permisos.delete({
        where: {
          id: Number(params.id),
        },
      });
      return NextResponse.json(borrarPermiso);
    } catch (error) {
      return NextResponse.json(
        { message: error.message }, { status: 400 }
        );
    }
}

export async function PUT(request, {params}){
    const data = await request.json()
    try {
        const actualizarPermiso = await db.tbl_permisos.update({
            where: {
                id: Number(params.id),
            },
            data: {
                Nombre: data.Nombre,
                Componente: data.Componente,
            },
        });
        return NextResponse.json(actualizarPermiso)
    } catch (error) {
        return NextResponse.json(
            { message: error.message }, { status: 400 }
            );
    }
}