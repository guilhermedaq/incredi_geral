# Redirecionador Incredi — Vercel

Projeto simples, sem Supabase, banco de dados ou dependências externas.

## O que faz
- A cada acesso GET em `/api/retorno`, escolhe aleatoriamente um dos dois números.
- Redireciona para o WhatsApp com a mensagem pré-preenchida.
- A pessoa ainda precisa tocar em **Enviar** no WhatsApp.
- O sorteio é 50/50 em probabilidade, não uma divisão exata por quantidade.

## Números configurados
- WhatsApp 1: +55 21 98445-6488
- WhatsApp 2: +55 21 98449-1940

## Mensagem configurada
Olá, quero evitar as altas taxas de protesto.

## Publicar na Vercel (sem terminal)
1. Extraia este ZIP no computador.
2. Entre em https://vercel.com/ e crie uma conta ou faça login.
3. Crie um repositório no GitHub e envie os arquivos desta pasta para ele, **ou** use a opção de importar projeto disponível na sua conta Vercel.
4. Na Vercel, escolha **Add New → Project** e importe o repositório.
5. Mantenha as configurações padrão. Não é necessário configurar variáveis de ambiente, banco de dados ou instalar pacotes.
6. Clique em **Deploy**.
7. Depois da publicação, a Vercel mostrará um domínio parecido com `nome-do-projeto.vercel.app`.

## Link para colocar no botão da Gupshup
Use o domínio gerado pela Vercel seguido de:
`/api/retorno`

Exemplo ilustrativo:
`https://incredi-redirecionador.vercel.app/api/retorno`

O endereço acima é apenas um exemplo; use o domínio real que a Vercel gerar.

## Teste
Abra `https://SEU-DOMINIO.vercel.app/api/retorno` em uma janela anônima ou no celular. O navegador deverá encaminhar para um dos dois WhatsApps, com o texto preenchido. Faça vários testes para observar os dois destinos.

## Observações importantes
- O sorteio acontece a cada acesso ao link. Um mesmo usuário que clicar novamente pode cair no outro número.
- A probabilidade é de 50% para cada número, mas pequenas amostras podem ficar desequilibradas.
- Pré-visualizadores de links e verificadores automáticos podem acessar o endereço antes do usuário e consumir um sorteio. Teste o comportamento real antes de iniciar uma campanha grande.
- O redirecionador não envia a mensagem sozinho: o usuário precisa confirmar o envio no WhatsApp.
- Para alterar números ou texto, edite `api/retorno.js` e publique novamente na Vercel.
