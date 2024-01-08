import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

//Funcion para obtener la información de un solo departamento
export async function GET(request, { params }) {
  try {
    const departamento = await db.tbl_departamentos.findUnique({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(departamento);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

//Funcion para eliminar un departamento
export async function DELETE(request, { params }) {
  try {
    const borrarDepartamento = db.tbl_departamentos.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!borrarDepartamento)
      return NextResponse.json(
        { message: "No se ha podido eliminar el departamento" },
        { status: 400 }
      );
    return NextResponse.json(
      { message: "Registro eliminado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

//Funcion para actualizar un departamento
export async function PUT(request, { params }) {
  const data = await request.json();
  try {
    const actualizarDepartamento = await db.tbl_departamentos.update({
      where: {
        id: Number(params.id),
      },
      data: {
        ...data,
      },
    });

    if (!actualizarDepartamento)
      return NextResponse.json(
        { message: "Error al actualizar el departamento" },
        { status: 400 }
      );
    return NextResponse.json(
      { message: "Registro actualizado con exito" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
