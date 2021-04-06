package pl.team.touchtalk.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;
import pl.team.touchtalk.entities.Log;
import pl.team.touchtalk.entities.User;
import pl.team.touchtalk.services.UserService;

import javax.servlet.http.HttpSession;
import java.util.Optional;

/*
* LoginController class
*
* @Author Jakub Stawowy
* @Version 1.0
* @Since 2021-04-06
* */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api")
public class LoginController {

    private final UserService userService;

    /*
    * Constructor
    * @Param userService this service provides UserRepository and LogRepository
    * */
    @Autowired
    public LoginController(UserService userService) {
        this.userService = userService;
    }

    /*
    * loginUser method
    *
    * @Param session HttpSession is used to get sessionId
    * @RequestParam email
    * @RequestParam password
    * @Returns user?null User with logged property set as true. If there's no user with this email and password, it returns null
    * */
    @PostMapping(value = "/login")
    @Nullable
    public User loginUser(HttpSession session, @RequestParam("email") String email, @RequestParam("password") String password) {

        String salt = userService.getUserRepository().getSaltByEmail(email);
        User loggedUser = userService.getUserRepository().getUserByEmailAndPassword(
                email,
                BCrypt.hashpw(
                        password,
                        salt
                )
        );

        if(loggedUser==null)
            return null;

        loggedUser.setLogged(true);
        userService.getUserRepository().save(loggedUser);
        userService.getLogRepository().save(new Log(
                session.getId(),
                loggedUser
        ));
        return loggedUser;
    }

    /*
    * logoutUser method
    *
    * @RequestParam id
    * @Returns loggedUser?null User with logged property set as false
    * */
    @PutMapping(value = "/logout")
    @Nullable
    public User logoutUser(@RequestParam("userId")Long id) {
        Optional<User> loggedUser = userService.getUserRepository().findById(id);
        loggedUser.ifPresent(user->{
            user.setLogged(false);
            userService.getUserRepository().save(user);
        });
        return loggedUser.orElse(null);
    }
}
