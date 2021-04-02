package pl.team.touchtalk.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.team.touchtalk.entities.Log;
import pl.team.touchtalk.entities.User;
import pl.team.touchtalk.repositories.LogRepository;
import pl.team.touchtalk.repositories.UserRepository;

import javax.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api")
public class LoginController {

    private final UserRepository userRepository;
    private final LogRepository logRepository;

    @Autowired
    public LoginController(UserRepository userRepository, LogRepository logRepository) {
        this.userRepository = userRepository;
        this.logRepository = logRepository;
    }

    @PostMapping(value = "/login")
    public User loginUser(HttpSession session, @RequestParam("email") String email, @RequestParam("password") String password) {
        User loggedUser = userRepository.getUserByEmailAndPassword(email, password);
        logRepository.save(new Log(
                session.getId(),
                loggedUser
        ));
        return loggedUser;
    }
}
