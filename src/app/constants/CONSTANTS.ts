export const ROLE: any = {
    ADMIN: 'ADMIN',
    HR: 'HR',
    EMPLOYEE: 'EMPLOYEE'
}

export const ROLEWISE_ROUTE_URL = {
    ADMIN: '/task',
    HR: '/task',
    EMPLOYEE: '/task'
}

export const TASK_STATUS = {
    active: 'In-progress',
    completed: 'Completed',
    pending: 'Pending'
}
export const TASK_PRIO = {
    HIGH: 'High',
    LOW: 'Low',
    MED: 'Medium'
}

export const StrongPasswordRegx: RegExp =
/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;