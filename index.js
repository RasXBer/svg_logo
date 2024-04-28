const { Shape, Triangle, Circle, Square } = require('./lib/shapes');
// const inquirer = require('inquirer')
let inquirer;
try {
  // Dynamic import for inquirer
  inquirer = require('inquirer');
} catch (err) {
  // Handle the error if inquirer couldn't be imported
  console.error('Error occurred while importing inquirer:', err);
}
const fs = require('fs');

const questions = [
{
  type: 'input',
  name: 'text',
  message: 'Enter three characters for the logo:',
  validate: (input) => input.length < 4,
},

{
  type: 'input',
  name: 'textColor',
  message: 'Enter text color:',
 },
{
  type: 'list',
  name: 'shape',
  message: 'Choose a shape:',
  choices: [Triangle, Circle, Square],
},
{
  type: 'input',
  name: 'shapeColor',
  message: 'Enter shape color:',
 },
];

inquirer.prompt(questions).then((answers) => {
  const { text, textColor, shape, shapeColor } = answers;
  const shapeObj = new Shape();
  let svgElement = '';

  shapeObj.setColor(shapeColor);

  switch (shape) {
    case 'Triangle':
      const triangle = new Triangle();
      triangle.setColor(shapeColor);
      svgElement = triangle.render();
      break;
    case 'Circle':
      const circle = new Circle();
      circle.setColor(shapeColor);
      svgElement = circle.render();
      break;  
    case 'Square':
      const square = new Square();
      square.setColor(shapeColor);
      svgElement = square.render();
      break;
    // default:
    //   break;
  }

let x = 150, y = 120;
if (shape === 'Triangle') {
  y = 135;
} else if (shape === 'Square'){
y=145;
}
const finalSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
  ${svgElement}
<text x= "${x}" y="${y}" fill = "${textColor}" font-size="50" text-anchor="middle">${text}</text>
</svg>`;

fs.writeFileSync('logo.svg', finalSvg);

console.log('Generated log.svg');

});
