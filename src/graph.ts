class Graph {
  private numVertices: number;
  private adjacencyMatrix: boolean[][];

  constructor(numVertices: number) {
    this.numVertices = numVertices;
    this.adjacencyMatrix = [];

    for (let i = 0; i < numVertices; i++) {
      this.adjacencyMatrix[i] = [];
      for (let j = 0; j < numVertices; j++) {
        this.adjacencyMatrix[i][j] = false;
      }
    }
  }

  getNumVertices(): number {
    return this.numVertices;
  }

  addEdge(vertex1: number, vertex2: number) {
    this.adjacencyMatrix[vertex1][vertex2] = true;
    this.adjacencyMatrix[vertex2][vertex1] = true;
  }

  getAdjacentVertices(vertex: number): number[] {
    const adjacentVertices: number[] = [];

    for (let i = 0; i < this.numVertices; i++) {
      if (this.adjacencyMatrix[vertex][i]) {
        adjacentVertices.push(i);
      }
    }

    return adjacentVertices;
  }
}

export default Graph;
