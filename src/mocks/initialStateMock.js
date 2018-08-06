import initialState from '../reducers/initialState';
import objectAssign from 'object-assign';
import {fromJS} from "immutable";

const initialStateMock = fromJS(objectAssign(initialState));
export default initialStateMock;
