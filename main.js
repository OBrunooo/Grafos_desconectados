document.addEventListener("DOMContentLoaded", function () {
  var todos_vertices = []
  var todas_ligacoes = []
  const button_criar_grafo = document.getElementById("criar_grafo")


  function organiza_vertice() {
    var inputs_vertices = document.getElementsByClassName('vertice')

    for (let i = 0; i < inputs_vertices.length; i++) {
      var vertice = (inputs_vertices[i]).value
      if (!todos_vertices.includes(vertice)) {
        todos_vertices.push(vertice)
      }

    }
  }

  function organiza_ligacoes() {
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
      console.log('----')
    }

    console.log("vertice")
    console.log(todos_vertices)
    console.log("ligacao")
    console.log(todas_ligacoes)
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


  button_criar_grafo.addEventListener("click", function () {
    organiza_vertice()
    organiza_ligacoes()
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
  })

  const button_add_vertice = document.getElementById("add_vertice")
  button_add_vertice.addEventListener("click", function () {
    const form = document.getElementById("form")
    var html_novo_vertice = `<div class="add_vertice">
                <input required class="adicionar_campo vertice" placeholder="Ex: A" type="text"/>
                <input required class="adicionar_campo ligacoes" placeholder="Ex: B,C,D"  type="text"/>
            </div>`
    form.insertAdjacentHTML('beforeend', html_novo_vertice)
  })

  console.log(localStorage.getItem('tabela'))
  table = document.getElementById("table")
  table.innerHTML = localStorage.getItem('tabela')


})