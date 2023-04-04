import { BrowserRouter, Routes, Route } from 'react-router-dom';


import './App.css';
import { HomePage } from './page/HomePage';
import { DetailPage } from './page/DetailPage';
import { AdminPage } from './page/AdminPage';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>

          <Route path='/' element={<HomePage> </HomePage>}> </Route>
          <Route path='/admin' element={<AdminPage> </AdminPage>}></Route>
          <Route path='/detail/:id' element={<DetailPage> </DetailPage>} > </Route>

          <Route path='*'element={<HomePage> </HomePage>}> </Route>

{/*           <Route path='*' element={<h1> 404 Seite nicht gefunden </h1>}> </Route> */}
        </Routes>
      </BrowserRouter>



    </div>
  );
}

export default App;
