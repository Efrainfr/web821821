document.addEventListener("DOMContentLoaded", () => {
    // Base de datos de los artículos sobre God of War
    const datosArticulos = {
        "La Evolución de Kratos: De Esparta a Midgard": {
            categoria: "Personajes",
            tiempo: "Lectura: 5 min",
            cuerpo: "Kratos pasó de ser un guerrero dominado por la rabia ciega en Grecia a convertirse en un mentor paciente y reservado en el mundo nórdico. Aprende a controlar su fuerza no por debilidad, sino para no condenar a su hijo Atreus al mismo ciclo trágico.",
            relacionados: ["Atreus y la Profecía de Loki", "Mitología Griega vs Nórdica"]
        },
        "Atreus y la Profecía de Loki": {
            categoria: "Personajes",
            tiempo: "Lectura: 4 min",
            cuerpo: "Atreus representa el equilibrio entre dos mundos: la herencia divina/mortal de su padre y el origen de gigante (Jötunn) de su madre Faye. Su destino está intrínsecamente ligado al Ragnarök y a la búsqueda de la verdad.",
            relacionados: ["El Destino de Faye", "La Evolución de Kratos: De Esparta a Midgard"]
        },
        "Mitología Griega vs Nórdica": {
            categoria: "Mitología",
            tiempo: "Lectura: 6 min",
            cuerpo: "Mientras el Olimpo destacaba por su arquitectura monumental y dioses regidos por el orgullo, los Nueve Reinos presentan un entorno salvaje, donde los dioses Ases imponen su poder mediante el engaño y el miedo.",
            relacionados: ["La Traición de Odín", "La Evolución de Kratos: De Esparta a Midgard"]
        },
        "El Destino de Faye": {
            categoria: "Historia",
            tiempo: "Lectura: 4 min",
            cuerpo: "Laufey la Justa previó cada paso del viaje de Kratos y Atreus. Dejó marcados los árboles del bosque encantado para obligar a Kratos a salir de su escondite y cumplir la profecía grabada en Jötunheim.",
            relacionados: ["Atreus y la Profecía de Loki", "La Traición de Odín"]
        },
        "La Traición de Odín": {
            categoria: "Historia",
            tiempo: "Lectura: 5 min",
            cuerpo: "A diferencia del poder frontal de Zeus, Odín opera como un manipulador brillante. Busca incansablemente el conocimiento oculto en la grieta de la creación para controlar el destino de toda la existencia.",
            relacionados: ["Mitología Griega vs Nórdica", "El Destino de Faye"]
        }
    };

    // Navegación Sidebar
    const navLinks = document.querySelectorAll(".nav-link");
    const secciones = document.querySelectorAll("main section");

    function cambiarSeccion(targetId) {
        navLinks.forEach(l => l.classList.remove("activo"));
        secciones.forEach(s => s.classList.remove("seccion-activa"));

        const enlaceActivo = document.querySelector(`.nav-link[data-seccion="${targetId}"]`);
        if (enlaceActivo) enlaceActivo.classList.add("activo");

        const seccionObjetivo = document.getElementById(targetId);
        if (seccionObjetivo) seccionObjetivo.classList.add("seccion-activa");
    }

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            cambiarSeccion(link.getAttribute("data-seccion"));
        });
    });

    // Modo Oscuro / Claro
    const btnModoOscuro = document.getElementById("btn-modo-oscuro");
    btnModoOscuro.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        const esClaro = document.body.classList.contains("light-mode");
        btnModoOscuro.textContent = esClaro ? "Tema Espartano" : "Tema Nórdico";
    });

    // Contador de Visitas
    const numeroVisitas = document.getElementById("numero-visitas");
    let visitas = localStorage.getItem("visitas_gow") || 120;
    visitas++;
    localStorage.setItem("visitas_gow", visitas);
    if (numeroVisitas) numeroVisitas.textContent = visitas;

    // Saludo Dinámico
    const saludoEl = document.getElementById("saludo-dinamico");
    const hora = new Date().getHours();
    let saludo = "Bienvenido, guerrero";
    if (hora < 12) saludo = "Que las runas te guíen esta mañana";
    else if (hora < 19) saludo = "Prepara tus armas esta tarde";
    else saludo = "La noche cae sobre Midgard";
    if (saludoEl) saludoEl.textContent = `${saludo}. Explora el universo de God of War.`;

    // Animación Contadores
    const statNumeros = document.querySelectorAll(".stat-numero");
    statNumeros.forEach(num => {
        const target = +num.getAttribute("data-target");
        let count = 0;
        const step = Math.ceil(target / 30);
        const timer = setInterval(() => {
            count += step;
            if (count >= target) {
                num.textContent = target;
                clearInterval(timer);
            } else {
                num.textContent = count;
            }
        }, 30);
    });

    // Vista de Artículos Detallados
    const vistaArticulo = document.getElementById("vista-articulo");
    const gridArticulos = document.getElementById("contenedor-articulos-grid");
    const btnVolver = document.getElementById("btn-volver");

    function abrirArticulo(titulo) {
        const articulo = datosArticulos[titulo];
        if (!articulo) return;

        document.getElementById("articulo-titulo").textContent = titulo;
        document.getElementById("articulo-categoria").textContent = articulo.categoria;
        document.getElementById("articulo-tiempo").textContent = articulo.tiempo;
        document.getElementById("articulo-cuerpo").textContent = articulo.cuerpo;

        const ulRel = document.getElementById("articulo-relacionados");
        ulRel.innerHTML = "";
        articulo.relacionados.forEach(rel => {
            const li = document.createElement("li");
            li.style.cursor = "pointer";
            li.style.color = "var(--accent-color)";
            li.style.marginBottom = "0.3rem";
            li.textContent = `• ${rel}`;
            li.addEventListener("click", () => abrirArticulo(rel));
            ulRel.appendChild(li);
        });

        cambiarSeccion("seccion-articulos");
        gridArticulos.style.display = "none";
        document.querySelector(".buscador-contenedor").style.display = "none";
        document.querySelector(".filtros-noticias").style.display = "none";
        vistaArticulo.style.display = "block";
    }

    document.querySelectorAll(".tarjeta-lectura, .tarjeta-dash").forEach(elem => {
        elem.addEventListener("click", () => {
            const titulo = elem.getAttribute("data-articulo");
            if (titulo) abrirArticulo(titulo);
        });
    });

    if (btnVolver) {
        btnVolver.addEventListener("click", () => {
            vistaArticulo.style.display = "none";
            gridArticulos.style.display = "grid";
            document.querySelector(".buscador-contenedor").style.display = "block";
            document.querySelector(".filtros-noticias").style.display = "flex";
        });
    }

    // Buscador y Filtros
    const buscador = document.getElementById("buscador-articulos");
    const filtroBtns = document.querySelectorAll(".btn-filtro");
    const articulos = document.querySelectorAll("#contenedor-articulos-grid article");

    function filtrarArticulos() {
        const texto = buscador.value.toLowerCase();
        const categoriaActiva = document.querySelector(".btn-filtro.active").getAttribute("data-categoria");

        articulos.forEach(art => {
            const coincideTexto = art.textContent.toLowerCase().includes(texto);
            const coincideCat = categoriaActiva === "todas" || art.getAttribute("data-categoria") === categoriaActiva;

            art.style.display = (coincideTexto && coincideCat) ? "block" : "none";
        });
    }

    if (buscador) buscador.addEventListener("input", filtrarArticulos);

    filtroBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filtroBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            filtrarArticulos();
        });
    });

    // Reproductor de Música
    const tarjetasMusica = document.querySelectorAll(".tarjeta-musica.interactiva");
    const audioPlayer = document.getElementById("audio-player");
    const cancionActivaTitulo = document.getElementById("cancion-activa-titulo");

    tarjetasMusica.forEach(tarjeta => {
        tarjeta.addEventListener("click", () => {
            const fuenteAudio = tarjeta.getAttribute("data-src");
            const tituloCancion = tarjeta.getAttribute("data-titulo");

            tarjetasMusica.forEach(t => t.classList.remove("sonando"));

            if (audioPlayer && fuenteAudio) {
                audioPlayer.src = fuenteAudio;
                audioPlayer.play();
                cancionActivaTitulo.textContent = tituloCancion;
                tarjeta.classList.add("sonando");
            }
        });
    });

    // Quiz del Lore (5 Preguntas + Pantalla Especial)
    const preguntasQuiz = [
        {
            pregunta: "¿Qué enanos forjaron el Hacha Leviatán y el Martillo Mjölnir?",
            opciones: ["Brok y Sindri", "Durin y Dvalin", "Eitri y Brok"],
            correcta: 0
        },
        {
            pregunta: "¿Cuál es el verdadero nombre gigante de Atreus?",
            opciones: ["Fenrir", "Loki", "Jörmungandr"],
            correcta: 1
        },
        {
            pregunta: "¿A qué dios griego mató Kratos al final de God of War III para liberar la esperanza?",
            opciones: ["Zeus", "Ares", "Poseidón"],
            correcta: 0
        },
        {
            pregunta: "¿Cómo se llama la criatura gigante que custodia la Serpiente del Mundo?",
            opciones: ["Nidhogg", "Jörmungandr", "Garm"],
            correcta: 1
        },
        {
            pregunta: "¿Qué objeto mágico le permite a Kratos y Atreus viajar entre los Nueve Reinos?",
            opciones: ["El Cuerno de Bifröst", "La Piedra de la Unidad", "El Ojo de Mimir"],
            correcta: 0
        }
    ];

    let quizIndex = 0;
    let aciertos = 0;
    const contenedorQuiz = document.getElementById("contenedor-quiz");

    function cargarPregunta() {
        const elPregunta = document.getElementById("pregunta-quiz");
        const elOpciones = document.getElementById("opciones-quiz");
        const elResultado = document.getElementById("resultado-quiz");
        const btnSiguienteQuiz = document.getElementById("btn-siguiente-quiz");

        if (!elPregunta) return;

        const q = preguntasQuiz[quizIndex];
        elPregunta.textContent = `Pregunta ${quizIndex + 1}/5: ${q.pregunta}`;
        elOpciones.innerHTML = "";
        elResultado.textContent = "";
        btnSiguienteQuiz.style.display = "none";

        q.opciones.forEach((op, idx) => {
            const btn = document.createElement("button");
            btn.className = "btn-opcion";
            btn.textContent = op;
            btn.addEventListener("click", () => evaluarRespuesta(idx));
            elOpciones.appendChild(btn);
        });
    }

    function evaluarRespuesta(seleccionado) {
        const q = preguntasQuiz[quizIndex];
        const elOpciones = document.getElementById("opciones-quiz");
        const elResultado = document.getElementById("resultado-quiz");
        const btnSiguienteQuiz = document.getElementById("btn-siguiente-quiz");

        const btns = elOpciones.querySelectorAll("button");
        btns.forEach(b => b.disabled = true);

        if (seleccionado === q.correcta) {
            aciertos++;
            elResultado.textContent = "¡Respuesta Correcta, Guerrero! ⚔️";
            elResultado.style.color = "var(--accent-color)";
        } else {
            elResultado.textContent = "Has fallado. La respuesta correcta era: " + q.opciones[q.correcta];
            elResultado.style.color = "#ef4444";
        }

        if (quizIndex < preguntasQuiz.length - 1) {
            btnSiguienteQuiz.textContent = "Siguiente Pregunta";
        } else {
            btnSiguienteQuiz.textContent = "Ver Resultado Final";
        }
        btnSiguienteQuiz.style.display = "inline-block";
    }

    function mostrarResultadoFinal() {
        if (aciertos === 5) {
            contenedorQuiz.innerHTML = `
                <div style="text-align: center; padding: 2rem 1rem;">
                    <span style="font-size: 4rem; display: block; margin-bottom: 1rem;">🛡️⚔️🏆</span>
                    <h2 style="font-size: 2rem; color: var(--accent-color); margin-bottom: 0.5rem;">Eres un Espartano de Corazón</h2>
                    <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 1.5rem;">Has demostrado una sabiduría perfecta completando las 5/5 pruebas del Valhalla.</p>
                    <button id="btn-reiniciar-quiz" class="btn-accion">Intentar de nuevo</button>
                </div>
            `;
        } else {
            contenedorQuiz.innerHTML = `
                <div style="text-align: center; padding: 2rem 1rem;">
                    <span style="font-size: 3rem; display: block; margin-bottom: 1rem;">❄️</span>
                    <h3 style="font-size: 1.6rem; margin-bottom: 0.5rem;">Respuestas correctas: ${aciertos}/5</h3>
                    <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Sigue practicando para lograr el puntaje perfecto.</p>
                    <button id="btn-reiniciar-quiz" class="btn-accion">Reiniciar Quiz</button>
                </div>
            `;
        }

        document.getElementById("btn-reiniciar-quiz").addEventListener("click", reiniciarQuiz);
    }

    function reiniciarQuiz() {
        quizIndex = 0;
        aciertos = 0;
        contenedorQuiz.innerHTML = `
            <h3 id="pregunta-quiz"></h3>
            <div id="opciones-quiz" class="grid-opciones"></div>
            <p id="resultado-quiz" class="resultado-texto"></p>
            <button id="btn-siguiente-quiz" class="btn-accion" style="display:none; margin-top:1rem;"></button>
        `;

        document.getElementById("btn-siguiente-quiz").addEventListener("click", avanzarQuiz);
        cargarPregunta();
    }

    function avanzarQuiz() {
        if (quizIndex < preguntasQuiz.length - 1) {
            quizIndex++;
            cargarPregunta();
        } else {
            mostrarResultadoFinal();
        }
    }

    const btnSiguienteInicial = document.getElementById("btn-siguiente-quiz");
    if (btnSiguienteInicial) {
        btnSiguienteInicial.addEventListener("click", avanzarQuiz);
        cargarPregunta();
    }

    // Gestor de Trofeos
    const formTarea = document.getElementById("form-tarea");
    const inputTarea = document.getElementById("input-tarea");
    const listaTareas = document.getElementById("lista-tareas");
    const barraRelleno = document.getElementById("barra-relleno");
    const porcentajeProgreso = document.getElementById("porcentaje-progreso");
    const btnsFiltroTarea = document.querySelectorAll(".btn-filtro-tarea");

    let filtroTareaActual = "todas";
    let tareas = JSON.parse(localStorage.getItem("trofeos_gow")) || [
        { texto: "Conseguir la Lanza Draupnir", completada: true },
        { texto: "Derrotar a las 9 Valquirias", completada: false }
    ];

    function guardarYRenderizar() {
        localStorage.setItem("trofeos_gow", JSON.stringify(tareas));
        listaTareas.innerHTML = "";
        let completadasCount = 0;

        tareas.forEach((t, index) => {
            if (t.completada) completadasCount++;

            if (filtroTareaActual === "pendientes" && t.completada) return;
            if (filtroTareaActual === "realizadas" && !t.completada) return;

            const li = document.createElement("li");
            if (t.completada) li.classList.add("completada");

            li.innerHTML = `
                <span>${t.texto}</span>
                <div>
                    <button class="btn-toggle-tarea" data-index="${index}">${t.completada ? '↩️ Deshacer' : '🏆 Completar'}</button>
                    <button class="btn-eliminar-tarea" data-index="${index}">🗑️ Eliminar</button>
                </div>
            `;
            listaTareas.appendChild(li);
        });

        document.querySelectorAll(".btn-toggle-tarea").forEach(b => {
            b.addEventListener("click", (e) => {
                const idx = e.target.getAttribute("data-index");
                tareas[idx].completada = !tareas[idx].completada;
                guardarYRenderizar();
            });
        });

        document.querySelectorAll(".btn-eliminar-tarea").forEach(b => {
            b.addEventListener("click", (e) => {
                const idx = e.target.getAttribute("data-index");
                tareas.splice(idx, 1);
                guardarYRenderizar();
            });
        });

        const porcentaje = tareas.length === 0 ? 0 : Math.round((completadasCount / tareas.length) * 100);
        barraRelleno.style.width = `${porcentaje}%`;
        porcentajeProgreso.textContent = `${porcentaje}%`;

        document.getElementById("count-pendientes").textContent = tareas.length - completadasCount;
        document.getElementById("count-realizadas").textContent = completadasCount;
    }

    btnsFiltroTarea.forEach(btn => {
        btn.addEventListener("click", () => {
            btnsFiltroTarea.forEach(b => b.classList.remove("activo"));
            btn.classList.add("activo");
            filtroTareaActual = btn.getAttribute("data-filtro");
            guardarYRenderizar();
        });
    });

    if (formTarea) {
        formTarea.addEventListener("submit", (e) => {
            e.preventDefault();
            if (inputTarea.value.trim() !== "") {
                tareas.push({ texto: inputTarea.value.trim(), completada: false });
                inputTarea.value = "";
                guardarYRenderizar();
            }
        });
    }

    // Formulario de Contacto
    const formContacto = document.getElementById("form-contacto");
    const mensajeExito = document.getElementById("mensaje-exito");
    if (formContacto) {
        formContacto.addEventListener("submit", (e) => {
            e.preventDefault();
            mensajeExito.textContent = "¡Mensaje recibido en la forja! Tu voz ha sido escuchada.";
            mensajeExito.style.display = "block";
            formContacto.reset();
            setTimeout(() => { mensajeExito.style.display = "none"; }, 4000);
        });
    }

    guardarYRenderizar();
});