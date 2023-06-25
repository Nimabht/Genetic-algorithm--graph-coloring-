import Generic from "./generic";
import Graph from "./graph";

// Create a graph with 15 vertices and add edges
const graph = new Graph(15);
graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(0, 3);
graph.addEdge(1, 4);
graph.addEdge(2, 5);
graph.addEdge(3, 6);
graph.addEdge(4, 7);
graph.addEdge(4, 8);
graph.addEdge(5, 9);
graph.addEdge(5, 10);
graph.addEdge(6, 11);
graph.addEdge(7, 12);
graph.addEdge(8, 12);
graph.addEdge(9, 13);
graph.addEdge(10, 14);
graph.addEdge(11, 14);
graph.addEdge(12, 14);
graph.addEdge(13, 14);

// Set the parameters for the genetic algorithm
const maxColors = 3;
const populationSize = 30;
const tournamentSize = 15;
const mutationRate = 0.1;
const numberOfGenerations = 500;

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

  //Checking the best fitness in the current population (if its one then we found the solution!!)
  const bestIndividual = geneticAlgorithm.bestIndividualInPopulation();
  if (bestIndividual.fitness == 1) break;
  console.log(
    "----------------------------------------------------------------"
  );
  console.log(
    `Best Individual (Coloring) at generation ${generation}`,
    bestIndividual
  );
}

console.log("----------------------------------------------------------------");
console.log(
  "Best Individual (Coloring) at the end:",
  geneticAlgorithm.bestIndividualInPopulation()
);
