# Kage: Ciudad de Neón

Juego de acción ninja en 2D con estética arcade **System 16** (Sega, finales de los 80) y ambientación urbana nocturna. Se juega en el navegador y es un único `index.html`, sin dependencias ni conexión a internet.

> **Estado:** prototipo 0.2, con la **Fase 1, sección 1-1 "Los Muelles"** completa y jugable de principio a fin.

## Cómo jugar

Abre `index.html` en un navegador moderno. Para que funcionen los sprites externos (ver más abajo), sírvelo desde un servidor local:

```bash
python3 -m http.server 8000
# y abre http://localhost:8000/
```

### Controles

| Acción | Teclado | Mando | Táctil |
|---|---|---|---|
| Mover / agacharse | Flechas o WASD | Cruceta o stick | Joystick virtual |
| Ataque (shuriken a distancia, espada si el enemigo está pegado) | Z o J | X / Cuadrado (o Y, RB) | ATAQ |
| Salto | X, K o Espacio | A / Cruz | SALTO |
| Subir de piso | Arriba + Salto | | |
| Bajar de piso | Abajo + Salto | | |
| Ninjutsu (una vez por vida) | C o L | B / Círculo (o LB) | NINJ |
| Pausa | Enter, Esc o P | Start | II |
| Música sí/no · tipo de pantalla (TV / Arcade / Píxel) | M · V | | |

En salto, mantener **Abajo** al atacar lanza el shuriken en diagonal hacia abajo.

### Opciones del menú
- **Modo Normal**: 4 impactos por vida.
- **Modo Arcade**: un impacto y mueres, como el Shinobi original.
- **Pantalla**:
  - **TV**: televisor de tubo, con desenfoque horizontal, líneas de barrido, rejilla RGB, halo, curvatura y viñeta.
  - **Arcade**: monitor de recreativa, más nítido.
  - **Píxel**: píxeles limpios.

### Misión de la sección 1-1
Desactiva las **3 bombas** del muelle (dos están en el piso superior) y sal por el portón **SALIDA** antes de que acabe el tiempo (3:00).

## Qué incluye el prototipo

- **Gráficos al estilo 16 bits**:
  - **Personajes**: unos 55 px de alto, con volúmenes sombreados en 5 tonos con desplazamiento de matiz, contornos de color y caras con ojos, nariz y gafas.
  - **Pantalla**: simulación de televisor de tubo en WebGL (opción TV por defecto).
- **Animación fluida** con más de 860 fotogramas en total, interpolados entre poses clave:
  - **Movimiento**: pies que apoyan sin patinar (cinemática inversa), carrera, giro, frenada, aterrizaje, voltereta completa de 24 fotogramas y bufanda con física en tiempo real.
  - **Ninja**: 3 lanzamientos de shuriken y un combo de espada de 3 golpes con estelas, más espadazo agachado, en el aire y ninjutsu.
  - **Enemigos**:
    - **Matón**: guardia de boxeo, directo, cruzado y burla.
    - **Pistolero**: apunta, dispara con retroceso, suelta casquillos y recarga cada 3 disparos.
    - **Ninja rojo**: bloquea con la espada y salta entre pisos.
  - **Muertes**: dos tipos (sale despedido o se desploma tras un corte).
  - **Detalles**: polvo al correr y aterrizar, y sombras en el suelo.
- **Motor**: paso de tiempo fijo a 60 fps y resolución interna 320×224.
- **Escenario**:
  - Fondos: cielo con luna, nubes, ciudad lejana y puerto con grúas y barcos en parallax.
  - Efectos: agua ondulando línea a línea, lluvia con salpicaduras, rayos con trueno, neones que parpadean y farolas.
- **Música**: *"Muelle 9"*, funk-fusión en La menor a 138 bpm, unos 87 s antes de repetirse.
  - **Estructura**: intro, tema, tema con armonía y arpegios, puente a medio tiempo, break de bajo slap, solo, tema un tono más arriba y remate al unísono.
  - **Sonido**: síntesis FM al estilo YM2151, con eco en la melodía, reverberación, redobles de batería y platos.
  - **Efectos**: unos 25 efectos de sonido.
- **Partida**: pantalla de título, ficha de fase, puntos de control, tiempo, puntuación y récord, continuar, recuento de puntos al terminar.
- **Plataformas**: teclado, mando (Gamepad API) y controles táctiles para móvil, en vertical y apaisado.

## Gráficos sustituibles

Todos los gráficos se generan por código (esqueletos animados rasterizados como pixel art). Para sustituir un personaje por sprites hechos a mano, pon un PNG con el mismo nombre en `sprites/`. Las instrucciones están en **[SPRITES.md](SPRITES.md)** y las plantillas exportadas en `plantillas/`.

## Plan

| Hito | Contenido | Estado |
|---|---|---|
| 1 | Prototipo: movimiento, armas, 3 enemigos, sección 1-1 | ✅ |
| 1b | Gráficos 16 bits, pantalla de TV, animación fluida y música nueva | ✅ |
| 2 | Fase 1 completa: sección 1-2 + jefe **Toro** | ⏳ |
| 3 | Fases 2–3 (Línea 9, Barrio Neón), bonus de shurikens, 3 ninjutsu | |
| 4 | Fases 4–6 (La Obra, Planta Química, Torre Garra) y final | |
| 5 | Pulido: música de cada fase, modo demo, ranking, dificultad | |
| 6 | Publicación en itch.io y tráiler | |

## Herramientas

- `herramientas/exportar-plantillas.mjs`: exporta las hojas de sprites generadas a `plantillas/` (requiere Playwright).
- `index.html?test` desactiva el bucle automático y expone `window.KAGE` para pruebas automatizadas.

Personajes, nombres y gráficos son originales; el juego está inspirado en el estilo de los arcades de la época, sin usar material de terceros.
