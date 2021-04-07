var cartaMestre = {
    nome: "Mestre dos Magos",
    imagem: "https://boraassistir.com.br/media/images/thumbs/small/mestre-dos-magos.jpg",
    atributos: {
        Ataque: 60,
        Defesa: 40,
        Magia: 100
    }
}

var cartaVingador = {
    nome: "Vingador",
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVZaFPRq3LEvV8aUv0y1XJgNe4Fg5DqJrsPg&usqp=CAU",
    atributos: {
        Ataque: 90,
        Defesa: 80,
        Magia: 100
    }
}

var cartaEric = {
    nome: "Eric",
    imagem: "http://4.bp.blogspot.com/-ak0_OlNc9NI/UEA54W9Fv1I/AAAAAAAAJmM/HBF5PPnXoVg/s1600/eric_the_cavalier_by_axlsalles-d55d4op.jpg",
    atributos: {
        Ataque: 75,
        Defesa: 80,
        Magia: 30
    }
}

var cartaPresto = {
    nome: "Presto",
    imagem: "https://i.pinimg.com/736x/12/6e/bc/126ebc9814878fedf877ab4558518ef3.jpg",
    atributos: {
        Ataque: 10,
        Defesa: 40,
        Magia: 89
    }
}

var cartaSheila = {
    nome: "Sheila",
    imagem: "http://4.bp.blogspot.com/-NORq13Qf_20/UEA69LT7ciI/AAAAAAAAJms/4pzXx468XH8/s640/ilustracoes-realistas-dos-personagens-de-caverna-do-dragao.jpg",
    atributos: {
        Ataque: 43,
        Defesa: 50,
        Magia: 67
    }
}

var cartaHank = {
    nome: "Hank",
    imagem: "http://3.bp.blogspot.com/-E1978UlB5QM/UEA6uUGStZI/AAAAAAAAJmk/HoNw0-M8xvs/s1600/the_ranger_by_axlsalles-d57g6ah.jpg",
    atributos: {
        Ataque: 90,
        Defesa: 70,
        Magia: 40
    }
}

var cartaDiana = {
    nome: "Diana",
    imagem: "http://1.bp.blogspot.com/-_tmzXWHis00/UEA6B9oUY7I/AAAAAAAAJmU/wZsPZ52jmPY/s1600/the_acrobat_by_axlsalles-d572cug.jpg",
    atributos: {
        Ataque: 85,
        Defesa: 50,
        Magia: 50
    }
}

var cartaBobby = {
    nome: "Bobby",
    imagem: "http://4.bp.blogspot.com/-MQe5QyZy1G8/UEA7JK2743I/AAAAAAAAJm0/SOUg7rYq2o8/s1600/the_barbarian_and_the_unicorn_by_axlsalles-d56hz05.jpg",
    atributos: {
        Ataque: 80,
        Defesa: 78,
        Magia: 36
    }
}

var cartaMaquina
var cartaJogador
var cartas = [cartaMestre, cartaVingador, cartaEric, cartaPresto, cartaSheila, cartaHank, cartaDiana, cartaBobby]
// 0          1           2

var pontosJogador = 0
var pontosMaquina = 0

atualizaPlacar()
atualizaQuantidadeDeCartas()

function atualizaQuantidadeDeCartas() {
    var divQuantidadeCartas = document.getElementById('quantidade-cartas')
    var html = "Quantidade de cartas no jogo: " + cartas.length

    divQuantidadeCartas.innerHTML = html
}

function atualizaPlacar() {
    var divPlacar = document.getElementById('placar')
    var html = "Jogador " + pontosJogador + "/" + pontosMaquina + " Computador"

    divPlacar.innerHTML = html
}

function sortearCarta() {
    var numeroCartaMaquina = parseInt(Math.random() * cartas.length)
    cartaMaquina = cartas[numeroCartaMaquina]
    cartas.splice(numeroCartaMaquina, 1)

    var numeroCartaJogador = parseInt(Math.random() * cartas.length)
    cartaJogador = cartas[numeroCartaJogador]
    cartas.splice(numeroCartaJogador, 1)

    document.getElementById('btnSortear').disabled = true
    document.getElementById('btnJogar').disabled = false

    exibeCartaJogador()
}

function exibeCartaJogador() {
    var divCartaJogador = document.getElementById("carta-jogador")
    var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
    divCartaJogador.style.backgroundImage = `url(${cartaJogador.imagem})`
    var nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`
    var opcoesTexto = ""

    for (var atributo in cartaJogador.atributos) {
        opcoesTexto += "<input type='radio' name='atributo' value='" + atributo + "'>" + atributo + " " + cartaJogador.atributos[atributo] + "<br>"
    }

    var html = "<div id='opcoes' class='carta-status'>"

    divCartaJogador.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
}

function obtemAtributoSelecionado() {
    var radioAtributo = document.getElementsByName('atributo')
    for (var i = 0; i < radioAtributo.length; i++) {
        if (radioAtributo[i].checked) {
            return radioAtributo[i].value
        }
    }
}

function jogar() {
    var divResultado = document.getElementById("resultado")
    var atributoSelecionado = obtemAtributoSelecionado()

    if (cartaJogador.atributos[atributoSelecionado] > cartaMaquina.atributos[atributoSelecionado]) {
        htmlResultado = '<p class="resultado-final">Venceu</p>'
        pontosJogador++
    } else if (cartaJogador.atributos[atributoSelecionado] < cartaMaquina.atributos[atributoSelecionado]) {
        htmlResultado = '<p class="resultado-final">Perdeu o Jogo</p>'
        pontosMaquina++
    } else {
        htmlResultado = '<p class="resultado-final">Empatou o Jogo</p>'
    }
    if (cartas.length == 0) {
        alert("Fim de Jogo")
        if (pontosJogador > pontosMaquina) {
            htmlResultado = '<p class="resultado-final">Venceu o Jogo</p>'
        } else if (pontosMaquina > pontosJogador) {
            htmlResultado = '<p class="resultado-final">Perdeu o Jogo</p>'
        } else {
            htmlResultado = '<p class="resultado-final">Empatou o Jogo</p>'
        }
    } else {
        document.getElementById('btnProximaRodada').disabled = false
    }

    divResultado.innerHTML = htmlResultado
    document.getElementById('btnJogar').disabled = true

    atualizaPlacar()
    exibeCartaMaquina()
    atualizaQuantidadeDeCartas()
}

function exibeCartaMaquina() {
    var divCartaMaquina = document.getElementById("carta-maquina")
    var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
    divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.imagem})`
    var nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`
    var opcoesTexto = ""

    for (var atributo in cartaMaquina.atributos) {
        console.log(atributo)
        opcoesTexto += "<p type='text' name='atributo' value='" + atributo + "'>" + atributo + " " + cartaMaquina.atributos[atributo] + "<br>"
    }

    var html = "<div id='opcoes' class='carta-status'>"

    divCartaMaquina.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
}

function proximaRodada() {
    var divCartas = document.getElementById('cartas')

    divCartas.innerHTML = `<div id="carta-jogador" class="carta"></div> <div id="carta-maquina" class="carta"></div>`
    document.getElementById('btnSortear').disabled = false
    document.getElementById('btnJogar').disabled = true
    document.getElementById('btnProximaRodada').disabled = true

    var divResultado = document.getElementById('resultado')
    divResultado.innerHTML = ""
}