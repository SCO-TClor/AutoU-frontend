# 🎨 AutoU Email Processor - Frontend

Interface web moderna e responsiva para processamento e categorização de emails com IA.

## ✨ Funcionalidades

- **Interface intuitiva**: Design limpo e profissional
- **Tema claro/escuro**: Alternância suave entre modos
- **Upload de arquivos**: Suporte para PDF e TXT (drag & drop visual)
- **Input de texto**: Cole emails diretamente na textarea
- **Resposta em tempo real**: Exibe categoria e email gerado pela IA
- **100% responsivo**: Funciona em desktop, tablet e mobile

## 📋 Pré-requisitos

- Navegador moderno (Chrome, Firefox, Edge, Safari)
- Backend rodando (veja [backend/README.md](../backend/README.md))

## 🚀 Como usar

### Opção 1: Live Server (VS Code)

1. Instale a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Clique com botão direito em `index.html`
3. Selecione "Open with Live Server"
4. A página abrirá em `http://127.0.0.1:5500`

### Opção 2: Servidor Python

```bash
cd frontend
python -m http.server 5501
```
Acesse: `http://127.0.0.1:5501`

### Opção 3: Abrir diretamente

Clique duas vezes em `index.html` (funciona, mas pode ter limitações de CORS)

## 🎯 Como processar um email
> **Hierarquia de prioridade:**
> - *PDF*
> - *TXT*
> - *texto bruto*

### Método 1: Texto direto
1. Cole o email na área de texto
2. Clique em "Send email"
3. Aguarde a resposta da IA

### Método 2: Upload de arquivo
1. Clique em "Escolher arquivo"
2. Selecione um PDF ou TXT
3. Clique em "Send email"
4. Aguarde o processamento

### Método 3: Híbrido
1. Cole texto inicial
2. Adicione um arquivo PDF/TXT
3. O sistema enviará ambos e decidirá com base na hierarquia definida

## 📂 Estrutura do Projeto

```
frontend/
├── index.html      # Estrutura HTML
├── style.css       # Estilos e temas
├── script.js       # Lógica e requisições
└── assets/
    ├── download.png       # Logo AutoU
    └── AutoU_logo.jpg     # Favicon
```

## 🎨 Temas

### Tema Escuro (padrão)
- Fundo preto (#000)
- Texto claro (#F2F2F2)
- Acentos sutis

### Tema Claro
- Fundo branco (#FFF)
- Texto escuro (#0D0D0D)
- Contraste otimizado

**Alternar tema:** Clique no ícone sol/lua no canto superior direito

## 🔧 Configuração da API

O frontend faz requisições para o backend. Certifique-se de que a URL está correta em `script.js`:

```javascript
// Linha 162 em script.js
fetch('http://127.0.0.1:8000/email-process', {
    method: 'POST',
    body: formData
})
```

**Para deploy em produção**, altere para a URL do seu backend:
```javascript
fetch('https://seu-backend.com/email-process', {
```

## 🌐 Deploy

### Opção 1: Vercel
```bash
npm i -g vercel
vercel
```

### Opção 2: Netlify
1. Arraste a pasta `frontend` para [Netlify Drop](https://app.netlify.com/drop)
2. Configure variáveis de ambiente se necessário

### Opção 3: GitHub Pages
1. Faça push para GitHub
2. Vá em Settings → Pages
3. Selecione a branch e pasta `frontend`

> ⚠️ **Importante**: Ao fazer deploy, atualize a URL da API em `script.js` para o endpoint de produção

## 🎨 Customização

### Cores do tema
Edite as variáveis CSS em `style.css`:

```css
:root[data-theme='dark'] {
    --bg: hsl(0, 0%, 5%);
    --textMain: hsl(0, 0%, 95%);
    /* ... */
}
```

### Fontes
O projeto usa Google Fonts:
- **Cinzel**: Títulos elegantes
- **Montserrat**: Texto geral
- **Orbitron**: Botões e elementos técnicos

Para trocar, edite o `@import` em `style.css`

## 📱 Responsividade

O layout se adapta automaticamente:
- **Desktop**: Layout completo com 70% da viewport
- **Tablet**: Ajuste para telas médias
- **Mobile**: Interface compacta e otimizada

Usa `clamp()` para dimensionamento fluido:
```css
width: clamp(300px, 70vw, 70%);
```

## 🐛 Troubleshooting

**Erro: CORS blocked**
- Certifique-se de que o backend está rodando
- Verifique se `ALLOWED_ORIGIN` no backend inclui a URL do frontend

**Botão não funciona**
- Abra o Console (F12)
- Verifique erros de JavaScript
- Confirme que `script.js` está carregando

**Arquivo não envia**
- Limite de tamanho: padrão do backend
- Formatos aceitos: `.pdf`, `.txt`

**Resposta não aparece**
- Verifique a resposta da API no Console
- Estrutura esperada: `data.data.category` e `data.data.email`

## 🛠️ Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Grid, Flexbox, Custom Properties, Animações
- **JavaScript ES6+**: Fetch API, DOM manipulation
- **Google Fonts**: Tipografia profissional

## 📝 Licença

Este projeto foi desenvolvido como desafio técnico para a AutoU.

---

💡 **Dica**: Para testar offline, use o método de texto direto sem upload de arquivos.