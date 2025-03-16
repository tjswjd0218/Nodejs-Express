import { Router } from "express";
import { UserDTO } from "./dto/UserDTO";

// Router
class UserController {
    router;
    path = "/users";
    users = [
        {
            id: 1,
            firstName: "Louis",
            lastName: "Tomlinson",
            age: 28
        }
    ]

    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.get("/", this.getUsers.bind(this));
        this.router.get("/detail/:id/fullName", this.getUserFullName.bind(this));
        this.router.get("/detail/:id", this.getUser.bind(this));
        this.router.post("/", this.createUser.bind(this));
    }

    getUsers(req, res, next) {
        try {
            const users = this.users.map((user) => new UserDTO(user));
            
        res.status(200).json({ users: this.users });
        } catch(err) {
            next(err);
        }
    }

    getUser(req, res, next) {
        try  {
        const { id } = req.params;
        const targetUser = this.users.find((user) => user.id === Number(id));
        if(!targetUser) {
            throw{status: 404, message: "유저를 찾을 수 없습니다."}
        }
        const user = new UserDTO(targetUser);

        res.status(200).json({ user });        
        } catch(err) {
            next(err);
        }
    }

    getUserFullName(req, res, next) {
        try {
            const { id } = req.params;
            const targetUser = this.users.find((user) => user.id === Number(id));

            if(!targetUser) {
                throw { status: 404, message: "유저를 찾을 수 없습니다."}
            }
            const user = new UserDTO(targetUser);

            res.status(200).json({ fullName: user.getFullName() })
        } catch(err) {
            next(err)
        }
    }



    createUser(req, res, next) {
        try {
        const { firstName, lastName, age } = req.body;
        if(!firstName || !lastName) {
            throw{status: 400, message: "유저의 이름이 없습니다."}
        }
        const newUser = new createUserDTO(firstName, lastName, age).getNewUser();

        this.users.push(newUser);

        this.users.push({
            id: new Date().getTime(),
            firstName,
            lastName,
            age
        });
        res.status(201).json({ users: this.users });        
    } catch(err) {
        next(err)
    }


    }
}

const userController = new UserController();
export default userController;