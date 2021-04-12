package pl.team.touchtalk.responses;

import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;

/*
 * LoginResponseEntity POJO
 *
 * @Author Jakub Stawowy
 * @Version 1.0
 * @Since 2021-04-12
 * */
public class LoginResponseEntity {
    @Nullable
    private final String token;
    @Nullable
    private final String username;
    private final HttpStatus httpStatus;

    public LoginResponseEntity(@Nullable String token,@Nullable String username, HttpStatus httpStatus) {
        this.token = token;
        this.username = username;
        this.httpStatus = httpStatus;
    }

    @Nullable
    public String getToken() {
        return token;
    }

    @Nullable
    public String getUsername() {
        return username;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
