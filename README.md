# Curious Facts – Frontend App

Una aplicación web que muestra datos curiosos aleatorios obtenidos desde una API pública. Permite guardar tus favoritos y consultarlos más tarde, todo desde una misma página.

---

##  Contexto del proyecto

**Curious Facts** es una propuesta para la empresa *Useless Facts*, cuyo objetivo es desarrollar una interfaz web simple y atractiva que muestre hechos curiosos que nadie pidió, pero que igual disfrutarás. Los datos provienen de la API pública:  
👉 [`https://uselessfacts.jsph.pl`](https://uselessfacts.jsph.pl)

La funcionalidad principal incluye:
- Obtener un dato curioso aleatorio.
- Visualizarlo inmediatamente en la página principal.
- Guardarlo como favorito con un solo clic.
- Acceder a tus datos favoritos desde la misma vista.

---

## 💻 Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)

---

## Herramientas de desarrollo

- Figma (prototipado)
- Visual Studio Code
- Trello (gestión ágil de tareas)
- Git & GitHub (control de versiones)

---

## Temas y conceptos aplicados

- Diseño atómico (_Atomic Design_)
- Diseño responsivo (HTML + CSS)
- Manipulación del DOM
- Funciones y eventos en JavaScript
- Fetch API para consumo de datos externos
- Gestión de estado (favoritos en localStorage)
- Uso de cookies para preferencias del usuario

---

##  ¿Cómo funciona?

1. Al cargar la página, se realiza una petición a la API de datos inútiles.
2. Se muestra el dato curioso en pantalla.
3. Si el usuario lo desea, puede marcarlo como favorito.
4. El sistema guarda la selección en `localStorage` (tras aceptar cookies).
5. Los datos favoritos se muestran en una sección especial de la página.

---

## ▶ ¿Cómo ver la página en tu entorno local?

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/curiousfact.git
