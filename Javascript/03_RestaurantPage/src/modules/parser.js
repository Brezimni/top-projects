export default function parser(data, tag = "div") {
    const images = require.context('../assets', false, /\.(png|jpe?g|svg)$/);
    const SVG_TAGS = ["svg", "circle", "line", "polyline", "path", "rect", "g", "polygon", "text"];

    const element = SVG_TAGS.includes(tag) ? document.createElementNS("http://www.w3.org/2000/svg", tag) : document.createElement(tag);
    
    for (let key in data) {
        const value = data[key];

        if (key == "tag") {
            continue;
        }
        else if (typeof value == "object" && !Array.isArray(value)) {
            const childTag = value.tag || "div";
            const childElement = parser(value, childTag); 
            element.appendChild(childElement);            
        } else if (key == "path") {
            try {
                const fileName = value.replace(/^.*[\\/]/, "");
                const resolvedPath = images(`./${fileName}`);
                element.setAttribute("src", resolvedPath);
              } catch (err) {
                console.warn(`Could not resolve image: ${value}`);
                element.setAttribute("src", value);
              }
        } else if (key == "text") {
            element.innerText = value;
        } else if (key == "classes") {
            // Must be an array
            value.forEach(className => {
                element.classList.add(className);
            });
        } else {
            element.setAttribute(key, value);
        }
    }
    return element;
}