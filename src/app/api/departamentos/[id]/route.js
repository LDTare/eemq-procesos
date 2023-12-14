import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(request, {params}){
    try {
      const departamentos = await db.tbl_departamentos.findUnique({
        where: {
          id: Number(params.id),
        },
      });
      return NextResponse.json(departamentos);
    } catch (error) {
      return NextResponse.json(
        { message: error.message }, { status: 400 }
        );
    }
}

export async function DELETE(request, {params}){
    try {
      const borrarDepartamento = await db.tbl_departamentos.delete({
        where: {
          id: Number(params.id),
        },
      });
      return NextResponse.json(borrarDepartamento);
    } catch (error) {
      return NextResponse.json(
        { message: error.message }, { status: 400 }
        );
    }
}

export async function PUT(request, {params}){
    const data = await request.json()
    try {
        const actualizarDepartamento = await db.tbl_departamentos.update({
            where: {
                id: Number(params.id),
            },
            data: {
                Nombre: data.Nombre,
                Descripcion: data.Descripcion,
            },
        });
        return NextResponse.json(actualizarDepartamento)
    } catch (error) {
        return NextResponse.json(
            { message: error.message }, { status: 400 }
            );
    }
}