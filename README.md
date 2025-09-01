# Les Enfants des Mousquetaires - Site Web

Site web officiel de l'association "Les Enfants des Mousquetaires", spécialisée dans les colonies de vacances inclusives et les ateliers théâtre à Béziers.

## 🎯 Présentation

Ce site web présente l'association, ses activités (colonies de vacances et ateliers théâtre), sa galerie photos, ses partenaires et permet aux familles de prendre contact facilement.

## 🌟 Caractéristiques

### Design & Interface
- **Design responsive** adapté à tous les écrans (mobile, tablette, desktop)
- **Palette de couleurs pastel** harmonieuse et accueillante
- **Bootstrap 5.3.2** pour une interface moderne et professionnelle
- **Animations CSS** et **JavaScript** pour une expérience utilisateur fluide
- **Accessibilité** conforme aux standards WCAG 2.1

### Fonctionnalités
- **Navigation responsive** avec menu mobile
- **Galerie photos** avec lightbox et filtres
- **Formulaire de contact** avec validation
- **Animations au scroll** pour une présentation dynamique
- **FAQ interactive** avec accordéon
- **Design mobile-first** pour une expérience optimale sur tous les appareils

## 🏗️ Structure du Projet

```
├── index.html                 # Page d'accueil
├── src/
│   ├── styles/
│   │   ├── main.css          # Styles principaux
│   │   └── components/
│   │       └── _navigation.css # Styles navigation
│   ├── scripts/
│   │   └── main.js           # JavaScript principal
│   └── pages/
│       ├── association.html   # Page association
│       ├── colonies.html     # Page colonies de vacances
│       ├── theatre.html      # Page ateliers théâtre
│       ├── photos.html       # Galerie photos
│       ├── partenaires.html  # Page partenaires
│       └── contact.html      # Page contact
├── docs/                     # Documentation du projet
└── README.md                 # Ce fichier
```

## 🎨 Charte Graphique

### Couleurs Principales
- **Primaire** : `#87CEEB` (Bleu ciel)
- **Secondaire** : `#A8E6CF` (Vert menthe)
- **Accent** : `#FDF5BF` (Jaune pastel)
- **Texte** : `#333333` (Gris foncé)

### Typographie
- **Titres** : Montserrat (Google Fonts)
- **Texte** : Open Sans (Google Fonts)

### Composants
- **Cards** avec ombres douces et effets hover
- **Boutons** avec transitions fluides
- **Navigation** fixe avec transparence dynamique
- **Formulaires** avec validation en temps réel

## 🛠️ Technologies Utilisées

### Frontend
- **HTML5** sémantique
- **CSS3** avec variables personnalisées
- **JavaScript ES6+** vanilla
- **Bootstrap 5.3.2** framework CSS
- **Bootstrap Icons** pour l'iconographie

### Bibliothèques Externes
- **Lightbox2** pour la galerie photos
- **Google Fonts** pour la typographie
- **Intersection Observer API** pour les animations

## 📱 Responsive Design

Le site est entièrement responsive avec des breakpoints optimisés :
- **Mobile** : < 768px
- **Tablette** : 768px - 992px
- **Desktop** : > 992px

## 🚀 Mise en Route

### Prérequis
- Navigateur web moderne
- Serveur web local (optionnel pour le développement)

### Installation
1. Clonez ou téléchargez le projet
2. Ouvrez `index.html` dans votre navigateur
3. Ou utilisez un serveur local pour une meilleure expérience

### Serveur Local (recommandé)
```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (live-server)
npx live-server

# Avec PHP
php -S localhost:8000
```

## 📄 Pages du Site

### 🏠 Accueil (`index.html`)
- Présentation de l'association
- Services principaux
- Appels à l'action vers les pages détaillées

### 🏛️ L'Association (`association.html`)
- Histoire et mission
- Valeurs et approche pédagogique
- Équipe et organisation

### 🏕️ Colonies de Vacances (`colonies.html`)
- Groupes d'âge et organisation
- Activités et programme
- Hébergement et équipe d'animation

### 🎭 Ateliers Théâtre (`theatre.html`)
- Groupes par âge
- Méthodes pédagogiques
- Spectacles et représentations

### 📸 Galerie Photos (`photos.html`)
- Photos des activités
- Filtres par catégorie
- Lightbox pour visualisation

### 🤝 Nos Partenaires (`partenaires.html`)
- Partenaires institutionnels
- Collaborations éducatives
- Réseau associatif

### 📞 Contact (`contact.html`)
- Informations de contact
- Formulaire de contact
- FAQ avec questions fréquentes

## 🔧 Personnalisation

### Couleurs
Modifiez les variables CSS dans `src/styles/main.css` :
```css
:root {
  --color-primary: #FFB5A7;
  --color-secondary: #A8E6CF;
  --color-accent: #FDF5BF;
}
```

### Contenu
- Textes : directement dans les fichiers HTML
- Images : remplacez les URLs placeholder par vos vraies images
- Informations de contact : dans le footer et la page contact

### Styles
- Styles globaux : `src/styles/main.css`
- Composants spécifiques : `src/styles/components/`

## 📈 Optimisations Incluses

### Performance
- **CSS et JS minifiés** pour la production
- **Images optimisées** avec lazy loading
- **Fonts preconnect** pour un chargement rapide

### SEO
- **Balises meta** optimisées
- **Structure sémantique** HTML5
- **Alt text** pour toutes les images
- **Schema markup** pour le référencement local

### Accessibilité
- **Navigation au clavier**
- **Contrastes de couleur** conformes
- **Rôles ARIA** appropriés
- **Textes alternatifs** descriptifs

## 🌍 Support Navigateurs

- ✅ Chrome (dernières versions)
- ✅ Firefox (dernières versions)
- ✅ Safari (dernières versions)
- ✅ Edge (dernières versions)
- ✅ Mobile Safari (iOS 12+)
- ✅ Chrome Mobile (Android 8+)

## 📞 Contact & Support

**Association Les Enfants des Mousquetaires**
- 📧 Email : lesenfantsdesmousquetaires@yahoo.fr
- 📱 Téléphone : 06 17 65 44 68
- 📍 Localisation : Béziers, France

## 📝 Licence

Ce projet est développé pour l'association "Les Enfants des Mousquetaires". Tous droits réservés.

---


*Développé avec ❤️ pour l'épanouissement des enfants et des familles*
