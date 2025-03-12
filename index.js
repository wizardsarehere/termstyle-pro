const brighten = require('./brighten');

console.log('\nTermStyle Pro Demo:\n');

// Basic colors
console.log('Basic Colors:');
console.log(brighten.red('Red text'));
console.log(brighten.blue('Blue text'));
console.log(brighten.green('Green text'));

// Special colors
console.log('\nSpecial Colors:');
console.log(brighten.emerald('Emerald text'));
console.log(brighten.ruby('Ruby text'));
console.log(brighten.sapphire('Sapphire text'));

// Neon colors
console.log('\nNeon Colors:');
console.log(brighten.neon('Neon blue text', 'blue'));
console.log(brighten.neon('Neon pink text', 'pink'));
console.log(brighten.neon('Neon green text', 'green'));

// Styles
console.log('\nStyles:');
console.log(brighten.bold('Bold text'));
console.log(brighten.italic('Italic text'));
console.log(brighten.underline('Underlined text'));

// Rainbow and gradients
console.log('\nSpecial Effects:');
console.log(brighten.rainbow('Rainbow text'));
console.log(brighten.gradient('Gradient text', 
  { r: 255, g: 0, b: 0 },
  { r: 0, g: 0, b: 255 }
));

// Boxes
console.log('\nBox Styles:');
console.log(brighten.box('Single box', 'single'));
console.log(brighten.box('Double box', 'double'));
console.log(brighten.box('Round box', 'round'));

// Combined effects
console.log('\nCombined Effects:');
console.log(brighten.box(brighten.rainbow('Rainbow in a box'), 'double'));
console.log(brighten.neon(brighten.box('Neon box', 'round'), 'blue'));