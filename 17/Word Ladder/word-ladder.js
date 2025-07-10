class Graph {
    constructor() {
        this.edges = [];
        this.vertices = [];
    }

    addVertex(vertex) {
        this.vertices.push(vertex);
        this.edges[vertex] = [];
    }

    addEdge(vertexA, vertexB) {
        this.edges[vertexA].push(vertexB);
        this.edges[vertexB].push(vertexA);
    }

    bfs(startVertex, endVertex) {
        const queue = [startVertex];
        const visited = new Set();
        visited.add(startVertex);
        const parent = { [startVertex]: null };
        while (queue.length > 0) {
            const currentVertex = queue.shift();
            if (currentVertex === endVertex) {
                const path = [];
                let vertex = currentVertex;
                while (vertex !== null) {
                    path.unshift(vertex);
                    vertex = parent[vertex];
                }
                return path;
            }
            if (this.edges[currentVertex]) {
                this.edges[currentVertex].forEach((neighbor) => {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        queue.push(neighbor);
                        parent[neighbor] = currentVertex;
                    }
                });
            }
        }
        return [];
    }
}

function wordLadder(start, end, dictionary) {
    function hasEdge(wordA, wordB) {
        if (wordA.length !== wordB.length) {
            return false;
        }
  
        let differences = 0;
        for (let i = 0; i < wordA.length; i++) {
            if (wordA[i] !== wordB[i]) differences++;
            if (differences > 1) {
                return false;
            }
        }
  
        return differences === 1;
    }

    if(!dictionary.find((_, v) => v === start)){
        dictionary.push(start);
    }

    if(!dictionary.find((_, v) => v === end)){
        dictionary.push(start);
    }

    const graph = new Graph();
    const length = dictionary.length;

    dictionary.forEach(word => {
        graph.addVertex(word);
    });

    for(let i = 0; i < length; i++){
        for(let j = 0; j < length; j++){
            if(i === j) {
                continue;
            }
            if(hasEdge(dictionary[i], dictionary[j])){
                graph.addEdge(dictionary[i], dictionary[j]);
            }
        }
    }

    return graph.bfs(start, end);
}

const shortestPath = wordLadder('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']);
console.log(shortestPath);