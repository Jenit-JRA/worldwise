import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
};

// ✅ reducer should ONLY contain logic
function reducer(state, action) {
    switch (action.type) {
        case "login":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            };
        case "logout":
            return initialState;
        default:
            return state;
    }
}

// ✅ keep FAKE_USER outside
const FAKE_USER = {
    name: "Jenit",
    email: "jenitabraham391@gmail.com",
    password: "abcdefg",
    avatar: "https://i.pravatar.cc/100?img=47",
};

// ✅ Provider OUTSIDE reducer
function AuthProvider({ children }) {
    const [{ user, isAuthenticated }, dispatch] = useReducer(
        reducer,
        initialState
    );

    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: "login", payload: FAKE_USER }); // ✅ removed space
        }
    }

    function logout() {
        dispatch({ type: "logout" });
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// ✅ custom hook
function useAuth() {
    const authContext = useContext(AuthContext);

    if (authContext === undefined) {
        throw new Error(
            "AuthContext is being used outside of AuthProvider"
        );
    }

    return authContext;
}

export { AuthProvider, useAuth };