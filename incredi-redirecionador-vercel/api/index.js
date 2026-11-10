// Redirecionador Incredi — Vercel
// Cada acesso escolhe aleatoriamente um dos dois WhatsApps.
// Teste: abra https://SEU-SITE.vercel.app/?teste=1 e atualize a página várias vezes.

const { randomInt } = require("crypto");

const NUMEROS = [
  "5521984456488",
  "5521984491940"
];

const MENSAGEM = "Olá, quero evitar as altas taxas de protesto.";

module.exports = (req, res) => {
  // Aceita GET (acesso normal) e HEAD (verificação de link feita por Meta/apps).
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return res.status(405).send("Método não permitido");
  }

  const numero = NUMEROS[randomInt(NUMEROS.length)];
  const texto = encodeURIComponent(MENSAGEM);
  const destino = `https://wa.me/${numero}?text=${texto}`;

  // Impede qualquer cache (navegador, CDN da Vercel e proxies).
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
  res.setHeader("CDN-Cache-Control", "no-store");
  res.setHeader("Vercel-CDN-Cache-Control", "no-store");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  // Modo de teste: mostra o número sorteado em vez de redirecionar.
  if (req.query && req.query.teste) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(200).send(
      `<meta name="viewport" content="width=device-width,initial-scale=1">` +
      `<h2 style="font-family:sans-serif">Número sorteado: ${numero}</h2>` +
      `<p style="font-family:sans-serif">${new Date().toISOString()}</p>`
    );
  }

  return res.redirect(302, destino);
};
