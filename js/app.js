let indiceAtual = 0;
let listaFiltrada = [...DEVOCIONAIS];

const $ = (id) => document.getElementById(id);

const elInicio = $("inicio");
const elReadingMode = $("reading-mode");
const elReadingList = $("reading-list");

const elId = $("dev-id");
const elTitulo = $("dev-titulo");
const elReferencia = $("dev-referencia");
const elPalavra = $("dev-palavra");
const elVersiculos = $("dev-versiculos");
const elVerdade = $("dev-verdade");
const elExplicacao = $("dev-explicacao");
const elAplicacao = $("dev-aplicacao");
const elReflexao = $("dev-reflexao");

const listaEl = $("lista-devocionais");
const contadorEl = $("contador");
const buscaEl = $("busca");
const grupoEl = $("filtro-grupo");

const btnAnterior = $("btn-anterior");
const btnProximo = $("btn-proximo");
const btnAleatorio = $("btn-aleatorio");
const btnCopiar = $("btn-copiar");
const btnLeitura = $("btn-leitura");
const btnSairLeitura = $("btn-sair-leitura");
const btnHome = $("btn-home");
const btnToggleSidebar = $("btn-toggle-sidebar");

const modalVersiculo = $("modal-versiculo");
const modalTitulo = $("modal-versiculo-titulo");
const modalTexto = $("modal-versiculo-texto");
const modalLink = $("modal-versiculo-link");
const btnFecharModal = $("btn-fechar-modal");
const btnCopiarVersiculo = $("btn-copiar-versiculo");

let referenciaAtualModal = "";

function limparElemento(elemento) {
  elemento.replaceChildren();
}

function criarElemento(tag, classe, texto) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (texto !== undefined && texto !== null) elemento.textContent = texto;
  return elemento;
}

function livroSlug(ref) {
  const livro = ref.split(" ").slice(0, -1).join(" ").toLowerCase();
  const mapa = {
    "gênesis":"gn", "genesis":"gn", "êxodo":"ex", "levítico":"lv", "levitico":"lv", "números":"nm", "numeros":"nm", "deuteronômio":"dt", "deuteronomio":"dt", "josué":"js", "josue":"js", "juízes":"jz", "juizes":"jz", "rute":"rt", "1 samuel":"1sm", "2 samuel":"2sm", "1 reis":"1rs", "2 reis":"2rs", "1 crônicas":"1cr", "1 cronicas":"1cr", "2 crônicas":"2cr", "2 cronicas":"2cr", "esdras":"ed", "neemias":"ne", "ester":"et", "jó":"jo", "jo":"jo", "salmo":"sl", "salmos":"sl", "provérbios":"pv", "proverbios":"pv", "eclesiastes":"ec", "cantares":"ct", "isaías":"is", "isaias":"is", "jeremias":"jr", "lamentações":"lm", "lamentacoes":"lm", "ezequiel":"ez", "daniel":"dn", "oséias":"os", "oseias":"os", "joel":"jl", "amós":"am", "amos":"am", "obadias":"ob", "jonas":"jn", "miquéias":"mq", "miqueias":"mq", "naum":"na", "habacuque":"hc", "sofonias":"sf", "ageu":"ag", "zacarias":"zc", "malaquias":"ml",
    "mateus":"mt", "marcos":"mc", "lucas":"lc", "joão":"jo", "joao":"jo", "atos":"atos", "romanos":"rm", "1 coríntios":"1co", "1 corintios":"1co", "2 coríntios":"2co", "2 corintios":"2co", "gálatas":"gl", "galatas":"gl", "efésios":"ef", "efesios":"ef", "filipenses":"fp", "colossenses":"cl", "1 tessalonicenses":"1ts", "2 tessalonicenses":"2ts", "1 timóteo":"1tm", "1 timoteo":"1tm", "2 timóteo":"2tm", "2 timoteo":"2tm", "tito":"tt", "filemom":"fm", "hebreus":"hb", "tiago":"tg", "1 pedro":"1pe", "2 pedro":"2pe", "1 joão":"1jo", "1 joao":"1jo", "2 joão":"2jo", "2 joao":"2jo", "3 joão":"3jo", "3 joao":"3jo", "judas":"jd", "apocalipse":"ap"
  };
  return mapa[livro] || "busca";
}

function linkBibliaOnline(ref) {
  const partes = ref.match(/^(.+)\s(\d+):(\d+(?:-\d+)?)$/);
  if (!partes) return "https://www.bibliaonline.com.br/acf/busca?q=" + encodeURIComponent(ref);
  const slug = livroSlug(ref);
  if (slug === "busca") return "https://www.bibliaonline.com.br/acf/busca?q=" + encodeURIComponent(ref);
  return `https://www.bibliaonline.com.br/acf/${slug}/${partes[2]}/${partes[3]}`;
}

function textoMeditacao(ref) {
  const r = ref.toLowerCase();
  if (r.includes("mateus 4")) return "Este trecho mostra Jesus no deserto, enfrentando tentações e vencendo por meio da Palavra de Deus. É uma referência forte para lembrar que o deserto não precisa destruir a fé; ele pode revelar firmeza, obediência e dependência do Pai.";
  if (r.includes("salmo 23")) return "Este versículo lembra que, mesmo no vale mais escuro, Deus continua presente. A presença do Senhor consola, guia e fortalece o coração contra o medo.";
  if (r.includes("isaías 41") || r.includes("isaias 41")) return "Deus chama seu povo a não temer, pois Ele fortalece, ajuda e sustenta. É uma palavra para momentos de medo, fraqueza e incerteza.";
  if (r.includes("joão 14:6") || r.includes("joao 14:6")) return "Jesus se revela como o caminho, a verdade e a vida. Esta referência aponta para Cristo como direção segura, verdade eterna e fonte de vida com o Pai.";
  if (r.includes("joão 8:12") || r.includes("joao 8:12")) return "Jesus se apresenta como a Luz do mundo. Quem o segue não precisa permanecer nas trevas, pois recebe direção, vida e esperança.";
  if (r.includes("joão 16:33") || r.includes("joao 16:33")) return "Jesus ensina que nele há paz. Mesmo existindo aflições no mundo, Ele venceu o mundo; por isso, o coração pode ter bom ânimo.";
  if (r.includes("romanos 8:31")) return "Esta referência fortalece a confiança: se Deus está conosco, nenhuma oposição é maior que o cuidado e a presença dele.";
  if (r.includes("mateus 5:13") || r.includes("mateus 5:44") || r.includes("mateus 22:39")) return "Esta referência chama a viver uma fé prática: amar, perdoar, fazer o bem e ser luz diante das pessoas. A Palavra se torna visível em atitudes.";
  if (r.includes("filipenses 4")) return "Esta referência fala sobre paz, contentamento e força em Cristo. Ela convida a entregar ansiedades a Deus e descansar na força que vem dele.";
  if (r.includes("2 timóteo 1:7") || r.includes("2 timoteo 1:7")) return "Deus não nos deu espírito de medo, mas de poder, amor e moderação. Esta referência ajuda a combater pensamentos que tentam paralisar a alma.";
  if (r.includes("efésios 4") || r.includes("efesios 4")) return "Esta referência aponta para uma nova forma de viver: perdão, renovação interior e abandono das velhas atitudes para caminhar com Deus.";
  if (r.includes("2 coríntios 5:17") || r.includes("2 corintios 5:17")) return "Em Cristo há nova criação. Esta referência fala de recomeço, transformação e uma vida que não precisa ser definida pelo passado.";
  if (r.includes("tiago") || r.includes("romanos 5") || r.includes("2 coríntios 12") || r.includes("2 corintios 12")) return "Esta referência mostra que Deus pode usar dificuldades para formar perseverança, esperança e maturidade espiritual. A fraqueza pode se tornar lugar de graça.";
  if (r.includes("salmo 34")) return "Esta referência lembra que Deus está perto dos quebrantados de coração. Ela consola quem está ferido e aponta para a restauração em Deus.";
  if (r.includes("hebreus") || r.includes("marcos 9") || r.includes("mateus 17")) return "Esta referência fala sobre fé: confiar em Deus mesmo quando ainda não se vê a resposta. A fé verdadeira olha para o Senhor acima das impossibilidades.";
  if (r.includes("provérbios") || r.includes("proverbios")) return "Esta referência traz sabedoria prática para viver melhor diante de Deus e das pessoas, cuidando das palavras, atitudes e intenções do coração.";
  return "Esta referência bíblica foi escolhida para meditação junto desta palavra do livro. Leia com calma, ore sobre o que Deus quer ensinar e permita que a Palavra ilumine sua próxima atitude.";
}

function abrirModalVersiculo(ref) {
  referenciaAtualModal = ref;
  modalTitulo.textContent = ref;
  modalTexto.textContent = textoMeditacao(ref) + "\n\nPara ler o texto bíblico completo, clique no botão abaixo e abra a referência na Bíblia Online.";
  modalLink.href = linkBibliaOnline(ref);
  modalVersiculo.hidden = false;
  document.body.classList.add("modal-open");
  btnFecharModal.focus();
}

function fecharModalVersiculo() {
  modalVersiculo.hidden = true;
  document.body.classList.remove("modal-open");
}

function copiarReferenciaModal() {
  const texto = `${referenciaAtualModal}\n\n${textoMeditacao(referenciaAtualModal)}\n\nLer na Bíblia Online: ${linkBibliaOnline(referenciaAtualModal)}`;
  navigator.clipboard.writeText(texto)
    .then(() => mostrarToast("Referência copiada."))
    .catch(() => mostrarToast("Não foi possível copiar automaticamente."));
}

function grupoDoId(id) {
  return id.split("-")[1];
}

function mostrarToast(texto) {
  const antigo = document.querySelector(".toast");
  if (antigo) antigo.remove();

  const toast = criarElemento("div", "toast", texto);
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2200);
}

function mostrarDevocional(indexOriginal) {
  const dev = DEVOCIONAIS[indexOriginal];
  if (!dev) return;

  indiceAtual = indexOriginal;

  elId.textContent = dev.id;
  elTitulo.textContent = dev.titulo;
  elReferencia.textContent = "Referências: " + dev.referencias.join(" • ");
  elPalavra.textContent = dev.palavra;

  limparElemento(elVersiculos);
  dev.referencias.forEach((ref) => {
    const li = document.createElement("li");
    const button = criarElemento("button", "verse-button", ref);
    button.type = "button";
    button.setAttribute("aria-label", `Abrir meditação de ${ref}`);
    button.addEventListener("click", () => abrirModalVersiculo(ref));
    li.appendChild(button);
    elVersiculos.appendChild(li);
  });

  elVerdade.textContent = dev.verdade;
  elExplicacao.textContent = dev.explicacao;
  elAplicacao.textContent = dev.aplicacao;
  elReflexao.textContent = dev.reflexao;

  btnAnterior.disabled = indiceAtual === 0;
  btnProximo.disabled = indiceAtual === DEVOCIONAIS.length - 1;

  destacarItemLista();
}

function montarGrupos() {
  const grupos = [...new Set(DEVOCIONAIS.map((dev) => grupoDoId(dev.id)))].sort((a, b) => Number(a) - Number(b));
  grupos.forEach((grupo) => {
    const option = criarElemento("option", "", `Grupo ${grupo}`);
    option.value = grupo;
    grupoEl.appendChild(option);
  });
}

function aplicarFiltros() {
  const termo = buscaEl.value.trim().toLowerCase();
  const grupo = grupoEl.value;

  listaFiltrada = DEVOCIONAIS.filter((dev) => {
    const matchTermo =
      !termo ||
      dev.id.toLowerCase().includes(termo) ||
      dev.titulo.toLowerCase().includes(termo) ||
      dev.palavra.toLowerCase().includes(termo) ||
      dev.verdade.toLowerCase().includes(termo);

    const matchGrupo = grupo === "todos" || grupoDoId(dev.id) === grupo;

    return matchTermo && matchGrupo;
  });

  montarLista();
}

function montarLista() {
  limparElemento(listaEl);
  contadorEl.textContent = `${listaFiltrada.length} de ${DEVOCIONAIS.length} palavras`;

  if (listaFiltrada.length === 0) {
    const vazio = criarElemento("div", "dev-item");
    vazio.appendChild(criarElemento("strong", "", "Nenhum resultado encontrado."));
    vazio.appendChild(criarElemento("small", "", "Tente buscar outro termo."));
    listaEl.appendChild(vazio);
    return;
  }

  listaFiltrada.forEach((dev) => {
    const indexOriginal = DEVOCIONAIS.indexOf(dev);
    const item = criarElemento("button", "dev-item");
    item.type = "button";
    item.dataset.index = String(indexOriginal);

    item.appendChild(criarElemento("small", "", dev.id));
    item.appendChild(criarElemento("strong", "", dev.titulo));

    item.addEventListener("click", () => {
      mostrarDevocional(indexOriginal);
      if (window.innerWidth < 860) {
        listaEl.style.display = "none";
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    listaEl.appendChild(item);
  });

  destacarItemLista();
}

function destacarItemLista() {
  const itens = listaEl.querySelectorAll(".dev-item");
  itens.forEach((item) => {
    item.classList.toggle("active", Number(item.dataset.index) === indiceAtual);
  });
}

function copiarPalavra() {
  const dev = DEVOCIONAIS[indiceAtual];
  const texto = `${dev.id} — ${dev.palavra}\n\nVerdade central: ${dev.verdade}\n\nReferências: ${dev.referencias.join(", ")}`;
  navigator.clipboard.writeText(texto)
    .then(() => mostrarToast("Palavra copiada."))
    .catch(() => mostrarToast("Não foi possível copiar automaticamente."));
}

function irAleatorio() {
  if (DEVOCIONAIS.length <= 1) return;
  let novoIndice;
  do {
    novoIndice = Math.floor(Math.random() * DEVOCIONAIS.length);
  } while (novoIndice === indiceAtual);

  mostrarDevocional(novoIndice);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function criarSecaoLeitura(titulo, texto) {
  const div = criarElemento("div", "dev-section");
  div.appendChild(criarElemento("h3", "", titulo));
  div.appendChild(criarElemento("p", "", texto));
  return div;
}

function abrirModoLeitura() {
  limparElemento(elReadingList);

  DEVOCIONAIS.forEach((dev) => {
    const article = criarElemento("article", "reading-card");
    article.appendChild(criarElemento("p", "dev-id", dev.id));
    article.appendChild(criarElemento("h3", "", dev.titulo));
    article.appendChild(criarElemento("p", "palavra", `“${dev.palavra}”`));
    article.appendChild(criarElemento("p", "dev-referencia", `Referências: ${dev.referencias.join(" • ")}`));
    article.appendChild(criarSecaoLeitura("Verdade Central", dev.verdade));
    article.appendChild(criarSecaoLeitura("Reflexão", dev.reflexao));
    elReadingList.appendChild(article);
  });

  elInicio.hidden = true;
  elReadingMode.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function sairModoLeitura() {
  elReadingMode.hidden = true;
  elInicio.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

btnAnterior.addEventListener("click", () => {
  if (indiceAtual > 0) mostrarDevocional(indiceAtual - 1);
});

btnProximo.addEventListener("click", () => {
  if (indiceAtual < DEVOCIONAIS.length - 1) mostrarDevocional(indiceAtual + 1);
});

btnAleatorio.addEventListener("click", irAleatorio);
btnCopiar.addEventListener("click", copiarPalavra);
btnLeitura.addEventListener("click", abrirModoLeitura);
btnSairLeitura.addEventListener("click", sairModoLeitura);

btnHome.addEventListener("click", () => {
  if (!elReadingMode.hidden) sairModoLeitura();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

btnToggleSidebar.addEventListener("click", () => {
  const style = window.getComputedStyle(listaEl);
  listaEl.style.display = style.display === "none" ? "block" : "none";
});

buscaEl.addEventListener("input", aplicarFiltros);
grupoEl.addEventListener("change", aplicarFiltros);

btnFecharModal.addEventListener("click", fecharModalVersiculo);
btnCopiarVersiculo.addEventListener("click", copiarReferenciaModal);

modalVersiculo.addEventListener("click", (event) => {
  if (event.target.matches("[data-fechar-modal]")) fecharModalVersiculo();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modalVersiculo.hidden) fecharModalVersiculo();
});

document.addEventListener("DOMContentLoaded", () => {
  montarGrupos();
  aplicarFiltros();
  mostrarDevocional(0);
});
