# Palavras que me ajudam e pode ajudar vós

Primeira versão oficial do site do livro cristão gratuito da Vitorsz Corp.

## Como abrir

1. Extraia o ZIP.
2. Abra a pasta no VSCode.
3. Abra o `index.html` no navegador.
4. Para editar o conteúdo, abra `data/devocionais.js`.

## Estrutura

```text
palavras-vitorsz-site-v2/
├─ index.html
├─ css/
│  └─ style.css
├─ js/
│  └─ app.js
└─ data/
   └─ devocionais.js
```

## O que foi ajustado nesta versão

- Removido botão de WhatsApp.
- Adicionado botão para sair do modo leitura.
- Removida a seção de tutorial da interface pública.
- Cada palavra recebeu estrutura própria com:
  - Palavra do livro
  - Versículos para meditar
  - Verdade Central
  - Explicação
  - Aplicação prática
  - Reflexão
- Mantido layout escuro, responsivo e com estilo de livro.


## Alterações da versão 3

- Adicionada a palavra `85-10`.
- Adicionado botão `Leia a Bíblia`, abrindo em nova guia.
- Removida repetição na explicação das palavras.
- Adicionada seção de incentivo à doação para instituições de saúde, com links externos oficiais.


## Alterações da versão 4

- Adicionados pop-ups responsivos nos botões de `Versículos para meditar`.
- Cada referência bíblica abre uma janela com meditação do trecho.
- Adicionado botão para ler a referência na Bíblia Online.
- Adicionado botão para copiar a referência do pop-up.


## Alterações da versão 5 — segura para publicação

- Pop-ups mantidos.
- Layout mantido.
- Doações mantidas.
- Favicon mantido.
- Botão `Leia a Bíblia` mantido.
- Adicionado arquivo `_headers` com cabeçalhos de segurança para Cloudflare Pages.
- Adicionado `robots.txt`.
- Adicionado `sitemap.xml`.
- JavaScript revisado para evitar `innerHTML` nos conteúdos dinâmicos.

## Atenção antes de publicar

Se o link final da Cloudflare Pages for diferente de `https://palavras-vitorsz.pages.dev`, atualize esse endereço em:

- `robots.txt`
- `sitemap.xml`


## Alterações da versão 6

- Adicionado botão `Modo Light` no topo do site.
- O usuário pode alternar entre tema escuro e tema claro.
- A preferência de tema fica salva no navegador com `localStorage`.
- O layout, pop-ups, doações, favicon e botão `Leia a Bíblia` foram mantidos.


## Alterações da versão 7

- Corrigido contraste dos títulos e textos no `Modo Light`.
- Ajustados os títulos `Versículos para meditar`, `Verdade Central`, `Explicação`, `Aplicação prática` e `Reflexão` para um cinza mais escuro.
- Mantido o layout, os pop-ups, as doações, o favicon e o botão de tema.
