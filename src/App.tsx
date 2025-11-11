import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import AdminDashboardPage from './pages/AdminDashboardPage';

function App() {
  

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<div>Home</div>} /> */}
        <Route element={<Layout/>}>
          <Route path="/" element={<AdminDashboardPage/>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
