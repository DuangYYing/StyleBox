package com.stylebox.dto.Order;

import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class OrderDetailDTO {
    private String cusNickname;
    private int orderPrice;//o
    private Set<String> styleSet;
    private Set<String> occasionSet;
    private String description;//o
    private int clothPriceLow;//o
    private int clothPriceHigh;//o
    private String time;
    private String gender;//u
    private String ftSize;//c
    private String inSize;//c
    private String weight;//c
    private String shirtSize;//c
    private String bottomSize;//c
    private String jeanSize;//c
    private String shoeSize;//c
    private int isAccept;
    private int orderStatus;
}
