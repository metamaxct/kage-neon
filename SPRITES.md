# Guía de sprites para artistas

El juego genera todos sus personajes por código. Cualquiera de ellos se puede sustituir por una **hoja de sprites PNG** dibujada a mano sin tocar el código.

## Cómo se generan

Cada personaje es un **esqueleto** (cadera, torso, cabeza, brazos y piernas) que se anima con **poses clave interpoladas**.
- **Piernas:** usan cinemática inversa, así que los pies se apoyan en el suelo sin patinar.
- **Volúmenes:** cada fotograma se rasteriza con volúmenes sombreados píxel a píxel (luz principal arriba-izquierda y contraluz por la derecha).
- **Color:** **rampas de 5 tonos** por material, con desplazamiento de matiz (sombras hacia el azul, luces hacia el amarillo).
- **Acabado:** tramado ordenado y **contorno del color del material**, al estilo de los arcades de 16 bits.

En total hay casi 2.300 fotogramas entre el ninja, 5 tipos de enemigo, los rehenes y los 5 jefes. La bufanda del ninja no está en la hoja: se simula en tiempo real con física.

## Cómo sustituirlos

1. Al arrancar, el juego intenta cargar `sprites/<nombre>.png` para cada juego de sprites.
2. Si el PNG existe **y tiene el tamaño exacto**, se usa en lugar del generado. En la consola aparece `[kage] sprite externo: <nombre>`.
3. Si el tamaño no coincide, se ignora y la consola avisa del tamaño esperado.

> Hay que servir el juego desde un servidor (`python3 -m http.server`); abriendo el archivo con doble clic algunos navegadores no cargan imágenes externas.

## Formato de la hoja

- **Rejilla de 16 columnas**: el fotograma *n* está en la columna `n % 16`, fila `floor(n / 16)`.
- **Celda y ancla** según la tabla de abajo (el ancla es el punto entre los pies, apoyado en el suelo).
- PNG con **transparencia**. Personajes **mirando a la derecha**; el juego los voltea solo.
- En `plantillas/<nombre>.json` está cada animación: en qué fotograma empieza, cuántos tiene, a qué velocidad va y si se repite en bucle.

Cada juego de sprites tiene su propio tamaño de celda y ancla:

| Nombre | Celda | Ancla | Hoja | Fotogramas | Qué es |
|---|---|---|---|---|---|
| `ninja` | 96×88 | 48,84 | 1536×1760 | 312 | Protagonista |
| `rojo` | 96×88 | 48,84 | 1536×1584 | 281 | Ninja enemigo (paletas rojo, negro, verde) |
| `maton` | 96×88 | 48,84 | 1536×792 | 135 | Matón (paletas punk, verde, bandido) |
| `pistolero` | 96×88 | 48,84 | 1536×792 | 136 | Pistolero |
| `samurai` | 96×96 | 48,92 | 1536×1728 | 283 | Guardia samurái |
| `rehen` | 80×80 | 40,76 | 1280×240 | 47 | Rehén (atado, liberado, huyendo) |
| `toro` | 160×136 | 80,132 | 2560×1496 | 175 | Jefe 1: Toro |
| `metralla` | 144×120 | 64,116 | 2304×720 | 91 | Jefe 2: Metralla |
| `oni` | 176×152 | 88,148 | 2816×1672 | 170 | Jefe 3: Oni |
| `shogun` | 144×120 | 72,116 | 2304×2520 | 322 | Jefe 4: Shogun |
| `garra` | 112×104 | 56,100 | 1792×2080 | 312 | Jefe 5: Maestro Garra |
| `shuriken` | 11×11 | 5,5 | 44×11 | 4 | Shuriken girando |
| `tajo` | 96×88 | 40,80 | 1536×176 | 20 | Estelas de espada |

### Animaciones del ninja
`idle` (respiración) · `run` (sprint inclinado hacia delante, se sincroniza con la distancia recorrida) · `turn` (giro) · `skid` (frenada) · `crouchDown` / `crouch` / `standUp` · `rise` (impulso) · `fall` (caída) · `land` (aterrizaje) · `flip` (voltereta: 24 fotogramas de 15° cada uno, se elige por ángulo) · `throw` / `cthrow` / `athrow` / `athrowd` (lanzar shuriken de pie, agachado, en el aire y en diagonal) · `slashA` / `slashB` / `slashC` (combo de espada de 3 golpes) · `cslash` (espadazo agachado) · `aslash` (en el aire) · `guard` (bloqueo) · `hurt` · `die` (sale despedido) · `dieSlash` (se desploma tras un corte) · `magic` (ninjutsu)

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
