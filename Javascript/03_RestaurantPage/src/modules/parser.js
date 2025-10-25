export default function parser(data, tag = "div") {
    const images = require.context('../assets', false, /\.(png|jpe?g|svg)$/);
    const element = document.createElement(tag);
    for (let key in data) {
        const value = data[key];

        if (key == "type") {
            continue;
        }
        else if (typeof value == "object" && !Array.isArray(value)) {
            const childType = value.type || "div";
            const childElement = parser(value, childType); 
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
            value.forEach(className => {
                element.classList.add(className);
            });
        } else {
            element.setAttribute(key, value);
        }
    }
    return element;
}