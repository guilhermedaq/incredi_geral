// Redirecionador Incredi — Vercel
// Cada acesso escolhe aleatoriamente um dos dois WhatsApps.

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

  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  return res.redirect(302, destino);
};
