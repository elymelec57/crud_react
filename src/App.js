import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowEmpleado from './components/ShowEmpleado';
import CrearEmpleado from './components/CrearEmpleado';
import EditarEmpleado from './components/EditarEmpleado';
import laravel from './assets/img/laravel.png';
import react from './assets/img/react.png';

function App() {

  return (
    <section className='container'>
      <header className='row bg-primary h-5 text-center pt-5 pb-5 '>
        <div className='col-sm-3 col-ls-6'><img style={{width: '5rem'}} src={react} className="w-5" /></div>
        <div className='col-sm-6 col-ls-12'><h1 className='text-white'>Crud con React y Laravel 9</h1></div>
        <div className='col-sm-3 col-ls-6' ><img style={{width: '5rem'}} src={laravel}/></div>
      </header>

      <content className="container">
       <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <ShowEmpleado/>} />
            <Route path='/create' element={ <CrearEmpleado/>} />
            <Route path='/edit/:id' element={ <EditarEmpleado/>} />
          </Routes>
        </BrowserRouter>
      </div>
      </content>
    </section>
   
  )
}

export default App;
