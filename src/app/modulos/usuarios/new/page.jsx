import { Usuariofrm } from "@/app/objects/globals/usuarios/formulario";

function crearUsuarios() {
  return (
    <div className='min-h-screen flex flex-col justify-center sm:py-12'>
      <div>
        <h2 className='font-bold text-center text-2xl mb-5 text-black'>
          Formulario de captación para datos de Usuarios
        </h2>
      </div>
      <Usuariofrm></Usuariofrm>
    </div>
  );
}

export default crearUsuarios;
