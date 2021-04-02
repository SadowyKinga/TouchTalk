package pl.team.touchtalk.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.team.touchtalk.entities.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    User getUserByEmailAndPassword(String email, String password);
}
