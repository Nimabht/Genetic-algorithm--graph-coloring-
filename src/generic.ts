import Graph from "./graph";

class Generic {
  MAX_COLORS: number;
  MUTATION_RATE: number;
  graph: Graph;
  populationSize: number;
  tournamentSize: number;
  population: number[][] = [];
  constructor(
    graph: Graph,
    populationSize: number,
    tournamentSize: number,
    maxColors: number,
    mutationRate: number
  ) {
    this.MAX_COLORS = maxColors;
    this.MUTATION_RATE = mutationRate;
    this.graph = graph;
    this.populationSize = populationSize;
    this.tournamentSize = tournamentSize;
  }
  //Function that generates init population
  generateInitialPopulation(): void {
    for (let i = 0; i < this.populationSize; i++) {
      const coloring: number[] = [];

      for (let j = 0; j < this.graph.getNumVertices(); j++) {
        // Assign a random color to each vertex
        const randomColor = Math.floor(Math.random() * this.MAX_COLORS);
        coloring.push(randomColor);
      }

      this.population.push(coloring);
    }
  }

  //Function that calculates the fitness
  calculateFitness(graph: Graph, coloring: number[]): number {
    let conflicts = 0;

    for (let vertex = 0; vertex < graph.getNumVertices(); vertex++) {
      const adjacentVertices = graph.getAdjacentVertices(vertex);

      for (const adjacentVertex of adjacentVertices) {
        if (coloring[vertex] === coloring[adjacentVertex]) {
          conflicts++;
        }
      }
    }

    // Fitness is a higher value for fewer conflicts
    const fitness = 1 / (conflicts + 1);

    return fitness;
  }

  tournamentSelection(): number[] {
    const selected: number[][] = [];

    while (selected.length < this.tournamentSize) {
      const randomIndex = Math.floor(Math.random() * this.population.length);
      selected.push(this.population[randomIndex]);
    }

    selected.sort(
      (a, b) =>
        this.calculateFitness(this.graph, b) -
        this.calculateFitness(this.graph, a)
    );

    return selected[0];
  }

  crossover(parent1: number[], parent2: number[]): number[] {
    const crossoverPoint = Math.floor(Math.random() * parent1.length);
    const child: number[] = [
      ...parent1.slice(0, crossoverPoint),
      ...parent2.slice(crossoverPoint),
    ];
    return child;
  }

  mutation(individual: number[]): number[] {
    const mutatedIndividual: number[] = [...individual];

    for (let i = 0; i < mutatedIndividual.length; i++) {
      if (Math.random() < this.MUTATION_RATE) {
        mutatedIndividual[i] = Math.floor(Math.random() * this.MAX_COLORS);
      }
    }

    return mutatedIndividual;
  }

  bestIndividualInPopulation(): any {
    let bestIndividual: number[] = this.population[0];
    let bestFitness: number = this.calculateFitness(this.graph, bestIndividual);
    for (const individual of this.population) {
      const individualFitness = this.calculateFitness(this.graph, individual);
      if (individualFitness > bestFitness) {
        bestIndividual = individual;
        bestFitness = individualFitness;
      }
    }

    return {
      individual: bestIndividual,
      fitness: bestFitness,
    };
  }
}
export default Generic;
