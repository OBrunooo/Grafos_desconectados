from flask import Flask, jsonify, request
from flask_cors import CORS
import networkx as nx
import matplotlib
matplotlib.use('Agg')  # Backend não interativo
from matplotlib import pyplot as plt
import os
from PIL import Image

app = Flask(__name__)
CORS(app)

# Garante que o diretório existe
os.makedirs('img', exist_ok=True)

@app.route('/grafos', methods=['POST'])
def data():
    # G = nx.Graph()
    # G.add_node("A")
    # G.add_node("B")
    # G.add_node("C")
    # G.add_edges_from([("A", "B"),("B", "C"),("C", "A")])
    
    # # Cria e fecha a figura explicitamente
    # plt.figure()
    # nx.draw_shell(G, with_labels=True)
    # # os.remove('img/grafo.png')
    # plt.savefig('img/grafo.png')
    
    # im = Image.open("img/grafo.png")

    # im.show()
    # plt.close()
    G = nx.Graph()
    dados = request.get_json()
    vertices = dados['vertices']
    ligacoes = dados['ligacoes']
    
    for i in range(len(vertices)):
        G.add_node(vertices[i])
        ligacoes_deste_vertice = ligacoes[i]
        for x in range(len(ligacoes_deste_vertice)):
            G.add_edge(vertices[i], ligacoes_deste_vertice[x])
        
    plt.figure()
    nx.draw_shell(G, with_labels=True)
    plt.savefig('img/grafo.png')
    
    # im = Image.open("img/grafo.png")

    # im.show()
    plt.close()    
    
    
    return jsonify([{'teste': "estou testando"}])

if __name__ == '__main__':
    app.run(port=5000, host='localhost', debug=True)