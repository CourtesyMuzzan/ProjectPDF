const modal = document.getElementById("pixModal");

const openBtn = document.getElementById("openPixModal");
const openPixTop = document.getElementById("openPixTop");
const openPixHero = document.getElementById("openPixHero");

const closeBtn = document.getElementById("closePixModal");
const closeBtn2 = document.getElementById("closePixModal2");

const copyBtn = document.getElementById("copyPix");
const pixCode = document.getElementById("pixCode");
const copyHint = document.getElementById("copyHint");

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

/* =========================
   MODAL PIX
========================= */
function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    if (copyHint) copyHint.textContent = "";
    setTimeout(() => pixCode.focus(), 50);
}

function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
}

openBtn.addEventListener("click", openModal);
openPixTop.addEventListener("click", openModal);
openPixHero.addEventListener("click", openModal);

closeBtn.addEventListener("click", closeModal);
closeBtn2.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
    const clickedBackdrop = e.target.dataset.close === "true";
    if (clickedBackdrop) closeModal();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});

copyBtn.addEventListener("click", async() => {
    try {
        const text = (pixCode.value || "").trim();
        await navigator.clipboard.writeText(text);
        if (copyHint) copyHint.textContent = "Código Pix copiado com sucesso.";
    } catch {
        pixCode.select();
        document.execCommand("copy");
        if (copyHint) copyHint.textContent = "Código Pix copiado.";
    }
});

/* =========================
   ABAS (Venda / Resultados)
========================= */
const tabButtons = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");

function setActiveTab(tabName) {
    tabButtons.forEach(btn => {
        btn.classList.toggle("is-active", btn.dataset.tab === tabName);
    });
    panels.forEach(panel => {
        panel.classList.toggle("is-active", panel.dataset.panel === tabName);
    });

    // fecha modal se trocar de aba
    if (modal.classList.contains("is-open")) closeModal();

    // opcional: rolar pro topo ao trocar de aba
    window.scrollTo({ top: 0, behavior: "smooth" });
}

tabButtons.forEach(btn => {
    btn.addEventListener("click", () => setActiveTab(btn.dataset.tab));
});

// Botão dentro de Resultados para voltar pra Venda
const goVenda = document.getElementById("goVenda");
goVenda.addEventListener("click", () => setActiveTab("venda"));

// Estado inicial
setActiveTab("venda");