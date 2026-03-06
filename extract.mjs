import fs from 'fs';
const html = fs.readFileSync('../index.html', 'utf8');
const start = html.indexOf('<style>') + 7;
const end = html.indexOf('</style>');
const css = html.substring(start, end).trim();
fs.writeFileSync('src/index.css', css);
console.log('CSS extracted');
