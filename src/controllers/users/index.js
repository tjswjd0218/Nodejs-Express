const { Router } = require('express');
const { UserDTO } = require("./dto/UserDTO");
const { CreateUserDTO } = require("./dto/CreateUserDTO");

const userController = {
    router: Router(),
    path: "/users",
    users: [
        {
            id: 1,
            firstName: "Troye",
            lastName: "Sivan",
            age: 17
        }
    ],

    Init(){
        this.router.get('/', this.getUsers.bind(this));
        this.router.get("/detail/:id/fullName", this.getUserFullName.bind(this));
        this.router.get('/detail/:id', this.getUser.bind(this));
        this.router.post('/', this.createUser.bind(this));

    },

    getUsers(req, res, next){
        try {
            const users = this.users.map((user) => new UserDTO(user));

            res.status(200).json({ users: this.users })
        } catch(err) {
            next(err)
        }
    },

    getUser(req, res, next){
        try {
        const { id } = req.params;
        const targetUser = this.users.find(user => user.id === Number(id));

        if(!targetUser) {
            throw { status: 404, message: "유저를 찾을 수 없습니다."}
        }
        const user = new UserDTO(targetUser);

        res.status(200).json({ user });
        } catch(err) {
            next(err);
        }
    },

    getUserFullName(req, res, next) {
        try {
            const { id } = req.params;

            const targetUser = this.users.find((user) => user.id === Number(id));

            if(!targetUser) {
                throw { status: 404, message: "유저를 찾을 수 없습니다." };
            }
            const user = new UserDTO(targetUser);

            res.status(200).json({ fullName: user.getFullName() });
        } catch(err) {
            next(err);
        }
    },


    createUser(req, res, next){
        try {
        const { firstName, lastName, age } = req.body;

        if (!firstName || lastName) {
            throw { status: 400, message: "이름이 없습니다."}
        }
        const newUser = new CreateUserDTO(firstName, lastName, age).getNewUser();
        // = const user = new CreateUserDTO(firstName, lastName, age);
        //   const newUser = user.getNewUser();
    
        this.users.push(newUser);
        
        res.status(201).json({ users: this.users });
        } catch(err) {
        next(err)
        }
    }
}

userController.Init();
module.exports = userController;