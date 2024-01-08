import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import bcrypt from "bcrypt";

//Funcion para obtener el listado de todos los usuarios registrados
export async function GET() {
  try {
    const usuarios = await db.tbl_usuarios.findMany();
    return NextResponse.json(usuarios);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

//Funcion para crear usuarios
export async function POST(request) {
  const data = await request.json();

  //Validación de los datos contenidos en la solicitud de creación
  try {
    //Verificación de email
    const findEmail = await db.tbl_usuarios.findUnique({
      where: {
        email: data.email,
      },
    });
    if (findEmail) {
      return NextResponse.json(
        {
          message:
            "El correo electrónico ya está registrado en nuestra base de datos.",
        },
        { status: 400 }
      );
    }

    //Verificacion par ael nombre de usuario
    const findUsername = await db.tbl_usuarios.findFirst({
      where: {
        username: data.username,
      },
    });
    if (findUsername) {
      return NextResponse.json(
        {
          message:
            "Error, parece que alguien más ya está utilizando el nombre de usuario.",
        },
        { status: 400 }
      );
    }

    //Cifrado de contraseña
    const hashPassword = await bcrypt.hash(data.password, 10);

    //Creación de nuevo usuario
    const newUser = await db.tbl_usuarios.create({
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

    return NextResponse.json(
      { message: "Usuario creado correctamente" },
      { status: 200 }
    );

    //Mensaje de error en caso de inconvenientes con el cliente de la base de datos
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
