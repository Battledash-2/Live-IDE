// .editor
const $c = function(class_name) {
    return document.querySelector('.'+class_name);
}

let currents_copy = {
    "html": `<!DOCTYPE html>
<html>
    <head>
        <title>Document</title>
    </head>
    <body>
        <h1>Hello!</h1>
    </body>
</html>`,
    "css": "body {\n\t\n}",
    "js": ""
}

let currents = currents_copy;
try {
    currents = JSON.parse(localStorage.getItem('currents')) || currents_copy;
} catch(e) {
    console.log('Couldn\'t load any saved data. This could be because no code is saved');
}
let displaying = 'html';
let edt;
let last = '';
let autoUpdate = true;
const init = function() {
    const editor = $c('editor');

    edt = CodeMirror(editor, {
        value: currents['html'],
        mode: 'htmlmixed',
        theme: 'material',
        indentUnit: 4,
        indentWithTabs: true,
        lineNumbers: true
    });
    function run() {
        currents[displaying] = edt.getValue();
        let c = "<script>"+currents['js']+"</script><style>"+currents['css']+"</style>"+currents['html'];
        cs.ev.srcdoc = c;
    }

    const cs = {
        html: $c('html'),
        js: $c('js'),
        css: $c('css'),
        ev: $c('editor-view'),
        au: $c('au'),
        run: $c('run')
    }
    cs.ev.srcdoc = "<script>"+currents['js']+"</script><style>"+currents['css']+"</style>"+currents['html'];

    cs.run.addEventListener('click', ()=>{
        run();
    });
    cs.au.addEventListener('click', ()=>{
        if(autoUpdate == true) {
            cs.au.innerText = 'Enable Auto-Update';
        } else {
            cs.au.innerText = 'Pause Auto-Update';
            run();
        }
        autoUpdate = !autoUpdate;
        cs.run.classList.toggle('enabled');
    });
    cs.html.addEventListener('click', ()=>{
        currents[displaying] = edt.getValue();
        console.log("Changed '"+displaying+"' to `"+edt.getValue()+"`");
        let local___displaying = displaying;
        displaying = 'html';
        edt.setOption('value', currents['html']);
        edt.setOption('mode', 'htmlmixed');
        if(!cs.html.classList.contains('selected')) {
            cs.html.classList.add('selected');
            cs[local___displaying].classList.remove('selected');
        }
    });
    cs.js.addEventListener('click', ()=>{
        currents[displaying] = edt.getValue();
        console.log("Changed '"+displaying+"' to `"+edt.getValue()+"`");
        let local___displaying = displaying;
        displaying = 'js';
        edt.setOption('value', currents['js']);
        edt.setOption('mode', 'javascript');
        if(!cs.js.classList.contains('selected')) {
            cs.js.classList.add('selected');
            cs[local___displaying].classList.remove('selected');
        }
    });
    cs.css.addEventListener('click', ()=>{
        currents[displaying] = edt.getValue();
        console.log("Changed '"+displaying+"' to `"+edt.getValue()+"`");
        let local___displaying = displaying;
        displaying = 'css';
        edt.setOption('value', currents['css']);
        edt.setOption('mode', 'css');
        if(!cs.css.classList.contains('selected')) {
            cs.css.classList.add('selected');
            cs[local___displaying].classList.remove('selected');
        }
    });

    edt.on('change', () => {
        if(!autoUpdate) return "auto update is currently paused";
        run();
    });
    setInterval(() => {
        try {
            localStorage.setItem('currents', JSON.stringify(currents));
        } catch(e) {
            console.log('There was an error saving data. Error log:', e);
        }
    }, 250);
}

onload = init;