// Redirecionador Incredi — Vercel
// Cada acesso escolhe aleatoriamente um dos WhatsApps e abre com o texto do cliente.
//
// Links:
//   https://incredigeral.vercel.app          -> texto padrão (protesto)
//   https://incredigeral.vercel.app/igreen   -> texto IGREEN
//   https://incredigeral.vercel.app/dental   -> texto Dental
//   https://incredigeral.vercel.app/magnum   -> texto MAGNUM
//   https://incredigeral.vercel.app/dental-negociacao -> texto Dental (negociação)
// Teste (mostra o sorteio sem abrir o WhatsApp): acrescente ?teste=1
//   ex.: https://incredigeral.vercel.app/magnum?teste=1

const { randomInt } = require("crypto");

const NUMEROS = [
  "5521984456488",
  "5521984491940"
];

// Texto usado no endereço principal e em qualquer caminho não cadastrado.
const MENSAGEM_PADRAO = "Olá, quero evitar as altas taxas de protesto.";

// Um caminho por cliente (sempre em minúsculas, sem acento e sem espaço).
const MENSAGENS = {
  igreen: "Olá, quero evitar as medidas legais referente à IGREEN.",
  dental: "Olá, quero evitar as altas taxas de protesto referente à Dental.",
  magnum: "Olá, quero evitar as altas taxas de protesto referente à MAGNUM.",
  "dental-negociacao": "Olá, quero aproveitar as oportunidades de negociação."
};

module.exports = (req, res) => {
  // Aceita GET (acesso normal) e HEAD (verificação de link feita por Meta/apps).
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return res.status(405).send("Método não permitido");
  }

  const query = req.query || {};
  const cliente = String(query.cliente || "").toLowerCase().trim();
  const mensagem = MENSAGENS[cliente] || MENSAGEM_PADRAO;

  const numero = NUMEROS[randomInt(NUMEROS.length)];
  const destino = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

  // Impede qualquer cache (navegador, CDN da Vercel e proxies).
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  res.setHeader("CDN-Cache-Control", "no-store");
  res.setHeader("Vercel-CDN-Cache-Control", "no-store");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  // Modo de teste: mostra o sorteio em vez de redirecionar.
  if (query.teste) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(200).send(
      `<meta name="viewport" content="width=device-width,initial-scale=1">` +
      `<div style="font-family:sans-serif">` +
      `<h2>Número sorteado: ${numero}</h2>` +
      `<p><b>Cliente:</b> ${cliente || "(padrão)"}</p>` +
      `<p><b>Texto:</b> ${mensagem}</p>` +
      `<p>${new Date().toISOString()}</p></div>`
    );
  }

  return res.redirect(302, destino);
};
