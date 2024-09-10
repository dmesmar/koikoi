// Selecciona todas las imágenes que pueden ser marcadas
const images = document.querySelectorAll('.selectable');
const colorPicker1 = document.getElementById('color1');
const colorPicker2 = document.getElementById('color2');
let selectedColor1 = colorPicker1.value;
let selectedColor2 = colorPicker2.value;
console.log(images)

// Combinaciones
combinacion_junk = ["enero1","enero2","febrero1","febrero2","marzo1","marzo2","abril1","abril2","mayo1","mayo2","junio1","junio2","julio1","julio2","agosto1","agosto2","septiembre1","octubre1","octubre2","noviembre1","diciembre1","diciembre2","diciembre3"];
combinacion_variedad = ["febrero4", "abril4", "mayo4", "junio4", "julio4", "agosto3", "septiembre4", "octubre4","noviembre3"];
combinacion_cintas = ["enero3", "febrero3", "marzo3", "abril3", "mayo3", "junio3","julio3", "septiembre3", "octubre3", "noviembre2"];
combinacion_cintaspoesia = ["enero3", "febrero3", "marzo3"];
combinacion_cintasazules = ["junio3", "septiembre3", "octubre3"];
combinacion_moonviewing = ["agosto4", "septiembre4"];
combinacion_cherryblossomviewing = ["agosto4", "marzo4"];
combinacion_3animales = ["octubre4", "julio4", "junio4"];
combinacion_3luces = ["enero4", "marzo4", "agosto4", "diciembre4"];
combinacion_4lucesmojadas = ["enero4", "marzo4", "agosto4", "diciembre4", "noviembre4"];
combinacion_4luces = ["enero4", "marzo4", "agosto4", "diciembre4"];
combinacion_5luces = ["enero4", "marzo4", "agosto4", "diciembre4", "noviembre4"];
combinacion_season = [];
function llenar_season(X) {
    combinacion_season = [];
    combinacion_season.push(`${X}1`);
    combinacion_season.push(`${X}2`);
    combinacion_season.push(`${X}3`);
    combinacion_season.push(`${X}4`);
}


CARTAS_JUGADOR1 = [];
CARTAS_JUGADOR2 = [];

updateSelectedColors();

function updateSelectedColors() {
    document.documentElement.style.setProperty('--selected-color-2', selectedColor1);
    document.documentElement.style.setProperty('--selected-color-1', selectedColor2);
}

colorPicker1.addEventListener('input', function() {
    selectedColor1 = this.value;
    updateSelectedColors();
});

colorPicker2.addEventListener('input', function() {
    selectedColor2 = this.value;
    updateSelectedColors();
});

// Añade un evento de clic a cada imagen
images.forEach(image => {
    image.addEventListener('click', function() {
        if (this.classList.contains('selected1')) {
            this.classList.remove('selected1');
            this.classList.add('selected2');
        } else if (this.classList.contains('selected2')) {
            this.classList.remove('selected2');
        } else {
            this.classList.add('selected1');
            console.log(this.classList)
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const tipoCheckboxes = document.querySelectorAll('#tipo-filtros input[type="checkbox"]');
    const CARTAS_JUGADOR1 = [];
    const CARTAS_JUGADOR2 = [];
    const estaciones = ["s_enero", "s_febrero", "s_marzo", "s_abril", "s_mayo", "s_junio", "s_julio", "s_agosto", "s_septiembre", "s_octubre", "s_noviembre", "s_diciembre"];

    // Variables para los botones y secciones
    const calcularButton = document.getElementById('comprobar');
    const juegoSeccion = document.getElementById('juego-seccion');
    const btnJugador1 = document.getElementById('btn-jugador1');
    const btnJugador2 = document.getElementById('btn-jugador2');
    const btnborrar = document.getElementById('btn-borrar');
    const mesSelect = document.getElementById('mes-select');
    mesSelect.value = "enero"
    
    mesSelect.addEventListener('change', () => {
        estaciones.forEach((element) => document.getElementById(element).style.display = 'none');
        var val = "s_".concat("", mesSelect.value);
        document.getElementById(val).style.display = 'block';
        llenar_season(mesSelect.value);
        console.log(combinacion_season)
    });
    // Evento para mostrar la nueva sección al iniciar el juego
    calcularButton.addEventListener('click', () => {
        if (juegoSeccion.style.display == 'block') {
            juegoSeccion.style.display = 'none';
        } else {
            juegoSeccion.style.display = 'block';
        }
         // Mostrar la sección con los botones de los jugadores
    });
    btnJugador1.addEventListener('click', () => {verJugador1()});
    btnJugador2.addEventListener('click', () => {verJugador2()});
    btnborrar.addEventListener('click', () => {borrar()});
    // Añadir eventos de búsqueda y filtrado
    searchInput.addEventListener('input', filterImages);
    tipoCheckboxes.forEach(checkbox => checkbox.addEventListener('change', filterImages));
    
    function filterImages() {
        const query = searchInput.value.toLowerCase();
        const selectedTipos = Array.from(tipoCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        const sections = document.querySelectorAll('#imagenes .mes');

        sections.forEach(section => {
            const header = section.querySelector('h3');
            const images = section.querySelectorAll('img');
            let hasVisibleImages = false;

            images.forEach(image => {
                const altText = image.alt.toLowerCase();
                const tipo = image.getAttribute('tipo');
                const matchesText = altText.includes(query);
                const matchesTipo = selectedTipos.length === 0 || selectedTipos.includes(tipo);

                if (matchesText && matchesTipo) {
                    image.style.display = '';
                    hasVisibleImages = true;
                } else {
                    image.style.display = 'none';
                }
            });

            if (hasVisibleImages) {
                section.style.display = '';
                header.style.display = '';
            } else {
                section.style.display = 'none';
                header.style.display = 'none';
            }
        });
    }

    const images = document.querySelectorAll('#imagenes img');

    images.forEach(image => {
        image.addEventListener('click', function () {
            if (this.classList.contains('selected1')) {
                this.classList.remove('selected1');
                this.classList.add('selected2');
            } else if (this.classList.contains('selected2')) {
                this.classList.remove('selected2');
            } else {
                this.classList.add('selected1'); // Seleccionar para Jugador 1 primero
            }

            updateSelectedCards();
        });
    });

    function updateSelectedCards() {
        // Limpiar los arrays de cartas seleccionadas
        CARTAS_JUGADOR1.length = 0;
        CARTAS_JUGADOR2.length = 0;

        // Recolectar las cartas seleccionadas
        images.forEach(image => {
            if (image.classList.contains('selected1')) {
                CARTAS_JUGADOR2.push(image.alt);
            } else if (image.classList.contains('selected2')) {
                CARTAS_JUGADOR1.push(image.alt);
            }
        });

        
    }

    function verJugador1() {
        console.log('Cartas Jugador 1:', CARTAS_JUGADOR1);
        const images = document.querySelectorAll('.readable');
        images.forEach(function(element) {
            element.classList.remove('green-tint');
            element.classList.remove('red-tint');
            if (CARTAS_JUGADOR1.includes(element.alt)) {
                element.classList.add('green-tint');
            }
            if (CARTAS_JUGADOR2.includes(element.alt)) {
                element.classList.add('red-tint');
            }
            
        comprobar(CARTAS_JUGADOR1, CARTAS_JUGADOR2);
    }
    );
        console.log(images)
    }
    function verJugador2() {
        console.log('Cartas Jugador 2:', CARTAS_JUGADOR2);
        const images = document.querySelectorAll('.readable');
        images.forEach(function(element) {
            element.classList.remove('green-tint');
            element.classList.remove('red-tint');
            if (CARTAS_JUGADOR2.includes(element.alt)) {
                element.classList.add('green-tint');
            }
            if (CARTAS_JUGADOR1.includes(element.alt)) {
                element.classList.add('red-tint');
            }
            
        comprobar(CARTAS_JUGADOR2, CARTAS_JUGADOR1);
        }
        );
    }
    function comprobar(C1, C2) {
        // C1 es el que se comprueba si la tiene y C2 es el que los quita
        //combinacion_junk = ["enero1","enero2","febrero1","febrero2","marzo1","marzo2","abril1","abril2","mayo1","mayo2","junio1","junio2","julio1","julio2","agosto1","agosto2","septiembre1","octubre1","octubre2","noviembre1","diciembre1","diciembre2","diciembre3"];
        MIN_JUNK = 10;
        aux1 = countMatchingElements(C1, combinacion_junk);
        aux2 = countMatchingElements(C2, combinacion_junk);
        if (aux2 < combinacion_junk.length-MIN_JUNK+1) {
            document.getElementById('junk').style.display = "block";
        } else {
            document.getElementById('junk').style.display = "none";
        }
        //combinacion_variedad = ["febrero4", "abril4", "mayo4", "junio4", "julio4", "agosto3", "septiembre4", "octubre4","noviembre3"];
        MIN_VARIEDAD = 5;
        aux1 = countMatchingElements(C1, combinacion_variedad);
        aux2 = countMatchingElements(C2, combinacion_variedad);
        if (aux2 < combinacion_variedad.length-MIN_VARIEDAD+1) {
            document.getElementById('variedad').style.display = "block";
        } else {
            document.getElementById('variedad').style.display = "none";
        }
        //combinacion_cintas = ["enero3", "febrero3", "marzo3", "abril3", "mayo3", "junio3","julio3", "septiembre3", "octubre3", "noviembre2"];
        MIN_CINTAS = 5;
        aux1 = countMatchingElements(C1, combinacion_cintas);
        aux2 = countMatchingElements(C2, combinacion_cintas);
        if (aux2 < combinacion_cintas.length-MIN_CINTAS+1) {
            document.getElementById('cintas').style.display = "block";
        } else {
            document.getElementById('cintas').style.display = "none";
        }
        
        //combinacion_cintaspoesia = ["enero3", "febrero3", "marzo3"];
        aux1 = countMatchingElements(C1, combinacion_cintaspoesia);
        aux2 = countMatchingElements(C2, combinacion_cintaspoesia);
        if (aux2 > 0) {
            document.getElementById('cintaspoesia').style.display = "none";
        } else {
            document.getElementById('cintaspoesia').style.display = "block";
        }
        //combinacion_cintasazules = ["junio3", "septiembre3", "octubre3"];
        aux1 = countMatchingElements(C1, combinacion_cintasazules);
        aux2 = countMatchingElements(C2, combinacion_cintasazules);
        if (aux2 > 0) {
            document.getElementById('cintasazules').style.display = "none";
        } else {
            document.getElementById('cintasazules').style.display = "block";
        }
        //combinacion_moonviewing = ["agosto4", "septiembre4"];
        aux1 = countMatchingElements(C1, combinacion_moonviewing);
        aux2 = countMatchingElements(C2, combinacion_moonviewing);
        if (aux2 > 0) {
            document.getElementById('moonviewing').style.display = "none";
        } else {
            document.getElementById('moonviewing').style.display = "block";
        }
        //combinacion_cherryblossomviewing = ["agosto4", "marzo4"];
        aux1 = countMatchingElements(C1, combinacion_cherryblossomviewing);
        aux2 = countMatchingElements(C2, combinacion_cherryblossomviewing);
        if (aux2 > 0) {
            document.getElementById('cherryblossomviewing').style.display = "none";
        } else {
            document.getElementById('cherryblossomviewing').style.display = "block";
        }
        //combinacion_3animales = ["octubre4", "julio4", "junio4"];
        aux1 = countMatchingElements(C1, combinacion_3animales);
        aux2 = countMatchingElements(C2, combinacion_3animales);
        if (aux2 > 0) {
            document.getElementById('3animales').style.display = "none";
        } else {
            document.getElementById('3animales').style.display = "block";
        }
        //combinacion_3luces = ["enero4", "marzo4", "agosto4", "diciembre4"];
        MIN_LUCES = 3;
        aux1 = countMatchingElements(C1, combinacion_3luces);
        aux2 = countMatchingElements(C2, combinacion_3luces);
        if (aux2 < combinacion_3luces.length-MIN_LUCES+1) {
            document.getElementById('3luces').style.display = "block";
        } else {
            document.getElementById('3luces').style.display = "none";
        }
        //combinacion_4lucesmojadas = ["enero4", "marzo4", "agosto4", "diciembre4", "noviembre4"];
        if (C2.includes("noviembre4")){
            document.getElementById('4lucesmojadas').style.display = "none";
        } else {
            MIN_LUCES = 4;
            aux1 = countMatchingElements(C1, combinacion_4lucesmojadas);
            aux2 = countMatchingElements(C2, combinacion_4lucesmojadas);
            if (aux2 < combinacion_4lucesmojadas.length-MIN_LUCES+1) {
                document.getElementById('4lucesmojadas').style.display = "block";
            } else {
                document.getElementById('4lucesmojadas').style.display = "none";
            }
        }
        //combinacion_4luces = ["enero4", "marzo4", "agosto4", "diciembre4"];
        aux1 = countMatchingElements(C1, combinacion_4luces);
        aux2 = countMatchingElements(C2, combinacion_4luces);
        if (aux2 > 0) {
            document.getElementById('4luces').style.display = "none";
        } else {
            document.getElementById('4luces').style.display = "block";
        }
        
        //combinacion_5luces = ["enero4", "marzo4", "agosto4", "diciembre4", "noviembre4"];
        aux1 = countMatchingElements(C1, combinacion_5luces);
        aux2 = countMatchingElements(C2, combinacion_5luces);
        if (aux2 > 0) {
            document.getElementById('5luces').style.display = "none";
        } else {
            document.getElementById('5luces').style.display = "block";
        }
        //combinacion_season = [];
        aux1 = countMatchingElements(C1, combinacion_season);
        aux2 = countMatchingElements(C2, combinacion_season);
        console.log(aux1)
        console.log(aux2)
        if (aux2 > 0) {
            document.getElementById("seasons").style.display = "none";
        } else {
            document.getElementById("seasons").style.display = "block";
        }

    }
    function countMatchingElements(sourceArray, targetArray) {
        return sourceArray.filter(element => targetArray.includes(element)).length;
    }
    function borrar() {
        console.log('Cartas Jugador 2:', CARTAS_JUGADOR2);
        const images = document.querySelectorAll('.readable');
        images.forEach(function(element) {
                element.classList.remove('green-tint');
                element.classList.remove('red-tint');
        }
        );
    }
});
