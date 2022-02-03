import { destroyCookie } from "nookies";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useCan } from "../hooks/useCan";
import { setUpApiClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";


export default function Dashboard() {

    const { user } = useContext(AuthContext);

    useEffect(() => {
        api.get('/me').then(res => console.log(res)).catch(err => console.log(err))
    })

    const userCanSeeMetrics = useCan({ permissions: ['metrics.list'] })

    return (
        <>
            <h1>Dashboard: {user?.email}</h1>

            {userCanSeeMetrics && <div>Métricas</div>}
        </>
    );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

    const apiClient = setUpApiClient(ctx);
    const response = await apiClient.get('/me')

    return {
        props: {}
    }
});