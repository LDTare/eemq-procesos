import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(request, {params}){
    try {
      const requisitos = await db.tbl_requisitos.findUnique({
        where: {
          id: Number(params.id),
        },
      });
      return NextResponse.json(requisitos);
    } catch (error) {
      return NextResponse.json(
        { message: error.message }, { status: 400 }
        );
    }
}

export async function DELETE(request, {params}){
    try {
      const borrarRequisito = await db.tbl_requisitos.delete({
        where: {
          id: Number(params.id),
        },
      });
      return NextResponse.json(borrarRequisito);
    } catch (error) {
      return NextResponse.json(
        { message: error.message }, { status: 400 }
        );
    }
}

export async function PUT(request, {params}){
    const data = await request.json()
    try {
        const actualizarRequisito = await db.tbl_requisitos.update({
            where: {
                id: Number(params.id),
            },
            data: {
                Nombre: data.Nombre,
                Descripcion: data.Descripcion,
            },
        });
        return NextResponse.json(actualizarRequisito)
    } catch (error) {
        return NextResponse.json(
            { message: error.message }, { status: 400 }
            );
    }
}