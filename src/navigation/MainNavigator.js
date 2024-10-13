import { NavigationContainer } from "@react-navigation/native";
import {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import TabNavigator from "./TabNavigator";
import AuthStack from "./AuthStack";



const MainNavigator = () => {

  const idToken = useSelector(state =>state.auth.idToken)
  const dispatch = useDispatch()

    useEffect(()=>{
      (async ()=>{
        const sessions = await fetchSession()
        if(sessions.rows.length){
          dispatch(setUser(sessions.rows._array[0]))
        }
      })()
    },[])
    

  return (
    <NavigationContainer>
      {idToken ? <TabNavigator/> : <AuthStack/>}
    </NavigationContainer>
  );
};

export default MainNavigator; 


