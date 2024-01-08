import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

//Funcion para obtener el listado de todos los departamentos registrados
export async function GET() {
  try {
    const departamentos = await db.tbl_departamentos.findMany();
    return NextResponse.json(departamentos);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

//Funcion para crear departamentos
export async function POST(request) {
  //Se valida la información de la petición para evitar datos duplicados
  const data = await request.json();

  //Validacion de los datos
  try {
    //Verificacion de nombre
    const findName = await db.tbl_departamentos.findFirst({
      where: {
        nombre: data.nombre,
      },
    });
    if (findName) {
      return NextResponse.json(
        {
          message: "Error, el nombre del departamento ya se encuentra en uso",
        },
        { status: 400 }
      );
    }
    //Creación del registro
    const newDepartamento = await db.tbl_departamentos.create({
      data: { ...data, estado: true },
    });

    return NextResponse.json(newDepartamento);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
