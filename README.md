# CRUD con JSONPlaceholder

Aplicación web de gestión de posts desarrollada con **Next.js**, **Tailwind CSS** y arquitectura **Atomic Design**. Conectada a la [API pública de JSONPlaceholder](https://jsonplaceholder.typicode.com) para operaciones CRUD completas (crear, leer, actualizar y eliminar).

---

## Funcionalidades

- **Home**: Portada con cabecera, enlaces a lista de posts y a crear post, y vista previa de los primeros 7 posts.
- **Lista de posts** (`/posts`): Todos los posts en grid responsive con scroll infinito (carga de 7 en 7).
- **Crear post** (`/posts/create`): Formulario con validación (título mínimo 4 caracteres, cuerpo mínimo 5). El nuevo post se añade al store y aparece en la lista.
- **Editar post** (`/posts/edit/[id]`): Solo para posts creados localmente. Reutiliza el mismo formulario que crear, con valores precargados.
- **Eliminar post**: Desde el menú de acciones (⋮) en cada tarjeta. Incluye confirmación antes de borrar.
- **Estados**: Mensajes de éxito/error con toasts, estado vacío en la lista, mensajes "Cargando..." y "Post no encontrado" en edición.
- **Responsive**: Breakpoints con Tailwind (`md:`, `lg:`) en layout, formularios y grid de cards.
- **Accesibilidad**: `aria-label`, `aria-expanded`, `role="menu"`, cierre con tecla Escape en el menú desplegable.

---

## Stack técnico

| Tecnología | Uso en el proyecto |
|------------|---------------------|
| **Next.js 16** (App Router) | Rutas, Server Components para datos iniciales, Client Components donde hace falta interactividad |
| **React 19** | Componentes y hooks |
| **Tailwind CSS 4** | Estilos (utilidades, componentes con `@apply` en `globals.css`) |
| **Zustand** | Store global de posts: lista, hidratación desde SSR y mutaciones |
| **React Hook Form + Zod** | Formularios (crear/editar) con validación y mensajes de error |
| **react-hot-toast** | Notificaciones de éxito y error en las acciones CRUD |

---

## Requisitos y ejecución

- **Node.js** 18+ (recomendado 20+)
- **pnpm** como gestor de paquetes

```bash
# Clonar e instalar
git clone <url-del-repo>
cd frontend-nextjs-crud-atomic
pnpm install

# Modo desarrollo
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000). La home carga los primeros posts desde la API y los muestra; desde ahí puedes ir a la lista completa, crear un post o editar/eliminar los que tengan el menú (⋮).

---

## Variables de entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `NEXT_PUBLIC_URL_JSONPLACERHOLDER` | URL base de la API de posts | `https://jsonplaceholder.typicode.com` |

Opcional: crea `.env.local` en la raíz del proyecto si quieres apuntar a otra URL:

```env
NEXT_PUBLIC_URL_JSONPLACERHOLDER=https://jsonplaceholder.typicode.com
```

Si no defines la variable, se usa el valor por defecto (ver `src/lib/apiClient.ts`).

---

## Estructura del proyecto

```
src/
├── app/                          # App Router de Next.js
│   ├── layout.tsx                # Layout raíz, fuentes, Providers (Toaster)
│   ├── page.tsx                  # Página principal (Home): SSR + HomeClient
│   ├── globals.css               # Estilos globales y clases @apply (.btn, .card_flotante, etc.)
│   ├── Providers.tsx             # "use client": envuelve la app con Toaster de react-hot-toast
│   └── posts/
│       ├── page.tsx              # Lista de posts: SSR con PostService.getAll() + PostsClient
│       ├── HomeClient.tsx        # Cliente que hidrata el store con 7 posts y renderiza PostList
│       ├── PostsClient.tsx       # Cliente que hidrata el store con todos los posts y renderiza PostList
│       ├── create/
│       │   └── page.tsx          # Página "Crear post": PostForm + usePostMutations.handleCreate
│       └── edit/[id]/
│           ├── page.tsx          # Ruta dinámica: resuelve params.id y renderiza EditPostClient
│           └── EditPostClient.tsx # Busca el post en el store, muestra PostForm o "Cargando/No encontrado"
├── components/
│   ├── atoms/                    # Componentes atómicos (sin lógica de negocio)
│   │   ├── BackButton.tsx        # Link o botón "Regresar" (según prop `to`)
│   │   ├── Button.tsx            # Botón con variantes primary/secondary y estado disabled
│   │   ├── IconButton.tsx        # Botón para iconos (menú, etc.)
│   │   └── Skeleton.tsx          # Placeholder animado para cargas
│   ├── molecules/                # Composiciones de atoms con un propósito claro
│   │   ├── PostCard.tsx          # Tarjeta de un post: título, body, PostActionsMenu
│   │   ├── PostCardSkeleton.tsx  # Skeleton con forma de tarjeta (para futuros loadings)
│   │   ├── PostForm.tsx          # Formulario título + body + submit (create y edit)
│   │   ├── PostActionsMenu.tsx   # Menú ⋮ con "Editar" y "Eliminar" (solo posts locales)
│   │   └── DeletePostButton.tsx  # Botón eliminar (alternativa; el flujo principal usa el menú)
│   └── organisms/                # Secciones de UI que orquestan molecules
│       └── PostList.tsx          # Grid de PostCard + scroll infinito (IntersectionObserver)
├── features/posts/               # Todo lo específico del dominio "posts"
│   ├── hooks/
│   │   └── usePostMutations.ts   # handleCreate, handleUpdate, handleDelete (API + store + toasts)
│   ├── schemas/
│   │   └── postSchema.ts         # Zod: title, body, userId, id opcional + mensajes de validación
│   ├── services/
│   │   └── postService.ts       # PostService.getAll, create, update, delete (llamadas a apiFetch)
│   ├── store/
│   │   └── postStore.ts         # Zustand: posts, setPosts, addPost, updatePost, deletePost
│   └── types/
│       └── post.ts              # Interface Post (id, title, body, userId, origin?)
└── lib/
    └── apiClient.ts             # apiFetch<T>: base URL, headers, manejo de errores HTTP y red
```

Cada capa tiene una responsabilidad clara: **app** para rutas y composición de páginas, **components** para UI reutilizable por niveles (atoms → molecules → organisms), **features/posts** para lógica y estado del dominio, y **lib** para infraestructura compartida.

---

## Atomic Design en detalle

La interfaz se organiza en tres niveles para mantener componentes pequeños, reutilizables y fáciles de testear.

### Atoms (elementos base)

- **Button**: Aplica las clases `.btn`, `.btn--primario` o `.btn--secundario` y `.btn--inactivo` cuando está disabled. Usado en `PostForm`.
- **BackButton**: Si recibe `to`, renderiza un `Link`; si no, un `button` que llama a `router.back()`. Mejora SEO y prefetch cuando el destino es conocido.
- **IconButton**: Botón sin texto, pensado para iconos (por ejemplo el ⋮ del menú). Acepta todas las props nativas de `button`, incluidos `aria-label`, `aria-expanded`, etc.
- **Skeleton**: Un `div` con `animate-pulse` y clases que se pasan por `className`; usado en `PostCardSkeleton`.

### Molecules (combinaciones con propósito)

- **PostCard**: Muestra título y cuerpo de un post y el `PostActionsMenu`. Usa la clase `.card_flotante` para el efecto hover.
- **PostForm**: Formulario con `react-hook-form`, `zodResolver(postSchema)`, campos título y body, y botón de envío. Props: `defaultValues`, `onSubmit`, `submitLabel`, `submittingLabel`. Se usa tanto en crear como en editar.
- **PostActionsMenu**: Menú desplegable (⋮) con "Editar Post" (Link) y "Eliminar Post" (confirmación con `window.confirm`). Solo se renderiza si `post.origin === "local"`. Incluye cierre al hacer clic fuera y con Escape.

### Organisms (bloques de pantalla)

- **PostList**: Recibe `posts` y muestra un grid de `PostCard`. Implementa scroll infinito con `IntersectionObserver`: cada vez que el elemento “sentinela” entra en vista, se añaden 7 posts más. También muestra el mensaje de lista vacía cuando `posts.length === 0`.

Esta jerarquía permite cambiar el diseño de un botón o de una tarjeta en un solo sitio y que se refleje en todas las pantallas que los usan.

---

## Flujo de datos

### Carga inicial (SSR + hidratación)

1. El usuario entra en `/` o `/posts`.
2. El **Server Component** (`page.tsx`) llama a `PostService.getAll()` (o `getAll(7)` en home). Es una `fetch` en el servidor, así que la primera pintura ya lleva datos.
3. Esos datos se pasan como `initialPosts` a **HomeClient** o **PostsClient** (componentes con `"use client"`).
4. En un `useEffect`, el cliente escribe en el store de Zustand: `setPosts(initialPosts)` (o en `/posts` combina posts locales con los de la API). Así el estado global queda alineado con lo que vino del servidor.
5. La lista que se pinta viene del store (`posts` o un slice), de modo que las mutaciones posteriores (crear, editar, eliminar) se reflejan sin recargar.

### Crear post

1. El usuario rellena el formulario en `/posts/create` y envía.
2. `PostForm` valida con Zod (título ≥ 4 caracteres, body ≥ 5).
3. La página llama a `handleCreate(data)` del hook `usePostMutations`.
4. `handleCreate` hace `PostService.create(data)` (POST a la API), luego `addPost({ ...created, id: Date.now(), origin: "local" })` en el store y muestra un toast de éxito.
5. La página hace `router.push("/posts")` y el nuevo post aparece en la lista porque ya está en el store.

### Editar post

1. El usuario abre `/posts/edit/[id]` (por ejemplo desde el menú ⋮ de una tarjeta).
2. **EditPostClient** obtiene el post del store con `posts.find(p => p.id === id)`. Si no hay post (store vacío o id inexistente), muestra "Cargando..." o "Post no encontrado".
3. Si hay post, renderiza **PostForm** con `defaultValues` y `key={post.id}` para que el formulario se reinicie si cambia el post.
4. Al enviar, `handleUpdate(id, data)` llama a `PostService.update(1, data)` (la API no persiste; se usa id fijo) y luego `updatePost({ ...data, id, userId, origin: "local" })` en el store. Después toast y `router.push("/posts")`.

### Eliminar post

1. El usuario abre el menú (⋮) y pulsa "Eliminar Post".
2. Se muestra `window.confirm("¿Estás seguro...?")`. Si cancela, no pasa nada.
3. Si confirma, `handleDelete(post.id)` llama a `PostService.delete(1)` y luego `deletePost(id)` en el store. El post desaparece de la lista y se muestra un toast.

En todos los casos, la fuente de verdad para lo que ve el usuario es el **store de Zustand**; la API se usa para simular las operaciones (JSONPlaceholder no persiste).

---

## Nota sobre JSONPlaceholder

[JSONPlaceholder](https://jsonplaceholder.typicode.com/guide/) es una API de prueba: **no persiste** create, update ni delete. Las respuestas son simuladas. Por eso en esta app:

- **Posts de la API** (`origin: "api"`): Son los que vienen de `GET /posts`. No se pueden editar ni eliminar en la UI (el menú ⋮ no se muestra) porque no tenemos un backend real que los actualice.
- **Posts locales** (`origin: "local"`): Creados con "Crear post" o “editados” desde la app. Se guardan en el store con `id: Date.now()` (o el id que corresponda en edición) y sí muestran el menú para editar y eliminar.
- **Llamadas a la API**: Para **update** y **delete** se usa siempre el id `1` en la URL (por ejemplo `PUT /posts/1`, `DELETE /posts/1`), de modo que la API responda sin error. El id real del post se usa solo en el store y en la ruta `/posts/edit/[id]`.

Así se cumple el CRUD en la UI y se simula la integración con una API REST, aunque los cambios no se persistan en el servidor.

---

## Buenas prácticas aplicadas

- **Server Components por defecto**: Las páginas que solo necesitan datos iniciales son async y hacen fetch en el servidor; solo los componentes interactivos usan `"use client"`.
- **Un solo formulario para crear y editar**: `PostForm` se reutiliza con `defaultValues` y labels distintos (`submitLabel` / `submittingLabel`), evitando duplicar validación y estilos.
- **Tipado**: TypeScript en todo el proyecto; tipos compartidos en `features/posts/types` y schemas de Zod para el formulario.
- **Manejo de errores**: `apiClient` traduce códigos HTTP (404, 500, etc.) y errores de red a mensajes claros; los toasts muestran el mensaje de error cuando la mutación falla.
- **Accesibilidad**: Labels y roles ARIA en botones y menús, y cierre del menú con Escape.
- **Confirmación antes de eliminar**: Se evitan borrados accidentales con un diálogo de confirmación.

---

## Scripts

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Servidor de desarrollo (Next.js) |
| `pnpm build` | Build de producción |
| `pnpm start` | Sirve el build (tras `pnpm build`) |
| `pnpm lint` | Ejecuta ESLint |

---

## Resumen

Esta app implementa un CRUD completo contra JSONPlaceholder, con Next.js (App Router), Tailwind, Atomic Design y estado global en Zustand. El README explica la estructura de carpetas, el papel de cada nivel de componentes, el flujo de datos (SSR, hidratación y mutaciones) y las decisiones tomadas por las limitaciones de la API. Para cualquier duda sobre una ruta o un componente concreto, la sección **Estructura del proyecto** y **Atomic Design en detalle** sirven como guía.
