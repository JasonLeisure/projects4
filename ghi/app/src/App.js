import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import Nav from './Nav';

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <>
      <Nav />
      <div className="container">
        <LocationForm />
        {/* <AttendeesList attendees={props.attendees} /> */}
      </div>
    </>
  );
}

export default App;
