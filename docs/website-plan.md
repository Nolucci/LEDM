# Les Enfants des Mousquetaires - Site Web Statique

## 1. Spécification (Specification)

### 1.1 Objectifs du Projet
- Créer un site web statique responsive pour l'association
- Mettre en avant les colonies de vacances et leur aspect inclusif
- Faciliter l'accès à l'information pour les familles
- Promouvoir l'identité familiale et sociale de l'association

### 1.2 Informations de Contact
- **Statut :** Organisation à but non lucratif
- **Localisation :** Béziers, France
- **Téléphone :** 06 17 65 44 68
- **Email :** lesenfantsdesmousquetaires@yahoo.fr

### 1.3 Services Principaux
1. Séjours de Vacances
   - Colonies pour enfants
   - Colonies pour adolescents
   - Accueil inclusif et social
   - Ambiance familiale
   - Petits effectifs

2. Ateliers Théâtre
   - Création de spectacles
   - Sections adaptées :
     - Enfants
     - Adolescents
     - Adultes

### 1.4 Exigences Fonctionnelles

#### Navigation Principale
- Barre de navigation responsive
- Menu principal avec les rubriques suivantes :
  - Accueil
  - L'Association
  - Nos Activités
    - Colonies de Vacances
    - Ateliers Théâtre
  - Nos Partenaires
  - Photos
  - Contact

#### Structure des Pages

##### Page d'Accueil
- En-tête avec logo et nom de l'association
- Bannière principale avec image représentative
- Sections de présentation rapide des activités
- Appels à l'action (CTA) vers les colonies et ateliers
- Pied de page avec informations de contact

##### Page Association
1. Présentation
   - Histoire de l'association
   - Valeurs et missions
2. Bureau
   - Organigramme
   - Membres du bureau
3. Projet Éducatif
   - Objectifs pédagogiques
   - Approche inclusive
   - Valeurs transmises

##### Page Activités
1. Colonies de Vacances
   - Types de séjours (enfants/ados)
   - Tranches d'âge
   - Hébergement
     - Description des locaux
     - Capacité d'accueil
   - Équipe
     - Composition
     - Qualifications
   - Vie Quotidienne
     - Repas
     - Rythme des journées
   - Activités
     - Sorties
     - Animations
     - Planning type

2. Ateliers Théâtre
   - Présentation des sections
     - Groupe enfants
     - Groupe adolescents
     - Groupe adultes
   - Création de spectacles
     - Processus créatif
     - Représentations
   - Planning des ateliers
   - Inscriptions

##### Galerie Photos
- Système de carrousel interactif
- Filtres par catégories :
  - Colonies de vacances
  - Ateliers théâtre
  - Spectacles
- Lightbox pour affichage plein écran
- Navigation fluide entre les images

##### Espace Documents
- Section de téléchargement organisée
- 3 catégories de documents :
  1. Documents administratifs
  2. Projets pédagogiques
  3. Informations pratiques

### 1.5 Design et Interface

#### Charte Graphique
- Palette de couleurs pastels évoquant les vacances :
  ```css
  --primary-color: #FFB5A7 (rose pastel)
  --secondary-color: #A8E6CF (vert menthe)
  --accent-color: #FDF5BF (jaune pâle)
  --text-color: #3D405B (bleu marine foncé)
  --background-color: #F8EDEB (beige clair)
  ```

#### Éléments Visuels
- Images lumineuses et colorées
- Icônes modernes et ludiques
- Typographie claire et lisible

## 2. Architecture Technique

### 2.1 Structure des Fichiers
```
ledm-website/
├── index.html
├── assets/
│   ├── css/
│   │   ├── main.css
│   │   ├── components/
│   │   └── pages/
│   ├── js/
│   │   ├── main.js
│   │   └── components/
│   ├── images/
│   └── documents/
├── pages/
│   ├── association.html
│   ├── activites/
│   │   ├── colonies.html
│   │   └── theatre.html
│   ├── partenaires.html
│   ├── photos.html
│   └── contact.html
└── components/
    ├── header.html
    ├── footer.html
    └── navigation.html
```

### 2.2 Technologies Utilisées
- HTML5 pour la structure
- CSS3 avec Flexbox/Grid pour la mise en page responsive
- JavaScript vanilla pour les interactions
- Lightbox.js pour la galerie photos
- Swiper.js pour les carrousels

### 2.3 Composants Réutilisables
1. Navigation
   - Menu responsive
   - Sous-menus déroulants
2. Carrousel d'images
   - Navigation tactile
   - Contrôles adaptés mobile/desktop
3. Système de filtres
   - Catégorisation des contenus
   - Tri dynamique
4. Gestionnaire de documents
   - Interface de téléchargement
   - Organisation par catégories

## 3. Responsive Design

### 3.1 Breakpoints
```css
/* Mobile */
@media (max-width: 767px) {}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {}

/* Desktop */
@media (min-width: 1024px) {}
```

### 3.2 Adaptations Mobile
- Menu hamburger
- Images optimisées
- Grille réorganisée
- Touch-friendly

## 4. Performance et Optimisation
- Compression des images
- Minification des assets
- Lazy loading des images
- Cache des ressources statiques

## 5. Plan de Déploiement
1. Développement local
2. Tests responsive
3. Optimisation des assets
4. Déploiement sur hébergement statique

## 6. Maintenance
- Mise à jour du contenu
- Ajout de photos
- Gestion des documents
- Surveillance des performances

Ce plan servira de guide pour l'implémentation du site web de l'association Les Enfants des Mousquetaires, en assurant une expérience utilisateur optimale et une maintenance facilitée.