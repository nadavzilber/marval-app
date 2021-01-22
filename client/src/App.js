import { useRecoilState } from 'recoil';
import AuthenticatedApp from './auth/AuthenticatedApp';
import Login from './auth/Login';
import Alert from './components/Alert';
import { alertAtom, userAtom } from './state/atoms';

function App() {
  const [alert, setAlert] = useRecoilState(alertAtom);
  const [userData, setUserData] = useRecoilState(userAtom);
  const closeAlert = (e) => {
    e && e.preventDefault();
    setAlert(null);
  }
  return (
    <div className="App">
      {alert && alert.show && <Alert title={alert.title} close={(e) => closeAlert(e)} message={alert.message} />}
      {!!userData && userData.isLogged ?
        <AuthenticatedApp /> :
        <Login />}
    </div>
  );
}

export default App;
