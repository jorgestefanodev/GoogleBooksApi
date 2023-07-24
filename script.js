// Caminhos para a API de acordo com o tipo de busca (por autor, palavra chave ou titulo)
const URL_PC = "https://www.googleapis.com/books/v1/volumes?q="
const URL_TITULO = "https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?"


// Redireciona para a função correspondente a opção de consulta
const redirecionador = () => {
    let opcaoStorage = localStorage.getItem('opcao').replace(/["]/g, '')
    console.log(opcaoStorage)

    if (opcaoStorage  == "autor") {
        resultadoAutor()
    } else if (opcaoStorage == "palavraChave") {
        resultadoPalavraChave()
    } else if(opcaoStorage == "titulo") {
        resultadoTitulo()
    } else if(opcaoStorage == "autor" && opcaoStorage == "palavraChave" && opcaoStorage == "titulo"){
        alert("Escolha apenas uma opção de busca")
    } else {
        alert("Escolha uma das opções de busca")
    }
}


// Recebe o texto de busca e a opcao(Autor, PalavraChave ou Titulo)
const consumirApi = () => {
    let input = document.querySelector('input').value
    let opcao = document.querySelector('input[name="opcao"]:checked').value
  
    //Converte as opcoes em Json
    localStorage.setItem('busca', JSON.stringify(input))
    localStorage.setItem('opcao', JSON.stringify(opcao))

    redirecionador()

    //Redireciona para pagina de resultados da pesquisa
    window.location.href = 'resultados.html'   
}


// Resultado por palavra chave      ERRO ESTÁ AQUI
const resultadoPalavraChave = () => {    
    let capaLivro = document.querySelector('.resultado')

    let span = document.getElementById('span')
    console.log(capaLivro)
    
    let palavraChaveStorage = localStorage.getItem('busca').replace(/["]/g, '')
    console.log(palavraChaveStorage)

    span.innerHTML += `<span>${palavraChaveStorage}</span>` 
    
    fetch(`${URL_PC} + ${palavraChaveStorage}`)
    .then(resposta => {return resposta.json()})
    .then(resultado => {
        let livros = resultado.items
        console.log(livros)
        livros.forEach(livro => {
            capaLivro.innerHTML += `
                <img src="${livro.volumeInfo.imageLinks.thumbnail}"/>
            `
        })
    })
}


// Resultado por palavra Titulo
const resultadoTitulo = () => {    
    let capaLivro = document.querySelector('.resultado')
    capaLivro.innerHTML = ''
    
    let titulo = localStorage.getItem('titulo').replace(/["]/g, '')
    
    fetch(`${URL}${titulo}`)
    .then(resposta => {return resposta.json()})
    .then(resultado => {
        let livros = resultado.items
        console.log(livros)
        livros.forEach(livro => {
            capaLivro.innerHTML += `
                <img src="${livro.volumeInfo.imageLinks.thumbnail}"/>
            `
            //console.log(livro.volumeInfo.imageLinks.thumbnail)
        })
    })
}
