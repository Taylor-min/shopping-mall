import { useRoutes } from "react-router-dom"
import {routes} from './routes'
import { QueryClientProvider } from "react-query"
import { getClient } from "./queryClient"
import {ReactQueryDevtools} from 'react-query/devtools'
import Gnb from "./components/header/gnb"
import Header from "./components/header"


const App = () => {
    const elem = useRoutes(routes)
    const queryClient = getClient()
    
    return (
    <QueryClientProvider client={queryClient}>
        <Header />
        {elem}
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    )
}

export default App