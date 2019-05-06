const _ = require('lodash');
const User = require('./weather');
const users = [
    {
        username: "jbavogui",
        password: "12345"
    },
    {
        username: "jbavogui02",
        password: "12345"
    }
];

class FakeDb {
        
    pushUserToDb() {
        _.forEach(users, (user) => {
            const newUser = new User(user);
            newUser.save();
        });
    }

    async cleanDb() {
        await User.deleteMany({});
    }

    seedDb() {
        this.cleanDb();
        this.pushUserToDb();
    }
}

module.exports = FakeDb;