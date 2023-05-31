import AttendForm from './AttendForm';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import PresentationForm from './PresentationForm';
import MainPage from './MainPage';
import Nav from './Nav';
import {BrowserRouter, Routes, Route} from "react-router-dom";
// import {Routes} from "react-dom"

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
          <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="conferences/new" element={<ConferenceForm />} />
            <Route path="attendees/new" element={<AttendForm />} />
            <Route path="attendees/" element={<AttendeesList attendees={props.attendees} />} />
            <Route path="locations/new" element={<LocationForm />} />
            <Route path="presentation/new" element={<PresentationForm />}/>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
