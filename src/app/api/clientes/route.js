import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET(){
   try {
     const clientes = await db.tbl_clientes.findMany();
     return NextResponse.json(clientes);
   } catch (error) {
     return NextResponse.json(
        { message: error.message }, { status: 500 }
        );
   }
}

export async function POST(request){
    const data = await request.json()
    try {
      // Esta variable busca en la base de datos un dato con el nombre DPI  
      const findDPI = await db.tbl_clientes.findUnique({
        where: {
            DPI: data.DPI
        },
       });
       // es una funcion para validar y verificar que ya existe un DPI con ese dato
       if(findDPI){
        return NextResponse.json(
            {
                message: "DPI existente",
            },{status: 400}
        )
       }
       // Esta variable busca en la base de datos un dato con el nombre Correo 
       const findCORREO = await db.tbl_clientes.findUnique({
        where: {
            Correo: data.Correo
        },
       });
       // es una funcion para validar y verificar que ya existe un Correo con ese dato
       if(findCORREO){
        return NextResponse.json(
            {
                message: "Correo existente",
            },{status: 400}
        )
       }
       // Esta variable busca en la base de datos un dato con el nombre NIM 
       const findNIM = await db.tbl_clientes.findUnique({
        where: {
            NIM: data.NIM
        },
       });
       // es una funcion para validar y verificar que ya existe un NIM con ese dato
       if(findNIM){
        return NextResponse.json(
            {
                message: "NIM existente",
            },{status: 400}
        )
       }
       // Esta variable busca en la base de datos un dato con el nombre NIT 
       const findNIT = await db.tbl_clientes.findUnique({
        where: {
            NIT: data.NIT
        },
       });
       // es una funcion para validar y verificar que ya existe un NIT con ese dato
       if(findNIT){
        return NextResponse.json(
            {
                message: "NIT existente",
            },{status: 400}
        )
       }

       const nuevoCliente = await db.tbl_clientes.create({
        data: {
            DPI: Number(data.DPI),
            Nombre: data.Nombre,
            Apellido: data.Apellido,
            Correo: data.Correo,
            Telefono: Number(data.Telefono),
            NIM: Number(data.NIM),
            NIT: Number(data.NIT),
        },
    });
    return NextResponse.json(nuevoCliente)

    } catch (error) {
        return NextResponse.json(
        { message: error.message }, { status: 500 }
        );
    }
}