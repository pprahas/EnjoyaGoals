class User {
    constructor(username, email, name) {
        this.username = username;
        this.email = email;
        this.name = name;
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
}

module.exports = User;