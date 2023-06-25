import Generic from "./generic";
import Graph from "./graph";

// Create a graph with 6 vertices and add edges
const graph = new Graph(6);
graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 2);
graph.addEdge(1, 3);
graph.addEdge(2, 3);
graph.addEdge(3, 4);
graph.addEdge(4, 5);

// Set the parameters for the genetic algorithm
const maxColors = 3;
const populationSize = 10;
const tournamentSize = 5;
const mutationRate = 0.1;
const numberOfGenerations = 100;
// Create a Generic instance with the graph and parameters
const geneticAlgorithm = new Generic(
  graph,
  populationSize,
  tournamentSize,
  maxColors,
  mutationRate
);

// Generate the initial population
geneticAlgorithm.generateInitialPopulation();

for (let generation = 1; generation < numberOfGenerations; generation++) {
  const offspringPopulation: number[][] = [];
  //Creating new population
  for (let i = 0; i < populationSize; i++) {
    //select parent1 and parent2
    const parent1: number[] = geneticAlgorithm.tournamentSelection();
    const parent2: number[] = geneticAlgorithm.tournamentSelection();

    //crossover them and create new child
    let child: number[] = geneticAlgorithm.crossover(parent1, parent2);
    child = geneticAlgorithm.mutation(child);
    offspringPopulation.push(child);
  }
  // Replace the current population with the offspring population
  geneticAlgorithm.population = offspringPopulation;
}

let bestIndividual: number[] | null = null;
let bestFitness = 0;

for (const individual of geneticAlgorithm.population) {
  const fitness = geneticAlgorithm.calculateFitness(graph, individual);

  if (fitness > bestFitness) {
    bestIndividual = individual;
    bestFitness = fitness;
  }
}

console.log("Best Individual (Coloring):", bestIndividual);
