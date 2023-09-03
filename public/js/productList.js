const selectElement = document.getElementById('miSelect');



// Define un objeto que mapea las opciones a las rutas correspondientes
const optionRoutes = {
    "Todos": "",                  // Ruta para "Todos"
    "Yoga": "/product/productListYoga",   // Ruta para "Yoga"
    "Fitness": "/product/productListFitness", // Ruta para "Fitness"
    "Danzas": "/product/productListDanzas",   // Ruta para "Danzas"
    "Deportes": "/product/productListDeportes" // Ruta para "Deportes"
};

// Agrega un evento de cambio al select
selectElement.addEventListener('change', function() {
    const selectedOption = this.options[this.selectedIndex];
    const optionText = selectedOption.textContent;

    // Obtiene la ruta correspondiente desde el objeto de mapeo
    const route = optionRoutes[optionText];

    // Redirige a la página correspondiente cuando se selecciona una opción
    if (route) {
        // Agrega la ruta base de tu sitio web antes de la ruta específica
        const baseUrl = "http://localhost:3000"; // Cambia esto según tu configuración
        window.location.href = baseUrl + route;
    }
});