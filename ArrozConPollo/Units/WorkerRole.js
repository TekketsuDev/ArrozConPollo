
class WorkerRole{
    
    constructor(idWorker, currentRole, currentPosition, destionation){
        this.role = role;
    }
    
    fuelCarried() {
        let u = World_1.World.GetInstance().own_units.get(this.u_id);
        return u.cargo.wood + u.cargo.coal * 10 + u.cargo.uranium * 40;
    }
}




