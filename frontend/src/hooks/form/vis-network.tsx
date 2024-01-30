import { useEffect } from 'react';
import { DataSet, Network } from 'vis-network/standalone/umd/vis-network.min.js';
import 'vis-network/styles/vis-network.css';
import { ProductOperation } from '../../components/administration/products/Interfaces/ProductOperation';
import { ProductComponent } from '../../components/administration/products/Interfaces/ProductComponent';


interface VisNetworkProps {
  productOperations: ProductOperation[];
  productComponents: ProductComponent[];
  onNodeClick: (nodeId: string) => void;
  setAllConnected: (value: boolean) => void;
}

const VisNetwork: React.FC<VisNetworkProps> = ({productComponents, productOperations, onNodeClick, setAllConnected}) => {
    


    useEffect(() => {
      // create an array with nodes
      const nodes = new DataSet<any>(returnNodes(productOperations,productComponents));

      const edges = new DataSet<any>(createEdges(productOperations,productComponents));
      // create a network
      const container: HTMLElement | null = document.getElementById('mynetwork');
      if(!container){
        throw new Error(`can't find container for vis-network`)
      }
  
      // provide the data in the vis format
      const data:any = {
       nodes: nodes,
       edges: edges,
      };
  
      // provide the hierarchical layout
      const options = {
        layout: {
          hierarchical: {
            direction: 'UD',
            sortMethod: 'directed',
          },
        },
      };
  
      // initialize network
      const network = new Network(container, data, options);

      network.on("click", (params) => {
        if (params.nodes.length > 0) {
          const nodeId = params.nodes[0];
          //console.log(`${nodeId} clicked `)
          onNodeClick(nodeId);

        }
      });
      network.on("deselectNode", () => {
          onNodeClick('');
      });
      
      //check if all nodes are connected
      const nodesArray = nodes.get({ returnType: 'Array' });
      const edgesArray = edges.get({ returnType: 'Array' });
      setAllConnected(checkAllNodesConnected(nodesArray, edgesArray));
      

      // Cleanup
      return () => {
        network.destroy();
      };
    }, [productOperations, productComponents]);
  

    return <div id="mynetwork" style={{ width: '600px', height: '400px', border: '1px solid lightgray' }} />;
  };
  
  export default VisNetwork;

  
  const returnNodes = (productOperations:ProductOperation[], components:ProductComponent[]) => {
    let nodes:any = [];
    productOperations.map(op => (nodes.push({ id: op._id, label: op.name })));
    components.map(op => (nodes.push({ id: op._id, label: op.name, color: 'lightgreen' })));
    
    return nodes;
     
  }
  const createEdges = (productOperations:ProductOperation[], components:ProductComponent[])=> {
    let edges:any = [];
    productOperations.filter(op => op.parent_id).map(op => (edges.push({ from: op.parent_id, to: op._id })))
    components.filter(op => op.parent_id).map(op => (edges.push({ from: op.parent_id, to: op._id })))
    return edges;
  }

  //help function for checking if all node are connected
  const createAdjacencyList = (edges: any[]): Record<string, string[]> => {
    const adjacencyList: Record<string, string[]> = {};
    edges.forEach(edge => {
      if (!adjacencyList[edge.from]) {
        adjacencyList[edge.from] = [];
      }
      adjacencyList[edge.from].push(edge.to);
  
      if (!adjacencyList[edge.to]) {
        adjacencyList[edge.to] = [];
      }
      adjacencyList[edge.to].push(edge.from);
    });
    return adjacencyList;
  };

  const checkAllNodesConnected = (nodes: any[], edges: any[]): boolean => {
    const adjacencyList = createAdjacencyList(edges);
    let visited = new Set<string>();
    // Start from the first node
    let startNode = nodes.length > 0 ? nodes[0].id : null; 
  
    const dfs = (nodeId: string) => {
      visited.add(nodeId);
      const neighbors = adjacencyList[nodeId] || [];
      neighbors.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      });
    };
  
    if (startNode) {
      dfs(startNode); // Perform DFS from the start node
    }
  
    // Check if all nodes were visited
    return nodes.every(node => visited.has(node.id));
  };