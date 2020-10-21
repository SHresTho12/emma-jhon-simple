import React, {
    useState
} from 'react';

import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../../App';


firebase.initializeApp(firebaseConfig)


function Login() {
    const [newUser, setNewuser] = useState(false);
    const [user, setUser] = useState({
        isSighnedin: false,

        name: '',
        email: '',
        password: '',
        error: '',
        photo: ''
    });

    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    
    const provider = new firebase.auth.GoogleAuthProvider();
    const fbprovider = new firebase.auth.FacebookAuthProvider();
    const clickHandler = () => {

        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const {
                    displayName,
                    email,
                    photoURL
                } = res.user;
                const sighnedInUser = {
                    isSighnedin: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(sighnedInUser);
                console.log(displayName, email, photoURL);
            })

            .catch(err => {
                console.log(err);
                console.log(err.message);
            })
    }
    const handlesighnout = () => {
        firebase.auth().signOut()
            .then(res => {
                const outuser = {
                    isSighnedin: false,
                    name: '',
                    email: '',
                    photo: '',
                    success: false
                }
                setUser(outuser);
            })
            .catch(err => {

            })
    }


    const handleBlur = (event) => {
        let isValid = true;
        if (event.target.name === 'email') {
            isValid = /\S+@\S+\.\S+/.test(event.target.value);


        }
        if (event.target.name === 'password') {
            const isPassvalid = event.target.value.length;
            const isNumber = /\d{1}/.test(event.target.value);
            isValid = isNumber && isPassvalid;
        }
        if (isValid) {
            const newUserinfo = {
                ...user
            };
            newUserinfo[event.target.name] = event.target.value;
            setUser(newUserinfo);
        }
    }
    const handleSubmit = (event) => {
        console.log(user.email, user.password);
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserinfo = {
                        ...user
                    };
                    newUserinfo.error = '';
                    newUserinfo.success = true;
                    setUser(newUserinfo);
                    console.log(res);
                })
                .catch(function (error) {
                    const newUserinfo = {
                        ...user
                    };
                    newUserinfo.error = error.message;
                    newUserinfo.success = false;
                    setUser(newUserinfo);
                    updateUserName(user.name);
                    // ...
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserinfo = {
                        ...user
                    };
                    newUserinfo.error = '';
                    newUserinfo.success = true;
                    setUser(newUserinfo);
                  setLoggedInUser(newUserinfo);
                    console.log(res);
                })
                .catch(function (error) {
                    const newUserinfo = {
                        ...user
                    };
                    newUserinfo.error = error.message;
                    newUserinfo.success = false;
                    setUser(newUserinfo);
                    // ...
                });
        }
        event.preventDefault();
    }
    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name

        }).then(function () {
            // Update successful.
            console.log('Updated Name')
        }).catch(function (error) {
            console.log(error)
        });
    }

    const handleFbsighn = () => {
        firebase.auth().signInWithPopup(fbprovider).then(function (result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log('fb user', user);
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }
    return ( <div className = "App" > {
            user.isSighnedin ? < button onClick = {
                handlesighnout
            } > Sighn Out </button>:
             <button onClick = {
                clickHandler
            } > Sighn in </button>} 
            <button onClick = {
                handleFbsighn
            } > Sign in using facebook </button> {
                user.isSighnedin && <p> Welcome, {
                    user.name
                } </p>
            }
             <h1> our own authintication </h1> {
                /* <p>Name: {user.name}</p>
                      <p>Email. {user.email}</p>
                      <p>password : {user.password}</p> */
            } <
            input type = "checkbox"
            onChange = {
                () => setNewuser(!newUser)
            }
            name = "newUser" / >
            <label htmlFor = "newUser" > Newuser Sighn up </label> 
            <br/>

            
            <form onSubmit = {
                handleSubmit
            }>
                <br/>
            {
                newUser && <input type = "text"
                onBlur = {
                    handleBlur
                }
                name = "name"
                placeholder = "Your name"
                required/>
            } 
            <br/>
            
            <input type = "text"
            onBlur = {
                handleBlur
            }
            name = "email"
            placeholder = "Type your Email"
            required/>
            <br/>
            <input type = "password"
            onBlur = {
                handleBlur
            }
            name = "password"
            placeholder = "Type your password"
            required/>
           <br/><br/>
            <input onClick = {
                handleSubmit
            }
            type = "submit"
            value = "Submit"
            placeholder = "Submit" / >
            
            </form>
            
            <p style = {
                {
                    color: 'red'
                }
            }> {
                user.error
            } </p> {
                user.success && <p style = {
                    {
                        color: 'green'
                    }
                }> You are {
                    newUser ? 'registered' : 'Logged in'
                }
                successfully </p>
            } </div>
        );
    }

    export default Login;
