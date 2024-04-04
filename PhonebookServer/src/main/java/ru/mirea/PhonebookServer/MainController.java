package ru.mirea.PhonebookServer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping(path="/demo")
public class MainController {
    @Autowired
    private UserRepository userRepository;
    @PostMapping(path="/add")
    public @ResponseBody ResponseEntity addNewUser (@RequestParam String name, @RequestParam String phone) {
        try {
            User user = new User();
            user.setName(name);
            user.setPhone(phone);
            userRepository.save(user);
            return ResponseEntity.status(HttpStatus.OK).body(userRepository.findById(user.getId()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PostMapping(path="/delete")
    public @ResponseBody ResponseEntity removeUser (@RequestParam int id) {
        try {
            Optional<User> deletedUser = userRepository.findById(id);
            if (deletedUser.isEmpty()) {
                throw new Exception("User not found");
            }
            userRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(deletedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping(path="/all")
    public @ResponseBody ResponseEntity getAllUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(userRepository.findAll());
    }
}
