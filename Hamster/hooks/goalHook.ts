import { initDB } from "@/db/connect"
import { getChildData } from "./userHook"
import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { get } from "lodash"

export const savetoGoals = (childId : number, item:string, amount:number, target:string, duration:string,savedAmount:number, status:string) : Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!childId || typeof childId !== 'number') {
                reject('ChildId is required')
            }
            const childData = await getChildData(childId)
            if (!childData) {
                reject('Child not found')
            }
            const db = await initDB()
            // check that the items passed are not null or empty or undefined
            const theResult = await db.runAsync(
                `INSERT INTO goals 
                (childId, item, amount, target, duration, savedAmount, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [childData.id, item, amount, target, duration, savedAmount, status]
            )
            if (theResult.changes !== 1) {
                reject('Error inserting goal')
            }
            // get the inserted goal
            const getTheGoal = await getGoals(childData.id, theResult.lastInsertRowId, '')
            if (!getTheGoal || get(getTheGoal, 'length', 0) === 0) {
                reject('Error getting the inserted goal')
            }
            // return the inserted goal
            resolve(getTheGoal[0])
        } catch (error) {
            reject(error);
        }
    })
}

export const getGoals = (childId: number, goalId: number, status:string) : Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!childId || typeof childId !== 'number') {
                reject('ChildId is required')
            }
            const childData = await getChildData(childId)
            if (!childData) {
                reject('Child not found')
            }
            const db = await initDB()
            let query = `SELECT * FROM goals WHERE childId = ?`
            let params = [childData.id]
            // instead of having two hooks
            if (goalId != 0 && typeof goalId === 'number') {
                query += ` AND id = ?`
                params.push(goalId);
            }
            if (status && (status === 'ongoing' || status === 'complete')) {
                query += ` AND status = ?`
                params.push(status);
            }
            const goals = await db.getAllAsync(query, params)
            resolve(goals)
        } catch (error) {
            reject(error);
            console.log(`error getting goals: ${error}`);     
        }
    })
}

// update the goals amount and status to complete(if the sent amount when added to the goal Amount is equal to the total amount)
export const updateGoal = (childId: number, goalId: number, amount: number) : Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!childId) {
                reject('Child name is required')
            }
            const childData = await getChildData(childId)
            if (!childData) {
                reject('Child not found')
            }
            const db = await initDB()

            // get the goal
            const goal:any = await db.getFirstAsync(`SELECT * FROM goals WHERE childId = ? AND id = ?`, [childData.id, goalId])
            if (!goal) {
                reject('Goal not found')
            }

            // add the amount to the goal amount and check if it is equal to the total amount
            const newAmount = goal?.savedAmount + amount;
            const status = newAmount >= goal?.amount ? 'complete' : 'ongoing';

            // update the goal
            const theResult = await db.runAsync(
                `UPDATE goals SET savedAmount = ?, status = ? WHERE childId = ? AND id = ?`,
                [newAmount, status, childData.id, goalId]
            )
            if (theResult.changes !== 1) {
                reject('Error updating goal')
            }
            // get the updated goal
            const updatedGoal = await getGoals(childData.id, goalId, '')
            if (!updatedGoal || get(updatedGoal, 'length', 0) === 0) {
                reject('Error getting the updated goal')
            }
            // return the updated goal
            resolve(updatedGoal[0])
        } catch (error) {
            reject(error);
            console.log(`error updating goal: ${error}`);
        }
    })
}

// THE HOOKS

export const useSaveGoal = (): UseMutationResult<any, Error, { childId: number, item: string, amount: number, target: string, duration: string, savedAmount: number, status: string }> => {
    return useMutation({
        mutationFn: ({ childId, item, amount, target, duration, savedAmount, status }) => savetoGoals(childId, item, amount, target, duration, savedAmount, status),
        // onError: (error) => {
        //     console.error('Error saving goal:', error);
        // }
    })
}

export const useGetGoals = (): UseMutationResult<any, Error, { childId: number, goalId: number, status: string }> => {
    return useMutation({
        mutationFn: ({ childId, goalId, status }) => getGoals(childId, goalId, status),
        // onError: (error) => {
        //     console.error('Error getting goals:', error);
        // }
    })
}

export const useUpdateGoal = (): UseMutationResult<any, Error, { childId: number, goalId: number, amount: number }> => {
    return useMutation({
        mutationFn: ({ childId, goalId, amount }) => updateGoal(childId, goalId, amount),
        // onError: (error) => {
        //     console.error('Error updating goal:', error);
        // }
    })
}