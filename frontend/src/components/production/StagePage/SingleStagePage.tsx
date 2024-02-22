import { useEffect, useState } from "react";
import FetchErrorComponent from "../../errorHandling/FetchErrorComponent";
import { FetchError, SingleStageData, singleStageLoader } from "../Utils/singleStageLoader";
import DataTable from "../../../utils/datatable";
import { Box, Container, Heading } from "@chakra-ui/react";

interface AddOperationFormProps {
    currentStageId: string
  }

const SingleStagePage: React.FC<AddOperationFormProps> = ({currentStageId}) => {
  
    const [data, setData] = useState<SingleStageData | FetchError | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await singleStageLoader(currentStageId);
                setData(result);
            } catch (error) {
                setData({ error: 'An unexpected error occurred' });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentStageId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!data) {
        return null; // or render a default state while waiting for data
    }

    if ('error' in data) {
        return <FetchErrorComponent errors={data.error} />;
    }

    const {operationHandlers, orders} = data;
    const columnsSetup = [
        {header: "order name", accessor: "order_id", byId: true, data: orders, key: "name" },
        {header: "name", accessor: "name"},
        {header: "totalQty", accessor: "totalQty"},
        {header: "planed start", accessor: "plannedStart", date:true},
        { header: "Actions", accessor: "actions", edit: true }
      ]


  return (
    <>
    <Container>
    <Heading size='md'>Stage name</Heading>
    <DataTable columns={columnsSetup} data={operationHandlers} />
    </Container>
    </>
  );
}

export default SingleStagePage;


 

