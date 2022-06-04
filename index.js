require("dotenv").config();
const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const port = process.env.PORT || 3000;

let message = "";

const books = [
  {
    id: 1,
    name: "Extraordinário",
    image: "https://d1pkzhm5uq4mnt.cloudfront.net/imagens/capas/_04728d596b397809915ec6512d8902a5f4c66cad.jpg",
    synopsis:
      "August Pullman, o Auggie, nasceu com uma síndrome genética cuja sequela é uma severa deformidade facial, que lhe impôs diversas cirurgias e complicações médicas. Por isso, ele nunca havia frequentado uma escola de verdade...",
    author: "R. J. Palacio",
  },
  {
    id: 2,
    name: "O Pequeno Príncipe",
    image: "https://d1pkzhm5uq4mnt.cloudfront.net/imagens/capas/_76c2b28191d3661a57c7bd6516ef0ba6de1e684d.jpg",
    synopsis:
      "Apesar da presença explícita de dois personagens e do registro de um diálogo entre o aviador e uma criança, diversos aspectos autobiográficos estão presentes nesta narrativa, publicada pela primeira vez em 1945.",
    author: "Antoine de Saint-exupery",
  },
  {
    id: 3,
    name: "O Poder do Subconsciente",
    image: "https://d1pkzhm5uq4mnt.cloudfront.net/imagens/capas/_532bdd9b99e7727a7cbff205707bb4191de53e85.jpg",
    synopsis:
      "Neste livro, Murphy, divulga seu método para atingir essa meta universalmente desejada - uma vida mais produtiva e plena de significado.",
    author: "Joseph Murphy",
  },
  {
    id: 4,
    name: "Operação Banqueiro",
    image: "https://d1pkzhm5uq4mnt.cloudfront.net/imagens/capas/99b9ec57098018f363da775b7fc9ce2cc41732c6.jpg",
    synopsis:
      "Nesse livro, Rubens Valente, conhecido repórter investigativo da Folha de São Paulo mostra fatos, documentos e diversos detalhes sobre a operação Satiagraha, que causou um estranho acontecimento no Brasil em 2008.",
    author: "Rubens Valente",
  },
  {
    id: 5,
    name: "Notas sobre o Luto",
    image: "https://d1pkzhm5uq4mnt.cloudfront.net/imagens/capas/_abf192a5dc0b0fb6d5e45d42442371df8701a035.jpg",
    synopsis:
      "Escrito por uma das maiores vozes da literatura contemporânea, esse livro é um relato não apenas sobre a morte de um pai amado, mas também sobre a memória e a esperança que permanecem com aqueles que ficam.",
    author: "Chimamanda Ngozi Adichie",
  },
  {
    id: 6,
    name: "No Seu Pescoço",
    image: "https://d1pkzhm5uq4mnt.cloudfront.net/imagens/capas/_dbb49d24e28f80b1db92e1e3cd014d84988af3c1.jpg",
    synopsis:
      "A escritora nigeriana Chimamanda Ngozi Adichie vem conquistando um público cada vez maior, tanto no Brasil como fora dele. Em 2007, seu romance Meio sol amarelo venceu o National Book Critics Circle Award e o Orange Prize de ficção, mas foi com o romance seguinte, Americanah, que ela atingiu o volume de leitores que a alavancou para o topo das listas de mais vendidos dos Estados Unidos, onde vive atualmente.",
    author: "Chimamanda Ngozi Adichie",
  },
  {
    id: 7,
    name: "Kindred - Laços de Sangue",
    image: "https://d1pkzhm5uq4mnt.cloudfront.net/imagens/capas/mp_2629658cf97fb8aaaff5f3fdd393d3f4.jpg",
    synopsis:
      "Em seu vigésimo sexto aniversário, Dana e seu marido estão de mudança para um novo apartamento. Em meio a pilhas de livros e caixas abertas, ela começa a se sentir tonta e cai de joelhos, nauseada. Então, o mundo se despedaça.",
    author: "Octavia E. Butler",
  },
  {
    id: 8,
    name: "Eleanor & Park",
    image: "https://d1pkzhm5uq4mnt.cloudfront.net/imagens/capas/95d9f4933ae0ba002f7dbd73a5cd9bdb675a9e3c.jpg",
    synopsis:
      "Eleonor & Park é livro único e apaixonante, com diversas qualidades, engraçado, sarcástico, sincero, triste e acima de tudo, geek, trazendo personagens apaixonados pela cultura geek nesse romance incrível.",
    author: "Rainbow Rowell",
  }
];

// Rotas
app.get("/", (req, res) => {
  setTimeout(() => {
    message = "";
  }, 1000);
  res.render("index", { books, message });
});

app.get("/register", (req, res) => {
  res.status(200).render("register.ejs");
});

app.get("/details/:id", (req, res) => {
  let book = [];
  books.filter((elemento) => {
    if (elemento.id == req.params.id) {
      book.push(elemento);
    }
  });
  res.status(200).render("details.ejs", {
    book,
  });
});

// Criar novo objeto
app.post("/create", (req, res) => {
  const book = req.body;
  book.id = books.length + 1;
  books.push(book);
  message = "Livro cadastrado com sucesso!";
  res.redirect("/");
});

app.get("/update/:id", (req, res) => {
  const id = +req.params.id;
  const book = books.find(book => book.id === id);
  res.render("update.ejs", { book, books });
});

app.post("/update/:id", (req, res) => {
  const id = +req.params.id - 1;
  const newBook = req.body;
  newBook.id = id + 1;
  books[id] = newBook;
  message = `Livro atualizado com sucesso!`;
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  const id = +req.params.id - 1;
  delete books[id];
  message = `Livro apagado com sucesso!`;
  res.redirect("/");
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
