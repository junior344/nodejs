type Character = {
    life: number;
    isAlive: boolean;
    name?: string;
}
function damage(characterToDamage, amount: number): number {
    characterToDamage.life -= amount;
    return characterToDamage.life;
}
const result = damage({ life: 100 }, 12);
console.log(result);