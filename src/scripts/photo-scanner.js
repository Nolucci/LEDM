/**
 * Photo Scanner - Scanne automatiquement les images dans les dossiers photos
 * et génère dynamiquement la galerie avec numérotation automatique
 */

class PhotoScanner {
    constructor() {
        this.basePath = '../../photos/';
        this.folders = [
            { name: 'activites', displayName: 'Activité', searchName: 'Activite', category: 'activites' },
            { name: 'colonies', displayName: 'Colonie', searchName: 'Colonie', category: 'colonies' },
            { name: 'theatre', displayName: 'Théâtre', searchName: 'Théâtre', category: 'theatre' }
        ];
        this.imageExtensions = ['jpg', 'jpeg', 'png', 'webp'];
        this.galleryContainer = null;
        this.allImages = []; // Store all scanned images
        this.displayedImages = 0; // Number of currently displayed images
        this.imagesPerPage = 6; // Number of images to load per page
        this.currentFilter = 'all'; // Current active filter
        this.loadMoreBtn = null;
    }

    /**
     * Initialise le scanner et génère la galerie
     */
    async init() {
        this.galleryContainer = document.getElementById('photoGallery');
        this.loadMoreBtn = document.getElementById('loadMoreBtn');

        if (!this.galleryContainer) {
            console.error('Container de galerie non trouvé');
            return;
        }

        // Vider le container existant
        this.galleryContainer.innerHTML = '';
        this.allImages = [];
        this.displayedImages = 0;

        // Scanner chaque dossier et collecter toutes les images
        for (const folder of this.folders) {
            await this.scanFolder(folder);
        }

        // Afficher les premières images
        this.displayMoreImages();

        // Initialiser le bouton "Load More"
        this.initLoadMoreButton();

        // Réinitialiser les observers d'animation
        this.initializeAnimations();
    }

    /**
     * Scanne un dossier pour trouver les images numérotées
     */
    async scanFolder(folder) {
        const images = [];
        let counter = 1;
        let notFoundCount = 0;
        const maxNotFound = 3; // Arrêter après 3 images non trouvées consécutives

        while (notFoundCount < maxNotFound) {
            const imagePath = await this.findImage(folder, counter);

            if (imagePath) {
                images.push({
                    path: imagePath,
                    title: `${folder.displayName} ${counter}`,
                    category: folder.category,
                    number: counter
                });
                notFoundCount = 0; // Reset du compteur si image trouvée
            } else {
                notFoundCount++;
            }

            counter++;
        }

        // Ajouter les images à la liste globale au lieu de les afficher directement
        this.allImages.push(...images);

        console.log(`Dossier ${folder.name}: ${images.length} images trouvées`);
    }

    /**
     * Cherche une image avec le pattern spécifique
     */
    async findImage(folder, number) {
        // Chercher uniquement avec le format exact : "Nom espace numéro"
        const baseName = `${folder.searchName} ${number}`;

        for (const ext of this.imageExtensions) {
            const imagePath = `${this.basePath}${folder.name}/${baseName}.${ext}`;

            if (await this.imageExists(imagePath)) {
                return imagePath;
            }
        }

        return null;
    }

    /**
     * Vérifie si une image existe
     */
    async imageExists(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            return response.ok;
        } catch {
            return false;
        }
    }

    /**
     * Crée une carte de galerie pour une image
     */
    createGalleryCard(image) {
        const cardHtml = `
            <div class="col-md-6 col-lg-4 gallery-item fade-in" data-category="${image.category}">
                <div class="gallery-card">
                    <a href="${image.path}"
                       data-lightbox="gallery"
                       data-title="${image.title}">
                        <div class="gallery-image">
                            <img src="${image.path}"
                                 alt="${image.title}"
                                 class="img-fluid"
                                 loading="lazy"
                                 onerror="this.parentElement.parentElement.parentElement.parentElement.style.display='none'">
                            <div class="gallery-overlay">
                                <i class="bi bi-zoom-in"></i>
                            </div>
                        </div>
                    </a>
                    <div class="gallery-info p-3">
                        <h6 class="fw-bold mb-1">${image.title}</h6>
                    </div>
                </div>
            </div>
        `;

        this.galleryContainer.insertAdjacentHTML('beforeend', cardHtml);
    }

    /**
     * Affiche plus d'images selon le filtre actuel
     */
    displayMoreImages() {
        const filteredImages = this.getFilteredImages();
        const imagesToShow = filteredImages.slice(this.displayedImages, this.displayedImages + this.imagesPerPage);

        imagesToShow.forEach(image => {
            this.createGalleryCard(image);
        });

        this.displayedImages += imagesToShow.length;
        this.updateLoadMoreButton();
    }

    /**
     * Retourne les images filtrées selon le filtre actuel
     */
    getFilteredImages() {
        if (this.currentFilter === 'all') {
            return this.allImages;
        }
        return this.allImages.filter(image => image.category === this.currentFilter);
    }

    /**
     * Initialise le bouton "Load More"
     */
    initLoadMoreButton() {
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', () => {
                this.displayMoreImages();
                // Réinitialiser les animations pour les nouvelles images
                setTimeout(() => {
                    this.initializeAnimations();
                }, 100);
            });
        }
        this.updateLoadMoreButton();
    }

    /**
     * Met à jour la visibilité du bouton "Load More"
     */
    updateLoadMoreButton() {
        if (!this.loadMoreBtn) return;

        const filteredImages = this.getFilteredImages();
        const hasMoreImages = this.displayedImages < filteredImages.length;

        if (hasMoreImages) {
            this.loadMoreBtn.style.display = 'inline-block';
            this.loadMoreBtn.innerHTML = '<i class="bi bi-plus-circle me-2"></i>Charger plus de photos';
        } else {
            this.loadMoreBtn.style.display = 'none';
        }
    }

    /**
     * Réinitialise l'affichage pour un nouveau filtre
     */
    resetDisplayForFilter(filter) {
        this.currentFilter = filter;
        this.displayedImages = 0;
        this.galleryContainer.innerHTML = '';
        this.displayMoreImages();

        // Réinitialiser les animations
        setTimeout(() => {
            this.initializeAnimations();
        }, 100);
    }

    /**
     * Réinitialise les animations pour les nouveaux éléments
     */
    initializeAnimations() {
        const galleryItems = document.querySelectorAll('.gallery-item');

        // Observer pour les animations fade-in
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        galleryItems.forEach(item => {
            observer.observe(item);
        });

        // Mettre à jour les filtres
        this.updateFilters();
    }

    /**
     * Met à jour la fonctionnalité de filtrage
     */
    updateFilters() {
        const filterButtons = document.querySelectorAll('.gallery-filters .btn');

        filterButtons.forEach(button => {
            // Supprimer les anciens listeners
            button.replaceWith(button.cloneNode(true));
        });

        // Ré-attacher les nouveaux listeners
        const newFilterButtons = document.querySelectorAll('.gallery-filters .btn');
        newFilterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');

                // Mettre à jour le bouton actif
                newFilterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');

                // Réinitialiser l'affichage pour le nouveau filtre
                this.resetDisplayForFilter(filter);
            });
        });
    }
}

// Initialiser le scanner quand le DOM est chargé
document.addEventListener('DOMContentLoaded', async function() {
    const scanner = new PhotoScanner();
    await scanner.init();
});