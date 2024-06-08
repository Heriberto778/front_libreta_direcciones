# Proyecto Angular: Front_libreta_direcciones

Este es un proyecto desarrollado en Angular que consume las APIs proporcionadas por el proyecto Laravel para la gestión de contactos. A continuación, se detalla la funcionalidad, la configuración y las instrucciones para ejecutar y utilizar el proyecto.

## Funcionalidad

**Gestión de Contactos:**
  - Permite obtener, crear, editar y eliminar contactos a través de la interfaz de usuario.
  - Cada contacto puede estar asociado con números de teléfono, direcciones y correos electrónicos.
  
## Requisitos

Node.js versión 20.14.0.
npm versión 10.8.1.
Angular CLI.

## Instalación

1. **Clonar el Proyecto:**
   - Clona el proyecto desde GitHub.

     bash
     https://github.com/Heriberto778/front_libreta_direcciones.git
     
2. **Instalar Dependencias:**
   - Desde el directorio del proyecto, instala las dependencias utilizando npm.

     bash
     npm install
     

4. **Iniciar el Servidor de Desarrollo:**
   - Ejecuta el siguiente comando para iniciar el servidor de desarrollo de Angular.

     bash
     ng serve
     
   - Abre tu navegador y navega a http://localhost:4200.

## Uso

### Componentes

1. **Componente de Listado de Contactos:**
   - Muestra todos los contactos obtenidos de la API.

2. **Componente de Creación de Contactos:**
   - Formulario para crear un nuevo contacto.

3. **Componente de Edición de Contactos:**
   - Formulario para editar un contacto existente.

4. **Componente de Eliminación de Contactos:**
   - Confirmación y eliminación de un contacto.