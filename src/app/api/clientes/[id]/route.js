import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(request, {params}){
    try {
      const clientes = await db.tbl_clientes.findUnique({
        where: {
          id: Number(params.id),
        },
      });
      return NextResponse.json(clientes);
    } catch (error) {
      return NextResponse.json(
        { message: error.message }, { status: 400 }
        );
    }
}

export async function DELETE(request, {params}){
    try {
      const borrarCliente = await db.tbl_clientes.delete({
        where: {
          id: Number(params.id),
        },
      });
      return NextResponse.json(borrarCliente);
    } catch (error) {
      return NextResponse.json(
        { message: error.message }, { status: 400 }
        );
    }
}

export async function PUT(request, {params}){
    const data = await request.json()
    try {
        const actualizarCliente = await db.tbl_clientes.update({
            where: {
                id: Number(params.id),
            },
            data: {
                DPI: Number(data.DPI),
                Nombre: data.Nombre,
                Apellido: data.Apellido,
                Telefono: Number(data.Telefono),
                NIM: Number(data.NIM),
                Correo: data.Correo,
                NIT: Number(data.NIT),
            },
        });
        return NextResponse.json(actualizarCliente)
    } catch (error) {
        return NextResponse.json(
            { message: error.message }, { status: 400 }
            );
    }
    
}