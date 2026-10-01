# Kage: Ciudad de Neón

Juego de acción ninja en 2D con estética arcade **System 16** (Sega, finales de los 80) y ambientación urbana nocturna. Se juega en el navegador y es un único `index.html`, sin dependencias ni conexión a internet.

> **Estado:** prototipo 0.1, con la **Fase 1, sección 1-1 "Los Muelles"** completa y jugable de principio a fin.

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
| Música sí/no · filtro CRT sí/no | M · V | | |

En salto, mantener **Abajo** al atacar lanza el shuriken en diagonal hacia abajo.

### Modos (en el menú)
- **Normal**: 4 impactos por vida.
- **Arcade**: un impacto y mueres, como el Shinobi original.

### Misión de la sección 1-1
Desactiva las **3 bombas** del muelle (dos están en el piso superior) y sal por el portón **SALIDA** antes de que acabe el tiempo (3:00).

## Qué incluye el prototipo

- **Motor**: paso de tiempo fijo a 60 fps, resolución interna 320×224 escalada en píxeles enteros y filtro CRT opcional con scanlines y viñeta.
- **Ninja**: andar, agacharse, salto con voltereta, salto entre dos pisos, shuriken (de pie, agachado, en el aire y en diagonal), combo de espada de 3 golpes que corta proyectiles, ninjutsu de fuego que limpia la pantalla, daño con retroceso e invulnerabilidad.
- **Enemigos**:
  - **Matón**: persigue y da puñetazos.
  - **Pistolero**: dispara alto (agáchate) o bajo (salta) y apunta en diagonal si estás en otro piso.
  - **Ninja rojo**: corre, salta al ataque, lanza shurikens, cambia de piso, **bloquea** shurikens con la espada y aguanta 2 impactos.
  - Hay variantes de color de cada uno.
- **Escenario**:
  - Fondos: cielo con luna, nubes, ciudad lejana y puerto con grúas y barcos en parallax.
  - Efectos: agua con efecto raster por línea, lluvia con salpicaduras, rayos con trueno, neones que parpadean, farolas con cono de luz tramado.
  - Elementos del muelle: almacenes, contenedores, pasarelas, vallas y cajas.
- **Sonido**: síntesis FM en WebAudio al estilo del chip YM2151, con un tema propio ("Muelle 9", La menor, 138 bpm) y unos 20 efectos.
- **Partida**: pantalla de título, ficha de fase, puntos de control, tiempo, puntuación y récord (localStorage), continuar, recuento de puntos al terminar.
- **Plataformas**: teclado, mando (Gamepad API) y controles táctiles para móvil, en vertical y apaisado.

## Gráficos sustituibles

Todos los gráficos se generan por código como pixel art de 16 colores. Para sustituir un personaje por sprites hechos a mano, pon un PNG con el mismo nombre en `sprites/`. Las instrucciones están en **[SPRITES.md](SPRITES.md)** y las plantillas exportadas en `plantillas/`.

## Plan

| Hito | Contenido | Estado |
|---|---|---|
| 1 | Prototipo: movimiento, armas, 3 enemigos, sección 1-1 | ✅ |
| 2 | Fase 1 completa: sección 1-2 + jefe **Toro** | ⏳ |
| 3 | Fases 2–3 (Línea 9, Barrio Neón), bonus de shurikens, 3 ninjutsu | |
| 4 | Fases 4–6 (La Obra, Planta Química, Torre Garra) y final | |
| 5 | Pulido: música de cada fase, modo demo, ranking, dificultad | |
| 6 | Publicación en itch.io y tráiler | |

## Herramientas

- `herramientas/exportar-plantillas.mjs`: exporta las hojas de sprites generadas a `plantillas/` (requiere Playwright).
- `index.html?test` desactiva el bucle automático y expone `window.KAGE` para pruebas automatizadas.

Personajes, nombres y gráficos son originales; el juego está inspirado en el estilo de los arcades de la época, sin usar material de terceros.
