const UnitGoal = {
    Unassign: "Unassign",
    Setters: "Setters",
    Gatherers: "Gatherers",
    BuildNewCity: "BuildNewCity",
    Greedys: "Greedy",
    Nomad: "Nomad",
}


class Worker{
    static GetInstance() {
        if (this.instance)
            return this.instance;
        this.instance = new Worker();
        return this.instance;
    }
    constructor(){
        this.currentRole = UnitGoal.None; 
        this.currentRolePath = [];  
    }
    update(){
        switch(currentRole) {
            case this.WorkerRole.Gatherer:
                // Do 
                break;
            case this.WorkerRole.ChinoFarmer:
                // Do ChinoFarmer
                break;
            case WorkerRole.Frontier:
                //Do Fronterize
                break;
            }
    
            }
}