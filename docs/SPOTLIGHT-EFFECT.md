# Effet Spotlight (Halo Lumineux) - Brittany Chiang

## Analyse de l'Effet

L'effet de "halo lumineux" sur le site de Brittany Chiang est créé avec une technique CSS très élégante qui suit le curseur de la souris.

## Comment ça Fonctionne

### 1. Structure HTML

```html
<div class="group/spotlight relative">
  <!-- Overlay avec gradient radial qui suit la souris -->
  <div
    class="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute"
    style="background: radial-gradient(
      600px circle at VAR(--mouse-x) VAR(--mouse-y),
      rgba(29, 78, 216, 0.15),
      transparent 80%
    )"
  ></div>

  <!-- Contenu de la page -->
  <div class="mx-auto min-h-screen max-w-screen-xl px-6 py-12">
    <!-- ... -->
  </div>
</div>
```

### 2. CSS Clés

```css
/* Élément overlay fixe/absolu */
.pointer-events-none {
  pointer-events: none; /* Ne bloque pas les interactions */
}

.fixed.inset-0 {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.z-30 {
  z-index: 30; /* Au-dessus du contenu */
}

.transition.duration-300 {
  transition: all 300ms; /* Transition fluide */
}

/* Gradient radial qui suit la souris */
background: radial-gradient(
  600px circle at VAR(--mouse-x) VAR(--mouse-y),
  rgba(29, 78, 216, 0.15),  /* Bleu semi-transparent au centre */
  transparent 80%            /* Transparent vers l'extérieur */
);
```

### 3. JavaScript pour Tracking de la Souris

```typescript
// Écouter les mouvements de souris
document.addEventListener('mousemove', (e) => {
  const spotlight = document.querySelector('.spotlight-overlay');
  if (spotlight) {
    // Mettre à jour la position du gradient
    spotlight.style.background = `radial-gradient(
      600px circle at ${e.clientX}px ${e.clientY}px,
      rgba(29, 78, 216, 0.15),
      transparent 80%
    )`;
  }
});
```

## Paramètres Clés

| Paramètre | Valeur | Description |
|-----------|--------|-------------|
| **Taille du cercle** | `600px` | Diamètre du halo lumineux |
| **Couleur centrale** | `rgba(29, 78, 216, 0.15)` | Bleu (#1d4ed8) avec 15% d'opacité |
| **Dégradé** | `transparent 80%` | Devient transparent à 80% du rayon |
| **Transition** | `300ms` | Durée de l'animation de déplacement |
| **Z-index** | `30` | Au-dessus du contenu mais sous les popups |

## Couleurs Utilisées

- **Couleur du halo** : `rgb(29, 78, 216)` = Bleu profond (proche du bleu Material Design)
- **Opacité** : `0.15` (15%) pour un effet subtil
- **Background** : `rgb(15, 23, 42)` = Bleu marine très foncé (slate-900)

## Variantes Possibles

### Variante 1 : Halo Vert (Style Matrix)
```css
background: radial-gradient(
  600px circle at var(--mouse-x) var(--mouse-y),
  rgba(34, 197, 94, 0.15),  /* Vert */
  transparent 80%
);
```

### Variante 2 : Halo Violet (Style Futuriste)
```css
background: radial-gradient(
  600px circle at var(--mouse-x) var(--mouse-y),
  rgba(168, 85, 247, 0.2),  /* Violet */
  transparent 80%
);
```

### Variante 3 : Halo Orange (Style Chaleureux)
```css
background: radial-gradient(
  600px circle at var(--mouse-x) var(--mouse-y),
  rgba(249, 115, 22, 0.15),  /* Orange */
  transparent 80%
);
```

### Variante 4 : Multi-couleur (Dégradé)
```css
background: radial-gradient(
  600px circle at var(--mouse-x) var(--mouse-y),
  rgba(59, 130, 246, 0.15),   /* Bleu au centre */
  rgba(168, 85, 247, 0.1),    /* Violet au milieu */
  transparent 80%
);
```

## Implémentation pour Portfolio CV

### Angular Component

```typescript
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-spotlight-layout',
  standalone: true,
  template: `
    <div class="group/spotlight relative">
      <div
        #spotlight
        class="pointer-events-none fixed inset-0 z-30 transition duration-300"
        [style.background]="spotlightBackground"
      ></div>

      <div class="content-wrapper">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .pointer-events-none {
      pointer-events: none;
    }

    .fixed {
      position: fixed;
    }

    .inset-0 {
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    .z-30 {
      z-index: 30;
    }

    .transition {
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }

    .duration-300 {
      transition-duration: 300ms;
    }
  `]
})
export class SpotlightLayoutComponent {
  spotlightBackground = 'transparent';

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const x = event.clientX;
    const y = event.clientY;

    this.spotlightBackground = `radial-gradient(
      600px circle at ${x}px ${y}px,
      rgba(29, 78, 216, 0.15),
      transparent 80%
    )`;
  }
}
```

### Tailwind CSS Classes

```css
/* Dans votre tailwind.config.js, ajoutez : */
{
  theme: {
    extend: {
      colors: {
        'spotlight-blue': 'rgba(29, 78, 216, 0.15)',
      }
    }
  }
}
```

## Optimisations

### Performance
- Utiliser `requestAnimationFrame` pour éviter les calculs trop fréquents
- Ajouter un throttle sur l'event listener
- Désactiver sur mobile pour économiser la batterie

```typescript
@HostListener('document:mousemove', ['$event'])
onMouseMove(event: MouseEvent): void {
  if (this.isMobile) return; // Désactiver sur mobile

  requestAnimationFrame(() => {
    const x = event.clientX;
    const y = event.clientY;

    this.spotlightBackground = `radial-gradient(
      600px circle at ${x}px ${y}px,
      rgba(29, 78, 216, 0.15),
      transparent 80%
    )`;
  });
}
```

### Accessibilité
- L'overlay a `pointer-events: none` donc ne bloque pas les interactions
- L'effet est purement visuel, pas d'impact sur la navigation au clavier
- Peut être désactivé avec `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  .spotlight-overlay {
    display: none;
  }
}
```

## Screenshots de Référence

Les screenshots du site de Brittany Chiang sont disponibles dans :
- `docs/design-reference/brittany-chiang-full-page.png` - Page complète
- `docs/design-reference/brittany-chiang-header.png` - Header
- `docs/design-reference/brittany-chiang-experience.png` - Section Experience
- `docs/design-reference/brittany-chiang-projects.png` - Section Projects
- `docs/design-reference/brittany-chiang-hover-effect.png` - Effet de hover

## Recommandation

Pour le portfolio CV, je recommande d'utiliser :
- **Couleur** : Bleu `rgba(29, 78, 216, 0.15)` (cohérent avec le design professionnel)
- **Taille** : `600px` (parfait pour desktop)
- **Transition** : `300ms` (fluide sans être trop lent)
- **Mobile** : Désactivé (économie batterie + moins de distraction)

Cet effet apporte une touche moderne et interactive sans être distrayant. Il renforce l'aspect professionnel et technique du portfolio.
