import { initDB } from "@/db/connect"
import { getChildData } from "./userHook";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

// it requires it to return a promise with data type of any
export const insertGuardian = (name:string, role:string) : Promise<number> => {
    return new Promise(async (resolve, reject) => {
        try {
            const db= await initDB()

            const theResult = await db.runAsync(
                `INSERT INTO guardian (name, role) VALUES ( ?, ?)`,
                [name, role]
            );
            if (theResult.changes !== 1) {
                reject('Error inserting guardian')
            }

            resolve(theResult.lastInsertRowId)
            // const result : any = await db.getFirstAsync(`SELECT last_insert_rowid() as id`)
            // resolve(result?.id)

        } catch (error) {
            reject(error)
        }        
    })
}

export const getGuardianData = (name:string) : Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!name) {
                reject('Child name is required')
            }

            const db = await initDB()
            // the aim is to get the guardian of the signin child
            const theResult = await db.getFirstAsync(`
                SELECT g.* FROM guardian g
                JOIN child c ON g.id = c.guardianId
                WHERE c.name = ?
                `, [name])

            if (!theResult) {
                reject('Guardian not found')
            }
            resolve(theResult)
        } catch (error) {
            reject(error)
        }
    })
}

// the hooks
export const useInsertGuardian = () : UseMutationResult<any, Error, any> => {
    return useMutation({
        mutationFn:({name, role} : {name:string; role:string}) =>
            insertGuardian(name, role)
    })
}

export const useGetGuardian = () : UseMutationResult<any, Error, any> => {
    return useMutation({
        mutationFn: (name:string) => getGuardianData(name)
    })
}