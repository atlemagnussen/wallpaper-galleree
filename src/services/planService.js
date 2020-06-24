import crud from "./firestoreCrud.js";
import { userIsLoggedIn, plansStore } from "../store";
const collName = "plans";
let plans = [];
class PlanService {
    constructor() {
        this.loggedIn = false;
        userIsLoggedIn.subscribe(async value => {
            this.loggedIn = value;
            if (value) {
                this.getAll();
            }
        });

    }
    async getAll() {
        if (!this.loggedIn)
            return [];
        if (plans.length === 0 && this.loggedIn) {
            plans = await crud.getAll(collName);
            plansStore.set(plans);
        }
        return plans;
    }
    async create(name) {
        if (!this.loggedIn)
            throw new Error("not logged in");
        
        const plan = await crud.createOrUpdate(collName, {name});
        plans.push(plan);
        plansStore.set(plans);
        return plan;
    }
    async get(id) {
        if (!this.loggedIn)
            throw new Error("not logged in");
        // const plan = await crud.get(collName, id);
        await this.getAll();
        const plan = plans.find(p => p._id === id);
        return Object.assign({}, plan); // return copy
    }
    async update(plan) {
        if (!this.loggedIn)
            throw new Error("not logged in");
        await crud.createOrUpdate(collName, plan);
        const planOrg = plans.find(p => p._id === plan._id);
        Object.assign(planOrg, plan); // merge
        return plan;
    }
    async delete(id) {
        if (!this.loggedIn)
            throw new Error("not logged in");
        await crud.delete(collName, id);
        plans = plans.filter((p) => p._id !== id);
        plansStore.set(plans);
    }
    reorderExercise(plan, movingId, nextToId) {
        const movingExercise = this.spliceExercise(plan, movingId);
        if (!movingExercise)
            return plan.sessions;
        
        this.insertExerciseNextTo(plan, movingExercise, nextToId);
        return plan.sessions;
    }

    spliceExercise(plan, id) {
        for (let i = 0; i < plan.sessions.length; i++) {
            const session = plan.sessions[i];
            const index = session.exercises.map(ex => ex.id).indexOf(id);

            if (index >= 0) {
                const exercisesRemoved = session.exercises.splice(index, 1);
                return exercisesRemoved[0];
            }
        }
        return null;
    }
    insertExerciseNextTo(plan, ex, id) {
        for (let i = 0; i < plan.sessions.length; i++) {
            const session = plan.sessions[i];
            const index = session.exercises.map(ex => ex.id).indexOf(id);

            if (index >= 0) {
                session.exercises.splice(index + 1, 0, ex);
            }
        }
    }
}

export default new PlanService();