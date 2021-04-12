package pl.team.touchtalk.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;
import pl.team.touchtalk.entities.Log;
import pl.team.touchtalk.entities.User;
import pl.team.touchtalk.services.JsonWebTokenProvider;
import pl.team.touchtalk.services.UserService;

import javax.servlet.http.HttpSession;
import java.util.Optional;

/*
* LoginController class
*
* @Author Jakub Stawowy
* @Version 1.1
* @Since 2021-04-06
* */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api")
public class LoginController {

    private final UserService userService;
    private final JsonWebTokenProvider webTokenProvider;

    /*
    * Constructor
    * @Param userService this service provides UserRepository and LogRepository
    * */
    @Autowired
    public LoginController(UserService userService, JsonWebTokenProvider webTokenProvider) {
        this.userService = userService;
        this.webTokenProvider = webTokenProvider;
    }

    /*
    * loginUser method
    *
    * @Param session HttpSession is used to get sessionId
    * @RequestParam email
    * @RequestParam password
    * @Returns token?null If there's no user with this email and password, it returns null
    * */
    @PostMapping(value = "/login")
    @Nullable
    public String loginUser(HttpSession session, @RequestParam("email") String email, @RequestParam("password") String password) {

        Optional<String> salt = userService.getUserRepository().getSaltByEmail(email);
        if(salt.isPresent()) {

            User loggedUser = userService.getUserRepository().getUserByEmailAndPassword(
                    email,
                    BCrypt.hashpw(
                            password,
                            salt.get()
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

            return webTokenProvider.generateToken(loggedUser);
        }
        return null;
    }

    /*
    * logoutUser method
    *
    * @RequestParam id
    * @Returns loggedUser?null User with logged property set as false
    * */
    @PutMapping(value = "/logout")
    @Nullable
    public String logoutUser(@RequestParam("userId")Long id) {
        Optional<User> loggedUser = userService.getUserRepository().findById(id);

        if(loggedUser.isPresent()) {
            loggedUser.get().setLogged(false);
            userService.getUserRepository().save(loggedUser.get());
            return "User logged out correctly";
        }

        return "User logout error";
    }
}
