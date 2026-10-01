# Kage: Ciudad de Neón

Juego de acción ninja en 2D con estética arcade **System 16** (Sega, finales de los 80) y ambientación urbana nocturna. Se juega en el navegador y es un único `index.html`, sin dependencias ni conexión a internet.

> **Estado:** prototipo 0.3: **5 fases completas, cada una con su jefe**, jugables de principio a fin.

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
| Pausa (continuar, música, volver al menú principal) | Enter, Esc o P | Start | II |
| Música sí/no · tipo de pantalla (TV / Arcade / Píxel) | M · V | | |

Los shurikens y las balas viajan siempre en horizontal: ante una bala alta, agáchate; ante una baja, salta.

### Opciones del menú
- **Fase**: empieza desde cualquiera de las 5 fases.
- **Modo Normal**: 4 impactos por vida.
- **Modo Arcade**: un impacto y mueres, como el Shinobi original.
- **Pantalla**:
  - **TV**: televisor de tubo, con desenfoque horizontal, líneas de barrido, rejilla RGB, halo, curvatura y viñeta.
  - **Arcade**: monitor de recreativa, más nítido.
  - **Píxel**: píxeles limpios.

### Las fases

| # | Fase | Misión | Enemigos | Jefe |
|---|---|---|---|---|
| 1 | **Los Muelles**: puerto de noche, lluvia y rayos | Desactivar 3 bombas | Matones, pistoleros, ninjas rojos | **Toro**: embiste, da puñetazos, salta con onda expansiva y lanza barriles |
| 2 | **Ciudad**: distrito de neón, tren elevado, vapor de alcantarillas | Desactivar 3 bombas | Matones punk, pistoleros, ninjas | **Metralla**: ráfagas altas (agáchate) y bajas (salta), granadas |
| 3 | **El Bosque**: bambú, torii, puentes colgantes, luciérnagas | Liberar 3 rehenes | Bandidos, ninjas verdes y negros | **Oni**: mazazo, barrido bajo, salto aplastante y lluvia de rocas |
| 4 | **La Mansión**: jardín japonés, tejados, sakura | Desactivar 3 bombas | Guardias samurái, ninjas negros | **Shogun**: bloquea de frente y lanza un tajo iai a toda velocidad |
| 5 | **El Salón**: interior con fusuma dorados, velas y altillos | Liberar 3 rehenes | Samuráis y ninjas | **Maestro Garra**: teletransporte, abanicos de shuriken, clones y, a media vida, onda de fuego |

En cada fase hay que cumplir la misión para que se abra la puerta de la arena del jefe. Al vencerlo se pasa a la siguiente fase; tras la quinta, el final.

## Qué incluye el prototipo

- **Gráficos al estilo 16 bits**:
  - **Personajes**: unos 55 px de alto, con volúmenes sombreados en 5 tonos con desplazamiento de matiz, contornos de color y caras con ojos, nariz y gafas.
  - **Pantalla**: simulación de televisor de tubo en WebGL (opción TV por defecto).
- **Animación fluida** con casi 2.300 fotogramas en total, interpolados entre poses clave:
  - **Movimiento**: pies que apoyan sin patinar (cinemática inversa), sprint inclinado con estela de velocidad, giro, frenada, aterrizaje, voltereta completa de 24 fotogramas y bufanda con física en tiempo real.
  - **Ninja**: 3 lanzamientos de shuriken y un combo de espada de 3 golpes con estelas, más espadazo agachado, en el aire y ninjutsu.
  - **Enemigos**:
    - **Matón**: guardia de boxeo, directo, cruzado y burla.
    - **Pistolero**: apunta, dispara con retroceso, suelta casquillos y recarga cada 3 disparos.
    - **Ninja rojo**: bloquea con la espada y salta entre pisos.
  - **Muertes**: dos tipos (sale despedido o se desploma tras un corte).
  - **Detalles**: polvo al correr y aterrizar, y sombras en el suelo.
- **Motor**: paso de tiempo fijo a 60 fps y resolución interna 320×224.
- **5 escenarios** con 3 capas de parallax cada uno y efectos propios:
  - Lluvia y rayos en los muelles, llovizna, tren elevado y vapor en la ciudad.
  - Hojas y luciérnagas en el bosque, pétalos de sakura en la mansión, polvo y velas en el salón.
- **Música**: un tema por fase y otro para los jefes:
  - *Muelle 9* (funk-fusión, 138 bpm)
  - *Neón 24* (148 bpm)
  - *Senda de bambú* (flauta y taikos, 118 bpm)
  - *Jardín de la luna* (koto, 128 bpm)
  - *Salón de las sombras* (Do menor, 136 bpm)
  - *Duelo* (jefes, 158 bpm)
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
| 2 | 5 fases con jefe, rehenes, samuráis, música por fase, menú de pausa | ✅ |
| 3 | Bonus de shurikens entre fases, 3 ninjutsu distintos, más variedad de enemigos | |
| 4 | Pulido: equilibrado de dificultad, modo demo, ranking | |
| 5 | Publicación en itch.io y tráiler | |

## Herramientas

- `herramientas/exportar-plantillas.mjs`: exporta las hojas de sprites generadas a `plantillas/` (requiere Playwright).
- `index.html?test` desactiva el bucle automático y expone `window.KAGE` para pruebas automatizadas.

Personajes, nombres y gráficos son originales; el juego está inspirado en el estilo de los arcades de la época, sin usar material de terceros.
