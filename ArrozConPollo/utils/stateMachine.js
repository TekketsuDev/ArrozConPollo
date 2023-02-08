const workersState = {
    state: 'observation',
    transitions: {
        observation: {
            press() {
            this.state = 'farm or build'
            }
        },
        farm: {
            press() {
                this.state = 'BLINK';
            },
        },
        move: {
            //consider cooldown to path
            
        }
    },
    dispatch(actionName) {
        const action = this.transitions[this.state][actionName];

        if (action) {
            action.call(this);
        } else {
            console.log('invalid action');
        }
    },
    
  };
