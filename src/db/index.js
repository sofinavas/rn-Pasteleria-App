import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('sessions.db') //le pongo nombre a la DB

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx=>{
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS sessionUser (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, idToken TEXT NOT NULL)',
                [],
                (__,result)=>resolve(result),
                (__,error)=> reject(error),
            )
        })
    })
    return promise
}

//para usar en el Login
export const insertSession = ({localId, email, idToken}) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx=>{
            tx.executeSql(
                'INSERT INTO sessionUser (localId, email, idToken) VALUES (?, ?, ?)',
                [localId, email, idToken],
                (__,result)=>resolve(result),
                (__,error)=> reject(error),
            )
        })
    })
    return promise
}

//la uso en el mainNavigator para traerme tdos los datos que tengo
export const fetchSession = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx=>{
            tx.executeSql(
                'SELECT * FROM sessionUser',
                [],
                (__,result)=>resolve(result),
                (__,error)=> reject(error),
            )
        })
    })
    return promise
}

//para hacer el Logout Y borrar todo lo que tenia guardado:
export const deleteSession = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx=>{
            tx.executeSql(
                'DELETE FROM sessionUser',
                [localId, email, idToken],
                (__,result)=>resolve(result),
                (__,error)=> reject(error),
            )
        })
    })
    return promise
}