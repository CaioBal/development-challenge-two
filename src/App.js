import React from "react";
import { BrowserRouter as Router, Route , Switch} from "react-router-dom";
import Navbar from './Components/Navbar'
import Patients from './Components/PatientList'
import PatientCreate from './Pages/Create/PatientCreate'
import PatientUpdate from './Pages/Update/PatientUpdate'

export default function App() {
  // const [modalOpen, setModalOpen] = useState(false);

  return (
    <Router>
      <Navbar />
      <Switch>
          <Route exact path='/' component={Patients} />
          <Route exact path='/create' component={PatientCreate} />
          <Route exact path='/update/:id' component={PatientUpdate} />
        </Switch>
      
    </Router>
  );
}