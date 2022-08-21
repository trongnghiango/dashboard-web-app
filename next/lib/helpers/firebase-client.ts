import firebase from "firebase/app";
import "firebase/auth";
import useEnv from '../../hooks/use-env';
import { EnvKeys } from "./env.helper";

const firebaseViewJSON = useEnv(EnvKeys.firebaseView)
if (firebase.apps.length == 0) {
  firebase.initializeApp(JSON.parse(firebaseViewJSON));
}

export { firebase };
