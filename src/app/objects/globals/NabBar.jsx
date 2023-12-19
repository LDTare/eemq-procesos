"use client";
import Link from "next/link";
import MenubarItem from "./menuItem";
import { signIn, useSession, signOut } from "next-auth/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const dropUsuarios = [
  { name: "Inicio", link: "/modulos/usuarios/dashboard" },
  { name: "Permisos", link: "/permiso/dashboard" },
  { name: "Roles", link: "/roles/dashboard" },
];

const dropDepartamentos = [
  { name: "Inicio", link: "/departamento/dashboard" },
  { name: "Puestos", link: "/areas/dashboard" },
];

const dropTramites = [
  { name: "Inicio", link: "/tramite/dashboard" },
  { name: "Solicitudes", link: "/solicitudes/dashboard" },
  { name: "Requisitos solicitud", link: "/requisitossolicitud/dashboard" },
  { name: "Requisitos", link: "/requisitos/dashboard" },
  { name: "Estados", link: "/estadotramite/dashboard" },
  { name: "Tipos de tramite", link: "/tipotramite/dashboard" },
];

const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <nav className="bg-blue-950 py-5 ">
      <div className="container mx-auto flex justify-between items-center text-white text-md font-semibold">
        <h3 className="font-bold text-xl">EEMQ Trámites</h3>

        <NavigationMenu>
          {session?.user ? (
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Inicio
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/clientes/dashboard" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Vecinos
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/actividades/dashboard" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Actividades
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <MenubarItem items={dropUsuarios} nombre={"Usuarios"} />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <MenubarItem
                  items={dropDepartamentos}
                  nombre={"Departamentos"}
                />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <MenubarItem items={dropTramites} nombre={"Trámites"} />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <button onClick={() => signOut({ callbackUrl: "/" })}>
                    Cerrar sesión
                  </button>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          ) : (
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Inicio
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <button onClick={() => signIn()}>Iniciar sesión</button>
              </NavigationMenuItem>
            </NavigationMenuList>
          )}
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default Navbar;
