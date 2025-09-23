// import './App.css'
// import Footer from './Components/Footer'
// import Navbar from './Components/Navbar'
// import { Route, Routes } from "react-router-dom";
// import Login from './Pages/Login';
// import Home from './Pages/Home'
// import Jobs from './Pages/Jobs'
// import Page404 from './Pages/Page404'
// import Registration from './Pages/Registration'
// function App() {
  

//   return (
//     <div>
//       <Navbar />
//       <Footer />

//       <div>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="Jobs" element={<Jobs />} />
//           {/* <Route path="/admin" element={<Layout />}> */}
//             {/* <Route path=":firstname" element={<Template />} /> */}
//             <Route path="Login" element={<Login />} />
//             <Route path="Registration" element={<Registration />} />
//             <Route path="Page404" element={<Page404 />} />
//           {/* </Route> */}
//         </Routes>
//       </div>
//     </div>
//   );
// }

// export default App
// App.jsx
import React from 'react';
import './App.css';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Jobs from './Pages/Jobs';
import Page404 from './Pages/Page404';
import Registration from './Pages/Registration';

function App() {
  return (
    <Router>
     
      <Navbar />

      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        
        <Route path="*" element={<Page404 />} />
      </Routes>

      
      <Footer />
    </Router>
  );
}

export default App;

