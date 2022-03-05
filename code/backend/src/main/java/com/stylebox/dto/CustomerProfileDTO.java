package com.stylebox.dto;

import com.stylebox.entity.user.Style;
import lombok.Data;

import java.util.Set;

@Data
public class CustomerProfileDTO {
    private String gender;
    private String ft;
    private String in;
    private String weight;
    private String shirtSize;
    private String bottomSize;
    private String jeanSize;
    private String shoeSize;
    private Set<String> styleSet;
}
