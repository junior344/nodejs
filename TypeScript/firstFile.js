function damage(characterToDamage, amount) {
    characterToDamage.life -= amount;
    return characterToDamage.life;
}
const result = damage({ life: 100 }, 12);
console.log(result);
