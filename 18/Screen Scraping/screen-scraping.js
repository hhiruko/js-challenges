const fs = require('node:fs');

const input = fs.readFileSync('input.txt', 'utf-8').split('\r\n');

function createHTML(elements) {
    function normalizeElementName(name) {
        return name.toLowerCase().split('').filter(c => /[a-z0-9]/.test(c)).join('');
    }

    const htmlElements = [];

    elements.forEach(element => {
        if(element.includes('(') && element.includes(')')){
            const pivot = element.indexOf('(');
            const name = element.substring(0, pivot).trim();
            let params = element.substring(pivot).replace('(', '').replace(')', '').replace(':', '').split(',').map(o => {
                o = o.trim();
                const key = o.substring(o.indexOf('[') + 1, o.indexOf(']')).toLowerCase();
                const value = o.replace('[', '').replace(']', '');
                return [key, value];
            });
            htmlElements.push(name + ':');

            if(params.length > 4){
                htmlElements.push(`<select name="${normalizeElementName(name)}">`);
                params.forEach(([k, v]) => {
                    htmlElements.push(`<option value="${k}">${v}</option>`);
                });
                htmlElements.push('</select>');
            } else {
                params.forEach(([k, v]) => {
                    htmlElements.push(`<input type="radio" name="${normalizeElementName(name)}" value="${k}"/> ${v}`)
                });
            }
        } else {
            htmlElements.push(element);
            htmlElements.push(`<input type="text" name="${normalizeElementName(element)}"/>`)
        }
    });

    
    return '<html><body><form>' + htmlElements.join('<br/>') + '<br/><input type="submit" value="Submit"/></form></body></html>';
}

const output = createHTML(input);

fs.writeFileSync('output.html', output, 'utf-8');