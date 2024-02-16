import React, { useEffect, useRef } from 'react';

import { DataSet, Timeline, moment } from 'vis-timeline/standalone/umd/vis-timeline-graph2d.min.js';
import 'vis-timeline/styles/vis-timeline-graph2d.css';

import { Workspace } from '../../components/administration/workspaces/Interfaces/Workspace.interface';
import { OperationHandler } from '../../components/administration/Production/Interfaces/operationHandler.interface';

interface TimeLineNode {
    id: string
    start: Date
    end: Date
    content: string
    group: string
}

interface TimelineProps {
    workspaces: Workspace[];
    operationHandlers: OperationHandler[];
}

const TimelineComponent: React.FC<TimelineProps> = ({ workspaces, operationHandlers }) => {
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!timelineRef.current) return;
        const container = timelineRef.current;


        const items:any = new DataSet(returnNodes(operationHandlers));

        const groups:any = new DataSet(returnGroups(workspaces))

        const options = {
            editable: false,
            zoomable: true,
        };

        

        const timeline = new Timeline(container, items, groups, options);
        
        
        return () => {
            timeline.destroy();
        };
    }, [workspaces, operationHandlers]);

    return <div ref={timelineRef} style={{ height: '600px', width: `100%`}} />;
};

export default TimelineComponent;

const returnNodes = (operationHandlers:OperationHandler[]) => {
    let nodes:any = [];

    operationHandlers.map(op => {
        if(!op.plannedStart || !op.plannedFinish ){
            throw new Error(`problem with timeline`);
        }
        nodes.push(
            {   id: op._id, 
                start: new Date(op.plannedStart), 
                end: new Date(op.plannedFinish), 
                content: op.name,
                group: op.workSpace_id
            }
        )
        
});
    return nodes;
     
  }

  const returnGroups = (workspaces:Workspace[]) => {
    let groups:any = [];
    workspaces.map(ws => (groups.push({ id: ws._id, content: ws.name})));
    return groups;
     
  }