import { SideBar } from './components/SideBar';
import { Content } from './components/Content';


import './styles/sidebar.scss';
import './styles/content.scss';
import './styles/global.scss';
import { FilmsProvider } from './hooks/useMoviesContext';


export function App() {
  return (
    <FilmsProvider>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar/>
      <Content/>
    </div>
    </FilmsProvider>
  )
}