# Guía de sprites para artistas

El juego genera todos sus personajes por código. Cualquiera de ellos se puede sustituir por una **hoja de sprites PNG** dibujada a mano sin tocar el código.

## Cómo funciona

1. Al arrancar, el juego intenta cargar `sprites/<nombre>.png` para cada juego de sprites.
2. Si el PNG existe **y tiene el tamaño exacto**, se usa en lugar del generado. En la consola aparece `[kage] sprite externo: <nombre>`.
3. Si el tamaño no coincide, se ignora y la consola avisa del tamaño esperado.

> Hay que servir el juego desde un servidor (`python3 -m http.server`); abriendo el archivo con doble clic algunos navegadores no cargan imágenes externas.

## Formato de la hoja

- **Una fila** de celdas del mismo tamaño, una por fotograma, **en el orden indicado** en `plantillas/<nombre>.json`.
- PNG con **transparencia** (el fondo, transparente).
- Personajes **mirando a la derecha**; el juego los voltea solo.
- **Ancla**: el píxel indicado en `ancla` del JSON es el punto entre los pies, apoyado en el suelo. Mantén los pies a esa altura en todas las celdas, o el personaje "flotará".
- Estilo System 16: máximo **16 colores por personaje** (uno transparente), contorno oscuro de 1 px y sombreado en 3 tonos.

| Nombre | Celda | Fotogramas | Ancla | Qué es |
|---|---|---|---|---|
| `ninja` | 64×64 | 29 | 32,60 | Protagonista |
| `rojo` | 64×64 | 29 | 32,60 | Ninja enemigo (mismo orden que `ninja`) |
| `maton` | 56×56 | 9 | 28,53 | Matón |
| `pistolero` | 56×56 | 9 | 28,53 | Pistolero |
| `shuriken` | 9×9 | 2 | 4,4 | Shuriken girando |
| `tajo` | 52×52 | 3 | 6,30 | Estela de la espada |

### Fotogramas del ninja

`i0 i1` (reposo) · `w0–w5` (andar) · `crouch` (agachado) · `j0–j3` (voltereta en el aire, giros de 90°) · `air` (caída) · `t1 t2` (lanzar de pie: preparar / soltar) · `ct1 ct2` (lanzar agachado) · `at` (lanzar en el aire) · `atd` (lanzar en diagonal hacia abajo) · `s1 s2 s3` (espadazo: arriba / horizontal / abajo) · `cs1 cs2` (espadazo agachado) · `guard` (bloqueo) · `magic` (ninjutsu) · `hurt` (golpeado) · `dead` (tumbado)

### Matón
`i0` · `w0–w3` · `p1 p2` (puñetazo: carga / golpe) · `hurt` · `dead`

### Pistolero
`i0` · `aim` (apunta de pie) · `caim` (apunta agachado) · `w0–w3` · `hurt` · `dead`

## Plantillas

`plantillas/` contiene la hoja generada actual de cada personaje (`.png`) y su descripción (`.json`). Lo más cómodo es abrir el PNG en Aseprite, Pyxel Edit o similar, configurar la rejilla con el tamaño de celda y redibujar encima.

Para volver a exportarlas tras cambiar el código:

```bash
python3 -m http.server 8000 &
node herramientas/exportar-plantillas.mjs http://localhost:8000/
```

## Notas

- Las variantes de color de los enemigos (`verde`, `gris`, `negro`) se generan desde la paleta del código. Si sustituyes un enemigo por un PNG, esa variante seguirá usando el sprite generado. En el futuro se podrán añadir PNG por variante (`sprites/maton-verde.png`).
- El parpadeo blanco al recibir golpes se crea automáticamente a partir de tu PNG.
