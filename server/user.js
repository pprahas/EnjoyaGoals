class User {
    constructor(username, email, name, password) {
        this.username = username;
        this.email = email;
        this.name = name;
        this.password = password;
    }

    getUsername() {
        return this.username;
    }

    getEmail() {
        return this.email;
    }

    getName() {
        return this.name;
    }
    
    // obviously this will be changed, need to implement a hashing function
    // and *NEVER SEND A PASSWORD AS PLAINTEXT
    getPassword() {
        return this.password;
    }
}

module.exports = User;