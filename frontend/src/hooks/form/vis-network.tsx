import { forwardRef, useEffect, useRef } from 'react';
import { DataSet, Network } from 'vis-network/standalone/umd/vis-network.min.js';
import 'vis-network/styles/vis-network.css';
import { ProductOperation } from '../../components/administration/products/Interfaces/ProductOperation';


interface VisNetworkProps {
  productOperations: ProductOperation[];
  onNodeClick: (nodeId: string) => void;
}

const VisNetwork: React.FC<VisNetworkProps> = ({productOperations, onNodeClick}) => {
    


    useEffect(() => {
      // create an array with nodes
      const nodes = new DataSet(returnNodes(productOperations));

      const edges = new DataSet<any>(createEdges(productOperations));
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
  
      // initialize your network
      const network = new Network(container, data, options);

      network.on("click", (params) => {
        if (params.nodes.length > 0) {
          const nodeId = params.nodes[0];
          console.log(`${nodeId} clicked `)
          onNodeClick(nodeId);

        }
      });
      network.on("deselectNode", () => {
          onNodeClick('');
      });

      // Cleanup the network instance when the component unmounts
      return () => {
        network.destroy();
      };
    }, [productOperations]);
  

    return <div id="mynetwork" style={{ width: '600px', height: '400px', border: '1px solid lightgray' }} />;
  };
  
  export default VisNetwork;

  
  const returnNodes = (productOperations:ProductOperation[]) => {
    return productOperations.map(op => ({ id: op._id, label: op.name }))
     
  }
  const createEdges = (productOperations:ProductOperation[])=> {
    return  productOperations
    .filter(op => op.parent_id)
    .map(op => ({ from: op.parent_id, to: op._id }))
  }
