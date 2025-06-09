import { getModule1Text, getModule1TextOnly } from "module1";
import confetti from 'https://cdn.skypack.dev/canvas-confetti';

(function (document) {

    const notepad = document.querySelector(`[data-notepad]`);

    const p1 = document.createElement("p");
    p1.textContent = "✅ index.js loaded"
    notepad.append(p1);

    const p2 = document.createElement("p");
    p2.textContent = getModule1TextOnly();
    notepad.append(p2);

    const p3 = document.createElement("p");
    p3.textContent = getModule1Text();
    notepad.append(p3);

    const p4 = document.createElement("p");
    p4.textContent = "✅ confetti package loaded by index.js"
    notepad.append(p4);

    confetti();

})(document);
