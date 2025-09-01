# Déploiement - Les Enfants des Mousquetaires

## 📋 Liste de Contrôle Pré-Déploiement

### ✅ Tests de Fonctionnalité
- [ ] Navigation fonctionne sur toutes les pages
- [ ] Formulaire de contact envoie correctement
- [ ] Galerie photos avec lightbox opérationnelle
- [ ] Filtres de la galerie fonctionnent
- [ ] Animations au scroll actives
- [ ] Menu mobile responsive

### ✅ Tests Responsive
- [ ] Mobile (< 768px) : iPhone, Android
- [ ] Tablette (768px - 992px) : iPad
- [ ] Desktop (> 992px) : écrans standards
- [ ] Large desktop (> 1200px) : grands écrans

### ✅ Performance
- [ ] Images optimisées (WebP si possible)
- [ ] CSS minifié pour la production
- [ ] JavaScript minifié pour la production
- [ ] Fonts preconnect activé
- [ ] Cache headers configurés (.htaccess)
- [ ] GZIP compression activée

### ✅ SEO & Accessibilité
- [ ] Meta descriptions sur toutes les pages
- [ ] Balises title optimisées
- [ ] Sitemap.xml présent
- [ ] Robots.txt configuré
- [ ] Alt text sur toutes les images
- [ ] Structure heading correcte (H1, H2, H3...)
- [ ] Contraste couleurs conforme WCAG

### ✅ Sécurité
- [ ] Headers de sécurité configurés
- [ ] HTTPS activé (en production)
- [ ] Formulaires protégés contre le spam
- [ ] Fichiers sensibles protégés (.htaccess)

## 🚀 Étapes de Déploiement

### 1. Préparation des Fichiers
```bash
# Vérifier la structure des fichiers
├── index.html
├── sitemap.xml
├── robots.txt
├── .htaccess
├── src/
│   ├── styles/main.css
│   ├── scripts/main.js
│   └── pages/
│       ├── association.html
│       ├── colonies.html
│       ├── theatre.html
│       ├── photos.html
│       ├── partenaires.html
│       └── contact.html
└── docs/
```

### 2. Configuration Serveur
- Upload tous les fichiers vers le serveur web
- Vérifier que .htaccess est actif
- Configurer les redirections si nécessaire
- Tester les URLs

### 3. Configuration DNS
- Pointer le domaine vers le serveur
- Configurer les sous-domaines si nécessaire
- Vérifier la propagation DNS

### 4. SSL/HTTPS
```apache
# Décommenter dans .htaccess une fois SSL actif
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### 5. Tests Post-Déploiement
- [ ] Site accessible via le domaine principal
- [ ] Toutes les pages se chargent correctement
- [ ] Formulaire de contact fonctionne
- [ ] Tests sur différents navigateurs
- [ ] Tests sur mobiles/tablettes

## 🔧 Configuration Recommandée

### Serveur Web (Apache/Nginx)
- PHP 7.4+ (si backend ajouté plus tard)
- Modules Apache : mod_rewrite, mod_expires, mod_headers
- Espace disque : 100MB minimum
- Bande passante : selon trafic attendu

### Nom de Domaine
- Suggestion : `lesenfantsdesmousquetaires.fr`
- Ou : `enfants-mousquetaires.org`
- Certificat SSL inclus

### Email de Contact
- Configurer l'email : `lesenfantsdesmousquetaires@yahoo.fr`
- Ou créer : `contact@lesenfantsdesmousquetaires.fr`

## 📊 Outils de Monitoring

### Analytics (Recommandé)
```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Search Console
- Ajouter le site à Google Search Console
- Soumettre le sitemap.xml
- Vérifier l'indexation

### Monitoring Performance
- PageSpeed Insights
- GTMetrix
- Lighthouse audits

## 🔄 Maintenance Continue

### Mensuel
- [ ] Vérifier les liens externes
- [ ] Mettre à jour les photos si nécessaire
- [ ] Contrôler les performances
- [ ] Sauvegarder le site

### Trimestriel
- [ ] Mettre à jour Bootstrap si nouvelle version
- [ ] Réviser le contenu
- [ ] Analyser le trafic et ajuster
- [ ] Tests de sécurité

### Annuel
- [ ] Renouveler le domaine
- [ ] Renouveler le certificat SSL
- [ ] Révision complète du design
- [ ] Audit d'accessibilité

## 📞 Support Technique

En cas de problème lors du déploiement :
1. Vérifier les logs d'erreur du serveur
2. Tester en local d'abord
3. Valider la configuration .htaccess
4. Contacter l'hébergeur si nécessaire

---
*Document créé le : Aout 2025*
*Dernière mise à jour : Aout 2025*