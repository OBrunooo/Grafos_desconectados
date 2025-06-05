document.addEventListener("DOMContentLoaded", function () {
  var todos_vertices = []
  var todas_ligacoes = []
  const form = document.getElementById("form")
  function organiza_vertice() {
    todos_vertices = []
    var inputs_vertices = document.getElementsByClassName('vertice')

    for (let i = 0; i < inputs_vertices.length; i++) {
      var vertice = (inputs_vertices[i]).value

        todos_vertices.push(vertice)

    }
  }

  function organiza_ligacoes() {
    todas_ligacoes = []
    var inputs_ligacoes = document.getElementsByClassName('ligacoes')

    for (let i = 0; i < inputs_ligacoes.length; i++) {
      var ligacao = (inputs_ligacoes[i]).value
      ligacao = ligacao.split(',')
      
      todas_ligacoes.push(ligacao)
    }

    for (let i=0; i<todas_ligacoes.length;i++){
      var ligacao = todas_ligacoes[i]
      for(let x=0;x<ligacao.length;x++){
        var index = todos_vertices.indexOf(ligacao[x])
        if(index !== -1 && !todas_ligacoes[index].includes(todos_vertices[i])){
            var add_ligacao = todos_vertices[i]
            todas_ligacoes[index].unshift(add_ligacao)
            console.log(add_ligacao)
            console.log(index)
            console.log(todas_ligacoes[index])
        }
      }
    }
  }

  var html = ''
  function html_tabela() {
    html = '<tr><th></th>'

    for (var i = 0; i < todos_vertices.length; i++) {
      html += `<th>${todos_vertices[i]}</th>`
    }
    html += "</tr>"


    for (var i = 0; i < todos_vertices.length; i++) {
      var vertice = todos_vertices[i]
      html += `<tr><td>${vertice}</td>`
      for (var x = 0; x < todos_vertices.length; x++) {
        ligacao = todas_ligacoes[x]
          if (ligacao.includes(vertice)) {
            html += `<td>1</td>`
          } else {
            html += `<td>0</td>`
          }
      }
      html += "</tr>"
    }
    window.localStorage.setItem('tabela', html)
  }

  function validar_dados(){
    var verificacao_dados = []
    for(let i=0; i< todas_ligacoes.length;i++){
      ligacao = todas_ligacoes[i]
      for(let x=0; x<ligacao.length; x++) {
        if(ligacao[x] != '' && !todos_vertices.includes(ligacao[x])){
          verificacao_dados.push(ligacao[x])
        }
      }
    }
    return verificacao_dados
  }


  form.addEventListener("submit", function (e) {
    e.preventDefault()
    organiza_vertice()
    organiza_ligacoes()
    var verificacao_dados = validar_dados()

    if(verificacao_dados.length == 0) {
      async function fetch_data() {
        try {
          const response = await fetch('http://localhost:5000/grafos', {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({vertices: todos_vertices, ligacoes: todas_ligacoes})
          })
          const data = await response.json();
          console.log(data)
        } catch (error){
          console.log(error)
        }
      }
      fetch_data()
      html_tabela()
    } else {
      var html_error = 'Você se esqueceu de declarar os vértices '
      for(let i=0; i<verificacao_dados.length;i++){
        if(i==0){
          html_error += `${verificacao_dados[i]}`
        }else {
          html_error += `, ${verificacao_dados[i]}`
        }
      }
      var erro = document.getElementById('erro')
      erro.innerHTML = html_error
    }
  })

  const button_add_vertice = document.getElementById("button_add_vertice")
  
  button_add_vertice.addEventListener("click", function () {
    const all_vertices = document.getElementById("all_vertices")
    var html_novo_vertice = `<div class="add_vertice">
                <input required class="adicionar_campo vertice" placeholder="Ex: A" type="text"/>
                <input required class="adicionar_campo ligacoes" placeholder="Ex: B,C,D"  type="text"/>
            </div>`
    all_vertices.insertAdjacentHTML('beforeend', html_novo_vertice)
  })

  table = document.getElementById("table")
  table.innerHTML = localStorage.getItem('tabela')




})