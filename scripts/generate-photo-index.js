/**
 * Script de génération automatique des index.json pour la galerie photos
 * Les Enfants des Mousquetaires Website
 */

const fs = require('fs');
const path = require('path');

/**
 * Liste les images d'un dossier et filtre sur les formats supportés
 */
function listImages(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.warn(`Le dossier ${dirPath} n'existe pas`);
    return [];
  }

  return fs.readdirSync(dirPath)
           .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file)) // filtre images
           .map(file => path.basename(file)); // retourne juste le nom du fichier
}

/**
 * Génère un fichier index.json pour un dossier donné
 */
function generateIndexForDirectory(dirPath, outputPath) {
  console.log(`Scanning directory: ${dirPath}`);

  const images = listImages(dirPath);

  const indexData = {
    images: images,
    generated: new Date().toISOString(),
    count: images.length
  };

  // Créer le dossier de sortie si nécessaire
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Écrire le fichier index.json
  fs.writeFileSync(outputPath, JSON.stringify(indexData, null, 2));

  console.log(`Generated ${outputPath} with ${images.length} images:`);
  images.forEach(img => console.log(`  - ${img}`));

  return images.length;
}

/**
 * Génère tous les index.json pour les dossiers photos
 */
function generateAllIndexes() {
  const photosBaseDir = path.join(__dirname, '..', 'photos');

  const directories = [
    {
      name: 'Activités',
      path: path.join(photosBaseDir, 'activites'),
      indexPath: path.join(photosBaseDir, 'activites', 'index.json')
    },
    {
      name: 'Colonies',
      path: path.join(photosBaseDir, 'colonies'),
      indexPath: path.join(photosBaseDir, 'colonies', 'index.json')
    },
    {
      name: 'Théâtre',
      path: path.join(photosBaseDir, 'theatre'),
      indexPath: path.join(photosBaseDir, 'theatre', 'index.json')
    }
  ];

  let totalImages = 0;

  console.log('='.repeat(50));
  console.log('GÉNÉRATION DES INDEX PHOTOS');
  console.log('='.repeat(50));

  directories.forEach(dir => {
    console.log(`\n📁 Processing ${dir.name}...`);
    const count = generateIndexForDirectory(dir.path, dir.indexPath);
    totalImages += count;
  });

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Génération terminée: ${totalImages} images au total`);
  console.log('='.repeat(50));

  // Afficher un résumé
  console.log('\n📋 RÉSUMÉ:');
  directories.forEach(dir => {
    if (fs.existsSync(dir.indexPath)) {
      const indexData = JSON.parse(fs.readFileSync(dir.indexPath, 'utf8'));
      console.log(`  ${dir.name}: ${indexData.count} images`);
    }
  });
}

/**
 * Surveille les changements dans les dossiers photos (optionnel)
 */
function watchDirectories() {
  const photosBaseDir = path.join(__dirname, '..', 'photos');
  const directories = ['activites', 'colonies', 'theatre'];

  console.log('\n👀 Mode surveillance activé...');
  console.log('Les index.json seront mis à jour automatiquement lors de changements.');
  console.log('Appuyez sur Ctrl+C pour arrêter.\n');

  directories.forEach(dirName => {
    const dirPath = path.join(photosBaseDir, dirName);

    if (fs.existsSync(dirPath)) {
      fs.watch(dirPath, (eventType, filename) => {
        if (filename && /\.(jpg|jpeg|png|gif|webp)$/i.test(filename)) {
          console.log(`📸 Changement détecté dans ${dirName}: ${filename}`);
          setTimeout(() => {
            generateIndexForDirectory(
              dirPath,
              path.join(dirPath, 'index.json')
            );
          }, 100); // Petit délai pour éviter les appels multiples
        }
      });
    }
  });
}

// Exécution du script
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.includes('--watch') || args.includes('-w')) {
    generateAllIndexes();
    watchDirectories();
  } else if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: node generate-photo-index.js [options]

Options:
  --watch, -w    Lance le mode surveillance (régénère automatiquement)
  --help, -h     Affiche cette aide

Examples:
  node generate-photo-index.js          # Génère les index une fois
  node generate-photo-index.js --watch  # Génère et surveille les changements
`);
  } else {
    generateAllIndexes();
  }
}

module.exports = {
  listImages,
  generateIndexForDirectory,
  generateAllIndexes
};