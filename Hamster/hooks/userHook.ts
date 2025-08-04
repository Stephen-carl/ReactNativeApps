import { initDB } from "@/db/connect"
import { useMutation, UseMutationResult } from "@tanstack/react-query"

export const insertChild = (name:string, age:number, profileCharacter:string, dateCreated:string, guardianId:number) : Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!name || !age) {
                reject('Child data is required')
            }

            const db= await initDB()
            const theResult = await db.runAsync(
                `INSERT INTO child (name, age, profileCharacter, dateCreated, guardianId) VALUES (?, ?, ?, ?, ?)`,
                [name, age, profileCharacter, dateCreated, guardianId]
            )

            if (theResult.changes !== 1) {
                reject('Error inserting child')
            }

            const theJarResult = await db.runAsync(
                `INSERT INTO jar (childId, guardianId, currentAmount, previousAmount, topUpDate) VALUES (?, ?, ?, ?, ?)`,
                [theResult.lastInsertRowId, guardianId, 5000.00, 0.0, '']
            )

            if (theJarResult.changes !== 1) {
                reject('Error inserting Jar')
            }
            resolve(theResult.lastInsertRowId)
        }catch(error){
            reject(error)
        }
        
    })
}

export const getChildData = (id:number) : Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(id);
            
            if (!id || typeof id !== 'number') {
                return reject('Invalid ID');
            }
            const db = await initDB()
            const theResult = await db.getFirstAsync(
                "SELECT * FROM child where id = ?", [id],
            )
            console.log(id, theResult);
    
            resolve(theResult)
        } catch (error) {
            reject(error)
            console.log(`error getting child data: ${error}`);
            
        }
    })
} 

// the hooks
export const useInsertChild = () : UseMutationResult<any, Error, any> => {
    return useMutation({
        mutationFn: ({name, age, profileCharacter, dateCreated, guardianId} :
            {name:string; age:number; profileCharacter:string; dateCreated:string; guardianId:number}) =>
             insertChild(name, age, profileCharacter, dateCreated, guardianId)
    })
}

export const useGetChildData = () : UseMutationResult<any, Error, any> => {
    return useMutation({
        mutationFn: (id:number) => getChildData(id)
    })
}

export const getDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};