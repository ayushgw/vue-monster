new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        logs: []
    },
    methods: {
        startGame() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.logs = [];
        },
        attack() {
            let damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.logs.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            });
            if(this.checkWin()){return;}

            this.monsterAttacks();
        },
        specialAttack() {
            let damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.logs.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            });
            if(this.checkWin()){return;}

            this.monsterAttacks();
        },
        heal() {
            let heal = Math.max(Math.floor(Math.random() * 15) + 1, 9);
            if(this.playerHealth < 90) {
                this.playerHealth += heal;
                this.logs.unshift({
                    isPlayer: true,
                    text: 'Player healed by ' + heal
                });
            }
            else {
                this.logs.unshift({
                    isPlayer: true,
                    text: 'Heal works only below 90 health! But monster still inflicts damage... ha ha!'
                })
            }
            this.monsterAttacks();
        },
        giveUp() {
            this.gameIsRunning = false;
            this.logs.unshift({
                isPlayer: true,
                text: 'You ran away from monster.. duh!'
            })
        },
        monsterAttacks() {
            let damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.logs.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            });
            this.checkWin();
        },
        calculateDamage(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin() {
            if(this.monsterHealth <=0) {
                if(confirm('You won! New Game?')) {
                    this.startGame();
                }
                else {
                    this.gameIsRunning = false;
                }
                return;
            }
            else if (this.playerHealth <= 0) {
                if(confirm('You lost! New Game?')) {
                    this.startGame();
                }
                else {
                    this.gameIsRunning = false;
                }
                return;
            }
        }
    }
});