const fs = require('fs');
const path = require('path');

// Define paths
const projectsPath = path.join(__dirname, '../../assets/data/projects.json');
const projectImagesRoot = path.join(__dirname, '../../assets/images/projects');
const outputPath = path.join(__dirname, '../../assets/data/auto-project-images.json');

const result = {};

// Read projects from JSON
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));
projects.forEach(project => {

	// Check if folder is defined
  const folder = project.images_folder;
	if (!folder) {
		console.warn(`⚠️ Folder not defined for ${project.title}`)
		return;
	}

	// Check if folder exists
  const folderPath = path.join(projectImagesRoot, folder);
  if (!fs.existsSync(folderPath)) {
    console.warn(`⚠️ Folder not found: ${folderPath}`);
    return;
  }

  const files = fs.readdirSync(folderPath).filter(file =>
    /\.(jpe?g|png|gif|webp)$/i.test(file)
  );

  // Create full relative paths for browser use
  result[folder] = files.map(file => `assets/images/projects/${folder}/${file}`);
});

fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
console.log(`✅ Generated auto-project-images.json with ${Object.keys(result).length} folders`);
