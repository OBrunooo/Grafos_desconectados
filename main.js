document.addEventListener("DOMContentLoaded", function(){
    var a = ['B','C','D'];
    var b = ['A', 'D'];
    var c = ['A', 'D'];
    var d = ['A','B','C'];

    var linhas = [a,b,c,d]
    var colunas = ['A','B','C','D'];

    var grafo = [
        [],
        [],
        [],
        []
    ]
    console.log(grafo)
    for(let x = 0;x <linhas.length; x++ ){
        let i = linhas[x];

        for(let y = 0; y<colunas.length; y++){
            if(i.includes(colunas[y])){
                grafo[x].push(1)
            }else {
                grafo[x].push(0)
            }
        }
    }

    console.log(grafo)



})