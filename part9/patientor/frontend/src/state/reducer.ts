import { State } from './state';
import { Patient } from '../types';

export type Action =
    | {
          type: 'SET_PATIENT_LIST';
          payload: Patient[];
      }
    | {
          type: 'SET_PATIENT';
          payload: Patient;
      }
    | {
          type: 'ADD_PATIENT';
          payload: Patient;
      };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_PATIENT_LIST':
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({ ...memo, [patient.id]: patient }),
                        {}
                    ),
                    ...state.patients,
                },
            };
        case 'SET_PATIENT':
            const patient: Patient | undefined = Object.values(
                state.patients
            ).find((patient) => patient.id === action.payload.id);

            if (!patient) {
                throw new Error('No patient with that ID.');
            }

            return {
                patients: {
                    [patient.id]: patient,
                },
            };
        case 'ADD_PATIENT':
            return {
                patients: {
                    ...state.patients,
                },
            };
        default:
            return state;
    }
};
