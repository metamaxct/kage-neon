# Guía de sprites para artistas

El juego genera todos sus personajes por código. Cualquiera de ellos se puede sustituir por una **hoja de sprites PNG** dibujada a mano sin tocar el código.

## Cómo se generan

Cada personaje es un **esqueleto** (cadera, torso, cabeza, brazos y piernas) que se anima con **poses clave interpoladas**.
- **Piernas:** usan cinemática inversa, así que los pies se apoyan en el suelo sin patinar.
- **Volúmenes:** cada fotograma se rasteriza con volúmenes sombreados píxel a píxel (luz principal arriba-izquierda y contraluz por la derecha).
- **Color:** **rampas de 5 tonos** por material, con desplazamiento de matiz (sombras hacia el azul, luces hacia el amarillo).
- **Acabado:** tramado ordenado y **contorno del color del material**, al estilo de los arcades de 16 bits.

Resultado: **ninja 312 fotogramas**, ninja rojo 281, matón 135 y pistolero 136. La bufanda del ninja no está en la hoja: se simula en tiempo real con física.

## Cómo sustituirlos

1. Al arrancar, el juego intenta cargar `sprites/<nombre>.png` para cada juego de sprites.
2. Si el PNG existe **y tiene el tamaño exacto**, se usa en lugar del generado. En la consola aparece `[kage] sprite externo: <nombre>`.
3. Si el tamaño no coincide, se ignora y la consola avisa del tamaño esperado.

> Hay que servir el juego desde un servidor (`python3 -m http.server`); abriendo el archivo con doble clic algunos navegadores no cargan imágenes externas.

## Formato de la hoja

- **Rejilla de 16 columnas**: el fotograma *n* está en la columna `n % 16`, fila `floor(n / 16)`.
- **Celda de 96×88**: el **ancla** (punto entre los pies, apoyado en el suelo) está en el píxel **48,84** de cada celda.
- PNG con **transparencia**. Personajes **mirando a la derecha**; el juego los voltea solo.
- En `plantillas/<nombre>.json` está cada animación: en qué fotograma empieza, cuántos tiene, a qué velocidad va y si se repite en bucle.

| Nombre | Hoja | Fotogramas | Qué es |
|---|---|---|---|
| `ninja` | 1536×1760 | 312 | Protagonista |
| `rojo` | 1536×1584 | 281 | Ninja enemigo (mismas animaciones salvo `magic`) |
| `maton` | 1536×792 | 135 | Matón |
| `pistolero` | 1536×792 | 136 | Pistolero |
| `shuriken` | 44×11 | 4 | Shuriken girando |
| `tajo` | 1536×176 | 20 | Estelas de la espada (A, B, C, bajo; 5 fotogramas cada una) |

### Animaciones del ninja
`idle` (respiración) · `run` (carrera, se sincroniza con la distancia recorrida) · `turn` (giro) · `skid` (frenada) · `crouchDown` / `crouch` / `standUp` · `rise` (impulso) · `fall` (caída) · `land` (aterrizaje) · `flip` (voltereta: 24 fotogramas de 15° cada uno, se elige por ángulo) · `throw` / `cthrow` / `athrow` / `athrowd` (lanzar shuriken de pie, agachado, en el aire y en diagonal) · `slashA` / `slashB` / `slashC` (combo de espada de 3 golpes) · `cslash` (espadazo agachado) · `aslash` (en el aire) · `guard` (bloqueo) · `hurt` · `die` (sale despedido) · `dieSlash` (se desploma tras un corte) · `magic` (ninjutsu)

### Matón
`idle` (guardia de boxeo) · `walk` · `punch` (directo) · `punch2` (cruzado) · `taunt` (se burla cuando caes) · `hurt` · `die` · `dieSlash`

### Pistolero
`idle` · `walk` · `aim` / `shoot` / `lower` (apuntar, disparar con retroceso y bajar el arma) · `caim` / `cshoot` / `cstand` (lo mismo agachado) · `reload` (recarga cada 3 disparos) · `hurt` · `die` · `dieSlash`

## Plantillas

`plantillas/` contiene la hoja generada actual de cada personaje (`.png`) y su descripción (`.json`). Lo más cómodo es abrir el PNG en Aseprite, Pyxel Edit o similar, configurar la rejilla con el tamaño de celda y redibujar encima. Se pueden mantener las animaciones existentes como guía de tiempos.

Para volver a exportarlas tras cambiar el código:

```bash
python3 -m http.server 8000 &
node herramientas/exportar-plantillas.mjs http://localhost:8000/
```

## Notas

- Las variantes de color de los enemigos (`verde`, `gris`, `negro`) se generan desde la paleta del código. Si sustituyes un enemigo por un PNG, la variante seguirá usando el sprite generado.
- El parpadeo blanco al recibir golpes se crea automáticamente a partir de tu PNG.
- En pantalla, el filtro **TV** desenfoca y mezcla los píxeles como un televisor de tubo: dibuja pensando en ese resultado (los tramados se funden en degradados, igual que en los arcades originales).
