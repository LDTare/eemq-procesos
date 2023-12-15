import { NextResponse } from "next/server";
import db from "@/lib/prisma";
import bcrypt from "bcrypt";

let data_db = db();

//Función para obtener la información de un solo usuario
export async function GET(request, { params }) {
  try {
    const usuario = await data_db.tbl_usuarios.findUnique({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(usuario);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

//Función para eliminar un usuario
export async function DELETE(request, { params }) {
  try {
    const borrarUsuario = data_db.tbl_usuarios.delete({
      where: {
        id: Number(params.id),
      },
    });
    if (!borrarUsuario)
      return NextResponse.json(
        { message: "Error inesparado al eliminar el registro" },
        { status: 400 }
      );
    //Retornamos una respuesta con el mensaje y código HTTP correspondiente a la operación realizada
    return NextResponse.json(
      { message: "Registro Eliminado Correctamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

//Función para actualizar un usuario
export async function PUT(request, { params }) {
  const data = await request.json();

  try {
    const hashPassword = await bcrypt.hash(data.password, 10);

    const actualizarUsuario = await data_db.tbl_usuarios.update({
      where: {
        id: Number(params.id),
      },
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        username: data.username,
        password: hashPassword,
        direccion: data.direccion,
        telefono: Number(data.telefono),
        puesto_id: Number(data.puesto_id),
        email: data.email,
      },
    });

    if (!actualizarUsuario)
      return NextResponse.json(
        { message: "Error al actualizar el registro" },
        { status: 400 }
      );

    //Retornamos una respuesta con el mensaje y código HTTP correspondiente a la operación realizada
    return NextResponse.json(
      { message: "Registro actualizado con exito" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
