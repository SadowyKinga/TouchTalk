package pl.team.touchtalk.responses;

import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;

/*
 * RegisterResponseEntity POJO
 *
 * @Author Jakub Stawowy
 * @Version 1.0
 * @Since 2021-04-12
 * */
public class RegisterResponseEntity {

    @Nullable
    private final String email;
    private final HttpStatus httpStatus;

    public RegisterResponseEntity(@Nullable String email, HttpStatus httpStatus) {
        this.email = email;
        this.httpStatus = httpStatus;
    }

    @Nullable
    public String getEmail() {
        return email;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
