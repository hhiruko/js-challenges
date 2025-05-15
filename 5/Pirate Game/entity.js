export class Entity{
    constructor(health, defence, attack){
        this.health = health;
        this.defence = defence;
        this.attack = attack;
        this.defending = false;
    }

    hitWith(attack){
        if(this.defending){
            console.log('Defence worked!');
            attack = this.defence - attack;
            if(attack < 0){
                attack = 0;
            }
        }
        this.health = this.health - attack;
    }

    defend(){
        this.defending = true;
    }

    nextTurn(turn){
        if(this.turn !== turn){
            this.defending = false;
        }
        this.turn = turn;
    }
}