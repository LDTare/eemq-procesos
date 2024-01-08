import { Departamentofrm } from "@/app/objects/globals/departamentos/formulario";

function crearDepartamentos() {
  return (
    <div className="min-h-screen flex flex-col justify-center sm:py-12">
      <div>
        <h2 className="font-bold text-center text-2xl mb-5 text-black">
          Formulario de captación para datos de departamentos
        </h2>
      </div>
      <Departamentofrm/>
    </div>
  );
}

export default crearDepartamentos;