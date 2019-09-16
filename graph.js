const graph = {
    Gama: {AsaSul: 5, SantaMaria: 1, RiachoFundo: 3},
    AsaSul: {Gama: 4, ParkWay: 2, AsaNorte: 1},
    SantaMaria: {AsaSul: 5, AsaNorte: 8},
    ParkWay: {AsaNorte: 4, Samambaia: 5, Recanto: 3},
    AsaNorte: {Samambaia: 7, AsaSul: 2},
    RiachoFundo: { Samambaia: 3, ParkWay: 3, Recanto: 1},
    Recanto: {Samambaia: 1, RiachoFundo: 1, Gama: 3},
    Taguatinga: {Samambaia: 1, AsaSul: 3, Recanto: 2},
    Samambaia: {AsaSul: 3, Recanto: 2, Taguatinga: 2}
};

function log(message) {
    const logging = false;
    if (logging) {
        console.log(message);
    }
}

const lowestCostNode = (costs, processed) => {
    return Object.keys(costs).reduce((lowest, node) => {
        if (lowest === null || costs[node] < costs[lowest]) {
            if (!processed.includes(node)) {
                lowest = node;
            }
        }
        return lowest;
    }, null);
};

// function that returns the minimum cost and path to reach Finish
const dijkstra = (graph, startNodeName, endNodeName) => {

    // track the lowest cost to reach each node
    let costs = {};
    costs[endNodeName] = "Infinity";
    costs = Object.assign(costs, graph[startNodeName]);

    // track paths
    const parents = {endNodeName: null};
    for (let child in graph[startNodeName]) {
        parents[child] = startNodeName;
    }

    // track nodes that have already been processed
    const processed = [];

    let node = lowestCostNode(costs, processed);

    while (node) {
        let cost = costs[node];
        let children = graph[node];
        for (let n in children) {
            if (String(n) === String(startNodeName)) {
                log("WE DON'T GO BACK TO START");
            } else {
                log("StartNodeName: " + startNodeName);
                log("Evaluating cost to node " + n + " (looking from node " + node + ")");
                log("Last Cost: " + costs[n]);
                let newCost = cost + children[n];
                log("New Cost: " + newCost);
                if (!costs[n] || costs[n] > newCost) {
                    costs[n] = newCost;
                    parents[n] = node;
                    log("Updated cost und parents");
                } else {
                    log("A shorter path already exists");
                }
            }
        }
        processed.push(node);
        node = lowestCostNode(costs, processed);
    }

    let optimalPath = [endNodeName];
    let parent = parents[endNodeName];
    while (parent) {
        optimalPath.push(parent);
        parent = parents[parent];
    }
    optimalPath.reverse();

    const results = {
        distance: costs[endNodeName],
        path: optimalPath
    };

    return results;
};

console.log(dijkstra(graph, "Samambaia", "Gama"));
console.log(dijkstra(graph, "Gama", "AsaNorte"));
console.log(dijkstra(graph, "Samambaia", "AsaNorte"));