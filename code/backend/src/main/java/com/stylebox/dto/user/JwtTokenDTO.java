package com.stylebox.dto.user;

import java.io.Serializable;

public class JwtTokenDTO implements Serializable {

//  private static final long serialVersionUID = 8317676219297719109L;

  private final String token;

    public JwtTokenDTO(String token) {
        this.token = token;
    }

    public String getToken() {
        return this.token;
    }
}
