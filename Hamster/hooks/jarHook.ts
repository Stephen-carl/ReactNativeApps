import { initDB } from "@/db/connect"
import { getChildData } from "./userHook"
import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { result } from "lodash"

export const updateJar = ( id:number, currentAmount:number, previousAmount:number, topUpDate:string) : Promise<any> => {
    return new Promise( async(resolve, reject) => {
        try {
            if (!id) {
                reject('Child name is required')
            }
            const childData = await getChildData(id)
            if (!childData) {
                reject('Child not found')
            }
            const db = await initDB()

            // i think i should only insert when any of the data are sent
            const updates: string[] = [];
            const values: any[] = [];

            if (currentAmount !== undefined) {
                updates.push('currentAmount = ?');
                values.push(currentAmount);
            }

            if (previousAmount !== undefined) {
                updates.push('previousAmount = ?');
                values.push(previousAmount);
            }

            if (topUpDate !== undefined) {
                updates.push('topUpDate = ?');
                values.push(topUpDate);
            }

            if (updates.length === 0) {
                return reject('No valid fields to update');
            }

            values.push(id);

            const sql = `UPDATE jar SET ${updates.join(', ')} WHERE childId = ?`;

            const theUpdate = await db.runAsync(sql, values);
            if (theUpdate.changes === 0) {
                reject('Error updating jar')
            }
            console.log(theUpdate.lastInsertRowId);
            
            resolve('Jar updated successfully');

        } catch (error) {
            reject(error)
        }
    })
}

export const getJar = (id:number) : Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const childData = await getChildData(id)
            if (!childData) {
                reject('Child not found')
            }
            const db = await initDB()
            const theResult = await db.getFirstAsync(
                `SELECT * FROM jar WHERE childId = ?`,[id]
            )
            if (!theResult) {
                reject('Jar not found')
            }
            resolve(theResult)
        } catch (error) {
            reject(error)
        }
    })
}

export const getJarAmount = (id:number) : Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const childData = await getChildData(id)
            if (!childData) {
                reject('Child not found')
            }
            const db = await initDB()
            const theResult = await db.getFirstAsync(
                `SELECT currentAmount FROM jar WHERE childId = ?`,
                [childData.id]
            )
            if (!theResult) {
                reject('Jar not found')
            }
            resolve(theResult)
        } catch (error) {
            reject(error)
        }
    })
}

export const getItemCategory = (name:string) : Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await initDB()
            const theResult = await db.getFirstAsync(
                `SELECT id FROM itemCategories WHERE category = ?`,
                [name]
            )
            if (!theResult) {
                reject('Item category not found')
            }
            console.log(theResult);
            
            resolve(theResult)
        } catch (error) {
            reject(error)
        }
    })
}

// to insert into the takeOutItem
export const insertTakeOutItem = (itemName:string, categoryName:string, childId:number, childName:string, amount:number, date:string, initialAmount:number, currentAmount:number) : Promise<any> =>{
    return new Promise(async(resolve, reject) => {
        try {
            console.log(itemName, categoryName, childId, childName, amount, date, initialAmount, currentAmount);
            
            // check the childId
            const childData = await getChildData(childId)
            if (!childData) {
                reject('Child not found')
            }
            console.log('here');
            
            
            // get the category ID
            const categoryID = await getItemCategory(categoryName)
            if (!categoryID) {
                reject('Item category not found')
            }
            console.log(categoryID.id);
            
            
            // the initDB and insert
            const db = await initDB()
            const theResult = await db.runAsync(`
                INSERT INTO takeOutItem (itemName, categoryid, childId, childName, amount, date) VALUES (?, ?, ?, ?, ?, ?)`,
                [itemName, categoryID.id, childId, childName, amount, date]
            )
            if (theResult.changes === 0) {
                reject('Error inserting take out item')
            }
            console.log('inserted into take out item');

            // insert into transaction
            const theTransaction = await insertTransaction(childId, amount, 'take', theResult.lastInsertRowId, date, categoryName)
            if (!theTransaction) {
                reject('Error inserting transaction')
            }
            
            // update the jar
            // const theUpdate = await updateJar(childId, currentAmount, initialAmount, ".")
            // if (!theUpdate) {
            //     reject('Error updating jar')
            // }
            // console.log(theUpdate)
            resolve('Take out item inserted successfully. Jar Updated')
        } catch (error) {
            reject(error)
            console.log(error);
            
        }
    })
}

// insert into transaction table
export const insertTransaction = (childId:number, amount:number, reason:string, takeOutId:any, date:string, itemProfile:string) : Promise<any> => {
    return new Promise (async(resolve, reject) => {
        try {
            // check the childId
            const childData = await getChildData(childId)
            if (!childData) {
                reject('Child not found')
            }
            const db = await initDB()

            // make sure the id from the taken from take out
            const theResult = await db.runAsync(`
                INSERT INTO jarTransactions VALUES (NULL,?,?,?,?,?,?)`,
                [childId, amount, reason, takeOutId, itemProfile, date]
            )
            if (theResult.changes === 0) {
                reject('Error inserting transaction')
            }
            const theJar = await getJar(childId)
                if (!theJar) {
                    reject('Jar not found')
                }

            // then update the jar if the reason it add and not take
            if (reason === 'add') {
                // first get the current amount in jar
                
                const newCurrentAmount = Number(theJar.currentAmount) + Number(amount)
                const theUpdate = await updateJar(childId, newCurrentAmount, theJar.currentAmount, date)
                if (!theUpdate) {
                    reject('Error updating jar')
                }
            } else if(reason === 'take') {
                const newCurrentAmount = Number(theJar.currentAmount) - Number(amount)
                const theUpdate = await updateJar(childId, newCurrentAmount, theJar.currentAmount, date)
                if (!theUpdate) {
                    reject('Error updating jar')
                }
            }
            
            resolve('Transaction inserted successfully')
        } catch (error) {
            reject(error)
        }
    })
}

export const getTransactions = (childId:number) : Promise<any> => {
    return new Promise(async(resolve, reject) => {
        try {
            // check the childId
            const childData = await getChildData(childId)
            if (!childData) {
                reject('Child not found')
            }

            // initDB
            const db = await initDB()
            
            const theTrans = await db.getAllAsync('SELECT * FROM jarTransactions WHERE childId = ? ORDER BY date DESC', [childId])
            if (!theTrans){
                reject('Transactions not found')
            }
            resolve(theTrans)
        } catch (error) {
            reject(error)
        }
    })
}


// the hooks
export const useUpdate = () : UseMutationResult<any, Error, any> =>{
    return useMutation({
        mutationFn: ({id, currentAmount, previousAmount, topUpDate} 
            : {id:number; currentAmount:number; previousAmount:number; topUpDate:string}) =>
            updateJar(id, currentAmount, previousAmount, topUpDate)
    
    })
}

export const useGetJar = () : UseMutationResult<any, Error, any> => {
    return useMutation({
        mutationFn: (id:any) => getJar(id)
    })
}

export const useGetJarAmount = () : UseMutationResult<any, Error, any> => {
    return useMutation({
        mutationFn: (id:number) => getJarAmount(id)
    })
}

export const useInsertItem = () : UseMutationResult<any, Error, any> => {
    return useMutation({
        mutationFn: ({itemName, categoryName, childId, childName, amount, date, initialAmount, currentAmount, itemProfile} : 
            {itemName:string; categoryName:string; childId:number; childName:string; amount:number; date:string; initialAmount:number; currentAmount:number; itemProfile:string}) =>
            insertTakeOutItem(itemName, categoryName, childId, childName, amount, date, initialAmount, currentAmount)
    })
}

// more useful in the Add money
export const useAddToJar = () : UseMutationResult<any, Error, any> => {
    return useMutation({
        mutationFn: ({childId, amount, reason, takeOutId, date, itemProfile} : {childId:number; amount:number; reason:string; takeOutId:any; date:string, itemProfile:string}) =>
            insertTransaction(childId, amount, reason, takeOutId, date, itemProfile)
    })
}

export const useGetTrans = () : UseMutationResult<any, Error, any> => {
    return useMutation({
        mutationFn: (childId:number) => getTransactions(childId)
    })
}