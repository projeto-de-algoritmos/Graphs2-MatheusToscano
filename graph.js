const problem = {
    start:  {A: 5, B: 2},
    A: {C: 4, D: 2},
    B: {A: 8, D: 7},
    C: {D: 6, finish: 3},
    D: {finish: 1},
    finish: {}
};

const lowCostNode = (cost, processed) => {
    return Object.keys(cost).reduce((lowest, node) => {
        if(lowest === null || cost[node] < cost[lowest]){
            if(!processed.includes(node)){
                lowest = node;
            }
        }
        return lowest;
    }, null);
};

const dijkstra = (graph) => {
    const costs = Object.assign({finish: Infinity}, graph.start);
}