// Declaração de constantes:
const html = document.querySelector('html');

const fileInput = document.getElementById('uploader');
const textarea = document.getElementById('textarea-email');
const form = document.getElementById('form');

const themeChanger = document.getElementById('themeChanger');
const divSun = document.getElementById('divSun');
const divMoon = document.getElementById('divMoon');
const root = document.documentElement;

const loading = document.getElementById('loading');
const body = document.querySelector('body');
const email_exit = document.getElementById('email-exit');

// Declaração de função de email:
function deleteOldFile() {
    fileInput.value = '';
    const file = document.querySelector('div#file-cascade');
    if(file) {
        file.remove();
    };
};

function showEmailResponse(category, email) {
    const section = document.createElement('section');
    section.classList.add('email-class');
    section.id = 'email-id';

    const button = document.createElement('button');
    button.textContent = 'X';
    button.classList.add('email-closer');
    button.classList.add('hover-gradient');
    button.id = 'email-exit';

    const h1 = document.createElement('h1');
    h1.textContent = 'AI Response';

    const h2 = document.createElement('h2');
    h2.classList.add('text-orbitron');
    h2.textContent = 'Categoria:';

    const h3 = document.createElement('h3');
    h3.textContent = category;

    const h2_2 = document.createElement('h2');
    h2_2.classList.add('text-orbitron');
    h2_2.textContent = 'Email:';

    const div = document.createElement('div');
    div.classList.add('email');
    div.classList.add('text-cinzel');
    div.textContent = email;

    section.append(button, h1, h2, h3, h2_2, div);
    body.prepend(section);

    button.addEventListener('click', () => {
        const section = document.querySelector('section#email-id');
        section.remove()
    });
};
// Declaração do evento de seleção de arquivo:
fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    console.log(file);
    let size
    if(file.size > 1024) {
        size = (file.size / 1024).toFixed(1) + 'KB';
    } else {
        size = file.size + 'B';
    };
    
    const old_file = document.querySelector('div.selected-file');
    if(old_file) {
        form.removeChild(old_file);
    };
    
    const selected_file = document.createElement('div');
    selected_file.classList.add('selected-file');
    selected_file.id = 'file-cascade';
    
    const file_name = document.createElement('div');
    file_name.classList.add('file-name');
    file_name.id = 'file-name';
    file_name.textContent = file.name;
    
    const file_info = document.createElement('div');
    file_info.classList.add('file_info');
    file_info.id = 'file_info';
    file_info.textContent = ' ' + size;
    
    selected_file.appendChild(file_name);
    selected_file.appendChild(file_info);

    selected_file.addEventListener('click', () => deleteOldFile());

    form.appendChild(selected_file);
});

// Evento de troca de tema:
themeChanger.addEventListener('change', () => {
    if(themeChanger.checked) {
        root.dataset.theme = 'light';
        divSun.style.boxShadow = '0 0 5px 5px #ffdd00';
        divSun.style.backgroundColor = '#ffdd00';
        divMoon.style.boxShadow = '0 0 0 0 #ffffff4e inset';
        divMoon.classList.remove('themeMoonDark');
        divMoon.classList.add('themeMoonLight');
        divMoon.addEventListener('transitionend', () => {
            divMoon.classList.remove('themeMoonLight');
            divMoon.classList.add('themeDefault');
        });
    } else {
        root.dataset.theme = 'dark';
        divSun.style.boxShadow = '0 0 15px 3px #fff1b1';
        divSun.style.backgroundColor = '#a49e80ff';
        divMoon.style.boxShadow = '0 0 15px 1px #ffffff4e inset';
        divMoon.classList.remove('themeDefault');
        divMoon.classList.add('themeMoonDark');
    };
});

// Declaração do evento principal:
form.addEventListener("submit", e => {
    e.preventDefault();

    const formData = new FormData();
    
    const file = fileInput.files[0];

    if(!textarea.value && !file) {
        console.log('sem conteudo no textarea!');
        // Implementar!
        return;
    };
    if(file) {
        formData.append('file', file);
    };
    if(textarea.value) {
        formData.append('text', textarea.value);
    };

    console.log('botao clicado!')
    
    loading.classList.remove('hidden');

    fetch('https://autou-backend-fxlt.onrender.com/email-process', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.status);
            console.log(data.data.category);
            console.log(data.data.email);
            
            const categoria = data.data.category;
            const email = data.data.email
            
            loading.classList.add('hidden');
            deleteOldFile();
            showEmailResponse(categoria, email);
        })
        .catch(error => {
            console.log('Error!!!', error);
        });
});
