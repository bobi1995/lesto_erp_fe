
import MainRoute from './routes/MainRoute';
import { ProSidebarProvider } from 'react-pro-sidebar';


function App() {
  return (
    <ProSidebarProvider >
      <MainRoute />
    </ProSidebarProvider>
  );
}

export default App;
