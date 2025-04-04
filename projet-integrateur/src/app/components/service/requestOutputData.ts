import * as zod from 'zod';

// ############################################################ INTERFACE REQUEST OUTPUT ############################################################



export interface requestOutputData {
    readonly code: number;  // Code de status. Valeurs possibles : [0, 1, 2, 3]. Voir plus haut pour les détails
    readonly error?: string; // Dans le cas d'un code != 0, description de l'erreur
    readonly summary: requestSummary;  // Résumé 
    readonly unassigned: Task[]; // Tableau d'objets décrivant les tâches non assignées
    readonly routes: requestRoute[];    // Tableau de routes
}

interface requestSummary {
    readonly cost: number; // total cost for all routes
    readonly routes: number; // number of routes in the solution
    readonly unassigned: number; // number of tasks that could not be served
    readonly setup: number; // total setup time for all routes
    readonly service: number; // total service time for all routes
    readonly duration: number; // total travel time for all routes
    readonly waiting_time: number; // total waiting time for all routes
    readonly priority: number; // total priority sum for all assigned tasks
    readonly violations: Violation[]; // array of violation objects for all routes
    readonly delivery?: number; // total delivery for all routes
    readonly pickup?: number; // total pickup for all routes
    readonly distance?: number; // total distance for all routes
}

interface requestRoute {
    readonly vehicle: number; // id of the vehicle assigned to this route
    readonly steps: Step[]; // array of step objects 
    readonly cost: number; // cost for this route
    readonly setup: number; // total setup time for this route
    readonly service: number; // total service time for this route
    readonly duration: number; // total travel time for this route
    readonly waiting_time: number; // total waiting time for this route
    readonly priority: number; // total priority sum for tasks in this route
    readonly violations: Violation[]; // array of violation objects for this route
    readonly delivery?: number; // total delivery for tasks in this route
    readonly pickup?: number; // total pickup for tasks in this route
    readonly description?: string; // vehicle description, if provided in input
    readonly geometry?: string; // polyline encoded route geometry
    readonly distance?: number; // total route distance
}

// Possible violation causes are:
// - "delay" if actual service start does not meet a task time window and is late on a time window end
// - "lead_time" if actual service start does not meet a task time window and is early on a time window start
// - "load" if the vehicle load goes over its capacity
// - "max_tasks" if the vehicle has more tasks than its max_tasks value
// - "skills" if the vehicle does not hold all required skills for a task
// - "precedence" if a shipment precedence constraint is not met (pickup without matching delivery, delivery before/without matching pickup)
// - "missing_break" if a vehicle break has been omitted in its custom route
// - "max_travel_time" if the vehicle has more travel time than its max_travel_time value
// - "max_distance" if the vehicle has a longer travel distance than its max_distance value
// - "max_load" if the load during a break exceed its max_load value
// Note on violations: reporting only really makes sense when using -c to choose ETA for custom routes described in input using the steps 
// keys for a vehicle. When using regular optimization, violations are still reported for consistency, but are guaranteed to be "void", 
// i.e. violations arrays are empty.

// ############################################################ INTERFACE OUTPUT ############################################################


export interface outputData {
    readonly summary: Summary;  // Résumé 
    readonly unassigned: Task[]; // Tableau d'objets décrivant les tâches non assignées
    readonly routes: Route[];    // Tableau de routes
}

interface Summary {
    readonly cost: number; // total cost for all routes
    readonly unassigned: number; // number of tasks that could not be served
    readonly service: number; // total service time for all routes
    readonly duration: number; // total travel time for all routes
    readonly violations: Violation[]; // array of violation objects for all routes
    readonly distance?: number; // total distance for all routes
}

interface Violation {
    readonly cause: string; // string describing the cause of violation
    readonly duration?: number; // Earliness if cause is "lead_time" or lateness if cause is "delay"
}

interface Task {
    readonly id: number;    // id de la task
    readonly type: 'pickup' | 'delivery'; // type de la task
    readonly description: string;   // description de la task
    readonly location: [number, number]; // coordonnées de la task
    readonly location_index: number;    // index de la ligne et de la colonne dans les matrices custom pour cette task
}

interface Route {
    readonly steps: Step[]; // array of step objects 
    readonly cost: number; // cost for this route
    readonly service: number; // total service time for this route
    readonly duration: number; // total travel time for this route
    readonly waiting_time: number; // total waiting time for this route
    readonly priority: number; // total priority sum for tasks in this route
    readonly violations: Violation[]; // array of violation objects for this route
    readonly delivery?: number; // total delivery for tasks in this route
    readonly pickup?: number; // total pickup for tasks in this route
    readonly description?: string; // vehicle description, if provided in input
    readonly geometry?: string; // polyline encoded route geometry
    readonly distance?: number; // total route distance
}

interface Step {
    readonly type: 'start' | 'job' | 'pickup' | 'delivery' | 'break' | 'end'; // type of step
    readonly arrival: number; // estimated time of arrival at this step
    readonly duration: number; // cumulated travel time upon arrival at this step
    readonly setup: number; // setup time at this step
    readonly service: number; // service time at this step
    readonly waiting_time: number; // waiting time upon arrival at this step
    readonly violations: Violation[]; // array of violation objects for this step
    readonly description?: string; // step description, if provided in input
    readonly location?: [number, number]; // coordinates array for this step (if provided in input)
    readonly location_index?: number; // index of relevant row and column in custom matrices for this step (if provided in input)
    readonly id?: number; // id of the task performed at this step, only provided if type value is job, pickup, delivery or break
    readonly load?: number[]; // vehicle load after step completion (with capacity constraints)
    readonly distance?: number; // traveled distance upon arrival at this step
}

// ############################################################ SCHEMA REQUEST OUTPUT ############################################################

const ViolationSchema = zod.object({
    cause: zod.string(),
    duration: zod.number().optional(),
});

const StepSchema = zod.object({
    type: zod.enum(['start', 'job', 'pickup', 'delivery', 'break', 'end']),
    arrival: zod.number(),
    duration: zod.number(),
    setup: zod.number(),
    service: zod.number(),
    waiting_time: zod.number(),
    violations: zod.array(ViolationSchema),
    description: zod.string().optional(),
    location: zod.tuple([zod.number(), zod.number()]).optional(),
    location_index: zod.number().optional(),
    id: zod.number().optional(),
    load: zod.array(zod.number()).optional(),
    distance: zod.number().optional(),
});

const RoutesSchema = zod.object({
    vehicle: zod.number(),
    steps: zod.array(StepSchema),
    cost: zod.number(),
    setup: zod.number(),
    service: zod.number(),
    duration: zod.number(),
    waiting_time: zod.number(),
    priority: zod.number(),
    violations: zod.array(ViolationSchema),
    delivery: zod.number().optional(),
    pickup: zod.number().optional(),
    description: zod.string().optional(),
    geometry: zod.string().optional(),
    distance: zod.number().optional(),
});

const SummarySchema = zod.object({
    cost: zod.number(),
    routes: zod.number(),
    unassigned: zod.number(),
    setup: zod.number(),
    service: zod.number(),
    duration: zod.number(),
    waiting_time: zod.number(),
    priority: zod.number(),
    violations: zod.array(ViolationSchema),
    delivery: zod.number().optional(),
    pickup: zod.number().optional(),
    distance: zod.number().optional(),
});

const TaskSchema = zod.object({
    id: zod.number(),
    type: zod.enum(['pickup', 'delivery']),
    description: zod.string(),
    location: zod.tuple([zod.number(), zod.number()]),
    location_index: zod.number(),
});

export const outputDataSchema = zod.object({
    code: zod.number(),
    error: zod.string().optional(),
    summary: SummarySchema,
    unassigned: zod.array(TaskSchema),
    routes: zod.array(RoutesSchema),
});