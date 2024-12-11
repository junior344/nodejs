const mongoose = require('mongoose');
const User = require('./models/User');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1/mydb');
    console.log('Connected to MongoDB');
    // const user1 = new User({
    //     email: 'jean@exemple',
    //     firstname: 'Jean',
    //     lastname: 'Dupont',
    //     age: 35,
    // });
    // await user1.save();
    // console.log(user1);

    //   const user2 =  await User.create({
    //         email: 'paul@exemple',
    //         firstname: 'Paul',
    //         lastname: 'Durand',
    //         age: 25,
    //     });

    const user2 = await User.findOne({email: 'paul@exemple'});
    const jean = await User.findById('671cec92fb4efa779df4bb47');
    const alice = await User.findById('671ceb8108cac97de4555831');
 
    console.log(alice);

    mongoose.disconnect();
}
main();