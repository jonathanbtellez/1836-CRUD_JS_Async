import { clientServices } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]");

const obtenerInformacion = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if (id === null) {
        window.location.href = "/screens/error.html"
    }
    const nombre = document.querySelector("[data-nombre]");
    const email = document.querySelector("[data-email]");
    // espera la respuesta del servidor remplaza el then
    try {
        const perfil = await clientServices.detalleCliente(id)
        nombre.value = perfil.nombre;
        email.value = perfil.email;
    } catch (error) {
        console.log("catch error -", error)
    }
}

obtenerInformacion();

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    const nombre = document.querySelector("[data-nombre]").value;
    const email = document.querySelector("[data-email]").value;
    clientServices.actualizarCliente(nombre, email, id)
        .then(() => {
            window.location.href = "/screens/registro_completado.html"
        }).catch((err) => console.log(err));
});