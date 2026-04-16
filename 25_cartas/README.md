# 25 Cartas

Experiência romântica mobile-first criada para a pasta `25_cartas`, inspirada na linguagem premium do projeto original `Célia's Day`.

## Estrutura

- `index.html` — layout da experiência
- `styles.css` — direção visual, animações e responsividade
- `script.js` — lógica das cartas, progresso, capítulos e cena final
- `config.js` — todos os textos, capítulos, labels, assets e afinações
- `assets/ornament-bow.svg` — laço decorativo
- `assets/celia-memory.jpg` — fotografia usada no momento final

## O que editar

### Textos e capítulos

Tudo está centralizado em [`config.js`](C:/xampp/htdocs/celia/25_cartas/config.js):

- `opening`
- `overview`
- `buttonLabels`
- `labels`
- `finale`
- `chapters`

### Foto final

Trocar o ficheiro:

- [`assets/celia-memory.jpg`](C:/xampp/htdocs/celia/25_cartas/assets/celia-memory.jpg)

Se mudares o nome/caminho, atualiza também:

- `SITE_CONFIG.assets.photo`

### Laço decorativo

Podes substituir:

- [`assets/ornament-bow.svg`](C:/xampp/htdocs/celia/25_cartas/assets/ornament-bow.svg)

e ajustar em:

- `SITE_CONFIG.assets.bow`

## Comportamento

- As 25 cartas estão organizadas em 5 capítulos.
- Os capítulos desbloqueiam-se de forma sequencial.
- O progresso fica guardado em `localStorage`.
- Quando a 25.ª carta é aberta, o fecho final fica disponível automaticamente.

## Nota

Esta versão foi pensada para correr como site estático simples, sem backend nem dependências adicionais.
